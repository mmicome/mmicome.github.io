---
layout: post
title: js function
date: 2017-10-9
description: js function
tag: js
comments: true
---
### function

_采用函数表达式声明函数时，function命令后面不带有函数名。如果加上函数名，该函数名只在函数体内部有效，在函数体外部无效。_

      ```javascript
      var print = function x(){
        console.log(typeof x);
      };

      x
      // ReferenceError: x is not defined

      print()
      // function
      ```

上面代码在函数表达式中，加入了函数名x。这个x只在函数体内部可用，指代函数表达式本身，其他地方都不可用。这种写法的用处有两个:

- 一是可以在函数体内部调用自身，
- 二是方便除错（除错工具显示函数调用栈时，将显示函数名，而不再显示这里是一个匿名函数）。

  因此，下面的形式声明函数也非常常见。`var f = function f() {};`

_注意:_ 函数的表达式需要在语句的结尾加上分号，表示语句结束。而函数的声明在结尾的大括号后面不用加分号

Function构造函数接受三个参数，除了最后一个参数是add函数的"函数体"，其他参数都是add函数的参数。

      ```javascript
      var add = new Function(
        'x',
        'y',
        'return x + y'
      );

      // 等同于

      function add(x, y) {
        return x + y;
      }
      ```

_函数可以调用自身，这就是递归（recursion）。下面就是通过递归，计算斐波那契数列的代码。_

      ```javascript
      function fib(num) {
        if (num === 0) return 0;
        if (num === 1) return 1;
        return fib(num - 2) + fib(num - 1);
      }

      fib(6) // 8
      ```

### 不能在条件语句中声明函数

根据ECMAScript的规范，不得在非函数的代码块中声明函数，最常见的情况就是if和try语句。

      ```javascript
      if (foo) {
        function x() {}
      }

      try {
        function x() {}
      } catch(e) {
        console.log(e);
      }
      ```

上面代码分别在if代码块和try代码块中声明了两个函数，按照语言规范，这是不合法的。但是，实际情况是各家浏览器往往并不报错，能够运行。

但是由于存在函数名的提升，所以在条件语句中声明函数，可能是无效的，这是非常容易出错的地方。

      ```javascript
      if (false) {
        function f() {}
      }

      f() // 不报错
      ```

上面代码的原始意图是不声明函数f，但是由于f的提升，导致if语句无效，所以上面的代码不会报错。要达到在条件语句中定义函数的目的，只有使用函数表达式。

      ```javascript
      if (false) {
        var f = function () {};
      }

      f() // undefined
      ```

## 函数的属性和方法

- name属性 name属性返回紧跟在function关键字之后的那个函数名。 ```js function f1() {} f1.name // 'f1'

var f2 = function () {}; f2.name // ''

var f3 = function myName() {}; f3.name // 'myName'

````
上面代码中，函数的name属性总是返回紧跟在function关键字之后的那个函数名。对于f2来说，返回空字符串，匿名函数的name属性总是为空字符串；对于f3来说，返回函数表达式的名字（真正的函数名还是f3，myName这个名字只在函数体内部可用）。

- length属性
length属性返回函数预期传入的参数个数，即函数定义之中的参数个数。

      ```js
      function f(a, b) {}
      f.length // 2
      ```

上面代码定义了空函数f，它的length属性就是定义时的参数个数。不管调用时输入了多少个参数，length属性始终等于2。

**length属性提供了一种机制，判断定义时和调用时参数的差异，以便实现面向对象编程的"方法重载"（overload）。**

- toString() 函数的toString方法返回函数的源码。 ```js function f() { a(); b(); c(); }

f.toString() // function f() { // a(); // b(); // c(); // }

````
函数内部的注释也可以返回。

      ```js
      function f() {/*
        这是一个
        多行注释
      */}

      f.toString()
      // "function f(){/*
      //   这是一个
      //   多行注释
      // */}"
      ```

利用这一点，可以变相实现多行字符串。

      ```javascript
      var multiline = function (fn) {
        var arr = fn.toString().split('\n');
        return arr.slice(1, arr.length - 1).join('\n');
      };

      function f() {/*
        这是一个
        多行注释
      */}

      multiline(f);
      // " 这是一个
      //   多行注释"
      ```

