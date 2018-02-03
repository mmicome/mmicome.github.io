---
layout: post
title: "Linux服务器安装配置tomcat"
date: 2018-1-20
description: "Linux服务器安装配置tomcat"
tag: tomcat
comments: true
---
## Linux服务器安装配置tomcat

### 安装配置jdk

tomcat运行需要jdk支持，所以前提要安装且配置好jdk.

用ftp工具把下载回来的jdk上传到服务器中的/usr/local/目录下(这个目录没有什么规定，见仁见智)

解压jdk压缩包

	cd /usr/local/
	tar -zxvf jdk1.7.0_45.tar.gz
	# 解压成功后会有一个 jdk1.7.0_45 的文件夹

配置环境变量

	vi /etc/profile
	# 在文件最后加上以下配置

 	# jdk evn
 	JAVA_HOME=/usr/local/jdk1.7.0_45
 	PATH=$JAVA_HOME/bin:$PATH
 	CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar        

 	export JAVA_HOME
 	export PATH
 	export CLASSPATH

 	#保存退出后执行下面的命令,使其生效
 	source /etc/profile

验证jdk是否配置成功

	java -version

 	java version "1.7.0_45"
 	Java(TM) SE Runtime Environment (build 1.7.0_45-b18)
 	Java HotSpot(TM) 64-Bit Server VM (build 24.45-b08, mixed mode)

### 安装配置tomcat

同样，通过ftp工具上传到服务器中的 /usr/local/ 目录下

解压tomcat压缩包

	cd /usr/local/
	tar -zxvf apache-tomcat-7.0.61.tar.gz

 	# 解压成功后得到 apache-tomcat-7.0.61 文件夹，更名为tomcat7
 	mv apache-tomcat-7.0.61 tomcat7

配置环境变量

	vi /etc/profile

 	#在文件最后加上以下配置

	 #tomcat evn
 	CATALINA_HOME=/usr/local/tomcat7
 	export CATALINA_HOME
 	#保存退出后执行下面的命令,使其生效
 	source /etc/profile

配置tomcat的catalina.sh文件

	#进入tomcat的bin目录
	cd $CATALINA_HOME/bin
	vi catalina.sh
	#找到 # OS specific support，然后在这行下面添加以下配置

 	# OS specific support.  $var _must_ be set to either true or false.
 	CATALINA_HOME=/usr/local/tomcat7
 	JAVA_HOME=/usr/local/jdk1.7.0_45
 	#保存退出

安装tomcat服务

	cd $CATALINA_HOME/bin
	cp catalina.sh /etc/init.d/tomcat

5.测试tomcat启动和停用

	# 启动
 	service tomcat start
 	#停用
 	service tomcat stop

 	#没有报错的话，证明已经配置成功了

## Linux配置tomcat并部署web应用 ( 三种方式 )

	[root@localhost tomcat]# cd /usr/local/tomcat/apache-tomcat-7.0.77/bin/
	
	[root@localhost bin]# ./catalina.sh start
	
	或：[root@localhost bin]# ./startup.sh
**注: ./catalina.sh start 和 ./startup.sh 都能启动tomcat。使用 ./catalina.sh stop 或 ./shutdown.sh 停止tomcat。**

浏览器访问并解决防火墙问题。

在浏览器使用ip进行访问（端口默认：8080），http://192.168.0.111:8080，(localhost)可以看到tomcat的管理界面。
192.168.0.111 为服务器的ip地址，如果访问不了，有可能是服务器防火墙问题，8080端口被拦截了，于是需要打开8080端口，并保存重启防火墙：

	[root@localhost bin]# iptables  -I  INPUT  -p  tcp  --dport  8080  -j  ACCEPT  
	
	[root@localhost bin]# /etc/init.d/iptables  save
	
	[root@localhost bin]# /etc/init.d/iptables  restart

在server.xml配置中可以修改访问端口，<Connector port="8080" 修改成80端口，浏览器上就可以直接通过http://192.168.0.111 进行访问。

6、配置 tomcat 帐号密码权限（登陆使用Web管理界面）

修改tomcat下的配置文件 tomcat-users.xml
	[root@localhost ~]# vim /usr/local/tomcat/apache-tomcat-7.0.77/conf/tomcat-users.xml
	在前添加以下代码：
	<role rolename="tomcat"/>
	<role rolename="manager-gui"/>
	<role rolename="admin-gui"/>
	<role rolename="manager-script"/>
	<role rolename="admin-script"/>
	<user username="tomcat" password="tomcat" roles="tomcat,manager-gui,admin-gui,admin-script,manager-script"/>

注：username 和 password 则是登陆tomcat管理界面需要的账号密码。
:wq 保存退出，重启tomcat

