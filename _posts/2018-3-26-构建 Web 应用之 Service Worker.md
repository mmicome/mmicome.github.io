---
layout: post
title: "构建 Web 应用之 Service Worker "
date: 2018-3-26
description: "构建 Web 应用之 Service Worker "
tag: node
comments: true
---

**Service Workers 是一个利用了 Fetch 实现的接口的例子。** 

### JavaScript 是单线程的

进程有私有的虚拟地址空间、代码、数据和其它系统资源，进程申请创建和使用的系统资源会随其终止而销毁。线程运行在进程之中，系统创建进程之后就开始启动执行进程的主线程，并随主线程的退出而终止。

JavaScript 作为浏览器脚本语言，为方便准确无误的操作 DOM，诞生之初便采用了单线程的方式

### 但单线程中，必须通过异步和回调来优化耗时操作

我们在网页上提交一个表单，并不希望在提交后页面卡顿，一直等待服务端返回的提交结果。这时我们需要能在单线程中发送异步请求，点击提交表单后可以先在页面进行其他操作。

Ajax 让我们可以向后端发送异步请求，同时不影响用户在界面中继续操作。当 Ajax 接收到服务端的响应之后，便通过回调函数执行之后的操作。一个典型的异步 Ajax 实战场景如下：

```js
// 生成可发送同步/异步请求的 XMLHttpRequest 对象实例
var oReq = new XMLHttpRequest();
// open 方法初始化请求方法、地址，第三个参数 true 声明进行异步请求
oReq.open("GET", "http://www.jianshu.com/", true);
// 请求的整个过程中有五种状态，且同一时刻只能存在一种状态：
// 1. 未打开
// 2. 未发送
// 3. 已获取响应体
// 4. 正在下载响应体
// 5. 请求完成
// 当请求状态发生改变时，触发 onreadystatechange 会被调用
oReq.onreadystatechange = function (oEvent) {
  // 如果已经开始下载响应体了
  if (oReq.readyState === 4) {
    // 如果响应体成功下载，并且服务端返回 200 状态码
    if (oReq.status === 200) {
      // 打印响应信息
      console.log(oReq.responseText);
    } else {
      console.log("Error", oReq.statusText);
    }
  }
};
// send 方法发送请求，由于此请求是异步的，该方法立刻返回
oReq.send(null);
```
当我们的多个请求需要依赖于上一个请求的服务端响应时，回调函数中 Ajax 的层级逐步提高，可维护性极度下降，这就是回调地狱。

### I Promise U that I`ll Marry U!!!

Promise 由 ES6 标准原生支持。正如题名，Promise 作出诺言，也要因此承担成功(fulfilled)或失败(rejected)的结果，以便解决回调地狱问题：

```js
// 生成一个 Promise 实例，传入有特定的两个参数的匿名函数
// Promise 初始状态是 pending
// resolve 被调用时，将 Promise 状态改为成功(fulfilled)
// reject 被调用时，将 Promise 状态改为失败(rejected)
// 该匿名函数抛出错误时，Promise 状态为失败(rejected)
var a = new Promise(function(resolve, reject) {
  // setTimeout() 模拟异步请求，成功后执行 resolve() 方法
  setTimeout(function() {
      resolve('1')
  }, 2000)
})

a.then(function(val){
    // then() 有两个函数作为参数，onfulfilled 和 onrejected
    // 当 Promise 状态为 fulfilled 时，调用 then 的 onfulfilled 方法
    // 当 Promise 状态为 rejected 时，调用 then 的 onrejected 方法
    console.log(val)
    // then() 方法返回 Promise 对象实例，所以可被链式调用
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
          resolve('2')
      }, 2000)
    })
  })
  .then(function(val) {
    // 链式调用的第二个环节，处理上一个环节返回的 Promise 对象
    console.log(val)
  })
```

![Promise 对象的生命周期如图]({{ site.baseurl }}/post_imgs/Promise.png)

### 除了异步编程，我们还可以有 Web Worker。

通过异步编程，我们的页面可以边响应用户的下一步操作边等待服务端的回应，不再拥有阻塞感，但 JavaScript 的单线程问题并没有得到相应的解决。通过 HTML 5 标准支持的 Web Worker，我们可以为 JavaScript 创建运行在后台的额外线程，并被多个页面共享。

在一个简单的 Web Worker 实例中，main.js 和 task.js 的源码如下。

