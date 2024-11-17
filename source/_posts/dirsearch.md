---
title: dirsearch
date: 2024-07-23 20:26:53
categories:
- WEB
tags:
- 基础
- 工具|脚本 利用
- 信息收集
---
&emsp;&emsp;dirsearch用来暴力扫描一些基础的存在目录和文件，实用指数:⭐⭐⭐⭐,kali安装:
```
git clone https://github.com/maurosoria/dirsearch.git
```
&emsp;&emsp;安装完之后就是安装依赖
```
cd dirsearch  //进入dirsearch目录
(sudo) pip3 install -r requirements.txt //可以tab补全，不能执行就用sudo
```
&emsp;&emsp;之后执行dirsearch.py
```
(sudo) python3 dirsearch.py -h  //查看帮助
(sudo) python3 dirsearch -u URL //扫描开始
```
&emsp;&emsp;以上就是常规用法，知道扫描就行了。（后期帮助不大）