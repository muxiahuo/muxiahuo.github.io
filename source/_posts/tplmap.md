---
title: tplmap
date: 2024-06-06 19:52:22
categories:
- SSTI
tags:
- 工具|脚本 利用
---
## tplmap.py

### tplmap介绍

&emsp;&emsp;Tplmap是一个python工具，可以通过使用沙箱转义技术找到代码注入和服务器端模板注入（SSTI）漏洞。该工具能够在许多模板引擎中利用SSTI来访问目标文件或操作系统。一些受支持的模板引擎包括PHP（代码评估），Ruby（代码评估），JaveScript（代码评估），Python（代码评估），ERB，Jinja2和Tornado。该工具可以执行对这些模板引擎的盲注入，并具有执行远程命令的能力。（说的高级吧，其实选用其他博主的(●'◡'●)）实用指数⭐⭐⭐

### 安装方法

&emsp;&emsp;在kali或者linux安装即可

```bash
git clone https://github.com/epinna/tplmap
```

&emsp;&emsp;进入该文件夹下安装依赖（就是安装库啦）

```bash
cd tplmap
pip install -r requirements.txt
```
&emsp;&emsp;如果安装报错了，不妨试一试pip2安装，别问我怎么知道的，我就是(ᇂ_ᇂ|||)

### 常用命令

```bash
GET:
python3 tplmap.py -u <URL:>?name=
POST:
python3 tplmap.py -u <URL:> --data= name=
```

![tplmap](/images/tplmap.png)

&emsp;&emsp;如上面所示，可以得出模板是jinja2，如果下面那一段显示yes或者ok，那么可以直接用shell指令（--os-shell）。

&emsp;&emsp;更多用法可以用help查看，很多python脚本都可以这样做(不认识英文直接去找翻译(ง •̀_•́)ง加油)
```bash
python3 tplmap.py --help
```

