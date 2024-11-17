---
title: in_array
date: 2024-07-13 19:27:15
categories:
- PHP
tags:
- 函数绕过
---
&emsp;&emsp;in_array函数的功能用于检查数组是否存在某个值或者是不是数组。定义：布尔型函数，参数为（$needle,$haystack,[$strict = FALSE]）,在$haystack中搜索$needle,如果第三个参数$strict的值为TRUE(没有默认为FALSE),则该函数会进行强检查（相等于===），检查$needle的类型是否和$haystack中的相同。<font color=red>如果找到$haystack，则返回TRUE,否则返回FALSE。</font>

### in_array缺陷
&emsp;&emsp;根据上面所描述的，当该函数没有设置第三个参数的时候，只会进行弱类型比较（相当于==），也就是不会检查数据类型，例如  
![in_array](/images/in_array()函数缺陷.png)  
&emsp;&emsp;根据上面白名单规定，只能上传1~24的文件名，因为没有第三个参数，进行弱比较，所以我们上传3shell.php的时候，只要第一个匹配就可以了，从而绕过了白名单，达到了任意文件上传的目的。类似的还有：  
```
<?php
$id = 3 and 1=1;
$whitelist = range(1,5);
if(!in_array($id,$whitelist))
     echo "error";
   else
     echo $flag;
?>
```
&emsp;&emsp;这里我们有没有设置第三个参数，进行弱类型比较，同样绕过了白名单，这里需要注意的是in_array的返回类型，匹配了返回什么，还有注意前面的！，在preg_match等匹配的时候有常出现，要知道它的作用。