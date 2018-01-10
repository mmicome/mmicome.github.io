---
layout: post
title: "js 优化"
date: 2017-10-9
description: "js 优化"
tag: js
comments: true
---
# /*页面优化*/

### 页面优化

- #### 动态加载js脚本
	大量加载脚会加大页面负载，考虑网络带宽，交错加载脚本提高页面性能

			```js
			<!DOCTYPE html>
			<html>
			<head>
				<script>
					function loadScript(src) {
						var headObj = document.getElementsByTagName("head")[0];
						var newScriptObj = document.createElement("script");
						newScriptObj.type = 'text/javascript';
						newScriptObj.src = src;
						headObj.appendChild(newScriptObj);
				}
				</script>
			</head>
			<body>
				<h1>脚本的动态加载</h1>
				<button onclick="loadScript('/javascripts/test.js');">chick me</button>
			</body>
			</html>
			```

- #### 使用外部js脚本文件
  - 代码安全：
	- 代码维护：
	- 代码缓存：
	- 代码重用：

- iframe
  注意：为了提高速度，src在主内容完成加载后，设置iframe的JavaScript属性是个好主意。这使您的页面可以更快地使用，并减少您的官方页面加载时间（重要的SEO指标）。
	- Fallback content （备用内容）
		与<video>等其他类似元素相同，您可以在打开和关闭<iframe></iframe>标签之间包含回退内容，如果浏览器不支持，将会显示<iframe>。在这种情况下，我们已经添加了一个链接到页面。您几乎不可能遇到任何不支持<iframe>的浏览器。
	_安全：_ sandbox
	- 其中重要的一点是，你应该永远不会同时添加allow-scripts和allow-same-origin，你的sandbox属性-在这种情况下，嵌入的内容可以绕过，从执行脚本停止网站同源安全策略，并使用JavaScript来关闭完全沙箱。
	- 单击劫持是一种常见的iframe攻击，黑客将隐藏的iframe嵌入到您的文档中（或将您的文档嵌入自己的恶意网站），并使用它来捕获用户的交互。这是误导用户或窃取敏感数据的常见方式。
  - 使用 HTTPS
		- HTTPS减少了远程内容在传输过程中被篡改的机会，
		- HTTPS防止嵌入式内容访问您的父文档中的内容，反之亦然。


### 内存优化
- #### 避免意外的闭包
不据实际意义的闭包，冗余的闭包会占用额外内存
attention: 当一个函数在源上下文之外可访问时，就构成了闭包;

			```js
			function setClick(obj) {
				obj.onclick = function() {
					alert("");
				}
				return null;
			}
			var myDiv = document.getElementById('mydiv');
			setClick(myDiv);
			//myDiv 具有了setClick 函数内部闭包的永久引用;
			```
解决方案：独立函数

			```js
			function setClick(obj) {
				obj.onclick = doSetClick;
			}
			function doSetClick() {
				alert("");
			}
			...
			```

### 代码优化
- #### 事件驱动方式加载脚本

避免使用侵扰式时间绑定 **分离结构，表现，控制**
侵扰式使用内联js直接嵌入html标记代码中。如 在head标签内使用window.onload(){}而不是body onclick=function();

- #### 采用闭包进行开发

			```js
			function putTextInLater(objct, text, timeout) {
				setTimeout("document.getElementsById('" + objct + "').innerHTML = '" + text + "'", timeout);
			}
			putTextInLater('mydiv', 'hello', 500);
			```

代码执行速率较为缓慢，js解释器在执行字符串内的代码时，必须分配可观的内存,其次，代码较为混乱，不利于维护。
//采用闭包形式

			```js
			function putTextLater(objct, text, timeout) {
				setTimeout(function() {
					document.getElementsById(objct).innerHTML = text;
				}, timeout);
			}
			...
			```

#### 简写形式

赋值操作符和操作符结合简写有利于提高代码的性能，尤其是字符串操作极为显著，（尤其是对IE）
减少js解释器所需识别的变量数。

			```js
			mytring += "hello";
			s *= a[i];
			...
			```

- #### 条件操作符

在大多数情况下，用（？ ：）代替if else语句在性能上有所提升，原因在于用条件操作符，js解释器
只需要计算一个表达式

- #### js接口技术解决文件冲突

	多个外部文件可能出现重名对象，函数，方法，变量等，当在一起运行时会出现覆盖现象
	实例：

			```js
			//average_floor.js 文件
			function average(a, b) {
				return Math.floor((a+b) / 2);
			}
			```
			```js
			//average_round.js文件
			function average(a, b) {
				return Math.round((a+b) / 2);
			}
			```

	**当在同一页面载入时发生覆盖**
	_解决方案_： 接口技术是对函数进行封装，然后定义一个对外的接口，数据结构如下：

			```js
			(function(){
				//接口对象；
				//被封装的函数；
			})()
			```
			```js
			//封装average_floor.js文件中的average函数；
				(function(){
					average_floor={
						average: average
					};
					function average(a, b){
						return Math.floor(a+b) / 2;
					}
				})()
			//average_round.js文件同理；
			```
