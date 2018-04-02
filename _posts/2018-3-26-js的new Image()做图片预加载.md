---
layout: post
title: "js的new Image()做图片预加载"
date: 2018-3-26
description: "js的new Image()做图片预加载"
tag: js
comments: true
---
### js的new Image()做图片预加载

图像对象：
建立图像对象：图像对象名称=new Image([宽度],[高度])

图像对象的属性： `border complete height hspace lowsrc name src vspace width`

图像对象的事件：`onabort onerror onkeydown onkeypress onkeyup onload`

***需要注意的是：src 属性一定要写到 onload 的后面，否则程序在 IE 中会出错。***


- 创建一个Image对象：`var a=new Image()`;    
- 定义Image对象的src: `a.src=”xxx.gif”;`    

***这样做就相当于给浏览器缓存了一张图片。***

    var img=new Image();  
    img.onload=function(){alert("img is loaded")};  
    img.onerror=function(){alert("error!")};  
    img.src="http://www.abaonet.com/img.gif";  
    function show(){alert("body is loaded");};  
    window.onload=show;  

case :

在 FF 中，img 对象的加载包含在 body 的加载过程中，既是 img加载完之后，body 才算是加载完毕，触发 window.onload 事件。

在 IE 中，img 对象的加载是不包含在 body 的加载过程之中的，body 加载完毕，window.onload 事件触发时，img对象可能还未加载结束，img.onload事件会在 window.onload 之后触发。

根据上面的问题，考虑到浏览器的兼容性和网页的加载时间，尽量不要在 Image 对象里放置过多的图片，否则在 FF 下会影响网页的下载速度。当然如果你在 window.onload 之后，执行预加载函数，就不会有 FF 中的问题了。

可以通过Image对象的complete 属性来检测图像是否加载完成（每个Image对象都有一个complete属性，当图像处于装载过程中时，该属性值false,当发生了onload、onerror、onabort中任何一个事件后，则表示图像装载过程结束（不管成没成功），此时complete属性为true）

**下面截取一段Amazon使用的图片预加载js代码可供参考:**

```js
amznJQ.available("jQuery", function() {  
  jQuery(window).load(function() { setTimeout(function() {  
    var imageAssets = new Array();  
    var jsCssAssets = new Array();  
      imageAssets.push("https://images-na.ssl-images-amazon.com/images/G/09/x-locale/common/buy-buttons/review-1-click-order._V171143523_.gif");  
      imageAssets.push("https://images-na.ssl-images-amazon.com/images/G/09/x-locale/common/buttons/continue-shopping._V192262037_.gif");  
      imageAssets.push("https://images-na.ssl-images-amazon.com/images/G/09/x-locale/common/buy-buttons/thank-you-elbow._V192261665_.gif");  
      imageAssets.push("https://images-na.ssl-images-amazon.com/images/G/09/x-locale/communities/social/snwicons_v2._V383421867_.png");  
      imageAssets.push("https://images-na.ssl-images-amazon.com/images/G/09/checkout/assets/carrot._V192555707_.gif");  
      imageAssets.push("https://images-na.ssl-images-amazon.com/images/G/09/checkout/thank-you-page/assets/yellow-rounded-corner-sprite._V192555699_.gif");  
      imageAssets.push("https://images-na.ssl-images-amazon.com/images/G/09/checkout/thank-you-page/assets/white-rounded-corner-sprite._V212531219_.gif");  
      imageAssets.push("https://images-na.ssl-images-amazon.com/images/G/09/gno/beacon/BeaconSprite-JP-02._V393500380_.png");  
      imageAssets.push("https://images-na.ssl-images-amazon.com/images/G/09/x-locale/common/transparent-pixel._V386942697_.gif");  
      imageAssets.push("https://images-na.ssl-images-amazon.com/images/I/61AdS2XVkGL._SX35_.jpg");  
      jsCssAssets.push("https://images-na.ssl-images-amazon.com/images/G/01/browser-scripts/jp-site-wide-css-beacon/site-wide-6800426958._V1_.css");  
      jsCssAssets.push("https://images-na.ssl-images-amazon.com/images/G/01/browser-scripts/navbarCSSJP-beacon/navbarCSSJP-beacon-min-583273174._V1_.css");  
      jsCssAssets.push("https://images-na.ssl-images-amazon.com/images/G/01/browser-scripts/navbarJS-beacon/navbarJS-beacon-min-1773974689._V1_.js");  
      jsCssAssets.push("https://images-na.ssl-images-amazon.com/images/G/01/browser-scripts/site-wide-js-1.2.6-beacon/site-wide-5626886881._V1_.js");  
  
    // pre-fetching image assets  
    for (var i=0; i<imageAssets.length; i++) {  
       new Image().src = imageAssets[i];  
    }  
    // pre-fetching css and js assets based on different browser types  
    var isIE = /*@cc_on!@*/0;  
    var isFireFox = /Firefox/.test(navigator.userAgent);  
    if (isIE) {  
      for (var i=0; i<jsCssAssets.length; i++) {  
        new Image().src = jsCssAssets[i];  
      }  
    }  
    else if (isFireFox) {  
      for (var i=0; i<jsCssAssets.length; i++) {  
        var o =  document.createElement("object");  
        o.data = jsCssAssets[i];  
        o.width = o.height = 0;  
        document.body.appendChild(o);  
      }  
    }  
  }, 2000); });  
});  
```