---
layout: post
title: "js break continue"
date: 2017-10-02
comments: true
description: "js break-continue"
tag:  js
---

### break语句和continue语句

- break语句用于跳出代码块或循环。

      ```js
      var i = 0;

      while(i < 100) {
        console.log('i当前为：' + i);
        i++;
        if (i === 10) break;
      }
      //一旦i等于10，就会跳出循环。
      ```

- continue语句用于立即终止本轮循环，返回循环结构的头部，开始下一轮循环。

      ```js
      var i = 0;

      while (i < 100){
        i++;
        if (i%2 === 0) continue;
        console.log('i当前为：' + i);
      }
      //只有在i为奇数时，才会输出i的值。如果i为偶数，则直接进入下一轮循环。
      ```

***如果存在多重循环，不带参数的break语句和continue语句都只针对最内层循环。***

### 标签（label）

JavaScript语言允许，语句的前面有标签（label），相当于定位符，用于跳转到程序的任意位置，标签的格式如下。

- 标签通常与break语句和continue语句配合使用，跳出特定的循环。

      ```js
      top:
        for (var i = 0; i < 3; i++){
          for (var j = 0; j < 3; j++){
            if (i === 1 && j === 1) break top;
            console.log('i=' + i + ', j=' + j);
          }
        }
      // i=0, j=0
      // i=0, j=1
      // i=0, j=2
      // i=1, j=0
      ```

上面代码为一个双重循环区块，break命令后面加上了top标签（注意，top不用加引号），满足条件时，直接跳出双层循环。如果break语句后面不使用标签，则只能跳出内层循环，进入下一次的外层循环。

- continue语句也可以与标签配合使用。

      ```js
      top:
        for (var i = 0; i < 3; i++){
          for (var j = 0; j < 3; j++){
            if (i === 1 && j === 1) continue top;
            console.log('i=' + i + ', j=' + j);
          }
        }
      // i=0, j=0
      // i=0, j=1
      // i=0, j=2
      // i=1, j=0
      // i=2, j=0
      // i=2, j=1
      // i=2, j=2
      ```

上面代码中，continue命令后面有一个标签名，满足条件时，会跳过当前循环，直接进入下一轮外层循环。如果continue语句后面不使用标签，则只能进入下一轮的内层循环。
