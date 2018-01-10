---
layout: post
title: "js compatility"
date: 2017-10-02
comments: true
description: "js compatility"
tag:  js
---

# *跨浏览器兼容性*

### DOM上的差异

- 遍历DOM层次结构的方法
- 修改DOM内容的方法
- 自定义的拓展功能
- 特定布局创建的节点数量可能不同

### 事件模型上的差异

- 创建和绑定事件的方法


      ```js
      //一个简单的button控件如下:
      < input  type ='button'  name ='mybtn'  id ='mybtn'  onclick ='myFunc()' />
      //然后为其注册事件，这样的情况，怎么在javascript里获取event呢，特别是firefox的情况。
      < script  type ='text/javascript' >
      function  myFunc(){
          var  ev  =  window.event  ||  arguments.callee.caller.arguments[ 0 ]
             ,et = ev.srcElement || ev.target;
         alert(et.tagName);   
      }
      </ script >
      //不出意外的话，在ie/ff下，上面例子都将输出INPUT,即是触发click事件节点的标签名，ie的event获取这里就不说了，重点说说ff下的情况。
      //这里的arguments.callee.caller.arguments[0]看起来又长又怪，为什么在firefox的情况下，这个东西就是event呢？
      //首先得了解arguments.callee是什么东西,caller又是什么样的属性？
      //argments.callee就是函数体本身，arguments.callee.caller就是函数体的调用函数体
      // 简单例子如下:
      < script type = ' text/javascript ' >
      function  a(){
          b();
      }

      function  b(){
          alert(b  ===  arguments.callee)
          alert(b.caller  ===  a)
          alert(arguments.callee.caller  ===  a)

      }
      a();
      < / script>

      // 不出意外，上面的例子将输出3个true,表明当a()调用时，函数b与函数a的关系。
      //
      // 好，弄清楚了arguments.callee与caller，我们再把原先的例子改改，
      < script type = ' text/javascript ' >
      function  myFunc(){
         alert(arguments.callee.caller.toString())
          var  ev  =  window.event  ||  arguments.callee.caller.arguments[ 0 ]
             ,et  =  ev.srcElement  ||  ev.target;
      }
      < / script>

      // 我们把argument.callee.caller的函数体输出，看看到底在ie和ff下有何区别.
      // 可以看到ie下输出为
      function  anonymous(){
        myFunc()
      }
      ff下输出为
      function  onclick(event){
         myFunc();
      }
      ```

- **html控件中直接注册事件**

> 在ie/ff下表现的不同， ie下定义了一个匿名函数，内部再执行用户定制的函数(myFunc)，


> 而ff下则有所不同，首先ff下定义了一个与节点事件同名的函数,这里是onclick事件，所以是function onclick,然后event作为一个参数传入，内部再执行myFunc.所以当事件触发时，在myFunc里，argument.callee.caller就是指向function onclick，当然，argument.callee.caller.arguments[0]即为event了.

- **事件对象本身的属性和方法**

- 所有主要浏览器都支持 indexOf() ,lastIndexOf()方法，但是 Internet Explorer 8 及 更早IE版本不支持该方法。


- 汇总 onchange onpropertychange 和 oninput 事件的区别


1. onchange 事件与 onpropertychange 事件的区别：

     onchange 事件在内容改变（两次内容有可能还是相等的）且失去焦点时触发。

     onpropertychange 事件却是实时触发，即每增加或删除一个字符就会触发，通过 js 改变也会触发该事件，但是该事件 IE 专有。

2. oninput 事件与 onpropertychange 事件的区别：

     oninput 事件是 IE 之外的大多数浏览器支持的事件，在 value 改变时触发，实时的，即每增加或删除一个字符就会触发，然而通过 js 改变 value 时，却不会触发。

     onpropertychange 事件是任何属性改变都会触发的，而 oninput 却只在 value 改变时触发，oninput 要通过 addEventListener() 来注册，onpropertychange 注册方式跟一般事件一样。（此处都是指在js中动态绑定事件，以实现内容与行为分离）

