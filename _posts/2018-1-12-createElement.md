---
layout: post
title: "js createElement and createDocumentFragment"
date: 2018-1-12
description: "js createElement and createDocumentFragment"
tag: js-DOM
comments: true
---
### createElement与createDocumentFragment的点点区别

在DOM操作里，createElement是创建一个新的节点，createDocumentFragment是创建一个文档片段。

网上可以搜到的大部分都是说使用createDocumentFragment主要是因为避免因createElement多次添加到document.body引起的效率问题，比如：

    ```js
    var arrText=["1","2","3","4","5","6","7","8","9","10"];
    for(var i=0;i<arrText.length;i++){
        var op=document.createElement("P");
        var oText=document.createTextNode(arrText[i]);
        op.appendChild(oText);
        document.body.appendChild(op);
    }

    var arrText=["1","2","3","4","5","6","7","8","9","10"];
    var oFrag=document.createDocumentFragment();

    for(var i=0;i<arrText.length;i++){
        var op=document.createElement("P");
        var oText=document.createTextNode(arrText[i]);
        op.appendChild(oText);
        oFrag.appendChild(op);
        
    }
    document.body.appendChild(oFrag);
    ```

（声明：这是我google的第一个例子，并不代表对原作者有任何意见，原文地址http://www.cnitblog.com/asfman/articles/32614.html）

这个说法并没有错，但是并不严谨，因为像这种用法，主要还是用在目标节点是已存在并且有一部分内容的情况下，比如上面例子中的body元素，如果目标节点并不存在或者为空，完全可以用createElement创建一个相同的元素，操作之后再使用一次appendChild或者replaceChild来达到相同的目的，这样也不存在重复刷新的问题。

 

虽说我平时都是把两者混着用，但是还是得明白两者之间的一点区别：

第一：

createElement创建的元素可以使用innerHTML，createDocumentFragment创建的元素使用innerHTML并不能达到预期修改文档内容的效果，只是作为一个属性而已。两者的节点类型完全不同，并且createDocumentFragment创建的元素在文档中没有对应的标记，因此在页面上只能用js中访问到。

demo：

    ```html
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
            "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <title></title>
        <style type="text/css">
            #outer{ height: 200px; border: 1px solid #006400;}
        </style>
    </head>
    <body>
    <div id="outer">
    </div>
    <input type="button" value="createElement" id="btn_1"/><input type="button" value="createDocumentFragment" id="btn_2"/>
    <script type="text/javascript">
    var fragment_1 = document.createDocumentFragment();
            fragment_1.innerHTML = '<p>我是一个粉刷匠</p>';
            document.body.appendChild(fragment_1);
        var fragment_2 = document.createElement('p');
            fragment_2.innerHTML = '粉刷本领强';
            document.body.appendChild(fragment_2);
    </script>
    </body>
    </html>
    ```
 

第二：另一个最主要的区别就是createElement创建的元素可以重复操作，添加之后就算从文档里面移除依旧归文档所有，可以继续操作，但是createDocumentFragment创建的元素是一次性的，添加之后再就不能操作了（说明：这里的添加并不是添加了新创建的片段，因为上面说过，新创建的片段在文档内是没有对应的标签的，这里添加的是片段的所有子节点）。

一个对比的例子：

    ```html
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
            "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <title></title>
        <style type="text/css">
            #outer{ height: 200px; border: 1px solid #006400;}
        </style>
    </head>
    <body>
    <div id="outer">
    </div>
    <input type="button" value="createElement" id="btn_1"/><input type="button" value="createDocumentFragment" id="btn_2"/>
    <script type="text/javascript">
        function $(id){
            return document.getElementById(id);
        }
        var outer = $('outer');
        var inner = $('inner'); 
        $('btn_1').onclick = function(){
            var div = document.createElement('div');
                div.innerHTML = '<p>测试createElement</p>';
            document.body.appendChild(div);
            setTimeout(function(){
                outer.appendChild(div);
                setTimeout(function(){
                    outer.removeChild(div);
                },1000)
            },1000)
        }
        $('btn_2').onclick = function(){
            var p = document.createElement('p');
                p.innerHTML = '测试DocumentFragment';
            var fragment = document.createDocumentFragment();
                fragment.appendChild(p);
                fragment.innerHTML = '<p>测试DocumentFragment</p>';
                fragment.innerHTML = '<span>测试DocumentFragment</span>';
            document.body.appendChild(fragment);
            setTimeout(function(){
                outer.appendChild(fragment);//报错，因为此时文档内部已经能够不存在fragment了
                setTimeout(function(){
                    outer.removeChild(fragment);
                },1000)
            },1000)
        }
    </script>
    </body>
    </html>
    ```