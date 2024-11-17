---
title: eregi
date: 2024-07-17 10:16:26
categories:
- PHP
tags:
- 函数绕过
---
&emsp;&emsp;eregi()函数用指定的模式搜索一个字符串中指定的字符串,布尔类型，如果匹配成功返回true,否则,则返回false。搜索字母的字符是大小写敏感的。有两个参数，eregi($pattern,$string),在$string里面搜索$pattern。

### %00截断
&emsp;&emsp;ereg函数存在NULL截断漏洞，即%00截断，可以使用%00绕过验证，例如
```
$a = %00hello
```

### 数组返回值
&emsp;&emsp;与其他不同的是，该函数若参数为数组是它的返回值不是FALSE，也不会报错。
