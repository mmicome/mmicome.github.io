---
layout: post
title: "java-error"
date: 2018-1-20
description: "java-error"
tag: java
comments: true
---
### java error

1.Java中的所有不正常类都继承于Throwable类。Throwable主要包括两个大类，一个是Error类，另一个是Exception类；

2.其中Error类中包括虚拟机错误和线程死锁，一旦Error出现了，程序就彻底的挂了，被称为程序终结者；

3.Exception类主要指编码、环境、用户操作输入出现问题，Exception主要包括两大类，非检查异常（RuntimeException）和检查异常（其他的一些异常）

4.RuntimeException异常主要包括以下四种异常：空指针异常、数组下标越界异常、类型转换异常、算术异常。