### 函数内部的变量提升

与全局作用域一样，函数作用域内部也会产生"变量提升"现象。var命令声明的变量，不管在什么位置，变量声明都会被提升到函数体的头部。

      ```javascript
      function foo(x) {
        if (x > 100) {
          var tmp = x - 100;
        }
      }
      //上面的代码等同于

      function foo(x) {
        var tmp;
        if (x > 100) {
          tmp = x - 100;
        };
      }
      ```

## 函数本身的作用域

**函数本身也是一个值，也有自己的作用域。它的作用域与变量一样，就是其声明时所在的作用域，与其运行时所在的作用域无关。**

      ```javascript
      var a = 1;
      var x = function () {
        console.log(a);
      };

      function f() {
        var a = 2;
        x();
      }

      f() // 1
      ```

函数体内部声明的函数，作用域绑定函数体内部。

      ```javascript
      function foo() {
        var x = 1;
        function bar() {
          console.log(x);
        }
        return bar;
      }

      var x = 2;
      var f = foo();
      f() // 1
      ```

上面代码中，函数foo内部声明了一个函数bar，bar的作用域绑定foo。当我们在foo外部取出bar执行时，变量x指向的是foo内部的x，而不是foo外部的x。正是这种机制，构成了下文要讲解的"闭包"现象。

## 默认值

通过下面的方法，可以为函数的参数设置默认值。

      ```javascript
      function f(a){
        a = a || 1;
        return a;
      }

      f('') // 1
      f(0) // 1
      ```

_上面代码的||表示"或运算"，即如果a有值，则返回a，否则返回事先设定的默认值（上例为1）。_

这种写法会对a进行一次布尔运算，只有为true时，才会返回a。可是，除了undefined以外，0、空字符、null等的布尔值也是false。也就是说，在上面的函数中，不能让a等于0或空字符串，否则在明明有参数的情况下，也会返回默认值。

为了避免这个问题，可以采用下面更精确的写法。

      ```javascript
      function f(a) {
        (a !== undefined && a !== null) ? a = a : a = 1;
        return a;
      }

      f() // 1
      f('') // ""
      f(0) // 0
      ```

上面代码中，函数f的参数是空字符或0，都不会触发参数的默认值。

### 传递方式

函数参数如果是原始类型的值（数值、字符串、布尔值），传递方式是传值传递（passes by value）。这意味着，在函数体内修改参数值，不会影响到函数外部。

      ```javascript
      var p = 2;

      function f(p) {
        p = 3;
      }
      f(p);

      p // 2
      ```

上面代码中，变量p是一个原始类型的值，传入函数f的方式是传值传递。因此，在函数内部，p的值是原始值的拷贝，无论怎么修改，都不会影响到原始值。

但是，如果函数参数是复合类型的值（数组、对象、其他函数），传递方式是传址传递（pass by reference）。也就是说，传入函数的原始值的地址，因此在函数内部修改参数，将会影响到原始值。

      ```javascript
      var obj = {p: 1};

      function f(o) {
        o.p = 2;
      }
      f(obj);

      obj.p // 2
      ```

上面代码中，传入函数f的是参数对象obj的地址。因此，在函数内部修改obj的属性p，会影响到原始值。

**注意: 如果函数内部修改的，不是参数对象的某个属性，而是替换掉整个参数，这时不会影响到原始值。**

      ```javascript
      var obj = [1, 2, 3];

      function f(o){
        o = [2, 3, 4];
      }
      f(obj);

      obj // [1, 2, 3]
      ```

**上面代码中，在函数f内部，参数对象obj被整个替换成另一个值。这时不会影响到原始值。这是因为，形式参数（o）与实际参数obj存在一个赋值关系。**

      ```javascript
      // 函数f内部
      o = obj;
      ```

_上面代码中，对o的修改都会反映在obj身上。但是，如果对o赋予一个新的值，就等于切断了o与obj的联系，导致此后的修改都不会影响到obj了。_

**某些情况下，如果需要对某个原始类型的变量，获取传址传递的效果，可以将它写成全局对象的属性。**

      ```javascript
      var a = 1;

      function f(p) {
        window[p] = 2;
      }
      f('a');

      a // 2
      ```

