---
layout: post
title: "iframe.contentWindow 属性：关于contentWindow和contentDocument区分"
date: 2018-3-21
description: "iframe.contentWindow 属性：关于contentWindow和contentDocument区分"
tag: js
comments: true
---

## iframe.contentWindow 属性：关于contentWindow和contentDocument区分

contentDocument 属性能够以 HTML 对象来返回 iframe 中的文档，可以通过所有标准的 DOM 方法来处理被返回的对象。
语法：`frameObject.contentWindow，或者 iframeObject.contentWindow`（不是jquery对象）

用iframe嵌套页面时，如果父页面要获取子页面里面的内容，可以使用contentWindow或者contentDocument，其区别如下：

1. contentWindow  这是个只读属性，返回指定的iframe的窗口对象。它虽然不是标准的一部分，但各个主流浏览器都支持。

2. contentDocument  Firefox 支持，IE6，IE7都不支持，IE8开始支持,需要如此访问 document.frames['J_mainframe'].document。

兼容获取document对象：

```js
var getIFrameDoc = function(){
    var iobj = document.createElement("iframe");
    document.getElementsByTagName("body")[0].appendChild(iobj);
    return iobj.contentDocument || iobj.contentWindow.document;
}
```

> 基本使用：

1、document.getElementById("myiframe").contentWindow，得到iframe对象后，就可以通过contentWindow得到iframe包含页面的window对象，然后就可以正常访问页面元素了；

2、$("#myiframe")[0].contentWindow，jquery选择器获得iframe，先把jquery对象转换为DOM对象，或者使用get()方法转换；

3、$("#myiframe")[0].contentWindow.$("#dd").val()，可以在得到iframe的window对象后接着使用jquery选择器进行页面操作；

4、$("#myiframe")[0].contentWindow.username="zhangsan"; 可以通过这种方式向iframe页面传递参数，在iframe页面window.username就可以获取到值，username是自定义的全局变量；

5、在iframe页面通过parent可以获得主页面的window，接着就可以正常访问父亲页面的元素了；

6、parent.$("#frame_A")[0].contentWindow.document.getElmentById("#frame_B"); 同级iframe页面之间调用，需要先得到父亲的window，然后调用同级的iframe得到window进行操作；

```js
//在子级iframe设置 父级 iframe ，或 孙级 iframe 高度。
function showIframeH(){
    var parentWin = parent.document.getElementById("test");
    if(!parentWin) return false;

    var sub = parentWin.contentWindow.document.getElementById("test2");
    if(!sub) return false;
    
    var thirdHeight = sub.contentWindow.document.body.offsetHeight; //第三层 body 对象
    
    sub.height = thirdHeight; //设置第二层 iframe 的高度
    
    var secondHeight = parentWin .contentWindow.document.body.offsetHeight; //第二层 body 对象
    parentWin .height = secondHeight; //设置第一层 iframe 的高度
}
```

实例：

　　top.$("iframe[name='iframeWindow']")[0].contentWindow.$("#inside_tableElement")，这样才能获取到iframe里的元素，
　　注意：top.$("iframe[name='iframeWindow']").eq(0).$("#inside_tableElement")，是获取不到的

### jquery 获取父窗口的元素、父窗口、子窗口

> 一、获取父窗口元素：

　　$("#父窗口元素ID",window.parent.document)；对应javascript版本为window.parent.document.getElementById("父窗口元素ID")；

　　取父窗口的元素方法：$(selector, window.parent.document);

　　那么你取父窗口的父窗口的元素就可以用：$(selector, window.parent.parent.document);

　　类似的，取其它窗口的方法大同小异

　　$(selector, window.top.document);

　　$(selector, window.opener.document);

　　$(selector, window.top.frames[0].document);

> 二、Javascript弹出子窗口

**(1) 通过window对象的open()方法，open()方法将会产生一个新的window窗口对象**

　　其用法为：window.open(URL,windowName,parameters);

