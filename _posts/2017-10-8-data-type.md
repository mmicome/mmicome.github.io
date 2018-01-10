---
layout: post
title: "js data"
date: 2017-10-8
description: "js data"
tag: js
comments: true
---
### 强制转换

强制转换主要指使用Number、String和Boolean三个构造函数，手动将各种类型的值，转换成数字、字符串或者布尔值。

- Number()

下面分成两种情况讨论，一种是参数是原始类型的值，另一种是参数是对象。

（1）原始类型值的转换规则

原始类型的值主要是字符串、布尔值、undefined和null，它们都能被Number转成数值或NaN。

      ```js
      // 数值：转换后还是原来的值
      Number(324) // 324

      // 字符串：如果可以被解析为数值，则转换为相应的数值
      Number('324') // 324

      // 字符串：如果不可以被解析为数值，返回NaN
      Number('324abc') // NaN

      // 空字符串转为0
      Number('') // 0

      // 布尔值：true 转成1，false 转成0
      Number(true) // 1
      Number(false) // 0

      // undefined：转成 NaN
      Number(undefined) // NaN

      // null：转成0
      Number(null) // 0
      ```

Number函数将字符串转为数值，要比parseInt函数严格很多。基本上，只要有一个字符无法转成数值，整个字符串就会被转为NaN。

      ```js
      parseInt('42 cats') // 42
      Number('42 cats') // NaN
      ```

上面代码中，parseInt逐个解析字符，而Number函数整体转换字符串的类型。

另外，Number函数会自动过滤一个字符串前导和后缀的空格。

`Number('\t\v\r12.34\n') // 12.34`

- Boolean()

它的转换规则相对简单：除了以下六个值的转换结果为false，其他的值全部为true。

      ```js
      undefined
      null
      -0
      0 或 +0
      NaN
      ''（空字符串）
      ```

**注意，所有对象（包括空对象）的转换结果都是true，甚至连false对应的布尔对象new Boolean(false)也是true。**

      ```js
      Boolean({}) // true
      Boolean([]) // true
      Boolean(new Boolean(false)) // true
      ```

所有对象的布尔值都是true，这是因为JavaScript语言设计的时候，出于性能的考虑，如果对象需要计算才能得到布尔值，对于obj1 && obj2这样的场景，可能会需要较多的计算。为了保证性能，就统一规定，对象的布尔值为true。

### 自动转换为字符串

JavaScript 遇到预期为字符串的地方，就会将非字符串的数据自动转为字符串。具体规则是，先将复合类型的值转为原始类型的值，再将原始类型的值转为字符串。

字符串的自动转换，主要发生在字符串的加法运算时。当一个值为字符串，另一个值为非字符串，则后者转为字符串。

      ```js
      '5' + 1 // '51'
      '5' + true // "5true"
      '5' + false // "5false"
      '5' + {} // "5[object Object]"
      '5' + [] // "5"
      '5' + function (){} // "5function (){}"
      '5' + undefined // "5undefined"
      '5' + null // "5null"
      ```

这种自动转换很容易出错。

      ```js
      var obj = {
        width: '100'
      };

      obj.width + 20 // "10020"
      ```

上面代码中，开发者可能期望返回120，但是由于自动转换，实际上返回了一个字符10020。

自动转换为数值
当JavaScript遇到预期为数值的地方，就会将参数值自动转换为数值。系统内部会自动调用Number函数。

除了加法运算符有可能把运算子转为字符串，其他运算符都会把运算子自动转成数值。注意：null 转为数值时为0，而 undefined 转为数值时为 NaN。

      ```js
      '5' - '2' // 3
      '5' * '2' // 10
      true - 1  // 0
      false - 1 // -1
      '1' - 1   // 0
      '5' * []    // 0
      false / '5' // 0
      'abc' - 1   // NaN
      null + 1 // 1
      undefined + 1 // NaN
      ```

上面代码中，运算符两侧的运算子，都被转成了数值。

一元运算符也会把运算子转成数值。

      ```js
      +'abc' // NaN
      -'abc' // NaN
      +true // 1
      -false // 0
      // 3. 对非数值类型的数据使用一元运算符（即“+”和“-”）
      + {foo: 'bar'} // NaN
      - [1, 2, 3] // NaN
      ```

##### JavaScript有三种方法，可以确定一个值到底是什么类型。

- typeof运算符
- instanceof运算符
- Object.prototype.toString方法

      ```js
      var o = {};
      var a = [];

      o instanceof Array // false
      a instanceof Array // true
      ```

null的特殊之处在于，JavaScript把它包含在对象类型（object）之中。

`typeof null // "object"`