上面代码中，变量a本来是传值传递，但是写成window对象的属性，就达到了传址传递的效果。

#### 同名参数

如果有同名的参数，则取最后出现的那个值。

      ```javascript
      function f(a, a) {
        console.log(a);
      }

      f(1, 2) // 2
      ```

上面的函数f有两个参数，且参数名都是a。取值的时候，以后面的a为准。即使后面的a没有值或被省略，也是以其为准。

      ```javascript
      function f(a, a){
        console.log(a);
      }

      f(1) // undefined
      ```

调用函数f的时候，没有提供第二个参数，a的取值就变成了undefined。这时，如果要获得第一个a的值，可以使用arguments对象。(由于 JavaScript 允许函数有不定数目的参数，所以需要一种机制，可以在函数体内部读取所有参数。这就是arguments对象的由来。)

      ```javascript
      function f(a, a) {
        console.log(arguments[0]);
      }

      f(1) // 1
      ```

### 正常模式下，arguments对象可以在运行时修改。

      ```javascript
      var f = function(a, b) {
        arguments[0] = 3;
        arguments[1] = 2;
        return a + b;
      }

      f(1, 1) // 5
      ```

上面代码中，函数f调用时传入的参数，在函数内部被修改成3和2。

### 严格模式下，arguments对象是一个只读对象，修改它是无效的，但不会报错。

      ```javascript
      var f = function(a, b) {
        'use strict';
        arguments[0] = 3; // 无效
        arguments[1] = 2; // 无效
        return a + b;
      }

      f(1, 1) // 2
      ```

上面代码中，函数体内是严格模式，这时修改arguments对象就是无效的。

可以通过arguments对象的length属性，判断函数调用时到底带几个参数。

      ```javascript
      function f() {
        return arguments.length;
      }

      f(1, 2, 3) // 3
      f(1) // 1
      f() // 0
      ```

（2）与数组的关系

**需要注意的是，虽然arguments很像数组，但它是一个对象。数组专有的方法（比如slice和forEach），不能在arguments对象上直接使用。**

但是，可以通过apply方法，把arguments作为参数传进去，这样就可以让arguments使用数组方法了。

      ```javascript
      // 用于apply方法
      myfunction.apply(obj, arguments).

      // 使用与另一个数组合并
      Array.prototype.concat.apply([1,2,3], arguments)
      要让arguments对象使用数组方法，真正的解决方法是将arguments转为真正的数组。下面是两种常用的转换方法：slice方法和逐一填入新数组。

      var args = Array.prototype.slice.call(arguments);

      // or

      var args = [];
      for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
      }
      ```

- callee属性

arguments对象带有一个callee属性，返回它所对应的原函数。

      ```javascript
      var f = function(one) {
        console.log(arguments.callee === f);
      }

      f() // true
      ```

可以通过arguments.callee，达到调用函数自身的目的。这个属性在严格模式里面是禁用的，因此不建议使用。

## 闭包

要理解闭包，首先必须理解变量作用域。前面提到，JavaScript有两种作用域：全局作用域和函数作用域。函数内部可以直接读取全局变量。

      ```javascript
      var n = 999;

      function f1() {
        console.log(n);
      }
      f1() // 999
      //上面代码中，函数f1可以读取全局变量n。

      //但是，在函数外部无法读取函数内部声明的变量。

      function f1() {
        var n = 999;
      }

      console.log(n)
      // Uncaught ReferenceError: n is not defined(
      ```

上面代码中，函数f1内部声明的变量n，函数外是无法读取的。

如果出于种种原因，需要得到函数内的局部变量。正常情况下，这是办不到的，只有通过变通方法才能实现。那就是在函数的内部，再定义一个函数。

      ```javascript
      function f1() {
        var n = 999;
        function f2() {
      　　console.log(n); // 999
        }
      }
      ```

上面代码中，函数f2就在函数f1内部，这时f1内部的所有局部变量，对f2都是可见的。但是反过来就不行，f2内部的局部变量，对f1就是不可见的。这就是JavaScript语言特有的"链式作用域"结构（chain scope），子对象会一级一级地向上寻找所有父对象的变量。所以，父对象的所有变量，对子对象都是可见的，反之则不成立。

