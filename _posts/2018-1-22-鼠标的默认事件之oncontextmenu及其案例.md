---
layout: post
title: 鼠标的默认事件之oncontextmenu及其案例
date: 2018-1-22
description: 鼠标的默认事件之oncontextmenu及其案例
tag: js-DOM
comments: true
---

**当我们在浏览器中点击鼠标右键时会弹出一个默认的窗口，我们可以通过改变oncontexmenu事件来修改它的默认事件；另外，当我们按空格键时，浏览器窗口的滚动条会向下滚动一段距离，我们也可以通过绑定相应的事件来改变它。如下：**

    ```js
    /*1\. 改变鼠标右键的默认事件*/
    <div id="box"></div>
        var obox = document.getElementById("box");
            /*点击鼠标右键时执行*/
        document.oncontextmenu =  function(ev){
                var e = ev||window.event;
                var x = e.clientX;
                var y = e.clientY;
                obox.style.cssText = "display:block;top:"+y+"px;left:"+x+"px;";
                return false;
            };
        /*点击空白处隐藏*/
            document.onclick = function(){
                obox.style.display = "none";
            };
    ```

    ```js
    /*2\. 屏蔽按空格键是滚动条向下滚动*/    
    document.onkeydown = function(ev){
        var e = ev||event;
        if(e.keyCode == 32){
            return false;
        }
    }
  ```