　　URL: 描述要打开的窗口的URL地址，如何为空则不打开任何网页；

　　windowName:描述被打开的窗口的名称，可以使用'_top'、'_blank'等内建名称，这里的名称跟`<a href="..." target="...">`里的target属性是一样的。

　　parameters:描述被打开的窗口的参数值，或者说是样貌，其包括窗口的各个属性值，及要传入的参数值。

    ```js
    //打开一个400 x 100 的干净的窗口：
    open('','_blank','width=400,height=100,menubar=no,toolbar=no,location=no,directories=no,status=no,scrollbars=yes,resizable=yes')

    //也可以这样写：
    var newWindow = open('','_blank');
    ```

> 参数说明如下：

    top=# 窗口顶部离开屏幕顶部的像素数

    left=# 窗口左端离开屏幕左端的像素数

    width=# 窗口的宽度

    height=# 窗口的高度

    menubar=... 窗口有没有菜单，取值yes或no

    toolbar=... 窗口有没有工具条，取值yes或no

    location=... 窗口有没有地址栏，取值yes或no

    directories=... 窗口有没有连接区，取值yes或no

    scrollbars=... 窗口有没有滚动条，取值yes或no

    status=... 窗口有没有状态栏，取值yes或no

    resizable=... 窗口给不给调整大小，取值yes或no


**(2) 在javascript中除了通过open()方法建立window对象实现弹出窗口外，还可以通过建立对话框的方式弹出窗口**

    alert(""); //弹出信息提示对话框

    confirm(""); //弹出信息确认对话框

    prompt(""); //具有交互性质的对话框

**(3) 使用模态对话框实现复杂的对话框需求**

在javascript的内建方法中还有一类方法可以实现通过对话框显示HTML内容，也就是说可以通过创建对话框的方式来完成创建窗口对象所能完成的功能。

　　包括创建模态对话框和非模态对话框两种。

    ```js
    //创建模态你对话框
    window.showModalDialog(sURL,vArguments,sFeatures)
    //创建非模态对话框
    window.showModelessDialog(sURL,vArguments,sFeatures)
    ```

　　其区别在于：用showModelessDialog()打开窗口时，不必用window.close()去关闭它，当以非模态方式［IE5］打开时，打开对话框的窗口仍可以进行其他的操作，即对话框不总是最上面的焦点，当打开它的窗口URL改变时，它自动关闭。而模态［IE4］方式的对话框始终有焦点（焦点不可移走，直到它关闭）。模态对话框和打开它的窗口相联系，因此我们打开另外的窗口时，他们的链接关系依然保存，并且隐藏在活动窗口的下面。showModeDialog()则不然。


参数说明：

    sURL：必选参数，类型：字符串。用来指定对话框要显示的文档的URL

    vArguments：可选参数，类型：变体。用来向对话框传递参数。传递的参数类型不限，包括数组等。对话框通过window.dialogArguments来取得传递进来的参数

    sFeatures：选参数，类型：字符串。用来描述对话框的外观等信息，可以使用以下的一个或几个，用分号“;”隔开

    dialogHeight：对话框高度，不小于100px，IE4中dialogHeight和dialogWidth 默认的单位是em，而IE5中是px，为方便其见，在定义modal方式的对话框时，用px做单位

    dialogWidth: 对话框宽度

    dialogLeft: 距离桌面左的距离

    dialogTop: 离桌面上的距离

    center: 窗口是否居中，默认yes，但仍可以指定高度和宽度,取值范围{yes | no | 1 | 0 }

    help: 是否显示帮助按钮，默认yes，取值范围{yes | no | 1 | 0 }

    resizable: 是否可被改变大小，默认no，取值范围{yes | no | 1 | 0 } ［IE5+］

    status: 是否显示状态栏，默认为yes[ Modeless]或no[Modal]，取值范围{yes | no | 1 | 0 } ［IE5+］

    scroll:指明对话框是否显示滚动条，默认为yes，取值范围{ yes | no | 1 | 0 | on | off }

    还有几个属性是用在HTA中的，在一般的网页中一般不使用。

    dialogHide:在打印或者打印预览时对话框是否隐藏，默认为no，取值范围{ yes | no | 1 | 0 | on | off }。

    edge:指明对话框的边框样式，默认为raised，取值范围{ sunken | raised }。

    unadorned:默认为no，取值范围{ yes | no | 1 | 0 | on | off }。


