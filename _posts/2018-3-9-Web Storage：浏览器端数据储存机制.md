---
layout: post
title: "Web Storage：浏览器端数据储存机制"
date: 2018-1-22
description: "Web Storage：浏览器端数据储存机制"
tag: js
comments: true
---

**检查window对象是否包含sessionStorage和localStorage属性**

    ```js
    function checkStorageSupport() {
        if(window.sessionStorage && window.localStorage) {
            return ture;
        } else {
            return false;
        }
    }
    ```
    ```js
    sessionStorage.setItem("key","value"); 
    localStorage.setIten("key", "value");   
                .getItem('key');
                .removeItem('key');
                .clear();
    ```

***遍历操作***

利用length属性和key方法，可以遍历所有的键。

    for(var i = 0; i < localStorage.length; i++){
        console.log(localStorage.key(i));
    }

***storage 事件***

当存储的数据发生变化时，会触发storage事件，我们可以指定这个事件的回调函数。

`window.addEventListener('storage',onstorageChange);`

回调函数接受一个event对象作为参数，event.key保存发生变化的键名

    ```js
    function onstorageChange(e) {
        console.log(e.ley);
    }
    ```

除了key属性，event对象的属性还有三个：

- oldValue：更新前的值。如果该键为新增加，则这个属性为null。
- newValue：更新后的值。如果该键被删除，则这个属性为null。
- url：原始触发storage事件的那个网页的网址。

> ***值得特别注意的是，该事件不在导致数据变化的当前页面触发。如果浏览器同时打开一个域名下面的多个页面，当其中的一个页面改变sessionStorage或localStorage的数据时，其他所有页面的storage事件会被触发，而原始页面并不触发storage事件。可以通过这种机制，实现多个窗口之间的通信。所有浏览器之中，只有IE浏览器除外，它会在所有页面触发storage事件。***