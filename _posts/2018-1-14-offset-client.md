---
layout: post
title: "offsetLeft,Left,clientLeft的区别"
date: 2018-1-14
description: "offsetLeft,Left,clientLeft的区别 "
tag: js-DOM
comments: true
---

[「引用地址」](https://www.cnblogs.com/panjun-Donet/articles/1294033.html)~小顾问~

### offsetLeft,Left,clientLeft的区别

![](https://images.cnblogs.com/cnblogs_com/panjun-donet/dhtmopos.gif)
假设 obj 为某个 HTML 控件。

obj.offsetTop 指 obj 相对于版面或由 offsetParent 属性指定的父坐标的计算上侧位置，整型，单位像素。

obj.offsetLeft 指 obj 相对于版面或由 offsetParent 属性指定的父坐标的计算左侧位置，整型，单位像素。

obj.offsetWidth 指 obj 控件自身的绝对宽度，不包括因 overflow 而未显示的部分，也就是其实际占据的宽度，整型，单位像素。

obj.offsetHeight 指 obj 控件自身的绝对高度，不包括因 overflow 而未显示的部分，也就是其实际占据的高度，整型，单位像素。

我们对前面提到的 offsetParent 作个说明。

offsetParent 获取定义对象 offsetTop 和 offsetLeft 属性的容器对象的引用。offsetTop 与 offsetParent 很复杂，不同浏览器有不同解释，浮动一下解释又不同了，所以我们一般只要理解通过二者可以获得控件在浏览器中的绝对位置即可。

以上属性在 FireFox 中也有效。

另外：我们这里所说的是指 HTML 控件的属性值，并不是 document.body，document.body 的值在不同浏览器中有不同解释（实际上大多数环境是由于对 document.body 解释不同造成的，并不是由于对 offset 解释不同造成的）

 

 

我们知道 offsetTop 可以获得 HTML 元素距离上方或外层元素的位置，style.top 也是可以的，二者的区别是：

一、offsetTop 返回的是数字，而 style.top 返回的是字符串，除了数字外还带有单位：px。

二、offsetTop 只读，而 style.top 可读写。

三、如果没有给 HTML 元素指定过 top 样式，则 style.top 返回的是空字符串。

offsetLeft 与 style.left、offsetWidth 与 style.width、offsetHeight 与 style.height 也是同样道理。

 

 

clientHeight
大家对 clientHeight 都没有什么异议，都认为是内容可视区域的高度，也就是说页面浏览器中可以看到内容的这个区域的高度，一般是最后一个工具条以下到状态栏以上的这个区域，与页面内容无关。

offsetHeight
IE、Opera 认为 offsetHeight = clientHeight + 滚动条 + 边框。
NS、FF 认为 offsetHeight 是网页内容实际高度，可以小于 clientHeight。

scrollHeight
IE、Opera 认为 scrollHeight 是网页内容实际高度，可以小于 clientHeight。
NS、FF 认为 scrollHeight 是网页内容高度，不过最小值是 clientHeight。

简单地说
clientHeight 就是透过浏览器看内容的这个区域高度。
NS、FF 认为 offsetHeight 和 scrollHeight 都是网页内容高度，只不过当网页内容高度小于等于 clientHeight 时，scrollHeight 的值是 clientHeight，而 offsetHeight 可以小于 clientHeight。
IE、Opera 认为 offsetHeight 是可视区域 clientHeight 滚动条加边框。scrollHeight 则是网页内容实际高度。

同理
clientWidth、offsetWidth 和 scrollWidth 的解释与上面相同，只是把高度换成宽度即可。

说明
以上基于 DTD HTML 4.01 Transitional，如果是 DTD XHTML 1.0 Transitional 则意义又会不同，在 XHTML 中这三个值都是同一个值，都表示内容的实际高度。新版本的浏览器大多支持根据页面指定的 DOCTYPE 来启用不同的解释器

scrollTop 是“卷”起来的高度值，示例：

	```js
	<div style="width:100px;height:100px;background-color:#FF0000;overflow:hidden;" id="p">
	<div style="width:50px;height:300px;background-color:#0000FF;" id="t">如果为 p 设置了 scrollTop，这些内容可能不会完全显示。</div>
	</div>
	<script type="text/javascript">
	var p = document.getElementById("p");
	p.scrollTop = 10;
	</script>
	```

由于为外层元素 p 设置了 scrollTop，所以内层元素会向上卷，这卷起来的部分就是 scrollTop。

scrollLeft 也是类似道理。

我们已经知道 offsetHeight 是自身元素的宽度，而 scrollHeight 是内部元素的绝对宽度，包含内部元素的隐藏的部分。上述中 p 的 scrollHeight 为 300，而 p 的 offsetHeight 为 100。

scrollWidth 也是类似道理。

IE 和 FireFox 全面支持，而 Netscape 8 和 Opera 7.6 不支持 scrollTop、scrollLeft（document.body.scrollTop、document.body.scrollLeft 除外）。

 

1.clientHeight, clientWidth:
这两个属性大体上显示了元素内容的象素高度和宽度.理论上说这些测量不考虑任何通过样式表加入
元素中的页边距,边框等.

2.clientLeft,clientTop:
这两个返回的是元素周围边框的厚度,如果不指定一个边框或者不定位改元素,他的值就是0.

3.scrollLeft,scrollTop:
如果元素是可以滚动的,可以通过这俩个属性得到元素在水平和垂直方向上滚动了多远,单位是象素.
对于不可以滚动的元素,这些值总是0.

4.scrollHeight,scrollWidth:
不管有多少对象在页面上可见,他们得到的是整体.

5.style.left:
定位元素与包含它的矩形左边界的偏移量

6.style.pixelLeft:
返回定位元素左边界偏移量的整数像素值.因为属性的非像素值返回的是包含单位的字符串,例如,30px. 利用这个属性可以单独处理以像素为单位的数值.

7.style:posLetf:
返回定位元素左边界偏移量的数量值,不管相应的样式表元素指定什么单位.因为属性的非位置值返回的是包含单位的字符串,例如,1.2em  
   
top,pixelTop,posTOp这几个类比就行了.
LEFT:   为从左向右移的位置,即挂件距离屏幕左边缘的距离;
clientLeft   返回对象的offsetLeft属性值和到当前窗口左边的真实值之间的距离
offsetLeft   返回对象相对于父级对象的布局或坐标的left值，就是以父级对象左上角为坐标原点，向右和向下为X、Y轴正方向的x坐标
pixelLeft   设置或返回对象相对于窗口左边的位置
scrollWidth 是对象的实际内容的宽，不包边线宽度，会随对象中内容的多少改变（内容多了可能会改变对象的实际宽度）。
clientWidth 是对象可见的宽度，不包滚动条等边线，会随窗口的显示大小改变。
 offsetWidth 是对象的可见宽度，包滚动条等边线，会随窗口的显示大小改变。
IE6.0、FF1.06+：

	clientWidth = width + padding
	clientHeight = height + padding
	offsetWidth = width + padding + border
	offsetHeight = height + padding + border

IE5.0/5.5：

	clientWidth = width - border
	clientHeight = height - border
	offsetWidth = width
	offsetHeight = height

(需要提一下：CSS中的margin属性，与clientWidth、offsetWidth、clientHeight、offsetHeight均无关)

offsetwidth:是元素相对父元素的偏移宽度。等于border+padding+width
clientwidth：是元素的可见宽度。等于padding+width
scrollwidth:是元素的宽度且包括滚动部分。
offsetLeft:Html元素相对于自己的offsetParent元素的位置
scrollLeft:返回和设置当前横向滚动务的坐标值

	<input type="button" value="点一下" onclick="move()">
	<div id="d" style="background-color:#ff9966; position:absolute; left:170px; top:100px;width:300;height:300;overflow:scroll"
	onclick="alert('offsetLeft:'+this.offsetLeft)">
	<div style="height:600;width:600" onclick="alert('offsetLeft:'+this.offsetLeft)"></div>
	</div>
	<script language="javascript">
	function move()
	{
	var d=document.getElementById("d")
	a=eval(20)
	d.scrollLeft+=a
	}
	</script>

保存为网页，运行一下，点按钮，滚动条移动
点击div，先弹出b相对于a的位置，再弹出a相对于窗口的位置