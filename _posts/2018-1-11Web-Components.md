---
layout: post
title: "web components"
date: 2018-1-11
description: "web 组件"
tag: webfont
comments: true
---

**small case:**
```html
<template id="content">
  <h1>createShadowDomByJs</h1>
</template>
<div id="shadow-dom-host">

</div>
```

```js
HTMLElement.prototype.createShadowRoot =
  HTNLElement.prototype.createShadowRoot ||
  HTMLElement.prototype.webkitCreateShadowRoot ||
  function() {};

var tmpl = document.querySelector("#content");
var host = document.querySelector("#shadow-dom-host");
var root = host.createShadowRoot();
root.appendChild(document.importNode(tmpl.content, true));
```