```js
// main.js
// 实例化 Worker 对象，其实质为新创建的工作线程在主线程的引用
var worker = new Worker("task.js")
// postMessage 方法与新创建的工作线程通信
worker.postMessage({
        id:1,
        msg:'Hello World'
});
// 当 Worker 线程返回数据时，onmessage 回调函数执行
worker.onmessage = function(message) {
    var data = message.data;
    console.log(JSON.stringify(data))
    // terminate 方法终止 worker 线程的运行
    worker.terminate()
};
// 当 Worker 线程出错时，onerror 回调函数执行
// error 参数中封装了错误对象的文件名、出错行号和具体错误信息
worker.onerror = function(error) {
    console.log(error.filename, error.lineno, error.message)
}
```

```js
// task.js
onmessage = function(message) {
    var data = message.data
    data.msg = 'Hi from task.js'
    postMessage(data)
}
```

在 Chrome 浏览器里，以上代码必须运行在 Web 容器如 Apache 中。同时，WebKit 内核加载并执行 Worker 线程的流程如下图所示。

![Promise 对象的生命周期如图]({{ site.baseurl }}/post_imgs/webwork.png)

### Service Worker 基于 Web Worker 事件驱动。

Service Worker 同样可以在浏览器后台挂起新线程，来缓解 JavaScript 的单线程问题。并且，我们可以用 Service Worker 拦截网络请求进行本地缓存或请求转发，相当于充当服务端与浏览器、浏览器与 Web 应用程序之间的代理服务器。

> Service Worker 带来了速度，极大的提高了用户体验。

- Service Worker 可有效加快重复访问网络应用的速度。
- 拥有拦截请求、消息推送、静默更新、地理围栏等服务。
- 可以在客户端通过 indexedDB API 保存持久化信息。

Service Worker 大量使用 Promise 对象。

因为通常 Service Worker 会等待响应后继续，并根据响应返回一个成功或者失败的操作。Promise 非常适合这种场景。

### Service Worker 的生命周期。

所谓生命周期，包括 Service Worker 的注册、安装、激活、控制和销毁时的全部过程。我们需要对 Service Worker 的生命周期有所了解。

> 先决条件：

- 浏览器支持：Service Worker。
- 在 localhost 域或 HTTPS 域下运行：介于我们能够通过使用 Service Worker 劫持连接、编撰以及过滤响应来进行权限较高的操作。

![如图]({{ site.baseurl }}/post_imgs/service work.png)

- 注册：注册过程独立于网页，先在页面执行注册，之后在浏览器后台启动安装步骤。
- 安装：通常需要缓存某些静态资源。当所有文件已成功缓存，则安装完毕。如果任何文件下载失败或缓存失败，则安装失败，无法激活。
- 激活：管理就缓存的绝佳机会。激活后它将会对作用域页面实时控制，不过首次注册该服务工作线程的页面需要再次加载才会受其控制。
- 控制时：处于两种状态之一：
    - ①、终止以节省内存；
    - ②、监听获取 fetch 和消息 message 事件。
- 销毁：由浏览器决定，因此尽量不要留存全局变量。

![如图]({{ site.baseurl }}/post_imgs/service work2.png)

#### 一、注册 Service Worker。

当浏览器对 Service Worker 提供原生支持时，我们便可以在页面加载后注册指定的 JavaScript 文件，并运行在后台线程之中，以下代码是这一过程的实例。

```js
<!DOCTYPE html>
<html>
<head>
  <title>ServiceWorker</title>
</head>
<body>
  <h1>Hello World!</h1>
  <script>
    // 检查浏览器是否对 serviceWorker 有原生支持
    if ('serviceWorker' in navigator) {
      // 有原生支持时，在页面加载后开启新的 Service Worker 线程，从而优化首屏加载速度
      window.addEventListener('load', function() {
      // register 方法里第一个参数为 Service Worker 要加载的文件；第二个参数 scope 可选，用来指定 Service Worker 控制的内容的子目录
        navigator.serviceWorker.register('./ServiceWorker.js').then(function(registration) {
          // Service Worker 注册成功
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }).catch(function(err) {
          // Service Worker 注册失败
          console.log('ServiceWorker registration failed: ', err);
        });
      });
    }
  </script>
</body>
</html>
```

这里通过 php 内置命令监听项目目录，便能看到 Service Worker 注册成功。同时，在 Chrome 浏览器里，可以访问 chrome://inspect/#service-workers和 chrome://serviceworker-internals/ 来检查 Service Worker 是否已经启用。

![如图]({{ site.baseurl }}/post_imgs/service work3.png)

#### 二、安装 Service Worker。

安装阶段，我们可以执行任何任务。这里我们逐步打开缓存、缓存文件和确认所有需要的资产是否缓存。ServiceWorker.js 中的实例安装代码如下：

```js
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/styles/main.css',
  '/script/main.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});
```

这要求我们在与项目根目录下建立 main.js 和 main.css 空文件。我们可以在 Chrome 开发者工具里的“Application”菜单的“Cache Storage”中看到相应的缓存。并且在图中的“Service Workers”选项卡中看到正在运行的 Service Workers。

