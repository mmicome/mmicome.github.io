---
layout: post
title: "Fetch API"
date: 2018-3-12
description: "Fetch API "
tag: js
comments: true
---

—————— __Fetch API 提供了一个获取资源的接口（包括跨域）。任何使用过 XMLHttpRequest 的人都能轻松上手，但新的API提供了更强大和灵活的功能集__Fetch 的核心在于对 HTTP 接口的抽象，包括 Request，Response，Headers，Body，以及用于初始化异步请求的 global fetch

Fetch 提供了对 Request 和 Response （以及其他与网络请求有关的）对象的通用定义。使之今后可以被使用到更多地应用场景中：无论是**service workers、Cache API、又或者是其他处理请求和响应的方式，甚至是任何一种需要你自己在程序中生成响应的方式。** Fetch还提供了单个逻辑位置来定义其他HTTP相关概念，例如 CORS和HTTP的扩展。

### fetch和XMLHttpRequest

除了XMLHttpRequest对象来获取后台的数据之外，还可以使用一种更优的解决方案fetch。

***如何获取fetch***

到现在为止，fetch的支持性还不是很好，但是在谷歌浏览器中已经支持了fetch(firefox也支持)。fetch挂在在BOM中，可以直接在谷歌浏览器中使用。

***一个fetch获取后端数据的例子：***

    ```js
    // 通过fetch获取百度的错误提示页面
    fetch('https://www.baidu.com/search/error.html') // 返回一个Promise对象
    .then((res)=>{
        return res.text() // res.text()是一个Promise对象
    })
    .then((res)=>{
        console.log(res) // res是最终的结果
    })
    ```

> GET请求

```js
// 通过fetch获取百度的错误提示页面
fetch('https://www.baidu.com/search/error.html?a=1&b=2', { // 在URL中写上传递的参数
    method: 'GET'
  })
  .then((res)=>{
    return res.text()
  })
  .then((res)=>{
    console.log(res)
  })
```

> POST请求

```js
fetch('http://www.baidu.com/search/error.html', {
    method: 'POST'
    body: new URLSearchParams([["foo", 1], ["bar", 2]]).toString() //请求对象
}).then((res)=> {
    return res.text();
})
```

***设置请求的头信息***
在POST提交的过程中，一般是表单提交，可是，经过查询，发现默认的提交方式是：Content-Type:text/plain;charset=UTF-8，这个显然是不合理的。下面咱们学习一下，指定头信息：

    ```js
    // 通过fetch获取百度的错误提示页面
    fetch('https://www.baidu.com/search/error.html', {
        method: 'POST',
        headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded' // 指定提交方式为表单提交
        }),
        body: new URLSearchParams([["foo", 1],["bar", 2]]).toString()
    })
    .then((res)=>{
        return res.text()
    })
    .then((res)=>{
        console.log(res)
    })
    ```

[资源参考](https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/fetch)

***通过接口得到JSON数据***

上面所有的例子中都是返回一个文本，那么除了文本，有没有其他的数据类型呢？肯定是有的，具体查询地址：Body的类型

由于最常用的是JSON数据，那么下面就简单演示一下获取JSON数据的方式：

    ```js
    // 通过fetch获取百度的错误提示页面
    fetch('https://www.baidu.com/rec?platform=wise&ms=1&rset=rcmd&word=123&qid=11327900426705455986&rq=123&from=844b&baiduid=A1D0B88941B30028C375C79CE5AC2E5E%3AFG%3D1&tn=&clientWidth=375&t=1506826017369&r=8255', { // 在URL中写上传递的参数
        method: 'GET',
        headers: new Headers({
        'Accept': 'application/json' // 通过头指定，获取的数据类型是JSON
        })
    })
    .then((res)=>{
        return res.json() // 返回一个Promise，可以解析成JSON
    })
    .then((res)=>{
        console.log(res) // 获取JSON数据
    })
    ```

***强制带Cookie***
默认情况下, fetch 不会从服务端发送或接收任何 cookies, 如果站点依赖于维护一个用户会话，则导致未经认证的请求(要发送 cookies，必须发送凭据头).

    ```JS
    // 通过fetch获取百度的错误提示页面
    fetch('https://www.baidu.com/search/error.html', {
        method: 'GET',
        credentials: 'include' // 强制加入凭据头
    })
    .then((res)=>{
        return res.text()
    })
    .then((res)=>{
        console.log(res)
    })
    ```

***简单封装一下fetch***

```js
/*
* 将对象转成 a=1&b=2的形式
* @params obj对象
*/

function objString(obj, arr=[], idx=0) {
    for (let item in obj) {
        if(obj.hasOwnProperty(item)) {
            arr[idx++] = [item, obj[item]]
        }
    }
    return new URLSearchParams(arr).toString();
}

/**
 * 真正的请求
 * @param url 请求地址
 * @param options 请求参数
 * @param method 请求方式
 */

 function commonFetch(url, option, method = 'GET') {
     const searchURL = objString(option);
     let initObj = {};
     if(method == 'GET') {
         url += '?' + searchURL;
         initObj = {
             method: method,
             credentials: 'include'
         }
     } else {
         initObj = {
             method: method,
             credentials: 'include',
             headers: new Headers({
                 'Accept': 'application/json',
                 'Content-Type': 'application/x-www-form-urlencoded'
             }),
             body: searchURL
         }
     }
     fetch(url, initObj).then((res) => {
         return res.json()
     }).then((res) => {
         return res;
     });
 }


/**
* GET请求
* @param url 请求地址
* @param options 请求参数
*/

function GET(url, options) {
  return commonFetcdh(url, options, 'GET')
}

/**
 * POST请求
 * @param url 请求地址
 * @param options 请求参数
 */

function POST(url, options) {
  return commonFetcdh(url, options, 'POST')
}
    
```

