---
title: GitHack
date: 2024-08-03 19:57:49
categories:
- WEB
tags:
- 工具|脚本 利用
- 信息收集
---
&emsp;&emsp;GitHack针对于git泄露题目，通常先用dirsearch扫描出大量git推出为git泄露，就可以用此脚本进行源码获取，实用指数:⭐⭐⭐,安装方式挺简单，kali:
```
git clone https://github.com/BugScanTeam/GitHack
```
&emsp;&emsp;使用方法:
```
python2 GitHack.py http://example.com:8088/.git
```
&emsp;&emsp;然后会在dist生成一个文件夹，打开访问即可。