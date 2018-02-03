---
layout: post
title: "devDependencies和dependencies的区别？"
date: 2018-1-20
description: "devDependencies和dependencies的区别？"
tag: node
comments: true
---

[「引用地址」](https://segmentfault.com/q/1010000007740149)~ segmentfault | npm~

**平常如果是开发node组件的话，感觉这个比较容易区分，需要什么就dependencies加上，单元测试什么的放在devDependencies，但是如果是一个web项目的话，就感觉有点头疼了。**

因为现在都是用单页，vue，angular，react，这样的话，一般上线的时候都是直接把webpack打包好。因为webpack已经内部处理好了依赖，这样的话就感觉几乎所有的东西都可以放在devDependencies了，但是这样的话感觉不严谨。

举一个最简单的例子，vue要不要放到dependencies？目前我是放在dependencies，但感觉放在devDependencies也没有不妥的地方，只不过有点怪。

### 回答一

dependencies就是你程序跑起来需要的模块，没有这个模块你程序就会报错。
devDependencies见命知意了，开发程序的时候需要的模块了。
举个例子，你用angularjs框架开发一个程序，开发阶段需要用到gulp来构建你的开发和本地运行环境。所以angularjs一定要放到dependencies里，因为以后程序到生产环境也要用。gulp则是你用来压缩代码，打包等需要的工具，程序实际运行的时候并不需要，所以放到dev里就ok了。
再深入一些，你写程序要用ES6标准，浏览器并不完全支持，所以你要用到babel来转换代码。程序里有消息提示，你想用toaster。同样一个开发用，一个运行用。所以babel放dev，toaster放dependencies。
希望你理解了！

### 回答二

dependencies 存放项目或组件代码中依赖到的

devDependencies 存放测试代码依赖的包或构建工具的包

但是如果是组件（前端组件或后端组件都包含）依赖一些框架或比较大型的包，可以考虑放 peerDependencies，如：jquery、vue、react 等

其实还有：bundledDependencies、optionalDependencies

参考官方文档：[https://docs.npmjs.com/files/...](https://docs.npmjs.com/files/package.json)