### Tomcat配置服务和自启动
1、Tomcat配置服务
新建服务脚本：

[root@localhost ~]# vim /etc/init.d/tomcat

添加脚本内容：

	#!/bin/bash
	# description: Tomcat7 Start Stop Restart
	# processname: tomcat7
	# chkconfig: 234 20 80
	
	CATALINA_HOME=/usr/local/tomcat/apache-tomcat-7.0.77
	
	case $1 in
	        start)
	                sh $CATALINA_HOME/bin/startup.sh
	                ;;
	        stop)
	                sh $CATALINA_HOME/bin/shutdown.sh
	                ;;
	        restart)
	                sh $CATALINA_HOME/bin/shutdown.sh
	                sh $CATALINA_HOME/bin/startup.sh
	                ;;
	        *)
	                echo 'please use : tomcat {start | stop | restart}'
	        ;;
	esac
	exit 0

:wq 保存脚本。
执行脚本，启动、停止 和 重启服务。

启动：service tomcat start
停止：service tomcat stop
重启：service tomcat restart

2、Tomcat配置开机自启动

向chkconfig添加 tomcat 服务的管理

[root@localhost ~]# chkconfig --add tomcat
设置tomcat服务自启动

[root@localhost ~]# chkconfig tomcat on
查看tomcat的启动状态

[root@localhost ~]# chkconfig --list | grep tomcat
状态如下：

[root@localhost ~]# chkconfig --list | grep tomcat

tomcat      0:off 1:off 2:on 3:on 4:on 5:on 6:off
关闭tomcat服务自启动：chkconfig tomcat off
删除tomcat服务在chkconfig上的管理：chkconfig --del tomcat

### 部署web项目（三种方式）

1、第一种方式 : 部署项目到webapps（不推荐）

进入tomcat下的webapps目录，并新建一个目录为web项目的主目录。
	
	[root@localhost ~]# cd /usr/local/tomcat/apache-tomcat-7.0.77/webapps
	
	[root@localhost webapps]# mkdir sam
	
	[root@localhost webapps]# ls
	docs  examples  host-manager  manager  ROOT  sam

sam 目录为项目的目录，现在把web项目打包出来的war拷贝并解压到sam目录下。

这里我直接用最简答的 index.html 来代替web项目war包作测试。

	[root@localhost sam]# ls
	index.html

浏览器访问：http://192.168.0.111:8080/sam/index.html 既可访问到sam目录下的index.html
这种方式不被推荐，项目不好管理，而且需要链接加上项目名才能正常访问。

2、第二种方式：修改server.xml文件，配置虚拟主机

修改tomcat conf下的server.xml配置

	[root@localhost conf]# vim server.xml 

在Engine节点内添加 Host节点

	<Host name="www.sam.com">
	      <Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs"
	             prefix="www.sam.com_access_log." suffix=".txt"
	             pattern="%h %l %u %t "%r" %s %b" />
	      <Context path="" docBase="/home/sam/site/com.sam.www" />
	</Host>

name="www.sam.com"：指访问的域名，所以需要你先拥有 sam.com 这个域名，并把 www.sam.com 映射到当前服务器上才能正常访问，本地测试可以通过修改本机host文件来做映射测试。
浏览器访问：http://www.sam.com:8080 能访问到 /home/sam/site/com.sam.www 下的项目。
注：www.sam.com为我个人域名，你需要自行注册域名，并做相应的ip映射。如果仅是本地测试，可以修改本机的host文件，添加记录：192.168.0.111 www.sam.com ，将web.sam.com的访问映射到192.168.0.111这台服务器中。

3、第三种方式：修改server.xml和Catalina，配置虚拟主机。

这种方式，我用 web.sam.com 这个项目为例。
修改tomcat conf下的server.xml配置
 [root@localhost conf]# vim server.xml 
在Engine节点内添加 简单的Host节点，:wq 保存退出
<Host name="web.sam.com"></Host>
进入tomcat conf下的Catalina目录

[root@localhost conf]# cd /usr/local/tomcat/apache-tomcat-7.0.77/conf/Catalina

新建目录 web.sam.com （与server.xml中配置的host名称一样）

[root@localhost Catalina]# mkdir web.sam.com

进入web.sam.com目录并新建ROOT.xml文件，添加相应的配置内容。

[root@localhost Catalina]# cd web.sam.com/
[root@localhost web.sam.com]# vim ROOT.xml

ROOT.xml 文件添加以下内容:

	<?xml version="1.0" encoding="UTF-8"?>
	<Context path="" docBase="/home/sam/site/com.sam.web" >
	
	        <Valve className="org.apache.catalina.valves.AccessLogValve"
	                directory="logs/com.sam.web"
	                prefix="web.sam.com_localhost_access_log." suffix=".txt"
	                resolveHosts="true"    
	                pattern="%h %l %u %t "%r" %s %b" />
	         
	</Context>

