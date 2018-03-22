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

有时候我们会想扩展DOM元素的功能，可以添加一些自定义的方法，以让它用起来更加灵活、方便；先来举个例子：

	```js
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
	```

毫无疑问，从以上代码可以看出，当点击A标签的时候会弹出“你好”，tagA是一个DOM元素，除了有onclick事件以外，还有onmouseover,onmouseout,onmousemove等等，而这些事件都是DOM元素本身就具有的；但现在我们希望对它进行扩展，例如可以让它支持tagA.bind，我可以用tagA.bind("click",function(){}),来代替tagA.onclick=function(){}。OK，现在的目的很明确，先看下面的代码：

	```js
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
	```

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

    ```js
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
	```

从以上代码可以看出，有了DOMExtend这个方法以后，我们就可以通过传入不用的name 和 fn 实现不同的扩展。

2、以上讲完了HTMLElement，接下来讲讲事件的绑定，很多人都知道，IE和其他浏览器的事件绑定方式不一样，实现兼容所有浏览器的事件绑定的代码如下：

	```js
	function BindEvent(elem,event,fun){  
	    if(elem.addEventListener){  
	        elem.addEventListener(event,fun,false);  
	    }  
	    else{  
	        elem.attachEvent("on"+event,fun);  
	    }  
	} 
	```

以下是事件绑定的使用例子：

	```js
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
	```

以上代码运行后，点击“你好”就会弹出“这是事件绑定”，这里值得一提的就是addEvenListener的第三个参数，这里的值是false，意思是取消Capture方式而采用冒泡方式。标准的事件有两种触发方式，一种是捕获型（caputre），另一种是冒泡型；而IE只支持冒泡型。捕获型的特点是触发方式是从外到内的方式触发事件，而冒泡型就是从内到外的方式触发事件，假设以上代码的A元素外层包了一个DIV元素，如果A元素与它的父元素DIV都有一个onclick事件，那么冒泡型就是点击A的时候会先触发A的事件，然后再触发DIV的事件，反之就是捕获型。

OK，相信通过以上的分析，对HTMLElement扩展和事件绑定都有了相当的了解，结合这两个知识点，我们可以写出如下的代码：

	```js
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
	```

执行以上这个页面，在IE9,Chrome,Opera,Firefox等标准浏览器里都能正常触发tagA的点击事件，于是现在只剩下一个问题，就是要兼容其他浏览器；IE浏览器之所以出错，是因为它们隐藏了对HTMLElement的访问，于是针对IE浏览器，我们就不能用HTMLElement.prototype来进行扩展了，但我们可以通过重写以下几个函数来达到目的：

document.getElementById

document.getElementsByTagName

document.createElement

document.documentElement

document.body

（PS：记忆中获取DOM元素好像就是以上这些方法了～不知道还有没有其他）

重写后，再进行一些处理变换就可以得到以下完整的页面代码：

	```js
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
	```

OK，目前为止已经解决了兼容性问题，这是所有浏览器都能顺利通过的DOM元素扩展的代码，但是这样还有一个小问题，细心的人会发现在IE浏览器里面弹出的结果是"undefined"，而不是"你好"；问题的原因在于IE的事件绑定上，看以上代码，当调用alert(this.innerHTML)的时候，由于IE绑定事件用的是attachEvent，这时候this指向的是windows，于是现在的目标的要改变this指向的对像，将this指向tagA。于是经过修改，完整代码如下：

	```js
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
	```

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

## Web Components

通过一种标准化的非侵入的方式封装一个组件，每个组件能组织好它自身的 HTML 结构、CSS 样式、JavaScript 代码，并且不会干扰页面上的其他代码。

**The Shadow DOM**

> 开发者能通过 shadow DOM 在文档流中创建一些完全独立于其他元素的子 DOM 树（sub-DOM trees）， 由于这个特性，使得我们可以封装一个具有独立功能的组件，并且可以保证不会在不无意中干扰到其它 DOM 元素。shadow DOM 和标准的 DOM 一样，可以设置它的样式，也可以用 JavaScript 操作它的行为。主文档流和基于 shadow DOM 创建的独立组件之间的互不干扰，所以组件的复用也就变得异常简单方便。

**HTML 模板**

> Angular JS 之类的现代 JavaScript 框架，开发者通过模板来复用一些 HTML 代码段，在 HTML5 标准下我们甚至不需要 JavaScript 框架就能轻松使用模板。

**导入 HTML 模板**

> 在模板中创建 HTML 代码块和子 DOM 树，使得我们可以用不同的物理文件来组织代码。通过<link>标签来引入这些文件，就像我们在 PHP 文件中引用 JavaScript 文件那样简单。

**自定义元素**

> 我们声明一个语义化的自定义元素来引用组件，用 JavaScript 建立自定义元素和模板、shadow DOM 之间的关联，然后将自定义标签（例如`<my-custom-element></my-custom-element>`）插入到页面上就能得到一个封装好的组件。Angular JS 中有很多类似的写法。

##### 试写第一个 WebComponent

现在你应该已经对 WebComponents 有了一定的了解，但我想通过一个简单的例子能让你更好的理解上面那些枯燥的概念。以下代码展示了一个最简单的 WebComponent 由哪些元素组成，用`<template>`包裹 HTML 和 样式代码，用 JavaScript 将这些绑定到自定义标签 `<favorite-colour>`上。

	```html
	<!--WebComponent example based off element-boilerplate: https://github.com/webcomponents/element-boilerplate-->

	<template>
		<style>
			.colored {
				color: red;
			}
		</style>
		<p> My Favorite color is <strong class="colored">RED</strong></p>
	</template>
	```
	```js
	(function() {
		//create an object based in the HTMLElement prototype
		var element = Object.create(HTMLElement.prototype);
		// Get conent from <template>
		var template = document.currentScript.ownerDocument.querySelector('template').content;
		//FIre when an instance of the element created
		element.createdCallback = function() {
			//create the shadow root;
			var shadowRoot = this.createShadowRoot();
			//adds a template clone into shadow root;
			var clone = document.importNode(template, true);
		};

		// Fires when an instance was inserted into the document
		element.attachedCallback = function() {};
		// Fires when an instance was removed from the document
		element.detachedCallback = function() {};
		// Fires when an attribute was added, removed, or updated
		element.attributeChangedCallback = function(attr, oldVal, newVal) {};
		document.registerElement('favorite-colour', {
			prototype: element
		});
	}());
	```
	用<link />引入 WebComponent 文件，并添加<favorite-colour>标签将 WebComponent 添加到页面上，如下代码所示：

	```html
	<!DOCTYPE html>
	<html>
	<head lang="en">
		<meta charset="UTF-8">
		<title>My First WebComponent</title>
		<link rel="import" href="components/favorite-colour.html" />
	</head>
	<body>
		<favorite-colour></favorite-colour>
	</body>
	</html>
	```

