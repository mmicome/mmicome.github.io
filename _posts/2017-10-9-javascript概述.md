---
layout: post
title: js
date: 2017-10-9
description: js 概述
tag: js
comments: true
---

# <span style="color:#e4f;">javascript-core</span>

## javascript版本

- javascript1.3 符合 ECMAscript v1
- jscript3.0 符合 ECMAscript v1 基本等同于javascript1.3
- javascript1.5 符合 ECMAscript v3
- jscript5.5 符合 ECMAscript v3 基本等同于javascript1.5
- jacascript1.5 ECMAscript v3 jscript5.5 实现一致

--------------------------------------------------------------------------------

## javascript运行环境

**javascript运行环境由宿主环境和执行期环境共同构成，宿主环境由外壳程序生成，如web浏览器。执行期环境由嵌入到外壳程序的javascript引擎（javascript解释器）生成。在这个环境中，javascript生成内置静态对象，初始化执行环境等**

![图示]({{ site.baseurl }}/post_imgs/js-run-envir.png)

### 宿主环境

- 宿主环境创建一套公共对象系统，允许所有脚本语言进行访问，并提供公共接口，装载不同的脚本引擎
- javascript 脚本语言不提供输入输出接口，没有与系统和外界通信的能力, 如设备管理，内存管理等都交给宿主环境
- 外壳程序通过符合标准的拓展接口接纳更多的插件，组件，activeX控件，web浏览器自定义的DOM组件，符合W3C标准，通过宿主环境与js引擎联系，允许js引擎对其进行控制，操作html,xml

### 执行期环境

宿主环境通过脚本引擎创建执行期环境，如js引擎创建的代码解析初始化环境

- 一套与宿主环境相联系的规则
- javascript内核（语法，命令，逻辑，算法）
- 内置对象和API
- 其他约定

主流浏览器的javascript引擎 |
------------------ | -----------
JScript            | IE
spiderMonKey       | firefox3.0
TrancMonKey        | fierfox 3.1
JavascriptCore     | safari3.1
SquireFish         | safari 4.0
Futhard            | Opera9.5
v8                 | chrome

## Javascript解析机制

### 1\. 预编译

**一般编译器组件**

- <span style="color:#66CCFF;">符号表</span>

  ：在程序中存储所有符号的表，包括所有字符变量，直接量字符串，还有函数和类
- <span style="color:#66CCFF;">词法分析器</span>

  ：将字符流转换为记号流
- <span style="color:#66CCFF;">语法分析器</span>

  ：读取记号，建立语法树
- <span style="color:#66CCFF;">语义检查器</span>

  检查语法树的语义错误
- <span style="color:#66CCFF;">中间代码生成器</span>

  把语法数转换为中间代码
- <span style="color:#66CCFF;">代码优化器</span>

  用来优化中间代码
- <span style="color:#66CCFF;">代码生成器</span>

  将中间代码生成二进制字节码

![图示]({{ site.baseurl }}/post_imgs/js_analysis.png)

**_js解释型语言，在建立语法树之后就开始解释执行，而不是在完全生成字节码之后再调用虚拟机执行这些编译好的字节码_**

#### 词法分析器实现

- 去掉注释，自动生成文档
- 标记错误
- 完成预处理

      ```js
      //字符流
      a=(b-c)
      //转化为记号流
      NAME "a"  
      EQUALS  
      OPEN_PARENTHESIS  
      NAME "b"  
      MINUS  
      NAME "c"  
      CLOSE_PARENTHESIS  
      SEMICOLON  
      ```

#### 词法分析与语法分析

词法分析与语法分析交错进行，词法分析器不会读取所有的词法标记，然后再使用语法分析器处理。通常情况下，每取一个词法标记，就送入语法分析器进行分析

![图示]({{ site.baseurl }}/post_imgs/analysis.png)

语法分析将词法分析所产生的记号流生成语法树，即把从程序中收集的信息存储在数据结构中。编译中的数据结构包括两种：符号表和语法树。

      ```js
      //1.字符流语句
      if(typeof a=="undefined"){  
          a=0;  
      }  
      //2.转化为记号流
      //3.转化为词法树
      //4.转化为语法树
      ```

符号表： 程序用来存储所有符号的一个表，包括所有的字符串变量，直接量字符串，函数和类

![图示]({{ site.baseurl }}/post_imgs/tree.jpg)

### 2\. 执行期 **important**

