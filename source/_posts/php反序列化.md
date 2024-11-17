---
title: php反序列化
date: 2024-09-19 20:03:27
categories:
- PHP
tags:
- 反序列化
description: " "
---
### 序列化初识
&emsp;&emsp;序列化是<font color=red>将对象或者数组转化为可储存/传输的字符串</font>。在php中使用serialize()来将对象或者数组进行序列化，并返回一个包含字节流的字符串来表示。进行序列化的时候需要注意的是:  
```
1.类名不区分大小写
2.序列化可以自己创建变量和函数
3.私有和保护属性的序列方式(url绕过)
```
&emsp;&emsp;基础参考b站橙子科技。

### PHP原生类
&emsp;&emsp;当我们不知道flag所在的位置，没有pop链的思路和可利用反序列化的函数的时候，一般就是需要用原生类了。例如:
```
echo new $_POST['a']($_POST['b']);
```
&emsp;&emsp;类似于这样的，我们可以使用原生类进行遍历读取。详情可参考[php原生类](https://blog.csdn.net/weixin_63231007/article/details/124740776)

#### Directorylterator类
&emsp;&emsp;DirectoryIterator类会创建一个指定目录的迭代器。当执行到echo函数时，会触发DirectoryIterator类中的 __toString() 方法，输出指定目录里面经过排序之后的第一个文件名。

#### 利用Globlterator类测文件路径
&emsp;&emsp;GlobIterator类也可以遍历一个文件目录，行为类似于 glob()函数，可以通过模式匹配来寻找文件路径。

#### 确定文件目录后，用SplFileObject类进行文件读取
&emsp;&emsp;用new创建后形参为flag或者伪协议。

### 魔术方法
&emsp;&emsp;魔术方法在特定条件下自动调用相关方法，最终导致触发代码。是我们pop链利用的关键。

#### __construct()
&emsp;&emsp;构造函数，在实例化一个对象的时候，首先会去自动执行的一个方法。触发条件（以下例子对象中默认存在该魔法方法）:  
```
$a = new CTF();
```

#### __destruct()
&emsp;&emsp;析构函数，在对象的所以引用被删除或者当对象被显示销毁时执行的魔术方法。触发条件：  
```
unserialize($a);
```

#### __sleep()
&emsp;&emsp;用于清理对象，并返回一个包含对象中所有应被序列化的变量名称的数组。触发条件:  
```
echo serialize($a); //序列化之前执行
```

#### __wakeup()
&emsp;&emsp;预先准备对象资源，返回void，常用于反序列化操作中重新建立数据库连接或执行其他初始化操作。触发条件：  
```
unserialize($a); //反序列化之前执行
```

​	当属性个数的值大于真实属性个数时，会跳过该方法的执行。

#### __toString()

&emsp;&emsp;把对象当成字符串调用。触发条件:  
```
$a = new CTF();
echo $a; //调用对象可以使用print_r或者var_dump
```

#### __invoke()
&emsp;&emsp;把对象当成函数调用。触发条件：  
```
$a = new CTF();
echo $a()->b; 
```

#### __call()
&emsp;&emsp;调用一个不存在的方法。触发条件：  
```
$a = new CTF();
$a->ctf('hahaha');  //不存在ctf这个函数方法，此时ctf作为__call的第一个形参，'hahaha'作为第二个形参。
```

#### __get()
&emsp;&emsp;调用的成员属性不存在。触发条件：  
```
$a = new CTF();
$a->ctf; //这个是变量也就是成员属性不存在，ctf作为__get的形参。
```

#### __set()
&emsp;&emsp;给不存在的成员属性赋值。触发条件：  
```
$a = new CTF();
$a->ctf = 1;  //同上，若都有，先出发get()，ctf作为__set的一个形参，1作为第二个形参。
```

#### __isset()
&emsp;&emsp;对不可访问属性使用isset()或者empty()时，__isset()会被调用。触发条件：  
```
$a = new CTF();
isset($a->ctf);  //ctf是私有或保护属性，调用执行里面的__isset()，ctf作为__isset的形参。__unset()同理。
```

#### 总结
&emsp;&emsp;直接放图，自己看。ヾ(❀╹◡╹)ﾉﾞ❀~  
![pop1](/images/pop1.png)  
![pop2](/images/pop2.png)

​       然后根据方法构造pop链即可，方法：倒推法



### 字符串逃逸

​	反序列化以`:}`结束，后面的字符串不影响正常的反序列化，因此，当数据先经过一次serialize再经过unserialize的时候，序列化的字符串变多或者变少有可能导致反序列化属性逃逸。这种漏洞往往出在字符替换函数身上。例如：

````php
class A
{
    public $a = "CTFaaaCTF";
    public $b = "HYNUCTF";
}
$payload = serialize(new A());
echo $payload;
print("\n");
$data = str_replace("a","",$payload);
echo $data;
print("\n");
var_dump(unserialize($data));
//output
O:1:"A":2:{s:1:"a";s:9:"CTFaaaCTF";s:1:"b";s:7:"HYNUCTF";}
O:1:"A":2:{s:1:"a";s:9:"CTFCTF";s:1:"b";s:7:"HYNUCTF";}
bool(false)

```

````

​	由此可见，aaa缺少了，会导致后面的正常语句被吞掉，从而导致序列化错误，此时$a的序列定位到了s:的中间，这属于减少，增多也是同理，这一部分要结合题目来理解。（先放着doge）。


