---
layout: post
title: "javascript中的循环引用对象处理"
date: 2018-1-20
description: "javascript中的循环引用对象处理"
tag: js
comments: true
---

先说明一下什么是循环引用对象：

    var a={"name":"zzz"};
    var b={"name":"vvv"};
    a.child=b;
    b.parent=a;


这里的a和b都是一个循环引用对象。

循环引用对象本来没有什么问题，序列化的时候才会发生问题，比如调用JSON.stringify()对该类对象进行序列化，就会报错: Converting circular structure to JSON.    而序列化需求很常见，比如发起一个ajax请求提交一个对象就需要对对象进行序列化。

针对这种问题的一种解决方案是去除这种循环引用，Douglas Crockford写了一个JSON的扩展包，里面的cycle.js刚好就是用来解决此类问题。

`var c = JSON.decycle(a)`

这样就去除了a对象的循环引用，如果想恢复原本的循环引用对象a，可以调用retrocycle方法

`var a = JSON.retrocycle(c)`

[代码可以到github上下载：](https://github.com/douglascrockford/JSON-js)

