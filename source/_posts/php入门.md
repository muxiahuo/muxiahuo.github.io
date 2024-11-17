---
title: php入门
date: 2024-07-14 20:40:29
categories:
- WEB
tags:
- 基础
---
&emsp;&emsp;对于刚接触web题的时候，最先掌握的语言应该是php，不说所有知识点要了解，起码打web题的时候GET和POST方法要会辨别和使用，推荐PHP学习网站  https://www.runoob.com/php
&emsp;&emsp;生怕你们不会点，超链接都没有弄(っ'-')╮=͟͟͞͞🎁) ﾟдﾟ ）

### GET方法
&emsp;&emsp;也是生怕你们不看，单拎出来给你们了解一下 ( ੭ ˙ᗜ˙ )੭  
&emsp;&emsp;GET方法，嗯……不知道怎么描述，直接看示例就知道了
```
<?php
if($_GET['get']) {
echo $_GET['id'], "<BR>";
echo $_GET['password'], "<BR>";
}
?>
```
&emsp;&emsp;像是$_GET['id']这样的，里面的参数就是变量，代表有个变量id可以通过URL?的形式进行传参，例如**http://127.0.0.1?id=1**,这样id的值就为1。

### POST方法
&emsp;&emsp;和GET差不多，但传参的方式变了，像是你在网页输入的信息就是用的POST，如果没有你能点的或者输入的东西，就要用到hackbar了，什么，你不知道hackbar是什么？点这个了解一下吧：[hackbar](/2024/07/13/hackbar/)

### 结语
&emsp;&emsp; 知道这两个方法之后，恭喜你，能做出大部分的web题目了，遇到不会的就去网上搜和问AI，web主要靠得是你的信息收集能力，加油吧，师傅们ｸﾞｯ!(๑•̀ㅂ•́)و✧