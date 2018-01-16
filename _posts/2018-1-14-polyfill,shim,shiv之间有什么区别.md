---
layout: post
title: "polyfill,shim,shiv之间有什么区别"
date: 2018-1-14
description: "polyfill,shim,shiv之间有什么区别 "
tag: js-shiv
comments: true
---

[「引用地址」](http://www.haomou.net/2016/10/22/2016_polyfill_shim/)~haomou~

polyfill,shim,shiv,sham之间有什么区别？
chalecao 发布于 2016-10-22分类：Javascript|Nodejs阅读(1250)评论(0)
什么是polyfill和shim
搜索了一下：在JavaScript的世界里,有两个词经常被提到,shim和polyfill.它们指的都是什么,又有什么区别?一个shim是一个库,它将一个新的API引入到一个旧的环境中,而且仅靠旧环境中已有的手段实现；一个polyfill就是一个用在浏览器API上的shim.我们通常的做法是先检查当前浏览器是否支持某个API,如果不支持的话就加载对应的polyfill.然后新旧浏览器就都可以使用这个API了。

polyfill,shim,shiv之间有什么区别？

理解
一个shim就是一个库，它将一个新的API引入到一个旧的环境中，而且仅靠旧环境中已有的手段实现。
比如ES5-shim, github地址：http://github.com/es-shims/es5-shim/

这几天看了一下shiv，它的作用是使得不支持HTML5标签的浏览器诸如ie6-8, 支持html5标签。这也是我在看html语义化规范的时候看到的，觉得很有必要做一下。目前使用IE8的用户还是占据一部分比例的，所以为了兼容ie8，同时能使用像header、section、nav、footer这些语义化标签，我们可以采用shiv库来实现。
著名的HTML5兼容库html5shiv，Github地址：https://github.com/aFarkas/html5shiv

关于polyfill，据说来自于Polyfilla，Polyfilla是一个英国产品，在美国称之为Spackling Paste(译者注：刮墙的，在中国称为腻子)，把旧的浏览器想象成为一面有了裂缝的墙，这些polyfill会帮助我们把这面墙的裂缝抹平。

其实一个polyfill的意思就是，比如开发者想要一个格式化时间的函数，然后现有的api都没有，于是作者自创一个stringDate的方法，那么这个方法就成为一个polyfill。

问题
注意在实现polyfill的时候，最好不要在一些原生对象的原型上添加方法，比如：

	if (!Array.prototype.find) {
	Array.prototype.find = function (predicate) {
	if (this === null)
	throw new TypeError(‘Array.prototype.find called on null or undefined’);
	if (typeof predicate !== ‘function’)
	throw new TypeError(‘predicate must be a function’);
	var list = Object(this);
	var length = list.length >>> 0;
	var thisArg = arguments[1];
	var value;
	for (var i = 0; i < length; i++) {
	value = list[i];
	if (predicate.call(thisArg, value, i, list))
	return value;
	}
	}
	}

在IE下面有个bug，就是在使用 for in 这种循环的时候，ie下会遍历输出原型链上的方法，比如：

	var a = [1,2];
	for(var i in a){
	console.log(i);
	}
	//output
	1
	2
	find

这就会导致bug。
查了一下can1use:


	As the specification includes many JavaScript features, un-numbered partial support varies widely and is shown in detail on the ECMAScript 5 compatibilty tables by Kangax.
	Does not support parseInt() ignoring leading zeros.
	Does not support Strict mode
	IE8 has virtually no ES5 support, but does support Object.defineProperty, Object.getOwnPropertyDescriptor, JSON parsing & Property access on strings

也就是说，在IE8下面支持Object.defineProperty这个方法，这个方法是直接给一个对象添加一个属性, 关键是可以控制是否能在for…in循环中遍历出来或在Object.keys中列举出来。如下：

Object.defineProperty(obj, prop, descriptor)将属性添加到对象，或修改现有属性的特性。
参数：
obj:目标对象
prop:需要定义的属性或方法的名字。
descriptor:目标属性所拥有的特性。
可供定义的特性列表：
value:属性的值
writable:如果为false，属性的值就不能被重写。
get: 一旦目标属性被访问就会调回此方法，并将此方法的运算结果返回用户。
set:一旦目标属性被赋值，就会调回此方法。
configurable:如果为false，则任何尝试删除目标属性或修改属性以下特性（writable, configurable, enumerable）的行为将被无效化。
enumerable:是否能在for…in循环中遍历出来或在Object.keys中列举出来。

	try{
	var a = {};
	Object.defineProperty(a,”bloger”,{get:function(){return “司徒正美”,value:”这是不可改变的默认值” ,writable: false}});
	alert(a.bloger)
	}catch(e){
	alert(“你的游览器不支持Object.defineProperty “)
	}

所以我们可以通过这个方式修改Array.prototype，简单的实现方式：

	Object.defineProperty(Array.prototype,”findT”,{value:function(){return 1;}});
	参考es5-shim中有一个自定义的defineProperties方法，

	var defineProperties = (function (has) {
	// Define configurable, writable, and non-enumerable props
	// if they don’t exist.
	var defineProperty;
	if (supportsDescriptors) {
	defineProperty = function (object, name, method, forceAssign) {
	if (!forceAssign && (name in object)) { return; }
	$Object.defineProperty(object, name, {
	configurable: true,
	enumerable: false,
	writable: true,
	value: method
	});
	};
	} else {
	defineProperty = function (object, name, method, forceAssign) {
	if (!forceAssign && (name in object)) { return; }
	object[name] = method;
	};
	}
	return function defineProperties(object, map, forceAssign) {
	for (var name in map) {
	if (has.call(map, name)) {
	defineProperty(object, name, map[name], forceAssign);
	}
	}
	};
	}(ObjectPrototype.hasOwnProperty));
	其实Object也是有defineProperties函数的，只是ie8不支持。

Object.defineProperties 函数 (JavaScript)
将一个或多个属性添加到对象，并/或修改现有属性的特性。

	Object.defineProperties(obj, {
	newDataProperty: {
	value: 101,
	writable: true,
	enumerable: true,
	configurable: true
	},
	newAccessorProperty: {
	set: function (x) {
	document.write(“in property set accessor” + newLine);
	this.newaccpropvalue = x;
	},
	get: function () {
	document.write(“in property get accessor” + newLine);
	return this.newaccpropvalue;
	},
	enumerable: true,
	configurable: true
	}});

> es5-shim.js and es5-shim.min.js monkey-patch a JavaScript context to contain all EcmaScript 5 methods that can be faithfully emulated with a legacy JavaScript engine.

shim 完美模拟了所有 ES5 中可以被完美模拟的方法。有点绕，就是说 ES5 中有些方法，是可以在旧 JS 引擎中完美模拟了，那么 shim 就完美模拟了它们。 

> es5-sham.js and es5-sham.min.js monkey-patch other ES5 methods as closely as possible. For these methods, as closely as possible to ES5 is not very close. Many of these shams are intended only to allow code to be written to ES5 without causing run-time errors in older engines. In many cases, this means that these shams cause many ES5 methods to silently fail. Decide carefully whether this is what you want. Note: es5-sham.js requires es5-shim.js to be able to work properly. 

这一段别看这么多，核心意思就是 ES5 中其他无法被完美模拟的方法，就由 sham 承包了。 

sham只承诺你用的时候代码不会崩溃，至于对应的方法是不是起作用它就不保证了，它只是尽力模拟(as close as possible) 

所以如果你要用的方法在 shim中都包含了，那么就不需要sham。sham能不引用就不引用。但是如果你要用的方法只包含在sham中，那你要明白sham只是保证不崩溃，并不能保证对应方法的功能正确。 另外 sham 依赖 shim