- 经过编译阶段的准备，js代码在内存中已经构建为语法树，然后js引擎就会根据这个语法树结构边解释边执行 
- js 词法采用词法作用域，js的变量和函数作用域是在定义时决定的，而不是执行时决定的，由于词法作用域取决于源码结构，所以js解释器只需要静态分析就可以确定每个变量，函数的作用域，这种作用域也称为静态作用域。
- js解释器执行每个函数时，先创建执行环境，在这个虚拟环境中创建一个调用对象，这个对象内存储着当前域中所有的局部变量，参数，嵌套函数，外部引用和父级引用列表upvalue等语法分析结构
- 事实上通过声明语句定义的变量和函数在预编译期的语法分析中就已经存储在符号表中，然后把他们与调用对象中的同名属性进行映射即可，调用对象的生命周期与函数的生命周期是一致的，当函数调用完毕且无外部引用的情况下，会自动被js引擎当作垃圾回收
- js解释器通过作用域链把多个嵌套作用域串联在一起，并借助这个作用域连帮助js检索变量的值，这个作用域链相当与一个索引表，并通过编号存储他们的嵌套关系。js解释器检索变量时按照索引编号进行快速查找，直到全局变量为止，如果没有，返回undefined
- 如果函数引用外部变量的值，则js解释器会为该函数创建一个闭包体，
- 只有当闭包体的外部引用全部被设置为null值时，该闭包体才会被回收，当然也容易引发垃圾泛滥，甚至出现内存外溢。

## js执行顺序

### 预编译和执行顺序的关系

- js引擎解析脚本时，会在预编译期对所有声明的变量和函数进行处理，而变量初始化是在执行期进行。由于变量声明是在编译期被处理，所以在执行期间对所有代码来说，声明的变量或函数都是可见的，所以可以先使用后声明而不会发生编译错误。 代码实例

      ```javascript
      alert(a);              /编译时不报错， 执行时返回undefined;
      var a = 1;            // 定义a;
      alert(a);              //执行返回 1;
      ```

      ```javascript
      f();                     //编译正常，执行是调用函数，返回1;
      function f() {
        alert(1);
      }
      ```

      ```javascript
      f();                    //编译正常，执行时返回语法错误;
      var f = function() {
        alert(1);
      }
      因为函数f作为值赋值给变量f，在预编译期，解释器只能够为声明变量f进行处理，而对于f的值，只能在执行期时按顺序进行赋值，自然提示找不到对象f;
      ```

- js代码是按块执行，即由`<script></script>`分割的代码段。

  - 如果在js块中调用后面块中声明的变量或函数，就会提示语法错误。
  - 但是如果文档加载完之后再次调用不会出现错误;
  - 虽然js按块执行，但都属于同一全局作用域，故而变量和函数可以共享。

- 借助事件机制改变js执行顺序

  - 为安全起见，我们一般在页面初始化完毕后才允许javascript代码执行，这样可以避免网速对js的执行影响，同时避免HTML文档流对js执行的限制
  - 一个页面中的多个window.onload事件处理函数只有最后一个才有效，一般吧所有脚本或调用函数都放在同一个onload事件处理函数中，通过这种方式还可以改变函数的执行顺序，方法是，调整onload函数中调用函数的排列顺序。
  - 除了页面初始化处理函数外，还可以通过各种交互事件改变js执行顺序，如鼠标事件，键盘事件，及时钟触发器等

        ```javascript
        // 代码实力
        <script> alert(a); f(); </script>
        <script> var a = 1; function() { alert(1); } </script>
        //提示语法错误，找不到对象f， a未定义
        ```

        ```javascript
        //用运页面初始化事件处理函数解决
        <script>
        window.onload = function() {
        alert(a); f();
        }
        <\/script>
        <script>
        var a = 1;
        function() {
        alert(1);
        }
        <\/script>
        ```

### js输出脚本的执行顺序

- 使用document.write()方法输出的js脚本字符串必须放在同时被输出的`<script>`标签中，否则js解释器无法识别而会把js代码显示出来
- 通过document.write()方法输出脚本并执行，因为不同的js引擎对其执行顺序不同而会出现bug. 情况一：

      ```javascript
      <script>
          document.write('<script type="text/javascript" src="test.js"><\/script>');
          document.write('<script type="text/javascript">');
          document.write('alert(n);');             //IE提示找不到变量n, 其他浏览器可以;
          document.write('<\/script>');
          alert(n+1);                             //所有浏览器提示找不到变量n;
      <\/script>

      //外部test.js代码
      var n = 1;
      ```

  测试提示语法错误，找不到n

  > 如果在js代码块中访问本代码块中使用document.write()方法输出的脚本中导入的外部js文件所包含的变量，会提示语法错误。，同时，在IE中，不仅脚本中，而且在输出的脚本中也会提示找不到输出的导入外部js文件的变量。

  情况二：

      ```javascript
      <script type="text/javascript">
      document.write('<script type="text/javascript" src="text.js"><\/script>');
      document.write('<script type="text/javascript">');
      document.write('alert(2);');             //IE提示找不到变量n;
      document.write('alert(n+2);');
      document.write('<\/script>');
      <\/script>
      <script type="text/javascript">
      alert(n+1);                             //所有浏览器提示找不到变量n;
      <\/script>
      //外部test.js代码
      var n = 1;
      alert(n);
      ```

