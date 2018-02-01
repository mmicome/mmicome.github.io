---
layout: post
title: "使用 Date 和 SimpleDateFormat 类表示时间"
date: 2018-1-20
description: "使用 Date 和 SimpleDateFormat 类表示时间"
tag: java
comments: true
---
### 使用 Date 和 SimpleDateFormat 类表示时间
在程序开发中，经常需要处理日期和时间的相关数据，此时我们可以使用 java.util 包中的 Date 类。这个类最主要的作用就是获取当前时间，我们来看下 Date 类的使用：



使用 Date 类的默认无参构造方法创建出的对象就代表当前时间，我们可以直接输出 Date 对象显示当前的时间，显示的结果如下：



其中， Wed 代表 Wednesday (星期三)， Jun 代表 June (六月)， 11 代表 11 号， CST 代表 China Standard Time (中国标准时间，也就是北京时间，东八区)。

从上面的输出结果中，我们发现，默认的时间格式不是很友好，与我们日常看到的日期格式不太一样，如果想要按指定的格式进行显示，如 2014-06-11 09:22:30 ，那该怎么做呢？

此时就到了 java.text 包中的 SimpleDateFormat 类大显身手的时候了！！可以使用 SimpleDateFormat 来对日期时间进行格式化，如可以将日期转换为指定格式的文本，也可将文本转换为日期。

1. 使用 format() 方法将日期转换为指定格式的文本



代码中的 “yyyy-MM-dd HH:mm:ss” 为预定义字符串， yyyy 表示四位年， MM 表示两位月份， dd 表示两位日期， HH 表示小时(使用24小时制)， mm 表示分钟， ss 表示秒，这样就指定了转换的目标格式，最后调用 format() 方法将时间转换为指定的格式的字符串。

运行结果： 2014-06-11  09:55:48   

2. 使用 parse() 方法将文本转换为日期



代码中的 “yyyy年MM月dd日 HH:mm:ss” 指定了字符串的日期格式，调用 parse() 方法将文本转换为日期。



1、 调用 SimpleDateFormat 对象的 parse() 方法时可能会出现转换异常，即 ParseException ，因此需要进行异常处理

2、 使用 Date 类时需要导入 java.util 包，使用 SimpleDateFormat 时需要导入 java.text 包

	import java.text.ParseException;
	import java.text.SimpleDateFormat;
	import java.util.Date;
	
	public class HelloWorld {
	    
	    public static void main(String[] args) throws ParseException {
	        
			// 使用format()方法将日期转换为指定格式的文本
			SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy年MM月dd日 HH时mm分ss秒");
			SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy/MM/dd HH:mm");
			SimpleDateFormat sdf3 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	        
			// 创建Date对象，表示当前时间
	        Date now = new Date();
	        
	        // 调用format()方法，将日期转换为字符串并输出
			System.out.println(        sdf1.format(now));
			System.out.println(sdf2.format(now));
			System.out.println(sdf3.format(now));
	
			// 使用parse()方法将文本转换为日期
			String d = "2014-6-1 21:05:36";
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	        
	         // 调用parse()方法，将字符串转换为日期
			Date date = sdf.parse(d);
	        
			System.out.println(date);
		}
}

### Calendar 类的应用
Date 类最主要的作用就是获得当前时间，同时这个类里面也具有设置时间以及一些其他的功能，但是由于本身设计的问题，这些方法却遭到众多批评，不建议使用，更推荐使用 Calendar 类进行时间和日期的处理。

java.util.Calendar 类是一个抽象类，可以通过调用 getInstance() 静态方法获取一个 Calendar 对象，此对象已由当前日期时间初始化，即默认代表当前时间，如 Calendar c = Calendar.getInstance();


其中，调用 Calendar 类的 getInstance() 方法获取一个实例，然后通过调用 get() 方法获取日期时间信息，参数为需要获得的字段的值， Calendar.Year 等为 Calendar 类中定义的静态常量。


Calendar 类提供了 getTime() 方法，用来获取 Date 对象，完成 Calendar 和 Date 的转换，还可通过 getTimeInMillis() 方法，获取此 Calendar 的时间值，以毫秒为单位。如下所示：

	import java.text.SimpleDateFormat;
	import java.util.Calendar;
	import java.util.Date;
	
	public class HelloWorld {
	    
	    public static void main(String[] args) {
			// 创建Calendar对象
			Calendar c = Calendar.getInstance();
	        
			// 将Calendar对象转换为Date对象
			Date date = c.getTime();
			//Date date = c.getTimeMillis();
	        //int year = c.get(Calendar.YEAR);
	        //int month = c.get(Calendar.MONTH)+1;
	        //int day = c.get(Calendar.DAY_OF_MONTH);
	        //int hour = c.get(Calendar.HOUR_OF_DAY);
	        //int minute = c.get(Calendar.MINUTE);
	        //int second = c.get(Calendar.SECOND);
			// 创建SimpleDateFormat对象，指定目标格式
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	        
			// 将日期转换为指定格式的字符串
			String now = sdf.format(date);
			System.out.println("当前时间：" + now);
		}
}