---
layout: post
title: "ProgressEvent"
date: 2018-1-20
description: "ProgressEvent"
tag: js-DOM
comments: true
---
[「引用地址」](https://developer.mozilla.org/zh-CN/docs/Web/API/ProgressEvent)~ MDN | ProgressEvent~

The ProgressEvent interface represent events measuring progress of an underlying process,like HTTP request (XMLHttpRequest),`<img>,<audio><video><style><link>`

`ProgressEvent.loaded`
Is an unsigned long long representing the amount of work already performed by the underlying process. The ratio of work done can be calculated with the property and ProgressEvent.total. When downloading a resource using HTTP, this only represent the part of the content itself, not headers and other overhead.

`ProgressEvent.total`
Is an unsigned long long representing the total amount of work that the underlying process is in the progress of performing. When downloading a resource using HTTP, this only represent the content itself, not headers and other overhead.

#### example

    ```js
    var progressBar = document.getElementById("p"),
        client = new XMLHttpRequest();
        client.open('GET',url);
        client.onprogress = function(e) {
          if(e.lengthComputable) {
            progressBar.max = pe.total;
            progressBar.value = pe.loaded;
          }
        }
        client.onloadend = function(e) {
          progressBar.value = e.loaded;
        }
        client.send();
    ```
[进阶](https://xhr.spec.whatwg.org/#interface-progressevent)
