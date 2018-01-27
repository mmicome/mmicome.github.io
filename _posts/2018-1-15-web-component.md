---
layout: post
title: "template"
date: 2018-1-15
description: "template"
tag: web-component
comments: true
---
## 自定义事件

[「引用地址」](http://www.cnblogs.com/xueming/archive/2012/07/30/2615077.html)~ 学明 | template base~

技术文章写得少，所以有时候想写点什么却下不了手，不知道该写什么；往往到了准备要写的时候才发现自己想写的东西其实很无聊，甚至觉得很幼稚，于是又关掉了编缉器，呵呵。

今天周五，很闲，坐在电脑前没什么事可做，产品线的人也没提什么新的需求，可能下周会有新的需求和工作安排，但那是下周的事了。今天就想写点技术的东西，也就当作是记记笔记，本人水平有限，希望大家多多指教，嘴下留情，哈哈。

有时候我们会想扩展DOM元素的功能，可以添加一些自定义的方法，以让它用起来更加灵活、方便；先来举个例子：

	<!DOCTYPE html> 
	<html lang="zh"> 
	 <head> 
	  <title>DOM功能扩展</title> 
	 </head> 
	 <body> 
	    <a href="javascript:void(0)" id="tagA">你好</a> 
	    <script type="text/javascript"> 
	    <!--  
	        var tagA=document.getElementById("tagA");  
	        tagA.onclick=function(){  
	            alert(this.innerHTML);  
	        }  
	    //--> 
	    </script> 
	 </body> 
	</html> 

毫无疑问，从以上代码可以看出，当点击A标签的时候会弹出“你好”，tagA是一个DOM元素，除了有onclick事件以外，还有onmouseover,onmouseout,onmousemove等等，而这些事件都是DOM元素本身就具有的；但现在我们希望对它进行扩展，例如可以让它支持tagA.bind，我可以用tagA.bind("click",function(){}),来代替tagA.onclick=function(){}。OK，现在的目的很明确，先看下面的代码：

	<!DOCTYPE html> 
	<html lang="zh"> 
	 <head> 
	  <title>DOM功能扩展</title> 
	 </head> 
	 <body> 
	    <a href="javascript:void(0)" id="tagA">你好</a> 
	    <script type="text/javascript"> 
	    <!--  
	        var tagA=document.getElementById("tagA");  
	        tagA.bind("click",function(){  
	            alert(this.innerHTML);  
	        })  
	    //--> 
	    </script> 
	 </body> 
	</html> 

以上这段代码就是功能扩展后的最终效果，它与上一段代码实现的功能是一样的，但现在它还不能执行，要进行扩展后才可以，在此之前先来看一些基础知识，这很重要，因为等下会用到：

1、HTMLElement，在DOM标准中，每个元素都继承自HTMLElement，而HTMLElement又继承自Element，Element又继承自Node；于是我们可以使用HTMLElement的Prototype来扩展HTML元素的方法和属性，如何实现？我们来看一段代码：

	<!DOCTYPE html> 
	<html lang="zh"> 
	 <head> 
	  <title>DOM功能扩展</title> 
	 </head> 
	 <body> 
	    <a href="javascript:void(0)" id="tagA">你好</a> 
	    <script type="text/javascript"> 
	    <!--  
	    HTMLElement.prototype.Alert=function(){  
	        alert("这是一个扩展方法");  
	    }  
	    var tagA=document.getElementById("tagA");  
	    tagA.Alert();  
	    //--> 
	    </script> 
	 </body> 
	</html> 

以上代码在页面加载的时候就弹出“这是一个扩展方法”，不过相信你已经注意到了，在IE6,7,8里面会出错，但在IE9以上或者Chrome,Firefox,Opera这些浏览器里面都能正常运行，这是兼容性问题，不用担心，后面会解决。

以上的代码灵活性不够好，我们优化一下，让它更加灵活：

	<!DOCTYPE html> 
	<html lang="zh"> 
	 <head> 
	  <title>DOM功能扩展</title> 
	 </head> 
	 <body> 
	    <a href="javascript:void(0)" id="tagA">你好</a> 
	    <script type="text/javascript"> 
	    <!--  
	        function DOMExtend(name,fn){  
	            eval("HTMLElement.prototype."+name+"="+fn);//这里我们采用动态扩展  
	        }  
	        function Alert(){  
	            alert("这是一个扩展方法");  
	        }  
	        DOMExtend("Alert",Alert);  
	 
	        var tagA=document.getElementById("tagA");  
	        tagA.Alert();  
	    //--> 
	    </script> 
	 </body> 
	</html> 

从以上代码可以看出，有了DOMExtend这个方法以后，我们就可以通过传入不用的name 和 fn 实现不同的扩展。

2、以上讲完了HTMLElement，接下来讲讲事件的绑定，很多人都知道，IE和其他浏览器的事件绑定方式不一样，实现兼容所有浏览器的事件绑定的代码如下：

	function BindEvent(elem,event,fun){  
	    if(elem.addEventListener){  
	        elem.addEventListener(event,fun,false);  
	    }  
	    else{  
	        elem.attachEvent("on"+event,fun);  
	    }  
	} 

以下是事件绑定的使用例子：

	<!DOCTYPE html> 
	<html lang="zh"> 
	 <head> 
	  <title>DOM功能扩展</title> 
	 </head> 
	 <body> 
	    <a href="javascript:void(0)" id="tagA">你好</a> 
	    <script type="text/javascript"> 
	    <!--  
	        function BindEvent(elem,event,fun){  
	            if(elem.addEventListener){  
	                elem.addEventListener(event,fun,false);  
	            }  
	            else{  
	                elem.attachEvent("on"+event,fun);  
	            }  
	        }  
	        var tagA=document.getElementById("tagA");  
	        function Alert(){  
	            alert("这是事件绑定");  
	        }  
	        BindEvent(tagA,"click",Alert);  
	    //--> 
	    </script> 
	 </body> 
	</html> 

以上代码运行后，点击“你好”就会弹出“这是事件绑定”，这里值得一提的就是addEvenListener的第三个参数，这里的值是false，意思是取消Capture方式而采用冒泡方式。标准的事件有两种触发方式，一种是捕获型（caputre），另一种是冒泡型；而IE只支持冒泡型。捕获型的特点是触发方式是从外到内的方式触发事件，而冒泡型就是从内到外的方式触发事件，假设以上代码的A元素外层包了一个DIV元素，如果A元素与它的父元素DIV都有一个onclick事件，那么冒泡型就是点击A的时候会先触发A的事件，然后再触发DIV的事件，反之就是捕获型。

OK，相信通过以上的分析，对HTMLElement扩展和事件绑定都有了相当的了解，结合这两个知识点，我们可以写出如下的代码：

	<!DOCTYPE html> 
	<html lang="zh"> 
	 <head> 
	  <title>DOM功能扩展</title> 
	 </head> 
	 <body> 
	    <a href="javascript:void(0)" id="tagA">你好</a> 
	    <script type="text/javascript"> 
	    <!--  
	        function DOMExtend(name,fn){  
	            eval("HTMLElement.prototype."+name+"="+fn);//这里我们采用动态扩展  
	        }  
	 
	        function BindEvent(event,fun){  
	            if(this.addEventListener){//执行完DOMExtend后，这里的this会指向HTMLElement  
	                this.addEventListener(event,fun,false);//标准的事件绑定  
	            }  
	            else{  
	                this.attachEvent("on"+event,fun);//IE的事件绑定  
	            }  
	        }  
	 
	        DOMExtend("bind",BindEvent);//执行功能扩展  
	 
	        var tagA=document.getElementById("tagA");  
	          
	        tagA.bind("click",function(){//这就是我们最终要实现的功能  
	            alert(this.innerHTML);  
	        })  
	 
	    //--> 
	    </script> 
	 </body> 
	</html> 

执行以上这个页面，在IE9,Chrome,Opera,Firefox等标准浏览器里都能正常触发tagA的点击事件，于是现在只剩下一个问题，就是要兼容其他浏览器；IE浏览器之所以出错，是因为它们隐藏了对HTMLElement的访问，于是针对IE浏览器，我们就不能用HTMLElement.prototype来进行扩展了，但我们可以通过重写以下几个函数来达到目的：

document.getElementById

document.getElementsByTagName

document.createElement

document.documentElement

document.body

（PS：记忆中获取DOM元素好像就是以上这些方法了～不知道还有没有其他）

重写后，再进行一些处理变换就可以得到以下完整的页面代码：

	<!DOCTYPE html> 
	<html lang="zh"> 
	 <head> 
	  <title>DOM功能扩展</title> 
	 </head> 
	 
	 <body> 
	    <a href="javascript:void(0)" id="tagA">你好</a> 
	    <script type="text/javascript"> 
	        function DOMExtend(name, fn){  
	            if(typeof(HTMLElement)!="undefined"){  
	                eval("HTMLElement.prototype."+name+"="+fn);  
	            }  
	            else{  
	                var _getElementById=document.getElementById;  
	                document.getElementById=function(id){  
	                    var _elem=_getElementById(id);  
	                    eval("_elem."+name+"="+fn);  
	                    return _elem;  
	                }  
	 
	                var _getElementByTagName=document.getElementsByTagName;  
	                document.getElementsByTagName=function(tag){  
	                    var _elem=_getElementByTagName(tag);  
	                    var len=_elem.length;  
	                    for(var i=0;i<len;i++){  
	                        eval("_elem["+i+"]."+name+"="+fn);  
	                    }  
	                    return _elem;  
	                }  
	 
	                var _createElement=document.createElement;  
	                document.createElement=function(tag){  
	                    var _elem=_createElement(tag);  
	                    eval("_elem."+name+"="+fn);  
	                    return _elem;  
	                }  
	 
	                var _documentElement=document.documentElement;  
	                eval("_documentElement."+name+"="+fn);  
	 
	                var _documentBody=document.body;  
	                eval("_documentBody."+name+"="+fn);  
	            }  
	        }  
	 
	        function BindEvent(event,fun){  
	            if(this.addEventListener){  
	                this.addEventListener(event,fun,false);  
	            }  
	            else{  
	                this.attachEvent("on"+event,fun);  
	            }  
	        }  
	 
	        DOMExtend("bind",BindEvent);var wrap=document.getElementById("tagA");  
	 
	        wrap.bind("click",function(){  
	            alert(this.innerHTML);  
	        })  
	    </script> 
	 </body> 
	</html> 

OK，目前为止已经解决了兼容性问题，这是所有浏览器都能顺利通过的DOM元素扩展的代码，但是这样还有一个小问题，细心的人会发现在IE浏览器里面弹出的结果是"undefined"，而不是"你好"；问题的原因在于IE的事件绑定上，看以上代码，当调用alert(this.innerHTML)的时候，由于IE绑定事件用的是attachEvent，这时候this指向的是windows，于是现在的目标的要改变this指向的对像，将this指向tagA。于是经过修改，完整代码如下：

	<!DOCTYPE html> 
	<html lang="zh"> 
	 <head> 
	  <title>DOM功能扩展</title> 
	 </head> 
	 
	 <body> 
	    <a href="javascript:void(0)" id="tagA">你好</a> 
	    <script type="text/javascript"> 
	        function DOMExtend(name, fn){  
	            if(typeof(HTMLElement)!="undefined"){  
	                eval("HTMLElement.prototype."+name+"="+fn);  
	            }  
	            else{  
	                var _getElementById=document.getElementById;  
	                document.getElementById=function(id){  
	                    var _elem=_getElementById(id);  
	                    eval("_elem."+name+"="+fn);  
	                    return _elem;  
	                }  
	 
	                var _getElementByTagName=document.getElementsByTagName;  
	                document.getElementsByTagName=function(tag){  
	                    var _elem=_getElementByTagName(tag);  
	                    var len=_elem.length;  
	                    for(var i=0;i<len;i++){  
	                        eval("_elem["+i+"]."+name+"="+fn);  
	                    }  
	                    return _elem;  
	                }  
	 
	                var _createElement=document.createElement;  
	                document.createElement=function(tag){  
	                    var _elem=_createElement(tag);  
	                    eval("_elem."+name+"="+fn);  
	                    return _elem;  
	                }  
	 
	                var _documentElement=document.documentElement;  
	                eval("_documentElement."+name+"="+fn);  
	 
	                var _documentBody=document.body;  
	                eval("_documentBody."+name+"="+fn);  
	            }  
	        }  
	 
	        function BindEvent(event,fun){  
	            if(this.addEventListener){  
	                this.addEventListener(event,fun,false);  
	            }  
	            else{  
	                var tag=this;  
	                tag.attachEvent("on"+event,function(){  
	                    fun.apply(tag,arguments);//这里是关键  
	                });  
	            }  
	        }  
	 
	        DOMExtend("bind",BindEvent);var wrap=document.getElementById("tagA");  
	 
	        wrap.bind("click",function(){  
	            alert(this.innerHTML);  
	        })  
	    </script> 
	 </body> 
	</html> 

[「引用地址」](http://www.zhangxinxu.com/wordpress/2012/04/js-dom%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BA%8B%E4%BB%B6/)~ 张鑫旭 | 漫谈js自定义事件、DOM/伪DOM自定义事件~ **进阶内容**

**Web Components 并不是 Google Polymer 的另一个名称。Polymer 是一个基于 Web Components 技术的框架。 你完全可以脱离 Polymer 创建和使用 Web Components。**

**目前，Web Components 并未被所有浏览器完整实现， 所以现在（2015年1月）在大部分浏览器中使用时，您会需要用 polyfill 来弥补。
[Google Polymer project](http://www.polymer-project.org/) 中可以找到 polyfill。Web Components 在不同浏览器中的实现情况，参见  [webcomponents.org](https://www.webcomponents.org/)?**

### 漫谈js自定义事件、DOM/伪DOM自定义事件

一、说明、引言

所谓自定义事件，就是有别于有别于带有浏览器特定行为的事件(类似click, mouseover, submit, keydown等事件)，事件名称可以随意定义，可以通过特定的方法进行添加，触发以及删除。

二、JS自定义事件
循序渐进便于接收。慢慢来~~

先看个简单的事件添加的例子：

element.addEventListener("click", function() {
    // 我是临时工
});
这是个简单的为DOM元素分配事件处理函数的方法(IE 不支持)，有别于：

element.onclick = function() {
   // 我是临时工 
};
addEventListener()可以为元素分配多个处理函数（而非覆盖），因此，我们可以继续：

element.addEventListener("click", function() {
    // 我是二代临时工
});
然后，当element被click(点击)的时候，就会连续触发“临时工”和“二代临时工”函数。

抽象→具象→本质→数据层
你有没有觉得这种行为表现有点类似于往长枪里面塞子弹(add)，（扣动扳手 – click）发射的时候按照塞进去的顺序依次出来。这种行为表现为我们实现自定义事件提供了思路：我们可以定义一个数组，当添加事件的时候，我们push进去这个事件处理函数；当我们执行的时候，从头遍历这个数组中的每个事件处理函数，并执行。

当多个事件以及对应数据处理函数添加后，我们最终会得到一个类似下面数据结构的对象：

	_listener = {
	    "click": [func1, func2],
	    "custom": [func3],
	    "defined": [func4, func5, func6]
	}

因此，如果我们脱离DOM, 纯碎在数据层面自定义事件的话，我们只要以构建、遍历和删除_listener对象为目的即可。

函数式实现
还是那句话，循序渐进，我们先看看函数式的实现（只展示骨干代码）：

	var _listener = {};
	var addEvent = function(type, fn) {
	    // 添加
	};
	var fireEvent = function(type) {
	    // 触发
	};
	var removeEvent = function(type, fn) {
	    // 删除
	};

上面的代码虽然显得比较初级，但是目的亦可实现。例如：

addEvent("alert", function() {
    alert("弹出！");
});

// 触发自定义alert事件
fireEvent("alert");
但是，函数式写法缺点显而易见，过多暴露在外的全局变量（全局变量是魔鬼），方法无级联等。这也是上面懒得显示完整代码的原因，略知即可。

字面量实现
众所周知，减少全局变量的方法之一就是使用全局变量（其他如闭包）。于是，我们稍作调整（代码较长，为限制篇幅，使用了滚动条，完整显示点击这里 – JS交互, RSS中无效果）：

	var Event = {
	    _listeners: {},    
	    // 添加
	    addEvent: function(type, fn) {
	        if (typeof this._listeners[type] === "undefined") {
	            this._listeners[type] = [];
	        }
	        if (typeof fn === "function") {
	            this._listeners[type].push(fn);
	        }    
	        return this;
	    },
	    // 触发
	    fireEvent: function(type) {
	        var arrayEvent = this._listeners[type];
	        if (arrayEvent instanceof Array) {
	            for (var i=0, length=arrayEvent.length; i<length; i+=1) {
	                if (typeof arrayEvent[i] === "function") {
	                    arrayEvent[i]({ type: type });    
	                }
	            }
	        }    
	        return this;
	    },
	    // 删除
	    removeEvent: function(type, fn) {
	    	var arrayEvent = this._listeners[type];
	        if (typeof type === "string" && arrayEvent instanceof Array) {
	            if (typeof fn === "function") {
	                // 清除当前type类型事件下对应fn方法
	                for (var i=0, length=arrayEvent.length; i<length; i+=1){
	                    if (arrayEvent[i] === fn){
	                        this._listeners[type].splice(i, 1);
	                        break;
	                    }
	                }
	            } else {
	                // 如果仅仅参数type, 或参数fn邪魔外道，则所有type类型事件清除
	                delete this._listeners[type];
	            }
	        }
	        return this;
	    }
	};

使用类似下面：

	Event.addEvent("alert", function() {
	    alert("弹出！");
	});

	// 触发自定义alert事件
	Event.fireEvent("alert");

您可以狠狠地点击这里：JS自定义事件字面量书写demo

默认页面document通过Event.addEvent()绑定了两个自定义的alert事件，因此，此时您点击页面的空白区域（非按钮与示例代码区域），就会有如下图所示的连续两个alert框：


demo页面还有两个按钮，用来清除已经绑定的alert事件。第一个按钮清除所有alert事件，而点击第二个按钮清除第一个alert事件。例如我们点击第二个按钮：


清除完毕后再点击页面的空白区域， 您会发现只会弹出“第二个弹出！”字样的弹出框了。这表明，第一个绑定自定义事件被remove掉了。

字面量实现虽然减少了全局变量，但是其属性方法等都是暴露而且都是唯一的，一旦某个关键属性(如_listeners)不小心在某事件处reset了下，则整个全局的自定义事件都会崩溃。因此，我们可以进一步改进，例如，使用原型链继承，让继承的属性(如_listeners)即使出问题也不会影响全局。

原型模式实现
代码如下（相比上面增加了addEvents, fireEvents, removeEvents多事件绑定、执行与删除方法，篇幅较长，增加滚动限高，点击这里完整展示 – JS交互, RSS中无效果）（一堆代码看得头大，建议直接跳过）：

	var EventTarget = function() {
	    this._listener = {};
	};

	EventTarget.prototype = {
	    constructor: this,
	    addEvent: function(type, fn) {
	        if (typeof type === "string" && typeof fn === "function") {
	            if (typeof this._listener[type] === "undefined") {
	                this._listener[type] = [fn];
	            } else {
	                this._listener[type].push(fn);    
	            }
	        }
	        return this;
	    },
	    addEvents: function(obj) {
	        obj = typeof obj === "object"? obj : {};
	        var type;
	        for (type in obj) {
	            if ( type && typeof obj[type] === "function") {
	                this.addEvent(type, obj[type]);    
	            }
	        }
	        return this;
	    },
	    fireEvent: function(type) {
	        if (type && this._listener[type]) {
	            var events = {
	                type: type,
	                target: this    
	            };
	            
	            for (var length = this._listener[type].length, start=0; start<length; start+=1) {
	                this._listener[type][start].call(this, events);
	            }
	        }
	        return this;
	    },
	    fireEvents: function(array) {
	        if (array instanceof Array) {
	            for (var i=0, length = array.length; i<length; i+=1) {
	                this.fireEvent(array[i]);
	            }
	        }
	        return this;
	    },
	    removeEvent: function(type, key) {
	        var listeners = this._listener[type];
	        if (listeners instanceof Array) {
	            if (typeof key === "function") {
	                for (var i=0, length=listeners.length; i<length; i+=1){
	                    if (listeners[i] === key){
	                        listeners.splice(i, 1);
	                        break;
	                    }
	                }
	            } else if (key instanceof Array) {
	                for (var lis=0, lenkey = key.length; lis<lenkey; lis+=1) {
	                    this.removeEvent(type, key[lenkey]);
	                }
	            } else {
	                delete this._listener[type];
	            }
	        }
	        return this;
	    },
	    removeEvents: function(params) {
	        if (params instanceof Array) {
	            for (var i=0, length = params.length; i<length; i+=1) {
	                this.removeEvent(params[i]);
	            }    
	        } else if (typeof params === "object") {
	            for (var type in params) {
	                this.removeEvent(type, params[type]);    
	            }
	        }
	        return this;    
	    }
	};

啰哩吧嗦的代码直接跳过，其实上面代码跟字面量方法相比，就是增加了下面点东西：

	var EventTarget = function() {
	    this._listener = {};
	};

	EventTarget.prototype = {
	    constructor: this,
	    // .. 完全就是字面量模式实现脚本
	};

然后，需要实现自定义事件功能时候，先new构造下：

	var myEvents = new EventTarget();
	var yourEvents = new EventTarget();

这样，即使myEvents的事件容器_listener跛掉，也不会污染yourEvents中的自定义事件(listener安然无恙)。

您可以狠狠地点击这里：原型模式下的JS自定义事件demo

从demo右半区域的源代码展示可以看出如何使用addEvents, fireEvents方法同时添加和触发多个自定义事件的。

三、DOM自定义事件
我们平常所使用的事件基本都是与DOM元素相关的，例如点击按钮，文本输入等，这些为自带浏览器行为事件，而自定义事件与这些行为无关。例如：

	element.addEventListener("alert", function() {
	    alert("弹出！");
	});

这里的alert就属于自定义事件，后面的function就是自定义事件函数。而这个自定义事件是直接绑定在名为element的DOM元素上的，因此，这个称之为自定义DOM事件。

由于浏览器的差异，上面的addEventListener在IE浏览器下混不来(attachEvent代替)，因此，为了便于规模使用，我们需要新的添加事件方法名（合并addEventListener和attachEvent），例如addEvent, 并附带事件触发方法fireEvent, 删除事件方法removeEvent，(命名均参考自MooTools库)。

如何直接在DOM上扩展新的事件处理方法，以及执行自定义的事件呢？

如果不考虑IE6/7浏览器，我们可以直接在DOM上进行方法扩展。例如添加个addEvent方法：

	HTMLElement.prototype.addEvent = function(type, fn, capture) {
	    var el = this;
	    if (window.addEventListener) {
	        el.addEventListener(type, function(e) {
	            fn.call(el, e);
	        }, capture);
	    } else if (window.attachEvent) {
	        el.attachEvent("on" + type, function(e) {
	            fn.call(el, e);
	        });
	    } 
	};
	//zxx: 上面代码中的HTMLElement表示HTML元素。以一个<p>

标签元素举例，其向上寻找原型对象用过会是这样：HTMLParagraphElement.prototype → HTMLElement.prototype → Element.prototype → Node.prototype → Object.prototype → null。这下您应该知道HTMLElement所处的位置了吧，上述代码HTMLElement直接换成Element也是可以的，但是会让其他元素（例如文本元素）也扩展addEvent方法，有些浪费了。

这样，我们就可以使用扩展的新方法给元素添加事件了，例如一个图片元素：

	elImage.addEvent("click", function() {
	    alert("我是点击图片之后的弹出！");
	});

由于IE6, IE7浏览器的DOM水平较低，无法直接进行扩展，因此，原型扩展的方法在这两个浏览器下是行不通的。要想让这两个浏览器也支持addEvent方法，只能是页面载入时候遍历所有DOM，然后每个都直接添加addEvent方法了。

	var elAll = document.all, lenAll = elAll.length;
	for (var iAll=0; iAll<lenAll; iAll+=1) {
	    elAll[iAll].addEvent = function(type, fn) {
	        var el = this;
	        el.attachEvent("on" + type, function(e) {
	            fn.call(el, e);
	        });
	    };
	}

您可以狠狠地点击这里：基于DOM扩展自定义方法demo

点击demo页面张含韵小姐年轻时候相片，就会有该图片alt属性值。



测试代码如下(demo页面有代码完整展示)：

	<img id="image" data-src="http://image.zhangxinxu.com/image/study/s/s256/mm1.jpg" alt="年轻的张含韵" />

document.getElementById("image").addEvent("click", function() {
    alert("这是：" + this.alt);    
});
只能点到为止
直接在DOM上进行事件方法扩展其实是个糟糕的做法，因此，这里我并没有对自定义事件做进一步深入探讨（这个下一部分会讲）。

基于DOM扩展缺点有：缺少标准无规律、提高冲突可能性、性能以及浏览器支持。
扩展名字任意命，很有可能就会与未来DOM浏览器本身支持的方法相互冲突；扩展无规律，很有可能出现A和B同名不同功能的扩展而造成冲突；IE6-7浏览器下所有扩展都要通过遍历支持，其性能开销可想而知；另外IE8对DOM扩展的支持并不完整，例如其支持Element.prototype，却没有HTMLElement.prototype.

虽然我从事的站点就是基于MooTools库的，但是，我对MooTools库基于DOM扩展方法的做法是不支持的。相反，我更亲近jQuery库的做法，也就是下面要讲的“伪DOM自定义事件”。

四、伪DOM自定义事件
这里的“伪DOM自定义事件”是自己定义的一个名词，用来区分DOM自定义事件的。例如jQuery库，其是基于包装器（一个包含DOM元素的中间层）扩展事件的，既与DOM相关，又不直接是DOM，因此，称之为“伪DOM自定义事件”。

//zxx: 下面即将展示的代码目的在于学习与认识，要想实际应用可能还需要在细节上做些调整。例如，下面测试的包装器仅仅只是包裹DOM元素，并非选择器之类；$符号未增加冲突处理，且几个重要方法都暴露在全局环境中，没有闭包保护等。

原型以及new函数构造不是本文重点，因此，下面这个仅展示：

	var $ = function(el) {
	    return new _$(el);    
	};
	var _$ = function(el) {
	    this.el = el;
	};
	_$.prototype = {
	    constructor: this,
	    addEvent: function() {
	        // ...
	    },
	    fireEvent: function() {
	        // ...
	    },
	    removeEvent: function() {
	        // ...
	    }
	}

于是我们就可以使用类似$(dom).addEvent()的语法为元素添加事件了（包括不包含浏览器行为的自定义事件）。

自定义事件的添加
如果只考虑事件添加，我们的工作其实很简单，根据支持情况，addEventListener与attachEvent方法分别添加事件（attachEvent方法后添加事件先触发）即可：

	addEvent: function(type, fn, capture) {
	    var el = this.el;
	    if (window.addEventListener) {
	        el.addEventListener(type, fn, capture);        
	    } else if (window.attachEvent) {
	        el.attachEvent("on" + type, fn);
	    }
	    return this;
	}

显然，事情不会这么简单，有句古话叫做“上山容易下山难”，自定义事件添加容易，但是如何触发它们呢？——考虑到自定义事件与浏览器行为无关，同时浏览器没有直接的触发事件的方法。

自定义事件的触发
又是不可避免的，由于浏览器兼容性问题，我们要分开说了，针对标准浏览器和IE6/7等考古浏览器。

1. 对于标准浏览器，其提供了可供元素触发的方法：element.dispatchEvent(). 不过，在使用该方法之前，我们还需要做其他两件事，及创建和初始化。因此，总结说来就是：

	document.createEvent()
	event.initEvent()
	element.dispatchEvent()
	举个板栗：

	$(dom).addEvent("alert", function() {
	    alert("弹弹弹，弹走鱼尾纹~~");
	});

	// 创建
	var evt = document.createEvent("HTMLEvents");
	// 初始化
	evt.initEvent("alert", false, false);

	// 触发, 即弹出文字
	dom.dispatchEvent(evt);
	createEvent()方法返回新创建的Event对象，支持一个参数，表示事件类型，具体见下表：

	参数	事件接口	初始化方法
	HTMLEvents	HTMLEvent	initEvent()
	MouseEvents	MouseEvent	initMouseEvent()
	UIEvents	UIEvent	initUIEvent()

关于createEvent()方法我自己了解也不是很深入，不想滥竽充数，误人子弟，所以您有疑问我可能作答不了，希望对熟知该方法的人可以做进一步的解释说明（例如事件接口与document关系，UIEvent是什么东西等）。

initEvent()方法用于初始化通过DocumentEvent接口创建的Event的值。支持三个参数：initEvent(eventName, canBubble, preventDefault). 分别表示事件名称，是否可以冒泡，是否阻止事件的默认操作。

dispatchEvent()就是触发执行了，dom.dispatchEvent(eventObject), 参数eventObject表示事件对象，是createEvent()方法返回的创建的Event对象。

2. 对于IE浏览器，由于向下很多版本的浏览器都不支持document.createEvent()方法，因此我们需要另辟蹊径（据说IE有document.createEventObject()和event.fireEvent()方法，但是不支持自定义事件~~）。

IE浏览器有不少自给自足的东西，例如下面要说的这个"propertychange"事件，顾名思意，就是属性改变即触发的事件。例如文本框value值改变，或是元素id改变，或是绑定的事件改变等等。

我们可以利用这个IE私有的东西实现自定义事件的触发，大家可以先花几分钟想想……

// zxx: 假设几分钟已经过去了……

大家现在有思路了没？其实说穿了很简单，当我们添加自定义事件的时候，顺便给元素添加一个自定义属性即可。例如，我们添加自定义名为"alert"的自定义事件，顺便我们可以对元素做点小手脚：

dom.evtAlert = "2012-04-01";
再顺便把自定义事件fn塞到"propertychange"事件中：

	dom.attachEvent("onpropertychange", function(e) {
	    if (e.propertyName == "evtAlert") {
	        fn.call(this);
	    }
	});

这个，当我们需要触发自定义事件的时候，只要修改DOM上自定义的evtAlert属性的值即可：

dom.evtAlert = Math.random();	// 值变成随机数
此时就会触发dom上绑定的onpropertychange事件，又因为修改的属性名正好是"evtAlert", 于是自定义的fn就会被执行。这就是IE浏览器下事件触发实现的完整机制，应该说讲得还是蛮细的。

自定义事件的删除
与触发事件不同，事件删除，各个浏览器都提供了对于的时间删除方法，如removeEventListener和detachEvent。不过呢，对于IE浏览器，还要多删除一个事件，就是为了实现触发功能额外增加的onpropertychange事件：

dom.detachEvent("onpropertychange", evt);
大综合
结合上面所有论述与展示，我们可以得到类似下面的完整代码（为限制篇幅，滚动定高，想查看完整代码推荐去原demo，或是点击这里完整显示– js交互，RSS中无效果。）：

	var $ = function(el) {
	    return new _$(el);    
	};
	var _$ = function(el) {
	    this.el = (el && el.nodeType == 1)? el: document;
	};
	_$.prototype = {
	    constructor: this,
	    addEvent: function(type, fn, capture) {
	        var el = this.el;
	        if (window.addEventListener) {
	            el.addEventListener(type, fn, capture);
	            var ev = document.createEvent("HTMLEvents");
	            ev.initEvent(type, capture || false, false);
	            
	            if (!el["ev" + type]) {
	                el["ev" + type] = ev;
	            }  
	        } else if (window.attachEvent) {
	            el.attachEvent("on" + type, fn);    
	            if (isNaN(el["cu" + type])) {
	                // 自定义属性
	                el["cu" + type] = 0; 
	            }   
	            var fnEv = function(event) {
	                if (event.propertyName == "cu" + type) { fn.call(el); }
	            };
	            el.attachEvent("onpropertychange", fnEv);     
	            if (!el["ev" + type]) {
	                el["ev" + type] = [fnEv];
	            } else {
	                el["ev" + type].push(fnEv);    
	            }
	        }
	        return this;
	    },
	    fireEvent: function(type) {
	        var el = this.el;
	        if (typeof type === "string") {
	            if (document.dispatchEvent) {
	                if (el["ev" + type]) {
	                    el.dispatchEvent(el["ev" + type]);
	                }
	            } else if (document.attachEvent) {
	                el["cu" + type]++;
	            }    
	        }    
	        return this;
	    },
	    removeEvent: function(type, fn, capture) {
	        var el = this.el;
	        if (window.removeEventListener) {
	            el.removeEventListener(type, fn, capture || false);
	        } else if (document.attachEvent) {
	            el.detachEvent("on" + type, fn);
	            var arrEv = el["ev" + type];
	            if (arrEv instanceof Array) {
	                for (var i=0; i<arrEv.length; i+=1) {
	                    el.detachEvent("onpropertychange", arrEv[i]);
	                }
	            }
	        }
	        return this;    
	    }
	};

您可以狠狠地点击这里：JS DOM自定义事件demo

demo页面中的的张含韵小姐图片上通过级联形式联系添加了三个事件（一个是包含浏览器行为的click事件，还有两个是自定义不含行为的alert事件）：

	$(elImage)
	    .addEvent("click", funClick);
	    .addEvent("alert", funAlert1)
	    .addEvent("alert", funAlert2);

而funClick方法中有等同下面脚本：

$(e.target).fireEvent("alert");
因此，点击图片，才会出现三个弹出框：用户点击图片 → 执行funClick → 第一个弹框 → 执行fireEvent → 触发自定义"alert"事件 → 连续两个"alert"事件弹框

当点击图片下面的按钮清除掉自定义"alert"事件后，再点击图片就只有一个弹出咯（funAlert1和funAlert2提前回家扫墓去了）！

## template

[「引用地址」](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/template)~ MDN | template base~

>示例

>	<table id="producttable">
	  <thead>
	    <tr>
	      <td>UPC_Code</td>
	      <td>Product_Name</td>
	    </tr>
	  </thead>
	  <tbody>
	    <!-- 现有数据可以可选地包括在这里 -->
	  </tbody>
	</table>
	<template id="productrow">
	  <tr>
	    <td class="record"></td>
	    <td></td>
	  </tr>
	</template>

> 然后我们来看示例的 JavaScript 部分，它将 HTML 实例化。

>	// 通过检查来测试浏览器是否支持HTML模板元素 
	// 用于保存模板元素的内容属性。
	if ('content' in document.createElement('template')) {
	  // 使用现有的HTML tbody实例化表和该行与模板
	  let t = document.querySelector('#productrow'),
	  td = t.content.querySelectorAll("td");
	  td[0].textContent = "1235646565";
	  td[1].textContent = "Stuff";
	  // 克隆新行并将其插入表中
	  let tb = document.getElementsByTagName("tbody");
	  let clone = document.importNode(t.content, true);
	  tb[0].appendChild(clone);  
	  // 创建一个新行
	  td[0].textContent = "0384928528";
	  td[1].textContent = "Acme Kidney Beans";
	  // 克隆新行并将其插入表中
	  let clone2 = document.importNode(t.content, true);
	  tb[0].appendChild(clone2);
	} else {
	  // 找到另一种方法来添加行到表，因为不支持HTML模板元素。
	}

[「引用地址」](https://www.w3cplus.com/web-components/web-components-demo-template-and-some-shadow-dom.html)~ W3Cplus | template~ **进阶内容**