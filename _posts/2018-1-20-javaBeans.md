---
layout: post
title: "JavaBeans"
date: 2018-1-20
description: "JavaBeans及其使用方式，作用域范围"
tag: java-web
comments: true
---

[「主要引用地址」](http://blog.csdn.net/u014038534/article/details/50537065)~ 进击的乌龟 菜鸟教程 百度 | javaBeams~

### 一、什么是javabean

**三层含义:**

1. Javabeans就是符合某种特定规范（一种在Java（包括JSP）中可重复使用的Java组件的技术规范,也可以说成我们常说的接口）的Java类。使用Javabeans的好处是【解决代码的重复编写】，减少代码冗余，功能区分明确，提高代码的维护性。

2. JavaBeans是一个Java的类，一般来说，这样的Java类将对应于一个独立的 .java文件 ，在绝大多数情况下，这应该是一个public类型的类。

3. 设计原则四点：公有类，属性私有，包含无参的共有构造方法，getter和setter方法封装属性,当JavaBeans这样的一个Java类在我们的具体的Java程序中被实例之后，这就是我们面向对象的对象，我们有时也会将这样的一个JavaBeans的实例称之为JavaBeans。总之，就是Java中的接口、类和对象。

 JavaBean可分为两种：一种是有用户界面（UI，User Interface）的JavaBean；还有一种是没有用户界面，主要负责处理事务（如数据运算，操纵数据库）的JavaBean。

###### JavaBean与其它Java类相比而言独一无二的特征：

- 提供一个默认的无参构造函数。
- 需要被序列化并且实现了Serializable接口。
- 可能有一系列可读写属性。
- 可能有一系列的"getter"或"setter"方法

###### JavaBean属性
一个JavaBean对象的属性应该是可访问的。这个属性可以是任意合法的Java数据类型，包括自定义Java类。

一个JavaBean对象的属性可以是可读写，或只读，或只写。JavaBean对象的属性通过JavaBean实现类中提供的两个方法来访问：

###### javabean - JSP动作元素

（1）JSP动作元素为请求处理阶段提供信息。
（2）动作元素遵循XML元素的语法。有一个包含元素名的开始标签，可以有属性、可选内容，以及结束标签。

###### JavaBean 程序示例
这是StudentBean.java文件：

	```java
    package com.runoob;

    public class StudentsBean implements java.io.Serializable
    {
       private String firstName = null;
       private String lastName = null;
       private int age = 0;

       public StudentsBean() {
       }
       public String getFirstName(){
          return firstName;
       }
       public String getLastName(){
          return lastName;
       }
       public int getAge(){
          return age;
       }

       public void setFirstName(String firstName){
          this.firstName = firstName;
       }
       public void setLastName(String lastName){
          this.lastName = lastName;
       }
       public void setAge(int age) {
          this.age = age;
       }
    }
	```

---------------------------------------------
#### JSP动作分为以下几类：

（1）与存取JavaBean有关的6个元素。 如：
`<jsp:useBean> <jsp:setProperty> <jsp:getProperty>`
（2）6个动作元素。 如：
`<jsp:include> <jsp:forward> <jsp:param> <jsp:plugin> <jsp:params> <jsp:fallback>`
（3）与Document有关的6个元素：
`<jsp:root> <jsp:declaration> <jsp:scriptlet> <jsp:expression> <jsp:text> <jsp:output>`
（4）用来动态生成XML元素标签的3个动作：
`<jsp:attribute> <jsp:body> <jsp:element>`
（5）用在Tag File中的2个元素：
`<jsp:invoke> <jsp:dobody>`



#### Javabean的使用方式

（1）像使用普通java类一样,创建javabean实例

1、创建一个web project项目。
2、在src文件下，创建一个包，在包中创建一个类，满足设计原则即可
3、在index.jsp页面中通过import导入之前创建的类（import="包名.类名"）
4、通过使用new创建Javabean实例(创建对象)
5、使用set方法赋值
6、使用get方法取值

（2）使用Jsp的动作标签，如

1、`<jsp:useBean id="标识符(类似于Java中的变量名)" class="java类名(需要将包名一同写入)" scope="作用范围(默认是page)">`

作用：在jsp页面中实例化或者在指定范围内使用javabean

2、`<jsp:setProperty>`动作：给已经实例化的Javabean对象的属性赋值，一共有四种形式：
      a、 需要表单提交属性：`<jsp:setProperty name="Javabean实例名" property="*"/>`：与之前页面提交的表单的所有属性进行匹配，若有与javabean类属性名相同的，则进行赋值。比如表坛提交了username="xxx"，而javabean里有username属性，则对其进行赋值
      b、 需要表单提交属性`<jsp:setPropery name="Javabean实例名" property="javabean属性名" />`：根据表单匹配部分属性（对指定的属性进行匹配）
      c、手动设置属性：`<jsp:setProperty name = "Javabean实例名" property="Javabean属性名" value="BeanValue" />`
      d、与request参数有关,通过url传参 ：`<jsp:setProperty name="Javabean实例名" property="propertyName" param="request对象中的参数名" />`（跟request参数关联）

3、`<jsp:getProperty>`：获取指定javabean对象的属性值。

`<jsp:getProperty name="JavaBean实例名" property=“属性名”/>`



#### javabean的作用域范围

通过`<jsp:useBean>`标签的scope属性进行设置

JavaBean的生命周期存在于4种范围之中，分别为page、request、session、application，它们通过`<jsp:useBean>`标签的scope属性进行设置。这4种范围虽然存在很大的区别，但它们与JSP页面中的page、request、session、application范围相对应。

page范围：与当前页面相对应，JavaBean的生命周期存在于一个页面之中，当页面关闭时JavaBean被销毁。可以通过`pageContext.getAttribute("标识符(类似于Java中的变量名)" )`方法取得JavaBean对象

request范围：与JSP的request生命周期相对应，JavaBean的生命周期存在于request对象之中，当request对象销毁时JavaBean也被销毁。可以通过`HttpRequest.getAttribute("标识符(类似于Java中的变量名)" )`方法取得JavaBean对象

session范围：与JSP的session生命周期相对应，JavaBean的生命周期存在于session会话之中，当session超时或会话结束时JavaBean被销毁。可以通过`HttpSession.getAtrribute("标识符(类似于Java中的变量名)" )`方法取得JavaBean对象

application范围：与JSP的application生命周期相对应，在各个用户与服务器之间共享，只有当服务器关闭时JavaBean才被销毁。可以通过`application.getAtrribute("标识符(类似于Java中的变量名)" )`方法来取得JavaBean对象

这4种作用范围与JavaBean的生命周期是息息相关的，当JavaBean被创建后，通过`<jsp:setProperty>`标签与`<jsp:getProperty>`标签调用时，将会按照page、request、session和application的顺序来查找这个JavaBean实例，直至找到一个实例对象为止，如果在这4个范围内都找不到JavaBean实例，则抛出异常。

**注：**

当数据只需要在下一个forward（转发）有用时，用request就够了；
若数据不只是在下一个forward（转发）有用时，例如重定向，就用session。
上下文，环境信息之类的，用application。

### 访问JavaBean
<jsp:useBean> 标签可以在JSP中声明一个JavaBean，然后使用。声明后，JavaBean对象就成了脚本变量，可以通过脚本元素或其他自定义标签来访问。<jsp:useBean>标签的语法格式如下：

`<jsp:useBean id="bean 的名字" scope="bean 的作用域" typeSpec/>`
其中，根据具体情况，scope的值可以是page，request，session或application。id值可任意只要不和同一JSP文件中其它<jsp:useBean>中id值一样就行了。

接下来给出的是 <jsp:useBean> 标签的一个简单的用法：

	```jsp
    <%@ page language="java" contentType="text/html; charset=UTF-8"
        pageEncoding="UTF-8"%>
    <html>
    <head>
    <title>useBean 实例</title>
    </head>
    <body>

    <jsp:useBean id="date" class="java.util.Date" /> 
    <p>日期为：<%= date %>

    </body>
    </html>
    ```
    
它将会产生如下结果：

`日期为：Tue Jun 28 15:22:24 CST 2016`

### 访问 JavaBean 对象的属性

在 <jsp:useBean> 标签主体中使用 <jsp:getProperty/> 标签来调用 getter 方法，使用 <jsp:setProperty/> 标签来调用 setter 方法，语法格式如下：

    <jsp:useBean id="id" class="bean 编译的类" scope="bean 作用域">
       <jsp:setProperty name="bean 的 id" property="属性名"  
                        value="value"/>
       <jsp:getProperty name="bean 的 id" property="属性名"/>
       ...........
    </jsp:useBean>

name属性指的是Bean的id属性。property属性指的是想要调用的getter或setter方法。

接下来给出使用以上语法进行属性访问的一个简单例子：

    <%@ page language="java" contentType="text/html; charset=UTF-8"
        pageEncoding="UTF-8"%>
    <html>
    <head>
    <title>get 和 set 属性实例</title>
    </head>
    <body>

    <jsp:useBean id="students" 
                        class="com.runoob.StudentsBean"> 
       <jsp:setProperty name="students" property="firstName"
                        value="小强"/>
       <jsp:setProperty name="students" property="lastName" 
                        value="王"/>
       <jsp:setProperty name="students" property="age"
                        value="10"/>
    </jsp:useBean>

    <p>学生名字: 
       <jsp:getProperty name="students" property="firstName"/>
    </p>
    <p>学生姓氏: 
       <jsp:getProperty name="students" property="lastName"/>
    </p>
    <p>学生年龄: 
       <jsp:getProperty name="students" property="age"/>
    </p>

    </body>
    </html>
    
访问以上 JSP，运行结果如下：

    学生名字: 小强

    学生姓氏: 王

    学生年龄: 10

## 引申和高级部分
![]({{ site.baseurl }}/post_imgs/javabean.jpg)
### JavaBeans体系结构特征

- 设计模式
JavaBean最重要的特征就是它只是标准化的一个层次。设计模式(即编码约定) 可以使工具和人们识别出一个JavaBean的基本特性，并且加以处理，而无需了解它是如何实现的。可以称Bean是“自描述的”(self-documenting)。通过分析一个Bean，可以指出它能够激活和接收什么事件;也可以掌握其特性 (等价于它的公共变量)和方法。对于Bean特为IDE而设计的性质，它还能够提供有关的显式信息。
- 反射
反射(Reflection)是Java语言的一个重要特性。基于反射，Java代码则有可能在运行时检查和处理新的Java对象。在JavaBeans领域中，反射允许开发工具分析Bean的功能，还可以检查其字段的值并调用其方法。本质上说，反射使得在运行时汇集在一起的Java对象也可以做任何事情，就好像这些对象是在编译时汇合的一样。即使一个Bean并没有与任何“内置” 文档相绑定，通过使用反射来直接审查该类，我们仍然可以收集到有关其功能和特性的信息。
- 对象串行化
最后，Java串行化API (Java Serialization API) 使我们可以将一个活动的应用或应用组件“冰冻” (有人更喜欢“腌制(pickle)”这个词)，以后再将其复原。这是很重要的一步; 这样就有可能将应用接合起来而无需生成过多的代码。在此不必在启动时定制和编译大量的Java代码来构建应用，而只需将Bean 粘贴在一起，对其进行配置，调整其外观，然后保存就可以了。在此之后，这些Bean还可以恢复，而其状态以及相互连接均可做到原封不动的保留。由此，对于设计过程的考虑就有可能存在各种各样的方法。另外，对于从手写Java代码得到的串行化对象，使用起来也很容易，因此可以任意地将“冰冻”的Bean 与原有的Bean类以及其他Java代码加以混合。在Java 1.4中，增加了一种“长期”对象串行化机制，它可以把JavaBean用一种XML格式来保存，从而能够很好地感知类中所做的修改。[2] 
- 组成部分
1. 属性（properties）
JavaBean提供了高层次的属性概念，属性在JavaBean中不只是传统的面向对象的概念里的属性，它同时还得到了属性读取和属性写入的API的支持。属性值可以通过调用适当的bean方法进行。比如，可能bean有一个名字属性，这个属性的值可能需要调用String getName（）方法读取，而写入属性值可能要需要调用void setName（String str）的方法。
每个JavaBean属性通常都应该遵循简单的方法命名规则，这样应用程序构造器工具和最终用户才能找到JavaBean提供的属性，然后查询或修改属性值，对bean进行操作。JavaBean还可以对属性值的改变作出及时的反应。比如一个显示当前时间的JavaBean，如果改变时钟的时区属性，则时钟会立即重画，显示当前指定时区的时间。
2. 方法（method）
JavaBean中的方法就是通常的Java方法，它可以从其他组件或在脚本环境中调用。默认情况下，所有bean的公有方法都可以被外部调用，但bean一般只会引出其公有方法的一个子集。
由于JavaBean本身是Java对象，调用这个对象的方法是与其交互作用的唯一途径。JavaBean严格遵守面向对象的类设计逻辑，不让外部世界访问其任何字段（没有public字段）。这样，方法调用是接触Bean的唯一途径。
但是和普通类不同的是，对有些Bean来说，采用调用实例方法的低级机制并不是操作和使用Bean的主要途径。公开Bean方法在Bean操作中降为辅助地位，因为两个高级Bean特性--属性和事件是与Bean交互作用的更好方式。
因此Bean可以提供要让客户使用的public方法，但应当认识到，Bean设计人员希望看到绝大部分Bean的功能反映在属性和事件中，而不是在人工调用和各个方法中。
3. 事件（event）
Bean与其他软件组件交流信息的主要方式是发送和接受事件。我们可以将bean的事件支持功能看作是集成电路中的输入输出引脚：工程师将引脚连接在一起组成系统，让组件进行通讯。有些引脚用于输入，有些引脚用于输出，相当于事件模型中的发送事件和接收事件。
事件为JavaBean组件提供了一种发送通知给其他组件的方法。在AWT事件模型中，一个事件源可以注册事件监听器对象。当事件源检测到发生了某种事件时，它将调用事件监听器对象中的一个适当的事件处理方法来处理这个事件

### 程序模块设计编辑
程序模块(program module)即可由汇编程序、编译程序、装入程序或翻译程序作为一个整体来处理的一级独立的、可识别的程序指令。 它是大型程序指令的一个组成部分。 在Windows中，术语“模块”一般是指任何能被装入内存中运行的可执行代码和数据的集合。更明确地讲，模块指的就是一个。EXE文件（又称为应用程序模块），或一个动态链接库（DLL — Dynamic Linking Library，又被称为动态链接库模块或DLL模块），或一个设备驱动程序，也可能是一个程序包含的能被另一个程序存取的数据资源。模块一词也被用于特指自包含的一段程序。
模块化是个一般概念，这一概念也适用于软件开发，可以让软件按模块单独开发，各模块通常都用一个标准化的接口来进行通信。实际上，除了规模大小有区别外，面向对象语言中对象之间的关注点分离与模块化的概念基本一致。通常，把系统划分外多个模块有助于将耦合减至最低，让代码维护更加简单。[3] 
程序模块设计将一个大程序划分成几个功能相对独立的程序模块，然后再对各模块进行程序设计。只要模块间的接口关系不变，每个模块内部的具体实现细节可随意修改。这种程序设计方法称模块程序设计。对模块程序的要求有：(1)各模块的独立性要强。即在同一模块内的结构要素(语句或数据)之间具有较强的相关性(模块强度高)，模块之间的相关性尽量少(耦合度弱)。一旦整个程序实现的任务需作一点变更时，或者要修改某个错误时，只需修改个别模块，不必修改全部程序。(2)选出通用模块，最大限度地利用可利用的模块。(3)各模块的大小要适当，需要细分的模块要细分，小模块能被上层模块吸收的要吸收进去。
这样设计出的模块便具有可修改性、可读性、可检验性。
模块程序设计的优点在于可以把大型程序分解为子模块，便于进行程序设计。模块的相对独立使它们便于共享，提高了程序设计的效率。
目前模块程序已发展为层次模块程序，使模块间又具有层次结构关系，即按照上层模块调用下层模块的原则建立起来的分层结构，因而使设计出来的程序具有较好的结构和可理解性，调试和修改都方便。

##### 拓展阅读
[Java 帝国之Java bean (上）](https://mp.weixin.qq.com/s?__biz=MzAxOTc0NzExNg==&mid=2665513115&idx=1&sn=da30cf3d3f163d478748fcdf721b6414#rd)
[Java 帝国之Java bean（下）](https://mp.weixin.qq.com/s?__biz=MzAxOTc0NzExNg==&mid=2665513118&idx=1&sn=487fefb8fa7efd59de6f37043eb21799#rd)