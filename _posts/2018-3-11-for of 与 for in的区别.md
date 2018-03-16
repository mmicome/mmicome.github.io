---
layout: post
title: "for of 与 for in的区别"
date: 2018-3-11
description: "for of 与 for in的区别"
tag: js
comments: true
---

### for of 与 for in的区别

**遍历数组通常使用for循环，ES5的话也可以使用forEach，ES5具有遍历数组功能的还有map、filter、some、every、reduce、reduceRight等，只不过他们的返回结果不一样。但是使用foreach遍历数组的话，使用break不能中断循环，使用return也不能返回到外层函数。**

`使用for in 也可以遍历数组，但是会存在以下问题：`

    ```js
    Array.prototype.method=function(){
    　　console.log(this.length);
    }
    var myArray=[1,2,4,5,6,7]
    myArray.name="数组"
    for (var index in myArray) {
    console.log(myArray[index]);
    }
    ```

- index 索引为字符串型数字，不能直接进行几何运算
- 遍历顺序有可能不是按照实际数组的内部顺序
- 使用for in会遍历数组所有的可枚举属性，包括原型。例如上栗的原型方法method和name属性

> 所以for in更适合遍历对象，不要使用for in遍历数组

`ES6中的for of更胜一筹.`

    ```js
    Array.prototype.method=function(){
    　　console.log(this.length);
    }
    var myArray=[1,2,4,5,6,7]
    myArray.name="数组";
    for (var value of myArray) {
    console.log(value);
    }
    ```

- for in遍历的是数组的索引（即键名），而for of遍历的是数组元素值。

- for of遍历的只是数组内的元素，而不包括数组的原型属性method和索引name

`遍历对象 通常用for in来遍历对象的键名`

```js
Object.prototype.method=function(){
　　console.log(this);
}
var myObject={
　　a:1,
　　b:2,
　　c:3
}
for (var key in myObject) {
  console.log(key);
}
```

for in 可以遍历到myObject的原型方法method,如果不想遍历原型方法和属性的话，可以在循环内部判断一下,hasOwnPropery方法可以判断某属性是否是该对象的实例属性

    ```js
    for (var key in myObject) {
        if(myObject.hasOwnProperty(key) {
            console.log(key);
        }
    }
    ```

同样可以通过ES5的`Object.keys(myObject)`获取对象的实例属性组成的数组，不包括原型方法和属性。

```js
Object.prototype.method=function(){
　　console.log(this);
}
var myObject={
　　a:1,
　　b:2,
　　c:3
}
Object.key(myObject).forEach(function(key, index) {
    console.log(key,myObject[key])
})
```

**example**

迭代数组

```js
let iterable = [10,20,30];

for (let value of iterable) {
    value += 1;
    console.log(value);
}
//11
//21
//31
```

迭代string

```js
let iterable = "foo";

for (let value of iterable) {
    console.log(value);
}
```

迭代TypeArray

```js
let iterable = new Uint8Array([0x00, 0xff]);
for (let value of iterable) {
    console.log(value);
}
//0
//255
```

迭代map

```js
let iterable = new Map([["a", 1], ["b", 2], ["c", 3]]);

for(let entry of iterable) {
    console.log(entry);
}

//["a",1]
//["b",2]
//["c",3]

for (let [key,value] of iterable) {
    console.log(value);
}
//1
//2
//3
```

迭代 Set

```js
let iterable = new Set([1,1,2,2,3,3])

for (let value of iterable) {
    console.log(value);
}
//1
//2
//3
```

迭代 arguments 对象

    ```js
    (function() {
    for (let argument of arguments) {
        console.log(argument);
    }
    })(1, 2, 3);

    // 1
    // 2
    // 3
    ```

迭代 DOM 集合

```js
//注意：这只能在实现了NodeList.prototype[Symbol.iterator]的平台上运行
let articleParagraphs = document.querySelectorAll("arrticle > p");
for (let paragraphs of articleParagraphs) {
    paragraphs.classList.add("read");
}