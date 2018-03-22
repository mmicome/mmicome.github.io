---
layout: post
title: "Fetch API"
date: 2018-3-12
description: "Fetch API "
tag: js
comments: true
---

—————— __Fetch API 提供了一个获取资源的接口（包括跨域）。任何使用过 XMLHttpRequest 的人都能轻松上手，但新的API提供了更强大和灵活的功能集__

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