---
title: is_numberic
date: 2024-07-13 20:34:15
categories:
- PHP
tags:
- 函数绕过
---
&emsp;&emsp;is_numeric()函数用于检查变量是否为数字或数字字符串。属于布尔类型，如果指定的变量是数字和数字字符串则返回TRUE，否则返回FALSE，注意<font color=red>浮点型返回空值，即FALSE。</font>

### 空字符绕过
&emsp;&emsp;可以借助URL编码中的空字符，例如%00或者%20，其中%00加在前面或者后面都可以，也就是%00404或者404%00，而%20只能放在末尾，比如404%20（%20准确来说是空格字符）  
```
数字-->非数字：
数值%20
%00数值
数值%00
```
&emsp;&emsp;当然还可以这样构造:
```
?num=1'
?num=1,
?num=1%00
```
&emsp;&emsp;都可以绕过判断
```
$num=$_GET['num'];
if(!is_numeric($num))
{
    echo $num;
    if($num==1)
    echo $flag;
}
```
&emsp;&emsp; 其实题目的核心是弱比较的特性，我们只要知道这个函数的返回类型和作用就过关了(っ◞‸◟c)