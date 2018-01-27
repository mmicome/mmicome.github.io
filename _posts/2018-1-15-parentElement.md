---
layout: post
title: "parentElement和parentNode的区别"
date: 2018-1-15
description: "parentElement和parentNode的区别"
tag: js-DOM
comments: true
---

### parentElement和parentNode的区别

parentElement匹配的是parent为element的情况，而parentNode匹配的则是parent为node的情况。element是包含在node里的，它的nodeType是一，以上是我的猜测，下面是我做的测试。

	document.body.parentNode; // 返回html元素

	document.body.parentElement; // 返回html元素



	document.documentElement.parentNode; // 返回文档节点

	document.documentElement.parentElement; // 返回 null (html元素没有上级元素节点)

理论上，应该返回"document"节点（node）,但是它不是element对象，因此前面的代码返回object,而后面的代码返回null。

> parentElement属性的语法、参数、返回值

语法	 | node.parentElement
返回值 | 作为元素对象的，指定元素的上级元素节点，如果没有上级元素返回null。
DOM 版本 | 4 Element Object