---
layout: post
title: "js code"
date: 2017-9-19
description: "js varible"
tag: js
comments: true
---

### 变量

    ```js
    var a = 1;
    // 基本等同
    a = 1;
    ```

- 不写var的做法，不利于表达意图，而且容易不知不觉地创建全局变量，按使用场景选择

- 严格地说，var a = 1 与 a = 1，这两条语句的效果不完全一样，主要体现在delete命令无法删除前者。（不使用var 的情况下 变量被创建为 window 的属性，delete 用于删除对象的属性）

**变量提升**

JavaScript引擎的工作方式是，先解析代码，获取所有被声明的变量，然后再一行一行地运行。这造成的结果，就是所有的变量的声明语句，都会被提升到代码的头部，这就叫做变量提升（hoisting）。

    ```js
    console.log(a);
    var a = 1;
    ```

上面代码首先使用console.log方法，在控制台（console）显示变量a的值。这时变量a还没有声明和赋值，所以这是一种错误的做法，但是实际上不会报错。因为存在变量提升，真正运行的是下面的代码。

    ```js
    var a;
    console.log(a);
    a = 1;
    ```

最后的结果是显示undefined，表示变量a已声明，但还未赋值。

**attention:** 变量提升只对var命令声明的变量有效，如果一个变量不是用var命令声明的，就不会发生变量提升。

    ```js
    console.log(b);
    b = 1;
    ```
    
上面的语句将会报错，提示“ReferenceError: b is not defined”，即变量b未声明，这是因为b不是用var命令声明的，JavaScript引擎不会将其提升，而只是视为对顶层对象的b属性的赋值。