3. oninput 与 onpropertychange 失效的情况：

     （1）oninput 事件：a). 当脚本中改变 value 时，不会触发；b).从浏览器的自动下拉提示中选取时，不会触发。

     （2）onpropertychange 事件：当 input 设置为 disable=tru e后，onpropertychange 不会触发。

- 定义和使用 js按键事件

      charCode 属性返回onkeypress事件触发键值的字母代码。
      Unicode 字符代码是一个字母的数字 (如数字 "97" 代表字母 "a")。

      - 提示： 所有 Unicode 字符列表可查看我们的 完整 Unicode 参考手册。
      - 提示： 如果你需要将 Unicode 值转换为字符，可以使用 fromCharCode() 方法。
      - 注意： 如果该属性用于 onkeydown 或 onkeyup 事件，返回值总为 "0"。
      - 注意： 该属性是只读的。
      - 注意： which 和 keyCode 属性提供了解决浏览器的兼容性的方法，最新版本的 DOM 事件推荐使用 key 属性来替代该方法。
      - 注意：IE8 及其更早版本不支持 which 属性。不支持的浏览器可使用 keyCode 属性。但是， keyCode 属性在 Firefox 浏览器的 onkeypress 事件中是无效的。 兼容这些浏览器你可以使用以下代码：

      `var x = event.charCode || event.keyCode; // 使用 charCode 或 keyCode, 这样可支持不同浏览器`

      - 提示： 你同样可以使用 keyCode 属性来检测特殊的按键 (如 "caps lock" 或 箭头按键)。 keyCode 和 charCode 属性提供了解决浏览器的兼容性的方法，最新版本的 DOM 事件推荐使用 key 属性来替代该方法。

      - 提示： 如果你想查看是否按下了 "ALT", "CTRL", "META" 或 "SHIFT" 键，可使用 altKey, ctrlKey, metaKey 或 shiftKey 属性。


|  &nbsp;   | 浏览器支持度 | onkeydown/onkeyup | onkeypress |
  | --------- | ---------- | ----------------- | ---------- |
  | which     |  ie8不支持  | 键盘代码           | 字符代码（） |
      | keyCode   |     all    | 键盘代码           | 字符代码（firefox返回为0） |
      | charCode  |  ie8不支持  | 始终返回0          | 字符代码（） |


- **transitionend事件**


      ```js
      // Safari 3.1 到 6.0 代码
      document.getElementById("myDIV").addEventListener("webkitTransitionEnd", myFunction);
      // 标准语法
      document.getElementById("myDIV").addEventListener("transitionend", myFunction);
      ```

    - 注意： 如果过渡在完成前移除，例如 CSS transition-property 属性被移除，过渡事件将不被触发。
    - 注意： Internet Explorer 8 及更早 IE 版本不支持 addEventListener() 方法。

- DOM 4 警告 !!!

    _在 W3C DOM 内核中, Attr (属性) 对象继承节点对象的所有属性和方法 。_
    _在 DOM 4 中, Attr (属性) 对象不再从节点对象中继承。_

    从长远的代码质量来考虑，在属性对象中你需要避免使用节点对象属性和方法:

    - attr.textContent	 使用 attr.value 替代
    - attr.nodeValue	使用 attr.value 替代
    - attr.cloneNode()	使用 attr.value 替代

