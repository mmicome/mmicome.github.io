---
layout: post
title: "font-face"
date: 2018-1-20
description: "font-face"
tag: layout
comments: true
---

### @font-face的用法

几乎所有浏览器(包括最古老的IE6)也支持的网络字体@font-face的用法是：

	@font-face {
	  font-family: 'MyWebFont';
	  src: url('webfont.eot'); /* IE9 Compat Modes */
	  src: url('webfont.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
	       url('webfont.woff') format('woff'), /* Modern Browsers */
	       url('webfont.ttf')  format('truetype'), /* Safari, Android, iOS */
	       url('webfont.svg#svgFontName') format('svg'); /* Legacy iOS */
	}

但进入到现代浏览器时代后，WOFF格式的字体受到了普遍的支持，所有，你可能只需要这样写：
	
	@font-face {
	  font-family: 'MyWebFont';
	  src: url('myfont.woff') format('woff'), /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	       url('myfont.ttf') format('truetype'); /* Chrome 4+, Firefox 3.5, Opera 10+, Safari 3—5 */
	}

或者只含WOFF格式：

	@font-face {
	  font-family: 'MyWebFont';
	  src: url('myfont.woff') format('woff')； /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}

然后，像这样使用：

body {
  font-family: 'MyWebFont';
}

### @font-face基本知识

在@font-face网络字体技术之前，浏览器显示网页上文字使用的字体只能限制在电脑里已经安装的几款字体里。而且每个人的电脑里安装的字体是因人而异的。@font-face的作用是从网上下载并使用自定义字体，使页面显示字体不依赖用户的操作系统字体环境。

网络字体(Web font)的效率
你需要注意的是，字体文件的体积可能非常的大，而且需要额外的HTTP连接，这些都会降低网站页面的加载速度。所以，在使用网络字体@font-face前，你需要清楚它的利与弊，判断网络字体是否真的有必要用在你的网站页面上。

如果你决定使用个性化自定义字体，可以采用一个非常灵活的方法，就是只加载尽量少的字体字符数和尽量少的字体风格(粗体/斜体)。例如，如果你使用谷歌字体，你可以只加载指定的字体风格组合：

@import url(http://fonts.googleapis.com/css?family=Averia+Sans+Libre:400,300italic,700);

或者指定加载那些字符的字体。

网络字体(Web font)文件格式
目前最主要的几种网络字体(web font)格式包括WOFF，SVG，EOT，OTF/TTF。

WOFF
WOFF是Web Open Font Format几个词的首字母简写。这种字体格式专门用于网上，由Mozilla联合其它几大组织共同开发。WOFF字体通常比其它字体加载的要快些，因为使用了OpenType (OTF)和TrueType (TTF)字体里的存储结构和压缩算法。这种字体格式还可以加入元信息和授权信息。这种字体格式有君临天下的趋势，因为所有的现代浏览器都开始支持这种字体格式。

SVG / SVGZ
Scalable Vector Graphics (Font). SVG是一种用矢量图格式改进的字体格式，体积上比矢量图更小，适合在手机设备上使用。只有iPhone上的Safari(4.1)之前的版本支持它。目前火狐、IE都不支持SVG字体格式。火狐推迟对SVG字体的支持，重点放在WOFF格式上。SVGZ是压缩版的SVG。

EOT
Embedded Open Type。这是微软创造的字体格式(是微软在15年前发明了网络字体@font-face)。这种格式只在IE6/IE8里使用。

OTF / TTF
OpenType Font 和 TrueType Font。部分的因为这种格式容易被复制(非法的)，这才催生了WOFF字体格式。然而，OpenType有很多独特的地方，受到很多设计者的喜爱。