且从上面的代码可以看到，通过 Service Worker 对象加载的文件拥有全局变量 caches 等，并且 self 关键字指向这个对象本身。cache 使我们可以存储网络响应发来的资源，并且根据它们的请求来生成 key。这个 API 和浏览器的标准的缓存工作原理很相似，且会持久存在，直到我们释放主动空间——我们拥有全部的控制权。

![如图]({{ site.baseurl }}/post_imgs/service work4.png)

#### 三、激活 Service Worker。

当 Service Worker 安装成功后，便被激活，这时可实时控制作用域中的所有网站，进行缓存文件等操作。不过首次使用 Service Worker 的页面需要再次加载才会受其控制。

#### 四、控制 Service Worker

### 常见的 Service Worker 应用场景

1. 文件缓存

    self.addEventListener('fetch', function(event) {
        event.respondWith(
            // 以下方法检视请求，并从服务工作线程所创建的任何缓存中查找缓存的结果。
            caches.match(event.request)
            .then(function(response) {
                console.log(event.request)
                console.log(caches)
                // 如果发现匹配的响应，则返回缓存的值
                if (response) {
                return response;
                }
                return fetch(event.request);
            }
            )
        );
    });

通过上述文件缓存过程，我们可以告诉 Service Worker 如何使用这些缓存文件，并通过 fetch 事件来捕获。fetch 事件只会在浏览器准备请求 Service Worker 控制的资源时才会被触发。这些资源包括了指定的 scope 内的文档，和这些文档内引用的其他任何资源。

![如图]({{ site.baseurl }}/post_imgs/service work5.png)

2. 多页面传递消息

我们可以打开多个 https://nzv3tos3n.qnssl.com/message/msg-demo.html 测试页面来进行测试，效果如下。

![如图]({{ site.baseurl }}/post_imgs/service work6.png)

其中，index.js 源码为：

    (function () {
        if (navigator.serviceWorker) {
            // 获取页面 DOM 元素
            var msgIpt = document.getElementById('ipt'),
                showArea = document.getElementById('show'),
                sendBtn = document.getElementById('sendBtn');

            navigator.serviceWorker.register('service-worker3.js');

            navigator.serviceWorker.addEventListener('message', function (event) {
                // 接受数据，并填充在 DOM 中
                showArea.innerHTML = showArea.innerHTML + ('<li>' + event.data.message + '</li>');
            });

            sendBtn.addEventListener('click', function () {
                // 绑定点击事件，点击后发送数据
                navigator.serviceWorker.controller.postMessage(msgIpt.value);
                msgIpt.value = '';
            });
        }
    })();

3. 更新 Service Worker

每次用户导航至使用 Service Worker 的站点时，浏览器会尝试在后台重新下载该脚本文件。这时新的 Service Worker 将会在后台安装，并在第二次访问时获取控制权，为了不与新的 Service Worker 缓存的文件冲突，我们可以使用类似 caches.open('v2') 语句来创建新的缓存目录。

    this.addEventListener('install', function(event) {
    event.waitUntil(
        // 创建新的缓存目录，并指定
        caches.open('v2').then(function(cache) {
        return cache.addAll([
            '/sw-test/',
            '/sw-test/index.html',
            …
        ]);
        });
    );
    });

当新的 Service Worker 激活，记得删除 v1 缓存目录，代码如下。

    this.addEventListener('activate', function(event) {
    // 声明缓存白名单，该名单内的缓存目录不会被生成
    var cacheWhitelist = ['v2'];
    event.waitUntil(
        // 传给 waitUntil() 的 promise 会阻塞其他的事件，直到它完成
        // 确保清理操作会在第一次 fetch 事件之前完成
        caches.keys().then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
            if (cacheWhitelist.indexOf(key) === -1) {
            return caches.delete(key);
            }
        }));
        })
    );
    });

4. 预缓存

Service Worker 也可以在后台主动发送请求，优化用户体验，图片来源于《饿了么的 PWA 升级实践》。

![如图]({{ site.baseurl }}/post_imgs/service work7.png)

5. Service Worker 支持的所有事件

![如图]({{ site.baseurl }}/post_imgs/service work8.png)

五、销毁 Service Worker

浏览器决定是否销毁 Service Worker。在无痕浏览中，当页面关闭时相应的 Service Worker 会被销毁，因此尽量不要在代码中留存全局变量。可以访问 chrome://inspect/#service-workers和 chrome://serviceworker-internals/ 来检查 Service Worker 是否已经停用。

[实例阅读](https://segmentfault.com/a/1190000005954040)
[内容拓展](https://segmentfault.com/a/1190000008491458)

[origin](https://www.jianshu.com/p/0e2dee4c77bc)