- 在IE中的执行顺序

![图示]({{ site.baseurl }}/post_imgs/one.png)

- 在符合DOM标准的浏览器中执行顺序

![图示]({{ site.baseurl }}/post_imgs/two.png)

解决不同浏览器不同执行顺序，可以把使用输出脚本导入的外部文件都放在独立的代码块中。

    ```js
    <script type="text/javascript">
        document.write('<script type="text/javascript" src="text.js"><\/script>');   //提示1
    <\/script>

    <script type="text/javascript">
        document.write('<script type="text/javascript">');
        document.write('alert(2);');             //提示2
        document.write('alert(n+2);');            //提示3
        document.write('<\/script>');             
        alert(n+3);                             //提示4
    <\/script>

    //外部test.js代码
    var n = 1;
    alert(n)                                      
    ```

# JavaScript 运行机制详解

## 一、JS单线程、异步、同步概念

- JS 是单线程的（如一个线程删DOM，一个线程增DOM），但是却能执行异步任务，这主要是因为 JS 中存在事件循环（Event Loop）和任务队列（Task Queue）。

- 虽然有webworker多线程出现，但也是在主线程的控制下。webworker仅仅能进行计算任务，不能操作DOM，所以本质上还是单线程。

  单线程即任务是串行的，后一个任务需要等待前一个任务的执行，这就可能出现长时间的等待。但由于**类似ajax网络请求、setTimeout时间延迟、DOM事件的用户交互**等，这些任务并不消耗 CPU，是一种空等，资源浪费，因此出现了异步。通过将任务**交给相应的异步模块去处理，主线程的效率大大提升，可以并行的去处理其他的操作**。当异步处理完成，主线程空闲时，主线程读取相应的`callback`，进行后续的操作，最大程度的利用CPU。此时出现了同步执行和异步执行的概念，同步执行是主线程按照顺序，串行执行任务；异步执行就是cpu跳过等待，先处理后续的任务（CPU与网络模块、timer等并行进行任务）。由此产生了**_任务队列_**与**_事件循环_**，来协调主线程与异步模块之间的工作。

  =========================================注释==================================

- **_事件循环：_** JS 会创建一个类似于 while (true) 的循环，每执行一次循环体的过程称之为 `Tick`。每次 `Tick` 的过程就是查看是否有待处理事件，如果有则取出相关事件及回调函数放入执行栈中由主线程执行。待处理的事件会存储在一个任务队列中，也就是每次 `Tick` 会查看任务队列中是否有需要执行的任务。

- **_任务队列：_** 异步操作会将相关回调添加到任务队列中。而不同的异步操作添加到任务队列的时机也不同，如 `onclick`, `setTimeout`, `ajax` 处理的方式都不同，这些异步操作是由浏览器内核的 `webcore` 来执行的，`webcore` 包含3种 webAPI，分别是 `DOM Binding`、`network`、`timer`模块。

  - `onclick`由浏览器内核的 `DOM Binding` 模块来处理，当事件触发的时候，回调函数会立即添加到任务队列中。
  - `setTimeout` 会由浏览器内核的 `timer` 模块来进行延时处理，当时间到达的时候，才会将回调函数添加到任务队列中.
  - `ajax` 则会由浏览器内核的 `network` 模块来处理，在网络请求完成返回之后，才将回调添加到任务队列中。

- **_主线程：_** JS 只有一个线程，称之为主线程。而事件循环是主线程中执行栈里的代码执行完毕之后，才开始执行的。所以，主线程中要执行的代码时间过长，会阻塞事件循环的执行，也就会阻塞异步操作的执行。只有当主线程中执行栈为空的时候（即同步代码执行完后），才会进行事件循环来观察要执行的事件回调，当事件循环检测到任务队列中有事件就取出相关回调放入执行栈中由主线程执行。

      ```javascript
      //例1：

      var req = new XMLHttpRequest();
        req.open('GET', url);    
        req.onload = function (){};    
        // 这两个异步方法就会在 ajax 完成后推入任务队列，再由主线程执行

        req.onerror = function (){};    
        req.send();

      //例2：

      setTimeout(function(){

      // 如果有大量的操作，可能会阻塞 UI 等，则可以使用 setTimeout 让这些操作在主线程把更重要的代码执行完毕之后，再来执行这里的操作。从而提高浏览器的性能。

      },0);  

      // 设置为 0，也会有个最小间隔值，也会在主线程中的代码运行完成后，由事件循环从任务队列将回调添加到执行栈中才执行

      //例3：
      // 事件循环测试。执行结果是 2-3-4-1，1在最后输出，说明事件循环是所有同步代码执行完后才开始执行的。

      'use strict';

      setTimeout(function() {
      　　console.log(1);
      }, 0);
      console.log(2);
      let end = Date.now() + 1000*5;
      while (Date.now() < end) {
      }
      console.log(3);
      end = Date.now() + 1000*5;
      while (Date.now() < end) {
      }
      console.log(4);
      ```

  Update： 《你不知道的 JavaScript》一书中，重新讲解了 ES6 新增的任务队列，和上面的任务队列略有不同，上面的任务队列书中称为事件队列。上面提到的任务（事件）队列是在事件循环中的，事件循环每一次 tick 便执行上面所述的任务（事件）队列中的一个任务。而任务（事件）队列是只能往尾部添加任务。而 ES6 中新增的任务队列是在事件循环之上的，事件循环每次 tick 后会查看 ES6 的任务队列中是否有任务要执行，也就是 ES6 的任务队列比事件循环中的任务（事件）队列优先级更高。如 Promise 就使用了 ES6 的任务队列特性。

  ========================================注释==============================

