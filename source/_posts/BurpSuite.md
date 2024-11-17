---
title: BurpSuite
date: 2024-07-25 19:57:10
categories:
- WEB
tags:
- 基础
- 工具|脚本 利用
---
&emsp;&emsp;BurpSuite做web手要非常熟练的一个工具,实用指数:⭐⭐⭐⭐⭐。关于工具|脚本这一模块我这里就不详细的说明使用方法了，重点是下了自己去试一下，多练（绝对不是因为我懒(っ◞‸◟c)）

### BP的下载
&emsp;&emsp;直接给链接了:[BurpSuite](https://blog.csdn.net/m0_63100066/article/details/128355365)

### BP的使用
&emsp;&emsp;还是那句话，自己去找题目抓几个包试一下，推荐blog：[BP使用](https://blog.csdn.net/Javachichi/article/details/135837378),可以自己去网上找合适的，这里着重强调需要掌握的方法，<font color=red>抓的包会放在代理模块中(proxy)，要进行修改数据要`右击点击发送到Repeater`也就是响应模块中，要进行爆破需要`右击点击发送到Intruder`也就是重复模块中，在然后就是在各个模块中的一些基操，比如在Repeater模块中变更请求方法，在Intruder模块中设置载荷选项。</font>推荐不是中文的找个中文版的用用。其次呢<font color=blue>文章中提到了Proxy SwitchyOmega扩展要安装好，我就不单独出一篇了，安装方法和hackbar一样的去扩展搜一下就行，因为方便切换代理，比如BP默认8080，猫默认7890，后续有了更多的端口后，这个扩展就显得尤其方便。</font><font color=pink>最后要知道HTTP的各类状态码，在面对Intruder模块中能更快找到请求成功的页面。</font>
```
1xx（信息性状态码）：表示接收的请求正在处理。
2xx（成功状态码）：表示请求正常处理完毕。
3xx（重定向状态码）：需要后续操作才能完成这一请求。
4xx（客户端错误状态码）：表示请求包含语法错误或无法完成。
5xx（服务器错误状态码）：服务器在处理请求的过程中发生了错误。
```