既然f2可以读取f1的局部变量，那么只要把f2作为返回值，我们不就可以在f1外部读取它的内部变量了吗！

      ```javascript
      function f1() {
        var n = 999;
        function f2() {
          console.log(n);
        }
        return f2;
      }

      var result = f1();
      result(); // 999
      ```

上面代码中，函数f1的返回值就是函数f2，由于f2可以读取f1的内部变量，所以就可以在外部获得f1的内部变量了。

闭包就是函数f2，即能够读取其他函数内部变量的函数。由于在JavaScript语言中，只有函数内部的子函数才能读取内部变量，因此可以把闭包简单理解成"定义在一个函数内部的函数"。闭包最大的特点，就是它可以"记住"诞生的环境，比如f2记住了它诞生的环境f1，所以从f2可以得到f1的内部变量。在本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁。

闭包的最大用处有两个，一个是可以读取函数内部的变量，另一个就是让这些变量始终保持在内存中，即闭包可以使得它诞生环境一直存在。请看下面的例子，闭包使得内部变量记住上一次调用时的运算结果。

      ```javascript
      function createIncrementor(start) {
        return function () {
          return start++;
        };
      }

      var inc = createIncrementor(5);

      inc() // 5
      inc() // 6
      inc() // 7
      ```

上面代码中，start是函数createIncrementor的内部变量。通过闭包，start的状态被保留了，每一次调用都是在上一次调用的基础上进行计算。从中可以看到，闭包inc使得函数createIncrementor的内部环境，一直存在。所以，闭包可以看作是函数内部作用域的一个接口。

为什么会这样呢？原因就在于inc始终在内存中，而inc的存在依赖于createIncrementor，因此也始终在内存中，不会在调用结束后，被垃圾回收机制回收。

**闭包的另一个用处，是封装对象的私有属性和私有方法。**

      ```javascript
      function Person(name) {
        var _age;
        function setAge(n) {
          _age = n;
        }
        function getAge() {
          return _age;
        }

        return {
          name: name,
          getAge: getAge,
          setAge: setAge
        };
      }

      var p1 = Person('张三');
      p1.setAge(25);
      p1.getAge() // 25
      ```

上面代码中，函数Person的内部变量_age，通过闭包getAge和setAge，变成了返回对象p1的私有变量。

_注意，外层函数每次运行，都会生成一个新的闭包，而这个闭包又会保留外层函数的内部变量，所以内存消耗很大。因此不能滥用闭包，否则会造成网页的性能问题。_

### 立即调用的函数表达式（IIFE）

在Javascript中，一对圆括号()是一种运算符，跟在函数名之后，表示调用该函数。比如，print()就表示调用print函数。

有时，我们需要在定义函数之后，立即调用该函数。这时，你不能在函数的定义之后加上圆括号，这会产生语法错误。

      ```javascript
      function(){ /* code */ }();
      // SyntaxError: Unexpected token (
      ```

产生这个错误的原因是，function这个关键字即可以当作语句，也可以当作表达式。

      ```javascript
      // 语句
      function f() {}

      // 表达式
      var f = function f() {}
      ```

为了避免解析上的歧义，JavaScript引擎规定，如果function关键字出现在行首，一律解释成语句。因此，JavaScript引擎看到行首是function关键字之后，认为这一段都是函数的定义，不应该以圆括号结尾，所以就报错了。

解决方法就是不要让function出现在行首，让引擎将其理解成一个表达式。最简单的处理，就是将其放在一个圆括号里面。

      ```javascript
      (function(){ /* code */ }());
      // 或者
      (function(){ /* code */ })();
      ```

上面两种写法都是以圆括号开头，引擎就会认为后面跟的是一个表示式，而不是函数定义语句，所以就避免了错误。这就叫做`“立即调用的函数表达式”`（Immediately-Invoked Function Expression），简称IIFE。