## 二、事件循环机制

![图示]({{ site.baseurl }}/post_imgs/eventloop.png)

> 如上图为事件循环示例图（或JS运行机制图），流程如下： step1：主线程读取JS代码，此时为同步环境，形成相应的堆和执行栈； step2: 主线程遇到异步任务，指给对应的异步进程进行处理（WEB API）; step3: 异步进程处理完毕（Ajax返回、DOM事件处罚、Timer到等），将相应的异步任务推入任务队列； step4: 主线程执行完毕，查询任务队列，如果存在任务，则取出一个任务推入主线程处理（先进先出）； step5: 重复执行step2、3、4；称为事件循环。 执行的大意： 同步环境执行(step1) -> 事件循环1(step4) -> 事件循环2(step4的重复)... 其中的异步进程有： a、类似onclick等，由浏览器内核的DOM binding模块处理，事件触发时，回调函数添加到任务队列中； b、setTimeout等，由浏览器内核的Timer模块处理，时间到达时，回调函数添加到任务队列中； c、Ajax，由浏览器内核的Network模块处理，网络请求返回后，添加到任务队列中。

## 三、任务队列

如上示意图，任务队列存在多个，同一任务队列内，按队列顺序被主线程取走；不同任务队列之间，存在着优先级，优先级高的优先获取（如用户I/O）；

1. 任务队列的类型

  - 任务队列存在两种类型，一种为microtask queue，另一种为macrotask queue。
  - 图中所列出的任务队列均为macrotask queue，而ES6 的 promise［ECMAScript标准］产生的任务队列为microtask queue。

2. 两者的区别

  - microtask queue：唯一，整个事件循环当中，仅存在一个；执行为同步，同一个事件循环中的microtask会按队列顺序，串行执行完毕；
  - macrotask queue：不唯一，存在一定的优先级（用户I/O部分优先级更高）；异步执行，同一事件循环中，只执行一个。

3. 更完整的事件循环流程 将microtask加入到JS运行机制流程中，则： step1、2、3同上， step4：主线程查询任务队列，执行microtask queue，将其按序执行，全部执行完毕； step5：主线程查询任务队列，执行macrotask queue，取队首任务执行，执行完毕； step6：重复step4、step5。 microtask queue中的所有callback处在同一个事件循环中，而macrotask queue中的callback有自己的事件循环。 简而言之：同步环境执行 -> 事件循环1（microtask queue的All）-> 事件循环2(macrotask queue中的一个) -> 事件循环1（microtask queue的All）-> 事件循环2(macrotask queue中的一个)... 利用microtask queue可以形成一个同步执行的环境，但如果Microtask queue太长，将导致Macrotask任务长时间执行不了，最终导致用户I/O无响应等，所以使用需慎重。

      ```javascript
               console.log('1, time = ' + new Date().toString())
               setTimeout(macroCallback, 0);
               new Promise(function(resolve, reject) {
                   console.log('2, time = ' + new Date().toString())
                   resolve();
                   console.log('3, time = ' + new Date().toString())
               }).then(microCallback);

               function macroCallback() {
                   console.log('4, time = ' + new Date().toString())
               }

               function microCallback() {
                   console.log('5, time = ' + new Date().toString())
               }  
      //test in google console
      VM636:1 1, time = Wed Jul 05 2017 06:15:11 GMT-0400 (EDT)
      VM636:4 2, time = Wed Jul 05 2017 06:15:11 GMT-0400 (EDT)
      VM636:6 3, time = Wed Jul 05 2017 06:15:11 GMT-0400 (EDT)
      VM636:14 5, time = Wed Jul 05 2017 06:15:11 GMT-0400 (EDT)
      Promise {[[PromiseStatus]]: "resolved", [[PromiseValue]]: undefined}
      VM636:10 4, time = Wed Jul 05 2017 06:15:11 GMT-0400 (EDT)
      ```
