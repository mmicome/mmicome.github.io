---
layout: post
title: js function
date: 2017-10-9
description: js function
tag: js
comments: true
---

# js函数总结

**js解释执行时，函数都被维护成一个对象**

			```javascript
			function f() {};
			var f = new Function();
			```

第一行函数申明方式在解释器内部，在遇到这种语法时，会自动创建一个Function对象，将函数作为一个内部对象来存储

## 构造函数

构造函数是函数结构的模型，js本身定义了很多构造函数：Function（）， Array()， Date()，String()等，去掉括号，实际是js的内置对象，这些内置对象的构造器由js本身定义，通过new 返回一个实例对象

使用字符串传递参数，来创建函数，代码可读性差，之所以引入这样的语法是因为函数对象添加属性和方法，都需要借助Function这个类型，函数的本质 是内部对象，由js解释器决定其运行方式

			```javascript
			var f = new Function("a", "b", "c", "return a+b+c")
			```

- 构造函数一般没有返回值，只是初始化由this指向的对象。构造函数可以返回一个对象，返回的对象将成为new运算符的运算值，此时this所引用的对象将被覆盖

			  ```javascript
			  function F() {
			    this.x = 1;
			    return {y:2};
			  }
			  var f = new F();
			  alert(f.x);//没有找到
			  alert(f.y);//2
			  ```

- 返回原始值，不会覆盖

			  ```javascript
			  function F() {
			    this.x = 1;
			    return true;
			  }
			  var f = new F();
			  alert(f.x);//1
			  alert(F());//true
			  ```

- 构造函数返回值为对象，可以直接调用来引用返回值而不需要new

		  ```javascript
		  var f = F();
		  ...
		  ```

  #### Function 与function;

- 使用Function（）构造函数可以动态创建和编译一个函数，而不会将开发人员限制在function语句预编译的函数结构中，但每次调用函数时，Function构造函数都需要对其进行编译，在循环结构中或经常调用函数时会影响执行效率
- 使用Function（）构造函数而不是function语句定义函数，就能吧函数当作表达式来使用，而非结构固定的语句，使用更加灵活

函数直接量指结构固定的函数体

			```javascript
			function(a,b) {
			    return a + b;,
			}
			```

嵌套函数与函数闭包不同

			```javascript
			//嵌套函数
			//嵌套函数只能在函数体内部使用，外部无权使用，内层函数可以参与外层函数运算外，没有其他意义，js 不建议使用次方法
			function f() {
			    function e() {

			    }
			}
			```

js对于function语句定义函数不允许出现在循环结构和分支结构，但匿名函数可以作为数据参与函数内部表达式运算

- 作用域比较

  - Function构造函数定义的函数作用域需要运行时动态确定，所以Function（）构造函数创建的函数具有顶级作用域，js解释器总是将其作为顶级函数编译
  - function语句定义的函数和函数直接量具有自己的作用域

	    ```javascript
	    var n = 1;
	    function f() {
	    var n = 2;
	    var e = new Function("return n;");
	    return e;    //函数结构体
	    }
	    alert(f()());//1
	    ```

- 解析机制比较
  _js解释器在解析代码时并非一句一句分析执行，而是以块（<script>）来执行，_
  - function 语句和函数直接量总会被提取出来优先执行，据静态特性
  - Function 是运行时动态执行，每次调用重新编译，具有动态特性
- 灵活性
  - Function构造函数和函数直接量定义函数不需要额外空间，直接在表达式中参与运算，运行完毕直接释放避免function定义的函数占用内存的弊端
  - Function 定义的函数主体必须为字符串，不够便捷；

### 函数的生命周期

			```js
			function f() {
			  return 1;
			}
			alert(f());//4
			var f = new Function("return 2");
			alert(f());//2
			var f = function() {
			  return 3;
			}
			alert(f());//3
			function f() {
			  return 4;
			}
			alert(f());//3
			var f = new function("return 5");
			alert(f());//5
			var f = function() {
			  return 6;
			}
			alert(f());//6
			```

- function 语句申明的函数被预先编译，相同的函数名按顺序替换，
- 函数直接量，及构造函数定义的函数都属于表达式函数，在代码按行执行时，才被激活
- 函数内部变量如参数，var申明的变量，return后，释放所有资源,对于function语句申明的函数结构，依然保持在预编译时所占据的内存空间，对于匿名函数，则完全释放，对于函数直接量，由于是静态函数，即在系统中保存一份备份，以备下次调用
- 函数运行域并不一定完全注销，**函数本身就是一种数据，当被调用时会生成一个临时的调用对象若函数在注销之前还被外部引用，此时函数的结构体保持不变**

			```js
			var a = [];
			for(var i = 0; i < 10; i++) {
			  (function(j) {
			    a[j] = j * j;
			  })(i);  //函数以闭包的形式存储循环变量，调用后不会注销；
			}
			```

#### 函数的作用域

### 动态调用函数

- _call(),apply()方法本质上是将特定函数当作一个方法临时绑定到指定对象上进行调用，调用结束自动注销_
- _使用call()和apply()方法的目的不是为对象绑定方法，而是运行函数的一种技巧，，绑定对象的方法仅是一座桥梁，最终目的是运行函数_
- _动态调用函数用完即删，避免资源占用，灵活调用_

			```js
			function f(x, y) {
			  return x + y;
			}
			function o(a, b) {
			  return a * b;
			}

			alert(f.call(o,3,4));
			//等价转换
			o.m = f;
			alert(o.m(3, 4));
			delete o.m;
			```
实例

			```js
			function max() {
			  var m = Number.NEGATIVE_INFINITY;
			  for(var i = 0; i < arguments.length; i++) {
			    if(arguments[i] > m)
			      m = arguments[i];
			  }
			  return m;
			}
			var a = [32,34,32,45,66,67];
			var m = max.apply(Object, a);//把max绑定为Object对象方法，并动态调用
			alert(m);
			```
			
- **更改指针——call(),apply()高级用法**