:wq保存退出。

同样，新建项目目录 /home/sam/site/com.sam.web ，并把war包解压到该目录下，重启tomcat。

浏览器访问：http://web.sam.com:8080，此时就会访问到web.sam.com这个项目的内容，而不是 www.sam.com的内容。

当然，需要在sam.com域名管理中添加 web.sam.com域名映射，或者本地测试需要修改本机host文件，添加记录 ：192.168.0.111 web.sam.com ，将web.sam.com的访问映射到192.168.0.111这台服务器中。

### 配置静态资源访问，配置目录位置的网络映射

配置后，可以直接访问到本地资源文件，而不需要访问到具体项目。

1、针对第二种部署方式的配置（以 www.sam.com 项目为例）

修改tomcat conf下的server.xml配置
 [root@localhost conf]# vim server.xml 
在

	<Host name="www.sam.com">
	      <Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs"
	                       prefix="www.sam.com_access_log." suffix=".txt"
	                       pattern="%h %l %u %t "%r" %s %b" />
	      <Context path="" docBase="/home/sam/site/com.sam.www" />
	      <Context path="/upload" docBase="/home/sam/share/upload" />
	</Host>

在 /home/sam/share/upload 存放共享资源 a.jpg

浏览器访问：http://www.sam.com:8080/upload/a.jpg ，即可获取到该资源。
说明：

以上配置后，会把www.sam.com域名下的所有 http://www.sam.com:8080/upload 请求拦截，并直接从/home/sam/share/upload 共享目录下寻求对应的资源文件。
如访问：http://www.sam.com:8080/upload/a/b.txt , 该请求直接从/home/sam/share/upload目录下寻找a目录，并寻找a目录下的b.txt，然后直接把该资源返回。
于是我们只要把共享资源存放在配置的共享目录中，就能通过域名直接访问相应的资源。

2、针对第三种部署方式的配置（以 web.sam.com 项目为例）

修改Catalina目录下对应的项目目录里面的内容。
进入Catalina 下的 web.sam.com 目录

[root@localhost conf]# cd /usr/local/tomcat/apache-tomcat-7.0.77/conf/Catalina/web.sam.com
新建文件 upload.xml

[root@localhost web.sam.com]# vim upload.xml
添加内容：

	<?xml version="1.0" encoding="UTF-8"?>
	<Context path="/upload" docBase="/home/sam/share/upload" >
	        <Valve className="org.apache.catalina.valves.AccessLogValve"
	        directory="logs/com.sam.web_upload"
	        prefix="web.sam.com_upload_localhost_access_log." suffix=".txt"
	        resolveHosts="true"
	        pattern="%h %l %u %t "%r" %s %b" />
	</Context>

:wq 保存推出，重启tomcat。
在 /home/sam/share/upload 存放共享资源 a.jpg
浏览器访问：http://www.sam.com:8080/upload/a.jpg ，即可获取到该资源。

### 注：
## 设置CLASSPATH环境变量
由于servlets不是Java SE的一部分，所以您必须标示出servlet类的编译器。

假如您用的是Windows机器，您需要在C:\autoexec.bat文件中添加以下两行：

	set CATALINA=C:\apache-tomcat-5.5.29
	set CLASSPATH=%CATALINA%\common\lib\jsp-api.jar;%CLASSPATH%
	
或者，在Windows NT/2000/XP下，您只要右击我的电脑，选择属性，然后点击高级，然后点击环境变量，接下来便可以设置CLASSPATH变量并且确定退出即可。

在Linux/Unix机器下，假如您使用的是C shell，那么您就需要在.cshrc文件中添加以下两行：

	setenv CATALINA=/usr/local/apache-tomcat-5.5.29
	setenv CLASSPATH $CATALINA/common/lib/jsp-api.jar:$CLASSPATH

注意：如果您的开发路径是C:\JSPDev (Windows)或者 /usr/JSPDev (Linux/Unix)，那么您就需要将这些路径添加进CLASSPATH变量中。

### tomcat 的 8080 端口经常会被占用，解决办法两个：

 1、关闭占用8080端口的进程：8080端口被占用的话执行startup.bat会报错，可在cmd下执行netstat -ano命令查看8080是否被占用，如果被占用可根据相应的PID号在任务管理器查找并关闭相应进程，然后重启tomcat。此方法弊端是端口被占用就得重复上述操作。
 2、更改tomcat端口：进入tomcat安装目录\conf\文件夹，以记事本打开service.xml，在如下所示位置指定新的端口号并重启tomcat。
<Connector port="8022" protocol="HTTP/1.1"
    connectionTimeout="20000" 
    redirectPort="8443" />