推而广之，任何让解释器以表达式来处理函数定义的方法，都能产生同样的效果，比如下面三种写法。

      ```javascript
      var i = function(){ return 10; }();
      true && function(){ /* code */ }();
      0, function(){ /* code */ }();
      //甚至像下面这样写，也是可以的。

      !function(){ /* code */ }();
      ~function(){ /* code */ }();
      -function(){ /* code */ }();
      +function(){ /* code */ }();
      //new关键字也能达到这个效果。

      new function(){ /* code */ }

      new function(){ /* code */ }()
      // 只有传递参数时，才需要最后那个圆括号
      ```

通常情况下，只对匿名函数使用这种"立即执行的函数表达式"。它的目的有两个：一是不必为函数命名，避免了污染全局变量；二是IIFE内部形成了一个单独的作用域，可以封装一些外部无法读取的私有变量。

      ```javascript
      // 写法一
      var tmp = newData;
      processData(tmp);
      storeData(tmp);

      // 写法二
      (function (){
        var tmp = newData;
        processData(tmp);
        storeData(tmp);
      }());
      ```

上面代码中，写法二比写法一更好，因为完全避免了污染全局变量。

#### eval命令

eval命令的作用是，将字符串当作语句执行。

      ```javascript
      eval('var a = 1;');
      a // 1
      ```

上面代码将字符串当作语句运行，生成了变量a。

放在eval中的字符串，应该有独自存在的意义，不能用来与eval以外的命令配合使用。举例来说，下面的代码将会报错。

      ```javascript
      eval('return;');
      ```

eval没有自己的作用域，都在当前作用域内执行，因此可能会修改当前作用域的变量的值，造成安全问题。

      ```javascript
      var a = 1;
      eval('a = 2');

      a // 2
      ```

上面代码中，eval命令修改了外部变量a的值。由于这个原因，eval有安全风险。

为了防止这种风险，JavaScript规定，如果使用严格模式，eval内部声明的变量，不会影响到外部作用域。

      ```javascript
      (function f() {
        'use strict';
        eval('var foo = 123');
        console.log(foo);  // ReferenceError: foo is not defined
      })()
      ```

上面代码中，函数f内部是严格模式，这时eval内部声明的foo变量，就不会影响到外部。

不过，即使在严格模式下，eval依然可以读写当前作用域的变量。

      ```javascript
      (function f() {
        'use strict';
        var foo = 1;
        eval('foo = 2');
        console.log(foo);  // 2
      })()
      ```

上面代码中，严格模式下，eval内部还是改写了外部变量，可见安全风险依然存在。

此外，eval的命令字符串不会得到JavaScript引擎的优化，运行速度较慢。这也是一个不应该使用它的理由。

通常情况下，eval最常见的场合是解析JSON数据字符串，不过正确的做法应该是使用浏览器提供的JSON.parse方法。

JavaScript引擎内部，eval实际上是一个引用，默认调用一个内部方法。这使得eval的使用分成两种情况，一种是像上面这样的调用eval(expression)，这叫做"直接使用"，这种情况下eval的作用域就是当前作用域。除此之外的调用方法，都叫"间接调用"，此时eval的作用域总是全局作用域。

      ```javascript
      var a = 1;

      function f() {
        var a = 2;
        var e = eval;
        e('console.log(a)');
      }

      f() // 1
      ```

上面代码中，eval是间接调用，所以即使它是在函数中，它的作用域还是全局作用域，因此输出的a为全局变量。

eval的间接调用的形式五花八门，只要不是直接调用，都属于间接调用。

      ```javascript
      eval.call(null, '...')
      window.eval('...')
      (1, eval)('...')
      (eval, eval)('...')
      ```

上面这些形式都是eval的间接调用，因此它们的作用域都是全局作用域。

与eval作用类似的还有Function构造函数。利用它生成一个函数，然后调用该函数，也能将字符串当作命令执行。

      ```javascript
      var jsonp = 'foo({"id": 42})';

      var f = new Function( "foo", jsonp );
      // 相当于定义了如下函数
      // function f(foo) {
      //   foo({"id":42});
      // }

      f(function(json){
        console.log( json.id ); // 42
      })
      ```

上面代码中，jsonp是一个字符串，Function构造函数将这个字符串，变成了函数体。调用该函数的时候，jsonp就会执行。这种写法的实质是将代码放到函数作用域执行，避免对全局作用域造成影响。

不过，new Function()的写法也可以读写全局作用域，所以也是应该避免使用它。

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