传入参数：要向对话框传递参数，是通过vArguments来进行传递的。类型不限制，对于字符串类型，最大为4096个字符。也可以传递对象

    var newWin=window.showModalDialog(url,window,'dialogHeight:500px, dialogLeft:100px, dialogTop:100px,dialogWidth:300px, status:0, edge:sunken');
    newWin.open();

与使用window.open()方法创建窗口相比，模态方法创建窗口的区别在于有模态方法创建的窗口后将不能操作父窗口。

> 三、子窗口与父窗口间通信：

**(1) 使用window.open()创建的窗口与父窗口通信**

可以在子窗口页面中通过window.opener来获取父窗口对象，获取之后子窗口便可以对父窗口执行刷新，传值等操作。

    ```js
    window.opener.location.reload(); //子窗口刷新父窗口
    window.opener.location.href //获取父窗口href
    window.opener.locaiton.pathname //获取父窗口路径名

    //刷新父页面
    window.location.href=window.location.href ; //重新定位父页面
    window.location.reload;
    ```

**(2) 模态窗口与父窗口通信**

　　通过使用showModelDialog() 及showModelessDialog() 方法创建的子窗口想与父窗口通信时，不能通过window.opener来获取父窗口对象。

　　要实现通信，必须在创建模态子窗口时向子窗口传入父窗口对象。

（一）实现方式为：

　　1、在父窗口中：

    ```js
    var newWin=window.showModelDialog(url,window,'');
    newWin.open();
    //此时参数window即是父窗口对象
    ```

　　2、在子窗口中：

　　需首先获取父窗口对象，然后才能使用父窗口对象。由于父窗口对象是在创建子窗口时通过传入参数的方式传入的，因此，在子窗口中也只能通过获取窗口参数的方式获取父窗口对象。获取方式如下：

    ```js
    var parent=widnow.dialogArguments；

　　 //变量parent便是父窗口对象。

    //通过子窗口提交父窗口中的表单：form1,提交后执行查询操作
    var parent=window.dialogArguments;
    parent.document.form1.action="QueryInfor.jsp";
    parent.submit();

    //刷新父页面
    var parent=window.dialogArguments;
    parent.location.reload();
　　 //从子窗口传值到父窗口：要实现在模态子窗口中传值到父窗口，需要使用window.returnValue完成
    ```

（二）实现方法如下：

　　1、在子窗口中：

    ```js
    //获取父窗口某字段值，对该值加一后返回父窗口
    var parent=window.dialogArguments;//获取父窗口对象
    var x=parent.docuement.getElementById("age").value;
    x=x+1；
    
    //传回x值
    window.returnValue=x;
    ```

　　2、在父窗口中：

    ```js
    //获取来自子窗口的值
    var newWin=window.showModelDialog(url,window,'');
    if(newWin!=null){
        document.getElementById("age").value=newWin;
    }
    ```

（三）在子窗口中设置父窗口的值

　　在子窗口中向父窗口中传入值似乎没有直接设置父窗口中的值来得明了。直接设置父窗口中元素的值显得要更灵活一些，不过具体使用哪种方法要根据实际情况和已有的实现方式而定，因为如果使用了不切实际的方法不仅降低开发效率，也降低了执行效率，往往也会造成不优雅的实现方式和代码风格。

　　子窗口设置父窗口的值使用方法如下：

　　1、子窗口中：

    var parent=window.dialogArguments;
    var x=parent.document.getElementById("age").value;
    x=x+1;

　　2、设置父窗口中age属性值

    parent.document.getElementById("age").value=x;
　　