---
layout: post
title: "js unicode"
date: 2017-10-9
description: "js unicode"
tag: js
comments: true
---
##js Character Set

ECSA标准规定js语言基于unicode标准进行开发，即js语言内核完全采用UCS字符集进行编写，js程序中每个字符都使用两个字节来表示,(可以使用中文来命名变量，但不推荐)

- ECSA v3 标准允许unicode字符出现在js程序的任何地方;
- v1和v2 版本中，ECSA标准只允许unicode字符出现在注释或引号包含的字符串直接量中，其他地方必须使用ASCII字符集
- 在标准化之前，js通常不支持unicode编码，考虑到兼容性问题，不建议使用汉字命名变量和函数
- js中所有数值都属于浮点型
- js中整数一般都是32位数值，浮点数一般都是64位，而且浮点数是以字符串形式进行存储的；
- 整数可以用8进制和16进制表示，但ECMAscript标准不支持八进制数值直接量，可能会误解析为十进制；
