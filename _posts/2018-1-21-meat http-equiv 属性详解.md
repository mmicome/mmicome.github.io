---
layout: post
title: "meat http-equiv 属性详解"
date: 2018-1-21
description: "meat http-equiv 属性详解"
tag: how-to-do
comments: true
---
### http-equiv

http-equiv顾名思义，相当于http的文件头作用，它可以向浏览器传回一些有用的信息，以帮助正确和精确地显示网页内容，与之对应的属性值为content，content中的内容其实就是各个参数的变量值。

meat标签的http-equiv属性语法格式是：`＜meta http-equiv="参数" content="参数变量值"＞` ；其中http-equiv属性主要有以下几种参数：


1. Expires(期限)

说明：可以用于设定网页的到期时间。一旦网页过期，必须到服务器上重新传输。

`＜meta http-equiv="expires" content="Wed, 20 Jun 2007 22:33:00 GMT"＞  `

注意：必须使用GMT的时间格式。

2. Pragma(cache模式)

说明：是用于设定禁止浏览器从本地机的缓存中调阅页面内容，设定后一旦离开网页就无法从Cache中再调出

`＜meta http-equiv="Pragma" content="no-cache"＞`  

注意：这样设定，访问者将无法脱机浏览。

3. Refresh(刷新)

说明：自动刷新并指向新页面。

`＜meta http-equiv="Refresh" content="2；URL=http://www.net.cn/"＞  `

注意：其中的2是指停留2秒钟后自动刷新到URL网址。

4、Set-Cookie(cookie设定)

说明：如果网页过期，那么存盘的cookie将被删除。

`＜meta http-equiv="Set-Cookie" content="cookievalue=xxx;expires=Wednesday, 20-Jun-2007 22:33:00 GMT； path=/"＞  `

注意：必须使用GMT的时间格式。

5. Window-target(显示窗口的设定)

说明：强制页面在当前窗口以独立页面显示。

`＜meta http-equiv="Window-target" content="_top"＞ `

注意：用来防止别人在框架里调用自己的页面。

6. content-Type(显示字符集的设定)

说明：设定页面使用的字符集。

`＜meta http-equiv="content-Type" content="text/html; charset=gb2312"＞ `


7. Pics-label(网页等级评定)

`<meta http-equiv="Pics-label" contect="">  `

说明：在IE的internet选项中有一项内容设置，可以防止浏览一些受限制的网站，而网站的限制级别就是通过meta属性来设置的。

8. Page_Enter、Page_Exit

设定进入页面时的特殊效果

`<meta http-equiv="Page-Enter"    contect="revealTrans(duration=1.0,transtion=    12)">  `  

设定离开页面时的特殊效果

`<meta http-equiv="Page-Exit"    contect="revealTrans(duration=1.0,transtion=    12)">   `


Duration的值为网页动态过渡的时间，单位为秒。Transition是过渡方式，它的值为0到23，分别对应24种过渡方式。如下表：

    0    盒状收缩    1    盒状放射  
    2    圆形收缩    3    圆形放射  
    4    由下往上    5    由上往下  
    6    从左至右    7    从右至左  
    8    垂直百叶窗    9    水平百叶窗  
    10    水平格状百叶窗    11垂直格状百叶窗  
    12    随意溶解    13从左右两端向中间展开  
    14从中间向左右两端展开    15从上下两端向中间展开  
    16从中间向上下两端展开    17    从右上角向左下角展开  
    18    从右下角向左上角展开    19    从左上角向右下角展开  
    20    从左下角向右上角展开    21    水平线状展开  
    22    垂直线状展开    23    随机产生一种过渡方式  

9. 清除缓存（再访问这个网站要重新下载！）

`<meta http-equiv="cache-control" content="no-cache"> `

缓存控制

    <meta http-equiv="Cache-control" content="public">
    <meta http-equiv="Cache-control" content="private">
    <meta http-equiv="Cache-control" content="no-cache">
    <meta http-equiv="Cache-control" content="no-store">
    <meta http-equiv="pragma" content="no-cache">

说明:

     public:可以被缓存在公众共享缓存
     private:只可以被缓存在私人缓存里面
     no-cache:不缓存
     no-store:缓存但不存档

10. 设定网页的到期时间

`<meta http-equiv="expires" content="0">  `


11. 关键字,给搜索引擎用的

`<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">  `


12. 页面描述

`<meta http-equiv="description" content="This is my page">  `