`GET('https://www.baidu.com/search/error.html', {a:1,b:2})`
`POST('https://www.baidu.com/search/error.html', {a:1,b:2})`

### Fetch 接口
- GlobalFetch
包含了fetch() 方法，用于获取资源。
- Headers
相当于 response/request 的头信息，可以修改它，或者针对不同的结果做不同的操作。
- Request
相当于一个资源请求。
- Response
相当于请求的响应

### Fetch mixin
- Body
提供了关联 response/request 中 body 的方法，可以定义它的文档类型以及请求如何被处理。

###进行 fetch 请求 代码实例

- 图片请求

```js
let myImage = document.querySelector('img');

fetch('flowers.jpg')
    .then(function(respone) {
        return response.blob();
    })
    .then(function(myBlob) {
        let objectURL = URL.createObjectURL(myBlob);
        myImage.src = objectURL;
    })
```
**最好使用符合内容安全策略 (CSP)的链接而不是使用直接指向资源地址的方式来进行Fetch的请求。**

- 自定义请求的参数

fetch() 接受第二个可选参数，一个可以控制不同配置的 init 对象：

    ```js
    var myHeaders = new Headers();

    var myInit = { method: 'GET',
                headers: myHeaders,
                mode: 'cors',
                cache: 'default' };

    fetch('flowers.jpg',myInit)
    .then(function(response) {
    return response.blob();
    })
    .then(function(myBlob) {
    var objectURL = URL.createObjectURL(myBlob);
    myImage.src = objectURL;
    });
    ```

- 检测请求是否成功

如果遇到网络故障，fetch() promise 将会 reject，带上一个 TypeError 对象。虽然这个情况经常是遇到了权限问题或类似问题——比如 404 不是一个网络故障。想要精确的判断 fetch() 是否成功，需要包含 promise resolved 的情况，此时再判断 Response.ok 是不是为 true。类似一下代码：

```js
fetch('flowers.jpg').then(function(response) {
    if(response.ok) {
        response.blob().then(function(myBlob) {
            var onjectURL = URL.createObjectURL(myBlob);
            myImage.src = objectURL;
        })
    } else {
        console.log('network response was not ok');
    }
}).catch(function(error) {
    console.log('There has been a problem with your fetch operation:' + error.message);
})
```

- 自定义请求对象

除了传给 fetch() 一个资源的地址，你还可以通过使用 Request() 构造函数来创建一个 request 对象，然后再作为参数传给 fetch()：

    ```js
    var myHeaders = new headers();

    var myInit = {
        method: 'GET',
        mode: 'core',
        headers: myHeaders,
        cache: 'default'
    };

    var myRequest = new Request('flowers.jpg', myInit);;

    fetch(myRequest).then(function(response) {
        return response.blob();
    }).then(function(myBlob) {
        var objectURL = URL.createObjectURL(myBlob);
        myImage.src = objectURL;
    })
    ```

Request() 和 fetch() 接受同样的参数。你甚至可以传入一个已存在的 request 对象来创造一个拷贝：

`var anotherRequest = new Request(myRequest,myInit);`

**这个很有用，因为 request 和 response bodies 只能被使用一次（译者注：这里的意思是因为设计成了 stream 的方式，所以它们只能被读取一次）。创建一个拷贝就可以再次使用 request/response 了，当然也可以使用不同的 init 参数。**

**clone() 方法也可以用于创建一个拷贝。它在语义上有一点不同于其他拷贝的方法。其他方法（比如拷贝一个 response）中，如果 request 的 body 已经被读取过，那么将执行失败，然而 clone() 则不会失败。**

Example

    var myRequest = new Request();
    var newRequest = myRequest.clone();

[参考资源](https://developer.mozilla.org/zh-CN/docs/Web/API/Request/clone)


### Headers

使用 Headers 的接口，你可以通过 Headers() 构造函数来创建一个你自己的 headers 对象。

    var content = "Hello World";
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");
    myHeaders.append("Content-Length", content.length.toString());
    myHeaders.append("X-Custom-Header", "ProcessThisImmediately");

也可以传一个多维数组或者对象字面量：

    myHeaders = new Headers({
    "Content-Type": "text/plain",
    "Content-Length": content.length.toString(),
    "X-Custom-Header": "ProcessThisImmediately",
    });

    console.log(myHeaders.has("Content-Type")); // true
    console.log(myHeaders.has("Set-Cookie")); // false
    myHeaders.set("Content-Type", "text/html");
    myHeaders.append("X-Custom-Header", "AnotherValue");
    
    console.log(myHeaders.get("Content-Length")); // 11
    console.log(myHeaders.getAll("X-Custom-Header")); // ["ProcessThisImmediately", "AnotherValue"]
    
    myHeaders.delete("X-Custom-Header");
    console.log(myHeaders.getAll("X-Custom-Header")); // [ ]

由于 Headers 可以在 request 请求中被发送或者在 response 请求中被接收，并且规定了哪些参数是可写的，Headers 对象有一个特殊的 guard 属性。这个属性没有暴露给 Web，但是它影响到哪些内容可以在 Headers 对象中被操作。

可能的值如下：

    none：默认的
    request：从 request 中获得的 headers（Request.headers）只读
    request-no-cors：从不同域（Request.mode no-cors）的 request 中获得的 headers 只读
    response：从 response 中获得的 headers（Response.headers）只读
    immutable：在 ServiceWorkers 中最常用的，所有的 headers 都只读

**你不可以添加或者修改一个 guard 属性是 request 的 Request Headers 的 Content-Length 属性。同样地，插入 Set-Cookie 属性到一个 response headers 是不允许的，因此 ServiceWorkers 是不能给合成的 Response 的 headers 添加一些 cookies。**