- 获取属性，属性值的方法 (attr=attributes)

    - 方法一，兼容性强

        - attr[i].name (属性名)
        - attr[i].value(值)

    - 方法二，ie8下不支持

        - element.attributes.getNamedItem("onclick").textContent/value/nodeValue;(值)

      - element.attributes.item(0).nodeName;(属性名) （所有浏览器支持）

    - attr.length  Internet Explorer 8 及更早 IE 版本，length属性将返回一个元素所有可能的属性数目。

  - 所有主要浏览器都支持 removeNamedItem() 方法

    - 注意： 在 Internet Explorer 8 及更早 IE 版本中，当使用 removeNamedItem() 方法删除属性是，该方法不能删除属性，但是可以返回该属性值。

  - setNamedItem() 方法用于添加指定节点。如果节点已经存在，它将被替换，并返回替换节点的值，否则将返回 null。

        ```js
        var btn=document.getElementsByTagName("h1")[0];
        var typ=document.createAttribute("class");
        typ.nodeValue="democlass";
        btn.attributes.setNamedItem(typ);
        ```

  - 直接使用setAttribute("name","value")创建属性
  - document.addEventListener(event, function, useCapture)

    - 注意： Internet Explorer 8 及更早IE版本不支持 addEventListener() 方法，Opera 7.0 及 Opera 更早版本也不支持。 但是，对于这类浏览器版本可以使用 attachEvent() 方法来添加事件句柄.

    **当事件触发时，事件对象会作为第一个参数传入函数。 事件对象的类型取决于特定的事件。例如， "click" 事件属于 MouseEvent(鼠标事件) 对象。**
    **useCapture	可选。布尔值，指定事件是否 在捕获或冒泡阶段执行。true - 事件句柄在捕获阶段执行;false- 默认。事件句柄在冒泡阶段执行**

  - 获取触发元素，事件传参

      ```js
      function windowElement(e) {
        var tagname;
        if(!e) {
          e = window.event;
        }
        if(e.target) {
          tagname = e.target;
        } else {
          tagname = e.srcElement;
        }
        var ElementName = tagname.tagName;
      }
      ```

### 在Ajax上的差异

- 需要为Ajax顶层功能编写包装类，提供一致接口

### 在css上的差异

       ```css
        div{filter:alpha(opacity=50);} /* for IE8 and earlier */
        div{opacity:.5;} /* for IE9 and other browsers */
       ```

  2. 该属性的值指出了对象是否及如何浮动。
      - 如果float不是none，当display:inline-table时，display的计算值为table;当display:inline | inline-block | run-in | table-* 系时，display的计算值为block，其它情况为指定值；
      - float在绝对定位和display为none时不生效。
      - 对应的脚本特性为styleFloat（IE）或cssFloat（非IE）。(注意这里为styleFloat或cssFloat，而不是float)

  3. 检索或设置对象的最小高度。
      - 如果min-height属性的值大于max-height属性的值，max-height将会自动以min-height的值作为自己的值。
      - IE6尚不支持此属性。IE6的变通实现方法请参考 最小高度min-height实现详解。
      - 对应的脚本特性为minHeight。
  4. 检索或设置对象四边的外延边距。
      - 非替代(non-Replaced)行内元素可以使用该属性设置左、右两边的外补丁；若要设置上、下两边的外补丁，必须先使该对象表现为块级或内联块级。
      - 外延边距始终透明。
      - 某些相邻的margin会发生合并，我们称之为margin折叠：


        ```html
        h2{margin:10px 0;}
        div{margin:20px 0;}
        ......
        <h2>这是一个标题</h2>
        <div>
        	<h2>这是又一个标题</h2>
        </div>
        ```

      本例中，第一个h2的margin-bottom（10px），div的margin-top（20px），第二个h2的margin-top（10px）将被合并，它们之间的margin间隙最后是（20px），即取三者之间最大的那个值。

      - 如果给上例中的div加上border的话：

        ```html
        h2{margin:10px 0;}
        div{margin:20px 0;border:1px solid #aaa;}
        ......
        <h2>这是一个标题</h2>
        <div>
        	<h2>这是又一个标题</h2>
        </div>
        ```

      本例中，第一个h2的margin-bottom（10px），div的margin-top（20px）将被合并，但第二个h2的margin-top不与它们合并，因为它被border分隔，不与它们相邻。

      - margin折叠常规认知：
        - margin折叠只发生在块级元素上；
        - 浮动元素的margin不与任何margin发生折叠；
        - 设置了属性overflow且值不为visible的块级元素，将不与它的子元素发生margin折叠；设置了padding，会与padding折叠。
        - 绝对定位元素的margin不与任何margin发生折叠；
        - 根元素的margin不与其它任何margin发生折叠；
        - 对应的脚本特性为margin。

  5. 设置或检索表格的caption对象是在表格的那一边。
      -  要在IE7及以下浏览器中实现top与bottom参数值的效果，可直接在caption标签内定义标签属性valign为top和bottom。
      -  Firefox还额外支持right和left两个非标准值
      -  对应的脚本特性为captionSide。

### js引擎
