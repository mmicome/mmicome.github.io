# <sapn style="color:#93c; font-size:50px;">javascript

### BOM对象:

1. DOM 是 W3C 的标准； [所有浏览器公共遵守的标准];DOM是HTML与XML的应用编程接口（API），DOM将整个页面映射为一个由层次节点组成的文件。有1级、2级、3级共3个级别
2. BOM 是 各个浏览器厂商根据DOM在各自浏览器上的实现;[表现为不同浏览器定义有差别,实现方式不同]
3. window 是 BOM 对象，而非 js 对象；

*javacsript是通过访问BOM（Browser Object Model）对象来访问、控制、修改客户端(浏览器)，由于BOM的window包含了document，window对象的属性和方法是直接可以使用而且被感知的，因此可以直接使用window对象的document属性，通过document属性就可以访问、检索、修改XHTML文档内容与结构。因为document对象又是DOM（Document Object Model）模型的根节点。可以说，BOM包含了DOM(对象)，浏览器提供出来给予访问的是BOM对象，从BOM对象再访问到DOM对象，从而js可以操作浏览器以及浏览器读取到的文档。其中*

[JavaScript BOM 参考教程](http://www.dreamdu.com/javascript/window/)

### _DOM包含：_
Window对象包含属性：document、location、navigator、screen、history、frames
Document根节点包含子节点：forms、location、anchors、images、links
从window.document已然可以看出，DOM的最根本的对象是BOM的window对象的子对象。
区别：DOM描述了处理网页内容的方法和接口，BOM描述了与浏览器进行交互的方法和接口。

( _IE 扩展了 BOM，加入了 ActiveXObject 类，可以通过 JavaScript 实例化 ActiveX 对象_ )

![BOM-DOM](https://github.com/mmicome/html/raw/master/everything-for-one/web/javascript/common-pics/BOM-DOM.jpg)

### 客户端浏览器对象
| BOM对象 | 说明 |
| ------- | --- |
| Window | 客户端js顶层对象，当`<body>` `<frameset>`出现时，自动创建 |
| Navigator | 包含客户端浏览器的信息 |
| Screen | 包含客户端显示屏信息 |
| History | 包含浏览器访问过的URL |
| Location | 包含当前URL的信息 |
| Document | 包含整个HTMl文档，可被用来访问的页面中的所有元素 |

- <span style="color:red;">客户端js中，所有对象都是作为Window对象属性进行引用的。Window对象是全局对象，因此所有全局变量和函数都被定义为该对象的属性或方法。（思考：在自定义普通对象时，在对象内定义的变量和函数会成为该对象的属性和方法，而Window是最顶层的对象:</span>

![](https://github.com/mmicome/html/raw/master/everything-for-one/web/javascript/common-pics/Windows.png)

- <span style="color:red;">每一个浏览器窗口和框架都对应一个windows对象，都为客户端js定义了唯一的执行环境，即，js在一个框架中声明的全局变量并不是另一个框架中的全局变量，但第二个框架可以存取第一个框架中的变量。</span>

### window对象
_window属性_

>window.status  //可以使状态栏的文本暂时改变  

>window.defaultStatus  //默认的状态栏信息，可在用户离开当前页面前一直改变文本  

>window.closed  //当前窗口是否关闭，ture or false;   

>window.document  //对Document对象的引用，该对象代表窗口中显示的html文档   

>window.frame[]  //代表窗口中各个框架   

>window.name //窗口的名称，可被`<a>`的target引用	

>window,hitory //对History对象的引用   

>window,location  //对文档URL的引用

>window.opener //对打开当前窗口的window对象的引用    

>window.parent  //对父级框架的引用   

>window.self //自身引用属性   

>window.top  //对顶级窗口window的引用   

_window方法_

![bom](https://github.com/mmicome/html/raw/master/everything-for-one/web/javascript/common-pics/window-func.jpg)

- _window与self对象:_
self对象与window对象完全相同，self通常用于确认就是在当前的窗体内

- _blur函数语法_
可以使用blur函数使窗体或空间失去焦点，例如当按钮处于焦点状态下时，会有虚线框，使用blur函数可以去除焦点，从而使虚线框消失
`<a href="#" onfocus="blur()">去除链接上的虚线框，点击链接测试</a>`

- _window.opener_
通过opener可以实现跨窗体之间的通讯，但是要保证是在同一域名下，而且一个窗体要包含另一个窗体的opener。 //为什么设置为百度不再同一域名，依然打开，且为true?
```js
var oWin=window.open("http://www.dreamdu.com/", "dreamduwin");
if(!oWin||!oWin.closed)
{
        document.write(oWin.opener==window);
}
上面的判断是必要的，首先!oWin用于判断oWin对象是否为null，!oWin.closed用于判断oWin对象对象的窗体是否已关闭。
```
- _setTimeout(codes, interval);_
	- codes -- 代码段的字符串表示(与eval函数的参数相同)，或者是匿名函数、函数名
	- interval -- 等待的毫秒数(通常用于产生动画效果)</br>
setTimeout函数的ID标识，每次调用setTimeout函数都会产生一个唯一的ID，可以通过clearTimeout函数(此函数的参数接收一个setTimeout返回的ID)暂停setTimeout函数还未执行的代码
```js
var icolor=0;
var iNum=256;
setTimeout(setbgColor, 500);
function setbgColor() {
        document.bgColor="#"+icolor*iNum*iNum*iNum+icolor*iNum*iNum+icolor*iNum;
        if((icolor+=10)<iNum)
        {
                setTimeout(setbgColor, 500);
        }
}
使用setTimeout函数改变网页的背景颜色
```


### Window对象生命周期

IE firefox中几个窗口属于同一进程，新建窗口，然后关闭窗口，新建窗口的window对象依然存在
Opera Chrome中，每打开一个窗口，都会新建一个进程，新开窗口关闭后，Window对象关闭;

##### window对象的全局作用域:

由于window对象同时扮演着ECMASript中Global对象的角色，因此所有在全局作用域中声明的变量，函数都会变成window对象的属性和方法。
```js
var age=29;  
function sayAge(){  
   alert(this.age);  
}  
alert(window.age); //29  
sayAge(); //29  
window.sayAge(); //29
```
全局变量会成为window对象的属性，而且定义全局变量与在window对象上直接定义属性还是有一点差别：全局变量不能通过delete操作符删除，而直接在window对象上的定义的属性可以；

```js
var age=29;  
function sayAge(){  
    alert(this.age);  
}  
delete window.age; 

```
alert,confirm,prompt方法的拓展
思路：重写方法，通过dhtml方式在客户端输出html片段，然后用css进行设置样式
```js
eg:
window.alert = function (title, info){
	document.write('<dl id="alert"<dt>' + title + '</dt><dd>' + info + '</dd><\/dl>')
}
alert("title", "info"); //结合prompt
```

#### document对象

>document对象：实际上是window对象的属性，document == window.document为true，是唯一一个既属于BOM又属于DOM的对象  

>document.lastModified  //获取最后一次修改页面的日期的字符串表示  

>document.referrer  //用于跟踪用户从哪里链接过来的  

>document.title  //获取当前页面的标题，可读写  

>document.URL  //获取当前页面的URL，可读写  返回或设置字符串，申明了装载文档的URL，除非发生服务器的重定向，否则，该属性值与window.location.href相同。

>document.anchors[0]或document.anchors["anchName"] //访问页面中所有的锚  

>document.forms[0]或document.forms["formName"]  //访问页面中所有的表单  

>document.images[0]或document.images["imgName"]  // 访问页面中所有的图像  

>document.links [0]或document.links["linkName"]  //访问页面中所有的链接 

>document.applets [0]或document.applets["appletName"]  //访问页面中所有的Applet  

>document.embeds [0]或document.embeds["embedName"]  //访问页面中所有的嵌入式对象  

>document.write(); 或document.writeln();  //将字符串插入到调用它们的位置  

### _<span style="color:#951">动态生成文档</span>_

两种方式：
1. 在文档解析之后，在调用事件处理函数时动态调用write（）或writeln()方法生成文档内容;
2. 在浏览器解析文档时动态输出信息;

方法一实例：
```js
function f() {
	document.write('<p>调用事件处理函数时动态生成文档</p>');
}
document.write('<p onclick="f()">文档解析时动态生成的内容</p><h2>我是测试的</h2>');
// 调用事件处理函数动态生成的文档内容会完全覆盖原文档内容（这里包括好h2），包括事件处理函数。
```
方法二实例
```js
//HTML
<frameset rows="36px, *, 56px" cols="*" frameborder="yes" border="1" framespacing="0">
	<frame src="frame-top.html" name="top" id="top">
	<frameset rows="*" cols="150px, *, 100px">
		<frame src="frame-left.html" id="frame-left" name="frame-left">
		<frame src="" id="frame-main" name="frame-main">
		<frame src="" id="frame-right" name="frame-right">
	</frameset>
	<frame src="frame-bottom.html" name="bottom" id="bottom">
</frameset>
//JS OF FRAME-BOTTOM
window.onload = function() {
    document.body.onclick = f;
}
function f(){
    parent.frames[3].document.open();
    parent.frames[3].document.write('<h2>我是谁</h2>');
    parent.frames[3].document.close();
}
// 提示和注释
重要事项：调用 open() 方法打开一个新文档并且用 write() 方法设置文档内容后，必须记住用 close 方法关闭文档，并迫使其内容显示出来。
注释：属于被覆盖的文档的一部分的脚本或事件句柄不能调用该方法，因为脚本或事件句柄自身也会被覆盖。
```

#### History 对象

>window.history.go(-1);  //访问浏览器窗口的历史，负数为后退，正数为前进 

>window.history.back();  //同上  

>window.history.forward();  //同上  

>window.history.length  //可以查看历史中的页面数   

#### <span style="color:red;">js访问框架历史记录</span>

`frames[n].history.back();`
`frames[n].history.forward();`
`frames[n].history.go(n);`


#### location对象

![http](https://github.com/mmicome/html/raw/master/everything-for-one/web/javascript/common-pics/location-http.png)

- location既是window对象的属性又是document对象的属性
- location的8个属性都是可读写的，但是只有href与hash的写才有意义。例如改变location.href会重新定位到一个URL，而修改location.hash会跳到当前页面中的anchor(`<a id="name">或者<div id="id">`等)名字的标记(如果有)，而且页面不会被重新加载

>location对象：表示载入窗口的URL，也可用window.location引用它  

>location.href  //当前载入页面的完整URL，，赋值新URL会使浏览器读取显示新URL内容
>location.portocol  //URL中使用的协议，即双斜杠之前的部分，如http 包括后缀的冒号

>location.host  //服务器的名字，如www.wrox.com  

>location.hostname  //通常等于host，有时会省略前面的www  

>location.port  //URL声明的请求的端口，默认情况下，大多数URL没有端口信息，如8080 

>location.pathname  //URL中主机名后的部分，如/pictures/index.htm  

>location.search  //执行GET请求的URL中的问号后的部分，又称查询字符串，如?param=xxxx  包括前导问号

>location.hash  //如果URL包含#，返回该符号之后的内容，如#anchor1  包括前导符#

>location.assign("http:www.baidu.com");  //同location.href，新地址都会被加到浏览器的历史栈中  

>location.replace("http:www.baidu.com");  //同assign()，但新地址不会被加到浏览器的历史栈中，不能通过back和forward访问  

>location.reload(true | false);  //重新载入当前页面，为false时从浏览器缓存中重载，为true时从服务器端重载，默认为false  

##### location对象还定义了reload(),replace()方法

    replace() 重装载一个新文档而无需创建新的历史记录，在历史记录表中，是新文档替换当前文档，这样就无法通过返回按钮返回当前文档。

- 要点一：window.location.href="新URL";或window.location="新Url";装载新文档，可以实现返回浏览。对于运用框架并且显示多个临时页的网站来说，replace()方法比较有用，临时页面不被存储。
- 区分window.location属性和Document对象location属性，前者引用一个location对象，而后者只是一个只读字符串，与document.URL同意，但是，当发生服务器重定向时，document.location包含已经装载的URL，而location.URL包含原始请求文档的URL。

#### <span style="color:red">url字段查询</span>
```js
var queryString = function() {       //获取url查询字符串参数值通用方法
	var q = location.search.substring(1);
    //获取字符串，如：“id=123&name=location”
    var a = q.split("&");           //以&符号为界，把查询字段分割为数组
    var o = {};                     //定义临时对象
    for( var i = 0, i < a.length, i++){          //遍历数组
		var n = a[i].indexOf("=");
        if(n == -1) continue;             //如果没有发现，跳到下一循环
        var v1 = a[i].substring(0, n);    //截取等号前的参数值
        var v2 = a[i].substring(n+1);     //截取等号后的参数值
        o[v1] = unescape(v2);             //以名值对的形式存储在对象中
    }
    return o;                             //返回对象
}

//页面中调用函数
var fi = queryString();
for(var i in fi) {
	alert(i + "=" fi[i]);
}
```

#### navigator对象

>navigator对象：包含大量有关Web浏览器的信息，在检测浏览器及操作系统上非常有用，也可用window.navigator引用它  

>navigator.appCodeName  //浏览器代码名的字符串表示  

>navigator.appName  //官方浏览器名的字符串表示  

>navigator.appVersion  //浏览器版本信息的字符串表示  

>navigator.cookieEnabled  //如果启用cookie返回true，否则返回false  

>navigator.javaEnabled  //如果启用java返回true，否则返回false  

>navigator.platform  //浏览器所在计算机平台的字符串表示  

>navigator.plugins  //安装在浏览器中的插件数组  

>navigator.taintEnabled  //如果启用了数据污点返回true，否则返回false  

>navigator.userAgent  //用户代理头的字符串表示   

#####字符串检测
- 特征检测法
不关心浏览器身份，只关注其对特定功能的执行能力，是否支持,如果支持该方法，属性，对象，则可放心使用，这种方法非精确判断，但最安全。
```js
if(document.getElementByName) {
	var a = document.getElementByName("a");//如果存在则调用该方法获取a
}
else(document.getElementByTagName) {
	var a = document.getElementByTagName("a");//如果存在使用该方法获取a
}
```
如果要检测方法或函数，不要添加小括号运算符，否则js解释器会调用该方法或函数，如果不存在，会产生编译错误

- 字符串检测法
```js
var ua = navigator.userAgent.toLowerCase();
var info = {
	ie : /msie/.test(ua) && !/opera/.test(ua),
    op : /opera/.test(ua),
    sa : /version.*safari/.test(ua),
    ch : /chrom/.test(ua),
    ff : /geck/.test(ua) && !/webkit/.test(ua),
};
//在脚本中，调用该对象的属性，true or false;
(info.ie) && alert("IE浏览器");
(info.op) && alert("opera浏览器");
(info.sa) && alert("safira浏览器");
(info.ch) && alert("google浏览器");
(info.ff) && alert("firefox浏览器");
```
```js
//IE版本号检测
function getIEVer() {
	var ua = navigator.userAgent;
    var b = ua.indexOf("MSIE");
    if( b < 0 ) {
    	return 0;
    }
    return parseFloat(ua.substring(b + 5, ua.indexOf(";", b)));
    //截取版本号字符串，并转换为数值；
}
alert(getIEVer);
```
| indexOf | &nbsp; |
| ------- | ------ |
| 注释： | indexOf() 方法对大小写敏感！ |
| 注释： | 如果要检索的字符串值没有出现，则该方法返回 -1。 |
| stringObject.substring(start,stop) | &nbsp; |
| start	| 必需。一个非负的整数，规定要提取的子串的第一个字符在 stringObject 中的位置。 |
| stop | 可选。一个非负的整数，比要提取的子串的最后一个字符在 stringObject 中的位置多 1。如果省略该参数，那么返回的子串会一直到字符串的结尾。 |

>如果浏览器的某些对象和属性不向后兼容，这种方法不可靠。

#### screen对象
>screen对象：用于获取某些关于用户屏幕的信息，也可用window.screen引用它  

>screen.width/height  //屏幕的宽度与高度，以像素计  

>screen.availWidth/availHeight  //窗口可以使用的屏幕的宽度和高度，以像素计 

>screen.colorDepth  //用户表示颜色的位数，大多数系统采用32位  

>window.moveTo(0, 0);  

>window.resizeTo(screen.availWidth, screen.availHeight);  //填充用户的屏幕   


### 框架

窗口关系及框架

如果页面中包含框架，则每个框架都拥有自己的window对象，并且保存在frames集合中。在frames集合中，可以通过数值索引或者框架名称来访问对应的window对象。每个window对象都有一个name属性，其中包含框架的名称。Window对象代表的是浏览器窗口的一个框架，在javascript中，顶层窗口和框架本质上是等价的，web应用程序中每一个窗口和框架都对应一个window对象，都为客户端javascript定i了唯一的执行环境，即一个框架中的全局变量并不是另一个框架的全局变量，但第二个框架可以存取第一个框架中的变量。一个窗口中的任何框架都可以通过使用window对象属性frame,parent,top访问窗口中的其他框架。
（窗口不同与框架，window.open方法创建的新窗口可以通过opener属性访问原窗口，而原窗口通过oper()方法的返回值访问新窗口）

导航和打开窗口

使用window.open()方法既可以导航到一个特定的URL，也可以打开一个新的浏览器窗口。这个方法可以接收4个参数：需加载的URL，窗口目标，一个特性字符串以及一个标示新页面是否取代浏览器历史记录中当前加载页面的布尔值。通过只需要传递第一个参数；最后一个参数只在不打开新窗口的情况下使用。

如果window.open()传递了第二个参数，而且该参数是已有窗口或框架的名称，那么就会在其有该名称的窗口或框架中加载第一个参数指定的URL.

1.弹出窗口

winndow.open(url, name, features, replace);

如果给window.open()传递的第二个参数并不是一个已经存在的窗口或者框架，那么该方法就会根据在第三个参数位置传入的字符串创建一个新窗口或者标签页。如果没有传入第三个参数，那么就会打开一个带有全部默认设置的新窗口；如果窗口已经存在，则会返回对对应窗口的引用，3参数忽略。
window对象的opener属性引用的是打开他的窗口。如果当前窗口是由用户创建的，而不是js创建的，则，opener属性为null.


2.安全限制

现在很多浏览器都对弹出窗口做了很多安全限制，包括不允许再屏幕之外创建弹出窗口，不允许将弹出窗口移到屏幕以外，不允许关闭状态栏等。不允许关闭地址栏。

3.弹出窗口屏蔽程序

大多数浏览器都内置有弹出窗口屏蔽程序，而没有内置该类程序的浏览器，也可以安装在YAhoo等带有内容中屏蔽程序的使用工具，下面的例子可以检测弹出窗口是否被屏蔽，如果屏蔽的话会返回null;

var name=window.open("http://www.baidu.com",'百度');  
    alert(name);  

4.框架间的通信
_函数是在定义他的作用域执行，而不会是在调用他的作用域执行_

```js
//框架一
var name = "left.html";
function() {
	alert(name);
}
//框架二
var name = "main.html";
window.onload = function() {
	document.body.onclick = f;
}
var f = function() {
	parent.frame[0].left();
}								//显示left.html
```




