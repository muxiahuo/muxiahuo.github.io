---
title: sqlmap
date: 2024-08-03 16:42:11
categories:
- WEB
tags:
- sql注入
- 工具|脚本 利用
---
&emsp;&emsp;sqlmap是kali自带的一种工具，通常对网站进行sql注入，首先就要做的是找到注入点，找到后就可以使用sqlmap一把梭了。同时它也具备了一些脚本去使用，也可以搭配自定义脚本，理论上sql题目可以通杀的，看你的掌握度如何。常规指令有如下，实用指数:⭐⭐⭐⭐
![sqlmap](/images/sqlmap.png)
&emsp;&emsp;经典一把梭
```
sqlmap -u URL --dbs --tables -batch(爆库)
sqlmap -u URL --dbs --tables -batch -D '    '(爆表)
sqlmap -u URL --dbs --tables -batch
-D '   '  -T  '   '(爆列)
sqlmap -u URL --dbs --tables -batch
-D '   '  -T  '   '  --dump(爆段)
```
