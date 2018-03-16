---
layout: post
title: "history对象"
date: 2018-1-22
description: "history对象"
tag: js
comments: true
---

### history对象提

**方法，允许在浏览历史之间移动。**

- back()：移动到上一个访问页面，等同于浏览器的后退键。
- forward()：移动到下一个访问页面，等同于浏览器的前进键。
- go()：接受一个整数作为参数，移动到该整数指定的页面，比如go(1)相当于forward()，go(-1)相当于back()。

***返回上一页:***

    ```js
    document.getELementById('backLink').onclidk = function() {
        window.history.back();
    }
    ```

attention: 返回上一页时，页面通常是从浏览器缓存之中加载，而不是重新要求服务器发送新的网页。



> HTML5为history对象添加了两个新方法，`history.pushState()`和`history.replaceState()`，用来在浏览历史中添加和修改记录。

***history.pushState()***

检测： 

    ```js
    if(!!(window.history && history.pushStatus)) {
        //support
    } else {

    }
    ```

上面代码可以用来检查，当前浏览器是否支持History API。如果不支持的话，可以考虑使用Polyfill库[History.js](https://github.com/browserstate/history.js/)。

history.pushState方法接受三个参数，依次为：

- state：一个与指定网址相关的状态对象，popstate事件触发时，该对象会传入回调函数。如果不需要这个对象，此处可以填null。
- title：新页面的标题，但是所有浏览器目前都忽略这个值，因此这里可以填null。
- url：新的网址，必须与当前页面处在同一个域。浏览器的地址栏将显示这个网址。

    ```js
    //假定当前网址是example.com/1.html，我们使用pushState方法在浏览记录（history对象）中添加一个新记录。
    var stateObj = {foo: 'bar'};
    history.pushState(stateObj, 'page 2', '2.html');
    ```

添加上面这个新记录后，浏览器地址栏立刻显示example.com/2.html，但并不会跳转到2.html，甚至也不会检查2.html是否存在，它只是成为浏览历史中的最新记录。这时，你在地址栏输入一个新的地址(比如访问google.com)，然后点击了倒退按钮，页面的 URL 将显示2.html；你再点击一次倒退按钮，URL 将显示1.html。

总之，pushState方法不会触发页面刷新，只是导致history对象发生变化，地址栏会有反应。

如果pushState的url参数，设置了一个新的锚点值（即hash），并不会触发hashchange事件。如果设置了一个跨域网址，则会报错。

    ```js
    // 报错
    history.pushState(null, null, 'https://twitter.com/hello');
    ```

上面代码中，pushState想要插入一个跨域的网址，导致报错。这样设计的目的是，防止恶意代码让用户以为他们是在另一个网站上。

***history.replaceState()***

history.replaceState方法的参数与pushState方法一模一样，区别是它修改浏览历史中当前纪录。

    ```js
    //假定当前网页是example.com/example.html。

    history.pushState({page: 1}, 'title 1', '?page=1');
    history.pushState({page: 2}, 'title 2', '?page=2');
    history.replaceState({page: 3}, 'title 3', '?page=3');

    history.back()
    // url显示为http://example.com/example.html?page=1

    history.back()
    // url显示为http://example.com/example.html

    history.go(2)
    // url显示为http://example.com/example.html?page=3
    ```

***history.state属性***

history.state属性返回当前页面的state对象。

***popstate 事件***

每当同一个文档的浏览历史（即history对象）出现变化时，就会触发popstate事件。

> 需要注意的是，仅仅调用pushState方法或replaceState方法 ，并不会触发该事件，只有用户点击浏览器倒退按钮和前进按钮，或者使用 JavaScript 调用back、forward、go方法时才会触发。另外，该事件只针对同一个文档，如果浏览历史的切换，导致加载不同的文档，该事件也不会触发。

使用的时候，可以为popstate事件指定回调函数。

    ```js
    window.onpopstate = function (event) {
        console.log('location: ' + document.location);
        console.log('state: ' + JSON.stringify(event.state));
    };
    ```

这个state对象也可以直接通过history对象读取。

`var currentState = history.state;`

注意，页面第一次加载的时候，浏览器不会触发popstate事件。

***URLSearchParams API***

URLSearchParams API用于处理URL之中的查询字符串，即问号之后的部分。没有部署这个API的浏览器，可以用[url-search-params](https://github.com/WebReflection/url-search-params)这个垫片库。

    ```js
    var paramsString = 'q=URLUtils.searchParams&topic=api';
    var searchParams= new URLSearchParams(paramsString);
    ```

> URLSearchParams有以下方法，用来操作某个参数。

- has()：返回一个布尔值，表示是否具有某个参数
- get()：返回指定参数的第一个值
- getAll()：返回一个数组，成员是指定参数的所有值
- set()：设置指定参数
- delete()：删除指定参数
- append()：在查询字符串之中，追加一个键值对
- toString()：返回整个查询字符串

```js
var paramsString = 'q=URLUtils.searchParams&topic=api';
var searchParams = new URLSearchParams(paramsString);

searchParams.has('topic');//true
searchParams.get('topic');//api
searchParams.getAll('topic'); //['api']
searchParams.set('foo',2);
searchParams.append('topic','webdev');
searchParams.toString(); //'q=URLUtils.searchParams&topic=api'
searchParams.delete('topic') 
searchParams.toString() // "q=URLUtils.searchParams&foo=2&foo=3"
```

> URLSearchParams还有三个方法，用来遍历所有参数。

- keys()：遍历所有参数名
- values()：遍历所有参数值
- entries()：遍历所有参数的键值对

上面三个方法返回的都是Iterator对象。

```js
var searchParams = new URLSearchParams('key1=value1&ley2=value2');
for (var key of searchParams.keys()) {
    console.log(key);
}
//key1
//key2

for (var value of searchParams.values()) {
    console.log(value);
}
//value1
//value2

for (var pair of searchParams.entries()) {
    console.log(pair[0] + ', ' + pair[1]);
}
```

```js
//下面是一个替换当前URL的例子
// URL: https://example.com?version=1.0
var params = new URLSearchParams(location.search.slice(1));
params.set('version', 2.0);
window.history.replaceState({}, '', `${location.pathname}?${params}`);
// URL: https://example.com?version=2.0
```

> URLSearchParams实例可以当作POST数据发送，所有数据都会URL编码。

```js
let params = new URLSearchParams();
params.append('api_key','123456');

fetch('http://example.com/api', {
    method: 'POST',
    body: params
}).then(...)
```

> DOM的a元素节点的searchParams属性，就是一个URLSearchParams实例。

    var a = document.createElement('a');
    a.href = 'https://example.com?filter=api';
    a.searchParams.get('filter') // "api"

> URLSearchParams还可以与URL接口结合使用。

    var url = new URL(location);
    var foo = url.searchParams.get('foo') || 'somedefault';