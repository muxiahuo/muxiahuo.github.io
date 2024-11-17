---
title: fenjing
date: 2024-06-05 21:06:43
categories:
- SSTI
tags:
- 工具|脚本 利用
---
## Fenjing(焚靖)

### fenjing介绍

&emsp;&emsp;焚靖是一个针对CTF比赛中Jinja2 SSTI绕过WAF的全自动脚本，可以自动攻击给定的网站或接口。能解决常规性的SSTI题目，实用指数⭐⭐⭐

### 安装方法

&emsp;&emsp;在windows环境下安装最方便，本人尝试在kali安装失败了很多次，各种报错，最后放弃了。&emsp;(；′⌒`)

``` bash
pip install fenjing -i https://pypi.tuna.tsinghua.edu.cn/simple
```

### 常用命令

```bash
python -m fenjing scan --url <URL:>
```

&emsp;&emsp;该命令执行完毕后会反弹一个shell

```bash
python -m fenjing webui
```

&emsp;&emsp;会在本地弹出一个可视化操作页面，然后在根据要求填充和执行（方便新手去使用）

```bash
 python -m fenjing crack --url <URL:> --method GET(POST) --inputs name(user)
 ```

 &emsp;&emsp;一把梭（说实话还是上面两个命令好用些(／_＼)大怨种）

 &emsp;更为详细的在 [here](https://gitcode.com/Marven11/Fenjing)