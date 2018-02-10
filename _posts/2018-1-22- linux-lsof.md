---
layout: post
title: "lsof"
date: 2018-1-22
description: "lsof"
tag: linux-cmd
comments: true
---

### lsof /home/icome 

-------------------------------------------------------

***查询正在使用这个文件系统的进程命令***

>  icome@mmicome:~/书单$ lsof /home/icome/书单
  COMMAND     PID  USER   FD   TYPE DEVICE SIZE/OFF    NODE NAME
  xfce4-ter 16611 icome  cwd    DIR    8,6     4096 7472122 /home/icome/书单
  bash      16615 icome  cwd    DIR    8,6     4096 7472122 /home/icome/书单
  lsof      16622 icome  cwd    DIR    8,6     4096 7472122 /home/icome/书单