### WebComponent 兼容性

你可能会说：“确实很diao，但尼玛什么时候才能 ‘真正’ 用得上呢？”。我会告诉你：“现在就能用了少年”。下面的表格列出了主流浏览器对 WebComponent 中各个特性的兼容性。 

![图示]({{ site.baseurl }}/post_imgs/webcomponent.png)

***填补空缺***

虽然大部分浏览器还不支持 WebComponent ，但是有个叫做 [webcomponentsjs](http://webcomponents.org/polyfills/) 的兼容库，可以让 WebComponent 在不支持它的浏览器上运行起来。只要你在项目中引入这个库，就可以像上面的例子那样将 WebComponents 用起来。

### WebComponents 的重要性

**无害插件**

本文的前面已经介绍了开发者可以通过 shadow DOM 创建子 DOM 树，并且不会被页面上的 CSS 样式和 JavaScript 脚本所影响。显而易见的好处就是当你引入一个第三方组件的时候，不用担心它会对你的网站其他功能造成影响

**一劳永逸**

标准的目的是增强通用性。一旦 WebComponents 被广泛支持起来，我们就能开发更通用的组件，而不用考虑其他项目用的是什么技术。再也不用针对 jQuery 写插件，再也不用为 Angular JS 写 directives，再也不用为 Ember.js 写 addons。

**维护与测试**

通过这样的标准编写的组件具有更好的可维护性。最佳实践能够更快的被采用，并给我们带来更快更可靠的 Web 应用。测试会变得更简单，测试规范也能随着组件一起发布。

**Abstraction**

我们可以在 WebComponents 里开发复杂的功能，就可以将较少的精力耗费在开发复杂 Web 应用上了。你只需要将这些组件组装起来，保证他们之间能够互相通信，就能组装出一个完整应用。以 Angular JS 1.x 为例，不需要写 controllers，不需要写 directives，不需要写那么多的 scope，只要提供一些基本的服务和路由就行。当然 Angular 2.0 已经将 WebComponents 规划进去了。

**传统的 HTML 写法**

	```js
	<!-- PAGE NAVIGATION -->
	<div>
		<ul>
			<li>Home</li>
			<li>About</li>
			<li>Contact</li>
		</ul>
	</div>
	<!-- CONTENT AREA -->
	<div>
		<p>Here is some simple content in the content area.</p>
	</div>
	<!-- GALLERY -->
	<div>
		<img src="animage1.png" />
		<img src="animage2.png" />
		<img src="animage3.png" />
		<img src="animage4.png" />
		<img src="animage5.png" />
	</div>
	<!-- FOOTER -->
	<div>
		<p>A simple footer</p>
	</div>
	```

**WebComponents 的语义化写法**

	```js
	<page-navigation data-position="top"></page-navigation>
	<content data-theme="dark">
		<p>Here is some simple content in the content area.</p>
	</content>
	<image-gallery data-fullscreen="true">
		<img src="animage1.png" />
		<img src="animage2.png" />
		<img src="animage3.png" />
		<img src="animage4.png" />
		<img src="animage5.png" />
	</image-gallery>
	<footer>
		<p>A simple footer</p>
	</footer>
	```

## template

[「引用地址」](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/template)~ MDN | template base~

这个东西很简单，用过 handlebars 的人都知道有这么一个东西：

	<script id="template" type="text/x-handlebars-template"> 
	... 
	</script>  

其他模板引擎也有类似的东西，那么 HTML Templates 便是把这个东西官方标准化，提供了一个 template 标签来存放以后需要但是暂时不渲染的 HTML 代码。

以后可以这么写了：

	<template id="template"> 
	... 
	</template>  

接口和应用

template 元素有一个只读的属性 content，用于返回这个 template 里边的内容，返回的结果是一个 DocumentFragment。

	```js
	<!doctype html> 
	<html lang="en"> 
	<head> 
		<title>Homework</title> 
	<body> 
		<template id="template"><p>Smile!</p></template> 
		<script> 
		let num = 3; 
		const fragment = document.getElementById('template').content.cloneNode(true); 
		while (num-- > 1) { 
			fragment.firstChild.before(fragment.firstChild.cloneNode(true)); 
			fragment.firstChild.textContent += fragment.lastChild.textContent; 
		} 
		document.body.appendChild(fragment); 
		</script> 
	</html>  
	```

使用 DocumentFragment 的 clone 方法以 template 里的代码为基础创建一个元素节点，然后你便可以操作这个元素节点，最后在需要的时候插入到 document 中特定位置便可以了

>示例2

	```js
 	<table id="producttable">
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
	```

> 然后我们来看示例的 JavaScript 部分，它将 HTML 实例化。

	```js
	// 通过检查来测试浏览器是否支持HTML模板元素 
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
	```

[「引用地址」](https://www.w3cplus.com/web-components/web-components-demo-template-and-some-shadow-dom.html)~ W3Cplus | template~ **进阶内容**

## Custom Elements

Custom Elements 顾名思义，是提供一种方式让开发者可以自定义 HTML 元素，包括特定的组成，样式和行为。支持 Web Components 标准的浏览器会提供一系列 API 给开发者用于创建自定义的元素，或者扩展现有元素。

这一项标准的草案还处于不稳定的状态，时有更新，API 还会有所变化，下边的笔记以 Cutsom Elements 2016.02.26 这个版本为准

> registerElement

尝试在 chrome 控制台输入 HTMLInputElement，可以看到是有这么一个东西的，这个理解为 input DOM 元素实例化时的构造函数，基础的是 HTMLElement。'

Web Components 标准提出提供这么一个接口：

```js
document.registerElement('x-foo',{
	prototype: Object.create(HTMLElememt.prototype, {
		createdCallback: {
			value: function() {

			}
		},
		...
	})
})
```

你可以使用 document.registerElement 来注册一个标签，标准中为了提供 namesapce 的支持，防止冲突，规定标签类型(也可以理解为名字)需要使用 - 连接。同时，不能是以下这一些：

- annotation-xml
- color-profile
- font-face
- font-face-src
- font-face-uri
- font-face-format
- font-face-name
- missing-glyph

第二个参数是标签相关的配置，主要是提供一个 prototype，这个原型对象是以 HTMLElement 等的原型为基础创建的对象。然后你便可以在 HTML 中去使用自定义的标签。如：

```html
<div> 
  <x-foo></x-foo> 
</div>  
```

> 生命周期和回调

在这个 API 的基础上，Web Components 标准提供了一系列控制自定义元素的方法。我们来一一看下：

一个自定义元素会经历以下这些生命周期：

- 注册前创建
- 注册自定义元素定义
- 在注册后创建元素实例
- 元素插入到 document 中
- 元素从 document 中移除
- 元素的属性变化时

这个是很重要的内容，开发者可以在注册新的自定义元素时指定对应的生命周期回调来为自定义元素添加各种自定义的行为，这些生命周期回调包括了：

- createdCallback

	自定义元素注册后，在实例化之后会调用，通常多用于做元素的初始化，如插入子元素，绑定事件等。

- attachedCallback 
	元素插入到 document 时触发。
- detachedCallback
	元素从 document 中移除时触发，可能会用于做类似 destroy 之类的事情。
- attributeChangedCallback 
	元素属性变化时触发，可以用于从外到内的通信。外部通过修改元素的属性来让内部获取相关的数据并且执行对应的操作。

这个回调在不同情况下有对应不同的参数：

- 设置属性时，参数列表是：属性名称，null，值，命名空间
- 修改属性时，参数列表是：属性名称，旧值，新值，命名空间
- 删除属性时，参数列表是：属性名称，旧值，null，命名空间

example: 

```js
document.registerElement('button-hello', {
	prototype: Object.create(HTMLButtonElement.prototype, {
		createCallback: {
			value: function createdCallback1() {
				this.innerHTML = '<button>hello world</button>'
				this.addElementListener('click', () => {
					alert('hello world'1;)
				})
			}
		}
	})
})
```

要留意上述代码执行之后才能使用 `<button-hello></button-hello>`

> 扩展原有元素

其实，如果我们需要一个按钮，完全不需要重新自定义一个元素，Web Components 标准提供了一种扩展现有标签的方式，把上边的代码调整一下：

```js
document.registerElement('button-hello', {
	prototype: Object.create(HTMLButtonElement.prototype, {
		createdCallback: {
			value: function createdCallback() {
				this.addEventListener('clicl', () => {
					alert('hello world');
				})
			}
		}
	}),
	extends: 'button'
})
```
或

```js
扩展原生 API
var MyButtonProto = Object.create(HTMLButtonElement.prototype);

MyButtonProto.sayhello = function() {
  alert('hello');
};

var MyButton = document.registerElement('my-button', {
  prototype: MyButtonProto
});


var myButton = new MyButton();
document.body.appendChild(myButton);

myButton.sayhello(); // alert: "hello"
```
然后在 HTML 中要这么使用：

`<button is="button-hello">hello world</button> `

使用 is 属性来声明一个扩展的类型，看起来也蛮酷的。生命周期和自定义元素标签的保持一致。

当我们需要多个标签组合成新的元素时，我们可以使用自定义的元素标签，但是如果只是需要在原有的 HTML 标签上进行扩展的话，使用 is 的这种元素扩展的方式就好。

原有的 createElement 和 createElementNS，在 Web Components 标准中也扩展成为支持元素扩展，例如要创建一个 button-hello：

`const hello = document.createElement('button', 'button-hello') `

标准文档中还有很多细节上的内容，例如接口的参数说明和要求，回调队列的实现要求等，这些更多是对于实现这个标准的浏览器开发者的要求，这里不做详细描述了，内容很多，有兴趣的自行查阅：Cutsom Elements 2016.02.26。

> 和最新版的区别

前边我提到说文档的更新变化很快，截止至我写这个文章的时候，最新的文档是这个：Custom Elements 2016.07.21。

细节不做描述了，讲讲我看到的最大变化，就是向 ES6 靠拢。大致有下边三点：

- 从原本的扩展 prototype 来定义元素调整为建议使用 class extends 的方式
- 注册自定义元素接口调整，更加方便使用，传入 type 和 class 即可
- 生命周期回调调整，createdCallback 直接用 class 的 constructor

前两个点，我们直接看下代码，原本的代码按照新的标准，应该调整为：

```js
class ButtonHelloElement extends HTMLButtonElement {
	constructor() {
		super();
		this.addEventListener('clicl', () => {
			alert('hello world');
		})
	}
}

customElements.define('hello-world', ButtonHelloElement, {extends: 'button'});
```

从代码上看会感觉更加 OO，编写上也比原本要显得方便一些，原本的生命周期回调是调整为新的：

- constructor in class 作用相当于原本的 createdCallback
- connectedCallback 作用相当于 attachedCallback
- disconnectedCallback 作用相当于 detachedCallback
- adoptedCallback 使用 document.adoptNode(node) 时触发
- attributeChangedCallback 和原本保持一致

connect 事件和插入元素到 document 有些许区别，主要就是插入元素到 document 时，元素状态会变成 connected，这时会触发 connectedCallback，disconnect 亦是如此。

> HTML Imports

`<link rel="import" href="/components/header.html"> `

document

有一点值得留意的是，在 import 的 HTML 中，我们编写的 script 里边的 document 是指向 import 这个 HTML 的主 HTML 的 document。

如果我们要获取 import 的 HTML 的 document 的话，得这么来：

`const d = document.currentScript.ownerDocument`

> Shadow DOM

***概述***

Shadow DOM 好像提出好久了，最本质的需求是需要一个隔离组件代码作用域的东西，例如我组件代码的 CSS 不能影响其他组件之类的，而 iframe 又太重并且可能有各种奇怪问题。

可以这么说，Shadow DOM 旨在提供一种更好地组织页面元素的方式，来为日趋复杂的页面应用提供强大支持，避免代码间的相互影响。

![图示]({{ site.baseurl }}/post_imgs/shadowdom.jpg)

createShadowRoot() 是现在 chrome 实现的 API，来自文档：https://www.w3.org/TR/2014/WD...。最新的文档 API 已经调整为 attachShadow()。

返回的 Shadow Root 对象从 DocumentFragment 继承而来，所以可以使用相关的一些方法，例如shadowRoot.getElementById('id') 来获取 Shadow DOM 里边的元素。

	const div = document.getElementById('id') 
	const shadowRoot = div.createShadowRoot() 
	const span = document.createElement('span') 
	
	span.textContent = 'hello world' 
	shadowRoot.appendChild(span)  

Shadow DOM 本身就为了代码隔离而生，所以在 document 上使用 query 时，是没法获取到 Shadow DOM 里边的元素的，需要在 Shadow Root 上做 query 才行。

在这里附上一个文档，里边有详细的关于新的标准和现在 blink 引擎实现的 Shadow DOM 的区别，官方上称之为 v0 和 v1：Shadow DOM v1 in Blink。

> API

Shadow Root 除了从 DocumentFragment 继承而来的属性和方法外，还多了另外两个属性：

- host 只读属性，用来获取这个 Shadow Root 所属的元素
- innerHTML 用来获取或者设置里边的 HTML 字符串，和我们常用的 element.innerHTML 是一样的
- 另外，在最新的标准文档中，元素除了上边提到的 attachShadow 方法之外，还多了三个属性：

- assignedSlot 只读，这个元素如果被分配到了某个 Shadow DOM 里边的 slot，那么会返回这个对应的 slot 元素
- slot 元素的 slot 属性，用来指定 slot 的名称
- shadowRoot 只读，元素下面对应的 Shadow Root 对象
slot 是什么?接着看下边的内容，看完下一节的最后一部分就会明白上述内容和 slot 相关的两个 API 有什么作用。

- slot

slot

slot 提供了在使用自定义标签的时候可以传递子模板给到内部使用的能力，可以简单看下 Vue 的一个例子。

我们先来看下现在 chrome 可以跑的 v0 版本，这一个版本是提供了一个 content 标签，代表了一个占位符，并且有一个 select 属性用来指定使用哪些子元素。

	<!-- component input-toggle template --> 
	<input type="checkbox"></input> 
	<content select=".span"></content>  

自定义的元素里边的子元素代码是这样的：

	<input-toggle name="hello"> 
	<span>hello</span> 
	<span class="span">test</span> 
	</input-toggle>  

那么展现的结果会和下边的代码是一样的：

	<input-toggle name="hello"> 
	<input type="checkbox"></input> 
	<span class="span">test</span> 
	</input-toggle>  

这里只是说展现结果，实际上，input-toggle 里边应该是创建了一个 Shadow DOM，然后 content 标签引用了目标的 span 内容

然后，是最新标准中的 slot 使用方式，直接上例子代码：

	<!-- component input-toggle template --> 
	<input type="checkbox"></input> 
	<slot name="text"></slot>  

在自定义的元素标签是这么使用 slot 的：

	<input-toggle name="hello"> 
	<input type="checkbox"></input> 
	<span class="span" slot="text">test</span> 
	</input-toggle> 

通过 slot="text" 的属性来让元素内部的 slot 占位符可以引用到这个元素，多个元素使用这个属性也是可以的。这样子我们便拥有了使用标签是从外部传 template 给到自定义元素的内部去使用，而且具备指定放在那里的能力。

### CSS 相关

因为有 Shadow DOM 的存在，所以在 CSS 上又添加了很多相关的东西，其中一部分还是属于讨论中的草案，命名之类的可能会有变更，下边提及的内容主要来自文档：Shadow DOM in CSS scoping 1，很多部分在 chrome 是已经实现的了，有兴趣可以写 demo 试试。

因为 Shadow DOM 很大程度上是为了隔离样式作用域而诞生的，主文档中的样式规则不对 Shadow DOM 里的子文档生效，子文档中的样式规则也不影响外部文档。

但不可避免的，在某些场景下，我们需要外部可以控制 Shadow DOM 中样式，如提供一个组件给你，有时候你会希望可以自定义它内部的一些样式，同时，Shadow DOM 中的代码有时候可能需要能够控制其所属元素的样式，甚至，组件内部可以定义上边提到的通过 slot 传递进来的 HTML 的样式。所以呢，是的，CSS 选择器中添加了几个伪类，我们一一来看下它们有什么作用。

在阅读下边描述的时候，请留意一下选择器的代码是在什么位置的，Shadow DOM 内部还是外部。

:host 用于在 Shadow DOM 内部选择到其宿主元素，当它不是在 Shadow DOM 中使用时，便匹配不到任意元素。

在 Shadow DOM 中的 * 选择器是无法选择到其宿主元素的。

:host( `<selector>` ) 括号中是一个选择器，这个可以理解为是一个用于兼容在主文档和 Shadow DOM 中使用的方法，当这个选择器在 Shadow DOM 中时，会匹配到括号中选择器对应的宿主元素，如果不是，则匹配括号中选择器能够匹配到的元素。

文档中提供了一个例子：

	<x-foo class="foo"> 
	<"shadow tree"> 
		<div class="foo">...</div> 
	</> 
	</x-foo> 

在这个 shadow tree 内部的样式代码中，会有这样的结果：

:host 匹配` <x-foo>` 元素
x-foo 匹配不到元素
.foo 只匹配到 `<div>` 元素
.foo:host 匹配不到元素
:host(.foo) 匹配 `<x-foo>` 元素
:host-context( `<selector> `)，用于在 Shadow DOM 中来检测宿主元素的父级元素，如果宿主元素或者其祖先元素能够被括号中的选择器匹配到的话，那么这个伪类选择器便匹配到这个 Shadow DOM 的宿主元素。个人理解是用于在宿主元素外部元素满足一定的条件时添加样式。

::shadow 这个伪类用于在 Shadow DOM 外部匹配其内部的元素，而 /deep/ 这个标识也有同样的作用，我们来看一个例子：

	<x-foo> 
	<"shadow tree"> 
		<div> 
		<span id="not-top">...</span> 
		</div> 
		<span id="top">...</span> 
	</> 
	</x-foo> 
 
对于上述这一段代码的 HTML 结构，在 Shadow DOM 外部的样式代码中，会是这样的：

x-foo::shadow > span 可以匹配到 #top 元素
`#top` 匹配不到元素
x-foo /deep/ span 可以匹配到 #not-top 和 #top 元素
/deep/ 这个标识的作用和我们的 > 选择器有点类似，只不过它是匹配其对应的 Shadow DOM 内部的，这个标识可能还会变化，例如改成 >> 或者 >>> 之类的，个人感觉， >> 会更舒服。

最后一个，用于在 Shadow DOM 内部调整 slot 的样式，在我查阅的这个文档中，暂时是以 chrome 实现的为准，使用 ::content 伪类，不排除有更新为 ::slot 的可能性。我们看一个例子来了解一下，就算名称调整了也是差不多的用法：

	<x-foo> 
	<div id="one" class="foo">...</div> 
	<div id="two">...</div> 
	<div id="three" class="foo"> 
		<div id="four">...</div> 
	</div> 
	<"shadow tree"> 
		<div id="five">...</div> 
		<div id="six">...</div> 
		<content select=".foo"></content> 
	</"shadow tree"> 
	</x-foo>  

在 Shadow DOM 内部的样式代码中，::content div 可以匹配到 #one，#three 和 #four，留意一下 #two 为什么没被匹配到，因为它没有被 content 元素选中，即不会进行引用。如果更换成 slot 的 name 引用的方式亦是同理。

层叠规则，按照这个文档的说法，对于两个优先级别一样的 CSS 声明，没有带 !important 的，在 Shadow DOM 外部声明的优先级高于在 Shadow DOM 内部的，而带有 !important 的，则相反。个人认为，这是提供给外部一定的控制能力，同时让内部可以限制一定的影响范围。

继承方面相对简单，在 Shadow DOM 内部的顶级元素样式从宿主元素继承而来。

至此，Web Components 四个部分介绍结束了，其中有一些细节，浏览器实现细节，还有使用上的部分细节，是没有提及的，因为详细记录的话，还会有很多东西，内容很多。当使用过程中有疑问时可以再次查阅标准文档，有机会的话会再完善这个文章。下一部分会把这四个内容组合起来，整体看下 Web Components 是怎么使用的。

Web Components

Web Components 总的来说是提供一整套完善的封装机制来把 Web 组件化这个东西标准化，每个框架实现的组件都统一标准地进行输入输出，这样可以更好推动组件的复用。结合上边各个部分的内容，我们整合一起来看下应该怎么使用这个标准来实现我们的组件：

	<!-- components/header.html --> 
	<template id=""> 
	<style> 
	::content li { 
	display: inline-block; 
	padding: 20px 10px; 
	} 
	</style> 
	<content select="ul"></content> 
	</template> 
	<script> 
	(function() { 
	const element = Object.create(HTMLInputElement.prototype) 
	const template = document.currentScript.ownerDocument.querySelector('template') 
	
	element.createdCallback = function() { 
		const shadowRoot = this.createShadowRoot() 
		const clone = document.importNode(template.content, true) 
		shadowRoot.appendChild(clone) 
	
		this.addEventListener('click', function(event) { 
		console.log(event.target.textContent) 
		}) 
	} 
	
	document.registerElement('test-header', { prototype: element }) 
	})() 
	</script> 

这是一个简单的组件的例子，用于定义一个 test-header，并且给传递进来的子元素 li 添加了一些组件内部的样式，同时给组件绑定了一个点击事件，来打印点击目标的文本内容。

看下如何在一个 HTML 文件中引入并且使用一个组件：

	<!-- index.html --> 
	<!DOCTYPE html> 
	<html> 
	<head> 
		<meta charset="utf-8"> 
		<title></title> 
 
    <link rel="import" href="components/header.html"> 
	</head> 
	<body> 
		<test-header> 
		<ul> 
			<li>Home</li> 
			<li>About</li> 
		</ul> 
		</test-header> 
	</body> 
	</html> 

一个 import 的 <link> 把组件的 HTML 文件引用进来，这样会执行组件中的脚本，来注册一个 test-header 元素，这样子我们便可以在主文档中使用这个元素的标签。

上边的例子是可以在 chrome 正常运行的。

所以，根据上边简单的例子可以看出，各个部分的内容是有机结合在一起，Custom Elements 提供了自定义元素和标签的能力，template 提供组件模板，import 提供了在 HTML 中合理引入组件的方式，而 Shadow DOM 则处理组件间代码隔离的问题。

不得不承认，Web Components 标准的提出解决了一些问题，必须交由浏览器去处理的是 Shadow DOM，在没有 Shadow DOM 的浏览器上实现代码隔离的方式多多少少有缺陷。个人我觉得组件化的各个 API 不够简洁易用，依旧有 getElementById 这些的味道，但是交由各个类库去简化也可以接受，而 import 功能上没问题，但是加载多个组件时性能问题还是值得商榷，标准可能需要在这个方面提供更多给浏览器的指引，例如是否有可能提供一种单一请求加载多个组件 HTML 的方式等。

在现在的移动化趋势中，Web Components 不仅仅是 Web 端的问题，越来越多的开发者期望以 Web 的方式去实现移动应用，而多端复用的实现渐渐是以组件的形式铺开，例如 React Native 和 Weex。所以 Web Components 的标准可能会影响到多端开发 Web 化的一个模式和发展。

### 拓展之模板引擎 ---Handlebars

(Mustache 模板和 Handlebars 是兼容的，所以你可以把Mustache模板拿来导入到Handlebars中，并开始使用Handlebars所提供的更丰富的功能。)

> 为什么需要模板引擎

关于前端的模板引擎，我用一个公式来解释

 
				模板引擎 
	模板 + 数据 ========> html页面

就我现在的项目而言,我还停留在进行发送Ajax请求到后台后,利用模板引擎拼接接受到的JSON字符串,展现到页面的地步

模板引擎就像是html的解析生成器，将对应的模板填充完数据之后生成静态的html页面。它可以在浏览器端（比如angular中指令所用的模板）也可以在服务器端执行，不过一般用于服务器端。因为它的一个作用是抽象公共页面来重用，如果在服务端填充数据，可以减少回填数据给页面的ajax请求，从而提升浏览器端整体页面渲染速度。

	模板最本质的作用是【变静为动】一切利用这方面的都是优势，不利于的都是劣势。要很好地实现【变静为动】的目的，有这么几点：
	1. 可维护性（后期改起来方便）；
	2. 可扩展性（想要增加功能，增加需求方便）；
	3. 开发效率提高（程序逻辑组织更好，调试方便）；
	4. 看起来舒服（不容易写错）；
	从以上四点，你仔细想想，前端模板是不是无论从哪方便优势体现都不是一点两点。其实最重要的一点就是：【视图（包括展示渲染逻辑）与程序逻辑的分离】分离的好处太多了，更好改了，更好加东西了，调试也方便了，看起来也舒服了，应用优秀的开发模式更方便了（mvvc，mvc等）.

**全球最受欢迎的模板引擎**

Handlebars是全球使用率最高的模板引擎,所以当之无愧是全球最受欢迎的模板引擎.Handlebars在许多前端框架中都被引入,比如在MUI和AmazeUI等框架,都推荐使用Handlebars.以AmazeUI为例,AmazeUI的文档中专门为Web组件提供了其Handlebars的编译模板

	```js
	Amaze UI 提供的开发模板中，包含一个 widget.html 文件，里面展示了 Widget 在纯浏览器环境中的使用。

	要点如下：

	1.引入 Handlebars 模板 handlebars.min.js；
	2.引入 Amaze UI Widget helper amui.widget.helper.js；
	3.根据需求编写模板 <script type="text/x-handlebars-template" id="amz-tpl">{{>slider slider}}</script>；
	4.传入数据，编译模板并插入页面中。

	$(function() {
	var $tpl = $('#amz-tpl');
	var source = $tpl.text();
	var template = Handlebars.compile(source);
	var data = {};
	var html = template(data);

	$tpl.before(html);
	});
	```

> 那些年我用过的模板引擎

接触过的模板引擎不算多，最早应该是jsp，本质上也是一种模板引擎，再到功能稍微强大的freemarker，这两种都是属于java语系的。js语系的jade和ejs我都有所接触，不过不常用，jade那种类python的语法规则以及较低的解析效率都让我不敢兴趣，**Express框架也只是早起将其作为模板引擎。后来换成了强大的ejs，无论是功能还是写法上都接近jsp了。直到最新的Express4发布，默认改为了弱逻辑的比较简洁的模板引擎handlebars。**

> 初级玩家：表达式

数据：

	{ 
		title: 'Express', 
		obj:{
			version: 'v4.3', 
			category: 'node', 
			"date~": '2016'
		}
	}

模板：

	<p>{ {title} }</p>
	<p>{ {obj.version} }</p>
	<p>{ {obj/category} }</p>
	<p>{ {obj.date~} }</p>

handlebars中变量都添加双花括号来表示（类似Angular），对比ejs的"<%%>“来说看起来没什么区别，其实这是很人性化的，想一下你键盘上的位置，再考虑按这几个字符的难易程度你就懂了。
其中要访问变量的属性值时可以用类似json格式的”."，也可以用"/"。

其中变量名不可包含以下字符。如果包含则不被解析，如上的"{{obj.date~}}"。

`空格 ! " # % & ' ( ) * + , . / ; < = > @ [ \ ] ^ ` { | } ~`
但可以用` " , ’ , [] `来转译这些特殊字符。

这一条规则意味着 “&&”,"||","!"这类逻辑判断是不能出现在表达式中的！ （看着这一条是不是觉得弱爆了，要不然怎么叫若逻辑模板引擎呢~哈哈，不过当然有另外的解决办法）。

> 中级玩家：helper

可以理解为它是注入到模板中的一个函数，用来接收参数并进行逻辑处理。

**if else**

	```js
	{ {#if author} }
		<h1>{ {firstName} } { {lastName} }</h1>
	{ {else} }
		<h1>Unknown Author</h1>
	{ {/if} }
	{ {#if isActive} }
	<img src="star.gif" alt="Active">
	{ {else if isInactive} }
	<img src="cry.gif" alt="Inactive">
	{ {/if} }
	```

和一般的编程语言的 if-else 代码块是差不多的，不过再次重申由于上面提到的特殊字符，所以if条件中是不能有逻辑表达式的，只能是变量或者值。

**unless**

还是因为上面提到的那些字符，handlebars不支持逻辑非("!")，所以又有了一个与if相反的helper

	```js
	{ {#unless license} }
	<h3 class="warning">WARNING: This entry does not have a license!</h3>
	{ {/unless} }
	```

上面这段代码就等价于

	```js
	{ {#if license} }
	{ {else} }
	<h3 class="warning">WARNING: This entry does not have a license!</h3>
	{ {/if} }
	```

**each**
都知道each相当于for循环。不过有些地方需要注意：

- 可以用相对路径的方式来获取上一层的上下文。（上下文概念跟js中的上下文差不多，比如在each passage代码块内，每一次循环上下文一次是passage[0],passage[1]…）
- 一些默认变量，@first/@last 当该对象为数组中第一个/最后一个时返回真值。如果数组成员为值而非对象，@index表示当前索引值，可以用@key或者this获取当前值
- 可以用 as |xxx|的形式给变量起别名，循环中通过别名可以引用父级变量值。当然也可以通过相对路径的方式引用父级变量。

```js
	{ {#each passage} }
		{ {#each paragraphs} }
		{ {@../index} }:{ {@index} }:{ {this} }</p>
		{ {else} }
		<p class="empty">No content</p>
		{ {/each} }
	{ {/each} }
	{ {#each array as |value, key|} }
	{ {#each child as |childValue, childKey|} }
		{ {key} } - { {childKey} }. { {childValue} }
	{ {/each} }
	{ {/each} }
```

同时也可以用来遍历对象，这时@key表示属性名,this表示对应的值

	```js
	{ {#each object} }
	{ {@key} }: { {this} }
	{ {/each} }
	```

**with**

类似js中的with，可以配合分页使用，限定作用域。

	{ {#with author as |myAuthor|} }
	<h2>By { {myAuthor.firstName} } { {myAuthor.lastName} }</h2>
	{ {else} }
	<p class="empty">No content</p>
	{ {/with} }

lookup
这个用于以下这种并列数组的情况，可以按照索引来找兄弟变量对应的值。理解起来有些困难，直接看代码

```js
{
    groups: [
        {id: 1, title: "group1"},
        {id: 2, title: "group2"},
    ],
    users: [
        {id:1, login: "user1", groupId: 1},
        {id:2, login: "user2", groupId: 2},
        {id:3, login: "user3", groupId: 1}
    ],
    infos: [
        'a','b','c'
    ]
}
<table>
    { {#each users} }
        <tr data-id="{ {id} }">
            <td>{ {login} }</td>
            <td data-id="{ {groupId} }">{ {lookup ../infos @index} }</td>
        </tr>
    { {/each} }
</table>
//user1   a
//user2   b
//user3   c
```

这里在users数组中按照索引值引用infos数组中对应的值，如果想引用groups中的groupId呢？很简单，用with。

```js
<table>
    { {#each users} }
        <tr data-id="{ {id} }">
            <td>{ {login} }</td>
            <td data-id="{ {groupId} }">{ {#with (lookup ../groups @index)} }{ {title} }{ {/with} }</td>
        </tr>
    { {/each} }
</table>
```

> 自定义helper

内置的helper不够强大，所以通常需要写js代码自定义helper，先看一个简单的单行helper。

1. 行级helper

**传值**
数值、字符串、布尔值这种常规数据可以直接传入，同时也可以传递JSON对象（但只能传一个），以key=value这种形式写在后面，最后就可以通过参数的hash属性来访问了。

模板

`{ {agree_button "My Text" class="my-class" visible=true counter=4} }`

代码

	hbs.registerHelper('agree_button', function() {
	console.log(arguments[0]);//==>"My Text"
	console.log(arguments[1].hash);//==>{class:"my-class",visible:true,conter:4}
	}

**传变量**
传变量时可以用this指针来指代它访问属性，通过逻辑判断后可以返回一段html代码，不过太建议这样做。考虑以后的维护性，这种html代码和js代码混合起来的维护性是比较差的，如果要抽象层组件还是使用分页比较好。

模板：

`{ {agree_button person} }`

注册helper：

	hbs.registerHelper('agree_button', function(p) {
	console.log(p===this);//==> true
	var blog = hbs.handlebars.escapeExpression(this.person.blog),
		name = hbs.handlebars.escapeExpression(this.person.name);

	return new hbs.handlebars.SafeString(
		"<a href='"+blog+"'>"+ name + "</button>"
	);
	});

数据：

	var context = {
		person:{name: "亚里士朱德", blog: "https://yalishizhude.github.io"} };
	};

html页面：

  `<a href="https://yalishizhude.github.io">亚里士朱德</a>`

当内容只想做字符串解析的时候可以用 escapeExpression 和 SafetString 函数。

2. 块级helper

块级helper获取参数的方式跟之前差不多，只是最后多了一个参数，这个参数有两个函数fn和revers可以和else搭配使用。后面将会讲解。

模板：

	{ {#list nav} }
	<a href="{ {url} }">{ {title} }</a>
	{ {/list} }

注册helper：

	Handlebars.registerHelper('list', function(context, options) {
	var ret = "<ul>";

	for(var i=0, j=context.length; i<j; i++) {
		ret = ret + "<li>" + options.fn(context[i]) + "</li>";
	}

	return ret + "</ul>";
	});

数据：

	{
	nav: [
		{ url: "https://yalishihzude.github.io", title: "blog" },
		{ url: "https://www.github.com/yalishizhude", title: "github" },
	]
	}

html页面：

	<ul>
		<li>  <a href="https://yalishizhude.github.io">blog</a> </li>
		<li>  <a href="https://www.github.com/yalishizhude">github</a> </li>
	</ul>

自定义helper

each的index变量比较常用，但是它是从0开始的，往往不符合业务中的需求，这里写个helper来扩展一下。

注册helper：

	hbs.registerHelper('eval', function(str, options){
		var reg = /\{\{.*?\}\}/g;
		var result = false;
		var variables = str.match(reg);
		var context = this;
		//如果是each
		if(options.data){
		context.first = context.first||options.data.first;
		context.last = context.last||options.data.last;
		context.index = context.index||options.data.index;
		context.key = context.key||options.data.key;
		}
		_.each(variables, function(v){
		var key = v.replace(/{ {|} }/g,"");
		var value = typeof context[key]==="string"?('"'+context[key]+'"'):context[key];
		str = str.replace(v, value);
		});
		try{
		result = eval(str);
		return new hbs.handlebars.SafeString(result);
		}catch(e){
		return new hbs.handlebars.SafeString('');
		console.log(str,'--Handlerbars Helper "eval" deal with wrong expression!');
		}
	});

模板：

	{ {#each list} }
	{ {eval '{ {index} }+1'} }
	{ {/each} }

上面说到if不支持复杂的表达式，如果是“&&”操作还可以用子表达式来实现，更加复杂的就不好办了，这里我写了一个helper来实现。

注册helper：

	hbs.registerHelper('ex', function(str, options) {
		var reg = /\{\{.*?\}\}/g;
		var result = false;
		var variables = str.match(reg);
		var context = this;
		_.each(variables, function(v){
		var key = v.replace(/{ {|} }/g,"");
		var value = typeof context[key]==="string"?('"'+context[key]+'"'):context[key];
		str = str.replace(v, value);
		});
		try{
		result = eval(str);
		if (result) {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
		}catch(e){
		console.log(str,'--Handlerbars Helper "ex" deal with wrong expression!');
		return options.inverse(this);
		}
	});

模板：

	{ {#ex "{ {state} }==='submiting'"} }
	<i class="icon cross-danger">1</i>
	{ {else} }
	<i class="icon cross-success">2</i>
	{ {/ex} }

先将整个逻辑表达式作为一个字符串传入，然后替换其中的变量值，最后用eval函数来解析表达式，同时增加异常处理。

### 高级玩家：partial

比较推崇使用分页来实现组件化。分页跟helper一样需要先注册。在hbs模块中可以批量注册，比较简单。

`hbs.registerPartials(__dirname + '/views/partials');`

**基础引用**

用“>”来引用模板，这种情况一般用来处理页头页尾这种简单的分页。后面可以传入参数。

`{ {> myPartial param} }`

当使用块级表达式时，我们通常添加“#”，而分页是“>”，所以块级分页使用“#>”，这里表示如果layout分页不存在则显示块内的内容My Content。

	{ {#> layout } }
	My Content
	{ {/layout} }

**动态分页**

当然也可以用表达式来代替分页名称

`{ {> (whichPartial) } }`

当分页中一部分代码是固定的，另一部分是变化的时候，可以在分页中添加“@partial-block”，这时当引用这个分页时，在内部编写代码将会填充到这个位置。

partial.hbs：

	亚里士朱德
	{ {> [@partial-block](/user/partial-block) } }

模板：

	{ {#>partial} }
	https:yalishizhude.github.io
	{ {/partial} }

html页面：

	亚里士朱德
	https:yalishizhude.github.io

内联分页

当有多段代码需要填充到分页时,可以用如下方法。分页中内嵌分页变量，模板中通过内联分页的方式传入。

模板：

	{ {#> partial} }
	{ {#*inline "nav"} }
		亚里士朱德
	{ {/inline} }
	{ {#*inline "content"} }
		https://yalishizhude.github.io
	{ {/inline} }
	{ {/partial} }
	partial.hbs：

	<div class="nav">
	{ {> nav} }
	</div>
	<div class="content">
	{ {> content} }
	</div>

html页面：

	<div class="nav">
		亚里士朱德
	</div>
	<div class="content">
		https://yalishizhude.github.io
	</div>

大师级玩家：API
本文列举的只是handlebars中最重要和常用的功能，更多细碎的功能可以去查看
官方API。

开头的问题
 我想将导航条写成一个分页(partial)，导航条左边的文字标题是可以通过参数传递的，但是右边的内容可能是文字、图片其它元素，需要具体业务自定义实现。我又不想把html代码写在js中，所以希望在模板中将这段未知的模板代码填充到分页中进行展现。我在官网文档中找到了 {{>@partial-block}}来实现此功能，但是本机实验一直解析报错。
解决过程：
这个问题原因可能有两个，一是官方文档有错，二是本机环境的插件有问题（Express用hbs模块，该模块封装了handlebars引擎模块）。为了验证官方文档的正确性，我找到了一个在线handlebars解析器，输入文档中的代码时可以正确解析，那么只可能出现在hbs模块了。这时在github上找到hbs模块最新版本为4，查看本地版本为3，更新后果然可以正常解析了。



### 如何使用Handlebars

1. 下载Handlebars

- 通过Handlebars官网下载: http://handlebarsjs.com./installation.html
- 通过npm下载: npm install --save handlebars
- 通过bower下载: bower install --save handlebars
- 通过Github下载: https://github.com/daaain/Handlebars.git
- 通过CDN引入:https://cdnjs.com/libraries/handlebars.js

2. 引入Handlebars

通过`<script>`标签引入即可,和引入jQuery库类似:

`<script src="./js/handlebars-1.0.0.beta.6.js"></script>`

3. 创建模板

步骤一: 通过一个`<script>`将需要的模板包裹起来
步骤二: 在`<script>`标签中填入type和id
type类型可以是除text/javascript以外的任何MIME类型,但推荐使用type="text/template",更加语义化
id是在后面进行编译的时候所使用,让其编译的代码找到该模板.
步骤三: 在`<script>`标签中插入我们需要的html代码,根据后台给我们的接口文档,修改其需要动态获取的内容

	<script type="text/template" id="myTemplate">
		<div class="demo">
			<h1>{{name}}</h1>
			<p>{{content}}</p>
		</div>
	</script>

4. 在JS代码中编译模板

	//用jQuery获取模板
	var tpl   =  $("#myTemplate").html();
	//预编译模板
	var template = Handlebars.compile(tpl);
	//匹配json内容
	var html = template(data);
	//输入模板
	$('#box').html(html);

以上述代码为例进行解释:

步骤一: 获取模板的内容放入到tpl中,这里$("#myTemplate")中填入的内容为你在上一步创建模板中所用的id.
提醒: 这里我使用的jQuery的选择器获取,当然,你可以使用原生javascript的DOM选择器获取,例如:docuemnt.getElementById('myTemplate')和document.querySelector('#myTemplate')

步骤二: 使用Handlebars.compile()方法进行预编译,该方法传入的参数即为获取到的模板

步骤三: 使用template()方法进行编译后得到拼接好的字符串,该方法传入的参数即为上一步预编译的模板.

步骤四: 将编译好的字符串插入到你所希望插入到的html文档中的位置,这里使用的是jQuery给我们提供的html()方法.同样,你也可以使用原生的innerHTML

### 案例演示

以下面的慢慢买网站为例,该项目中的手机列表,是通过Ajax动态获取的,我们不可能在html文档中写入全部的手机列表代码,这是不可能的.所以我们需要通过Handlebars来帮我们将后台传递过来的数据动态的显示到html文档中.

![图示]({{ site.baseurl }}/post_imgs/handlebar1.png)

1. 在HTML中引入:Handlebars,jQuery和本页的Js代码

```js
<script src="./lib/bootstrap/js/jquery-3.2.1.js"></script> //Handlebars
<script src="./js/handlebars-1.0.0.beta.6.js"></script> //jQuery
<script src="./js/product.js"></script>  //本页的Js代码
```

2. 创建模板
在未插入模板的情况下,页面显示如下,现在我们来使用Handlebars让数据动态的显示在网页上.

![图示]({{ site.baseurl }}/post_imgs/handlebar2.png)

```js
<!--定义模板 -->
    <script type="text/template" id="product-list-tepl">
        {{#each result}} 
        <li>
            <a href="#">
                <div class="product-img">
                    {{{productImg}}}
                </div>
                <div class="product-text">
                    <h5>
                        {{productName}}
                    </h5>
                    <p>{{productPrice}}</p>
                </div>
                <div class="other">
                    <span>{{productQuote}}</span>
                    <span>{{productCom}}</span>
                </div>
            </a>
        </li>
        {{/each}}
    </script>
```

3. 在JS代码中编译模板

```js
//定义getList()函数来发送Ajax请求,传递的参数为后台给的接口文档中定义的参数
function getList(categoryId,pageid){
    //调用jQuery的Ajax()方法来发送Ajax请求
    $.ajax({
        type:'get',
        url:'http://182.254.146.100:3000/api/getproductlist',
        data:{
            pageid:pageid||1,
            categoryid:categoryId
        },
        success:function(data){
            //用zepto获取模板
            var tpl   =  $("#product-list-tepl").html();
            //预编译模板
            var template = Handlebars.compile(tpl);
            //匹配json内容
            var html = template(data);
            //插入模板,到ul中
            $('.product-list ul').html(html);
        }
    })
}

//入口函数
$(function(){
    //获取到查询字符串的id
    var categoryId = Number(GetQueryString("categoryid"));  //getQueryString()是获取上一步传递过来的查询字符串的方法
    //调用定义的getList()获取手机列表
    getList(categoryId);
})

//获取上一步传递过来的查询字符串的方法
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
```
4. 插入模板后的页面如下

![图示]({{ site.baseurl }}/post_imgs/handlebar3.png)

### 总结
handlebars让我们看到一个好的插件应该有的特征：

可识别性。接口简单，使用方便，容易上手。
高可用性。自带常用一些功能（helper），不求多而求精。
可扩展性。复杂的业务逻辑，开发人员可以自定义helper去扩展和实现。

参考及引用：

作者：Lee_tanghui
链接：https://www.jianshu.com/p/2ad73da601fc