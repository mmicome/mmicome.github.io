---
layout: post
title: "say goodbye to css hack"
date: 2018-1-20
description: "say goodbye to css hack"
tag: css
comments: true
---
# If I can ,I will never use it

### css hack

**虽然不是经常需要hack，但是我们经常会遇到各浏览器表现不一致的情况。基于此，某些情况我们会极不情愿的使用这个不太友好的方式来达到大家要求的页面表现。我个人是不太推荐使用hack的，要知道一名好的前端，要尽可能不使用hack的情况下实现需求，做到较好的用户体验。**

#### 什么是CSS hack

由于不同厂商的流览器或某浏览器的不同版本（如IE6-IE11 Firefox/Safari/Opera/Chrome等），对CSS的支持、解析不一样，导致在不同浏览器的环境中呈现出不一致的页面展现效果。这时，我们为了获得统一的页面效果，就需要针对不同的浏览器或不同版本写特定的CSS样式，我们把这个针对不同的浏览器/不同版本写相应的CSS code的过程，叫做CSS hack!

#### CSS hack的原理

由于不同的浏览器和浏览器各版本对CSS的支持及解析结果不一样，以及CSS优先级对浏览器展现效果的影响，我们可以据此针对不同的浏览器情景来应用不同的CSS。

#### CSS hack分类
CSS Hack大致有3种表现形式，CSS属性前缀法、选择器前缀法以及IE条件注释法（即HTML头部引用if IE）Hack，实际项目中CSS Hack大部分是针对IE浏览器不同版本之间的表现差异而引入的。

`属性前缀法(即类内部Hack)`：例如 IE6能识别下划线"_"和星号" * "，IE7能识别星号" * "，但不能识别下划线"_"，IE6~IE10都认识"\9"，但firefox前述三个都不能认识。

`选择器前缀法(即选择器Hack)`：例如 IE6能识别*html .class{}，IE7能识别*+html .class{}或者*:firstchild+html.class{}。

`IE条件注释法(即HTML条件注释Hack)`：针对所有IE(注：IE10+已经不再支持条件注释)： `<!--[if IE]>IE浏览器显示的内容 <![endif]-->`，针对IE6及以下版本： `<!--[if lt IE 6]>只在IE6-显示的内容 <![endif]-->`。这类Hack不仅对CSS生效，对写在判断语句里面的所有代码都会生效。

CSS hack书写顺序，一般是将适用范围广、被识别能力强的CSS定义在前面。

#### CSS hack方式一：条件注释法

    只在IE下生效
    <!--[if IE]>
    这段文字只在IE浏览器显示
    <![endif]-->
    只在IE6下生效
    <!--[if IE 6]>
    这段文字只在IE6浏览器显示
    <![endif]-->
    只在IE6以上版本生效
    <!--[if gte IE 6]>
    这段文字只在IE6以上(包括)版本IE浏览器显示
    <![endif]-->
    只在IE8上不生效
    <!--[if ! IE 8]>
    这段文字在非IE8浏览器显示
    <![endif]-->
    非IE浏览器生效
    <!--[if !IE]>
    这段文字只在非IE浏览器显示
    <![endif]-->

#### CSS hack方式二：类内属性前缀法

##### 1. 下划线 hack
Internet Explorer 版本 6 以下承认有此前缀的属性（会丢掉此前缀）。所有其它浏览器都会忽略这样的无效属性。因此，有一个 下划线 或 连字符 前缀的属性是仅仅
应用到 Internet Explorer 6 以及以下版本。

    #elem {
    width: [W3C 模型宽度];
    _width: [BorderBox 模型];
    }

##### 2. 星号 hack
Internet Explorer 版本 7 以及以下承认非字母数字（除了 下划线 或 连字符）前缀的属性（会丢掉此前缀）。这样的属性对所有其它浏览器都是无效的。因此，一个非
字母数字（除了 下划线 或 连字符）前缀的属性，例如一个 星号,是仅仅应用到Internet Explorer 7 以及以下版本。

    #elem {
    width: [W3C 模型宽度];
    *width: [BorderBox 模型];
    }


#### CSS hack方式三：选择器前缀法

目前最常见的是
    
    *html   *   前缀只对IE6生效
    *+html  *+  前缀只对IE7生效
    @media screen\9{...}    只对IE6/7生效
    @media \0screen {body { background: red; }}   只对IE8有效
    @media \0screen\,screen\9{body { background: blue; }}  只对IE6/7/8有效
    @media screen\0 {body { background: green; }}  只对IE8/9/10有效
    @media screen and (min-width:0\0) {body { background: gray; }}   只对IE9/10有效
    @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {body { background: or
    ange; }}   只对IE10有效

##### 1. 星号 加号 hack

尽管 Internet Explorer 7 不再认识经典的星号 HTML hack，它却引入了一个相似的新的选择器 hack：

    *:first-child+html p { font-size: 5em; }
    或…
    *+html p { font-size: 5em; }

这段代码将会应用到 Internet Explorer 7 ，而不会应用到其它任意浏览器中。注意此 hack 只在 IE7 标准模式下起作用；它在诡异模式下不起作用。此 hack 也支持
Internet Explorer 8 的兼容性视图（IE7 标准模式），但不支持 IE8 标准模式。和星号 HTML hack 一样，此 hack 使用了有效的 CSS。

##### 2. 子选择器 hack
Internet Explorer 版本 6 以及以下不支持 ‘子选择器’（ > ），则样式只应用到所有其它浏览器上。例如下面的规则会使文字颜色在 Firefox 中为蓝色，而不会影响 IE 7之前的版本

    html > body p { color: blue; }

尽管 IE7 添加了子选择器支持，还是发现了一个变异的 hack 可以将 Internet Explorer 7 也排除在外。当一个空注释跟着子选择器时， IE7 会丢掉后面的规则，就像之前版本的 IE 一样。

    html >/**/ body p { color: blue; }

##### 3. 反选伪类 hack
Internet Explorer 8 以及以下不支持 CSS3 :not() Internet Explorer 9 添加了 CSS3 伪类支持，包括反选伪类

    .yourSelector {
    color: black;
    } /* 给 IE 的值 */
    html:not([dummy]) .yourSelector {
    color: red;
    } /* Safari, Opera, Firefox, and IE9+ 的值 */

反选伪类接受任意选择器：类型选择器，通用选择器，属性选择器，类选择器，ID 选择器，或者伪类选择器。（不包括伪元素和反选伪类自身）。设置反选伪类后，所有不匹配的元素都会应用相应样式。

#### CSS3选择器结合JavaScript的Hack

由于IE10用户代理字符串（UserAgent）为：Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2;Trident/6.0)，所以我们可以使用javascript将此属性添加到文档标签中，再运用CSS3基本选择器匹配。

JavaScript代码:

    var htmlObj = document.documentElement;
    htmlObj.setAttribute('data-useragent',navigator.userAgent);
    htmlObj.setAttribute('data-platform', navigator.platform );

CSS3匹配代码：

    html[data-useragent*='MSIE 10.0'] #id {
    color: #F00;
    }

**使用hack虽然对页面表现的一致性有好处，但过多的滥用会造成html文档混乱不堪，
增加管理和维护的负担**

一个偶然的启示: 下面的pdf来自 wiki 的页面，但是它本身是个错误（滤镜 but hack） 所以能不用它就不用它；

[csshack]({{ site.baseurl }}/post_imgs/CSS hack-wiki.pdf)

