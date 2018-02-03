---
layout: post
title: "java类路径classpath和包"
date: 2018-1-20
description: "java类路径classpath和包"
tag: java

comments: true
---
[「引用地址」](https://www.cnblogs.com/f-ck-need-u/p/8127529.html)~ 骏马金龙 | java 类和包~

### 类路径(classpath)
java编译器编译.java文件和java虚拟机执行.class文件时的路径和写法不一样。

在没有设置任何classpath环境变量的情况下，javac可以编译全路径的.java文件。例如：

javac d:\myjava\HelloWorld.java
编译后，在.java同路径目录下生成class文件。

默认java虚拟机要从classpath环境变量的路径中搜索class文件去执行，对于java虚拟机来说，这不是类文件，而是类。它只有类路径，而没有文件系统路径。而classpath环境变量正是为java虚拟机提供搜索类路径的环境。注意，虚拟机不会递归搜索classpath定义的路径。

也就是说，上面的java文件可以正确编译，但却不能执行。但如果将classpath设置为".;d:\myjava\"，则java虚拟机将先从当前路径搜索，再从d:\myjava下搜索class文件。

于是上面的HelloWorld.java编译后，可以直接执行:

java HelloWorld
或者切换到d:\myjava目录下，执行java HelloWorld。

但下面则是错误的方式，最后虽然能正确编译NewDir.java，但在执行时，将搜索当前目录(d:\myjava)下是否有NewDir.class，再搜索d:\myjava下是否有NewDir.class，但不会递归到子目录newdir中去搜索class文件。

d:\
cd myjava
javac newdir\NewDir.java
java NewDir
再例如，在d:\myjava\hello下有两个java源文件，它们的内容分别如下：

    d:\myjava\hello
        Cat.java
        Dog.java

    Cat.java
    =========================
    public class Cat {
    }

    Dog.java
    =========================
    public class Dog {
        public static void main(String [] args) {
            Cat c = new Cat();
        }
    }
其中Dog类中直接new了另一个文件中Cat类的对象，无论是编译还是运行，这都是能成功的，因为javac编译器编译Dog.java时会自动从classpath指定的路径下搜索Cat.class，正好这能搜索到，且该类又是public类，因此编译成功。

总之，要明确的是javac编译器搜索的是文件路径，和环境变量classpath无关。而java虚拟机搜索的是类文件，严格地说是类，搜索路径由环境变量classpath决定，且有先后顺序。

更多的类路径说明，见下面的"包"。

### 包(package)
包是类的集合。在java源文件的第一行(不包括注释行或空行)写上package关键字并给定包名，即可将该类文件放到包中。

例如，d:\myjava\Cat.java文件：

    package com.longshuai.home;
    public class Cat {
        public static void main(String[] args) {
            System.out.println("com.longshuai.home.Cat");
        }
    }

这表示将Cat类放在com.longshuai.home包中。包应该以反转后的域名取名，防止包重名冲突，当然，这是非必须的。

对于没有使用package指令的源文件，在编译时其内的类都会默认当作"裸体类"。

java管理包的方法是以对应包名的目录层次管理的，例如上面的com.longshuai.home包，应该将该class文件放在com/longshuai/home(如果是windows，则反斜线)下，即com/longshuai/home/Cat.class。

javac在编译时从路径上搜索文件。例如，将这个Cat.java放到com/longshuai/home下。执行时java虚拟机从classpath搜索要加载的类文件，而加载类的方式是使用"."连接各类名。所以编译这个文件和java虚拟机执行这个文件时的方法分别是：

    javac com/longshuai/home/Cat.java
    java com.longshuai.home.Cat

注意，嵌套的包之间没有任何关系，例如java.util包和java.util.jar包没有任何依赖关系。

使用包中的类和导入包(import)
在某个java源文件中，无法直接使用其他文件中的类，除非要使用的这个类正好能被classpath的路径搜索到。要引用非classpath下的其他类，只能将其添加到classpath或者装入package中，然后引用包中的类。

引用包中类可以通过指定包名的方式引用来引用。例如：

com.longshuai.home.Cat c = new com.longshuai.home.Cat();
但显然这很不方便。可以在java源文件的前几行(但在package命令的后面)使用import指令导入需要使用的包中的类。例如导入Cat类，这样就可以直接使用该类了：

    import com.longshuai.home.Cat;
    Cat c = new Cat();

导入包时可以在尾部使用星号"*"通配导入的所有类，只能在尾部使用"*"，因为"*"匹配的是类名，而不是包名。也因此，不能在非结尾处使用"*"号来表示导入其他包中的类，例如：

    import com.longshuai.home.*; //导入com.longshuai.home包中的所有类
    import com.longshuai.*;      //导入com.longshuai包中所有类，但不会导入com.longshuai.home中的类，
                                //因为虽然层次之间有嵌套，但这些包没有任何关系
    import com.*.*;              //这是错误的写法

如果导入的包中有同名的类，则在引用同名类的时候会产生冲突错误，例如java.util和java.sql包中都有Date类，

    import java.util.*;
    import java.sql.*;

    public class Test {
        public static void main(String [] args) {
            Date today = new Date();
        }
    }

编译：

    javac Test.java
    Test.java:11: 错误: 对Date的引用不明确
            Date today = new Date();
            ^
      java.sql 中的类 java.sql.Date 和 java.util 中的类 java.util.Date 都匹配
    Test.java:11: 错误: 对Date的引用不明确
            Date today = new Date();
                            ^
      java.sql 中的类 java.sql.Date 和 java.util 中的类 java.util.Date 都匹配
    2 个错误

这时可以显式导入Date类，或者在使用Date类的时候指定包名。也就是说下面两种方法都正确：

    //方法一：
    import java.util.*;
    import java.sql.*;
    import java.util.Date;

    //方法二：
    import java.util.*;
    import java.sql.*;

    public class Test {
        public static void main(String [] args) {
            java.util.Date today = new java.util.Date();
        };
    };

除了可以导入包中的类，还可以静态导入包中类中的静态方法和静态变量，只需加上static关键字并指定要导入的内容即可。例如：

    import static java.lang.System.*;
    import static java.lang.System.out;
    静态导入方法后，就可以省略前缀，例如：

    import static java.lang.System.out;

    public class ClassName {
        public static void main() {
            out.println("HelloWorld");//等价于System.out.println("HelloWorld");
        };
    }

### 将package归档成jar包
java虚拟机可以直接识别jar包。可以将package名称对应的路径使用jar命令归档成jar包。jar命令使用说明如下：

jar
用法: `jar {ctxui}[vfmn0PMe] [jar-file] [manifest-file] [entry-point] [-C dir]files .`
..
选项:

    -c  创建新档案
    -t  列出档案目录
    -x  从档案中提取指定的 (或所有) 文件
    -u  更新现有档案
    -v  在标准输出中生成详细输出
    -f  指定档案文件名
    -m  包含指定清单文件中的清单信息
    -n  创建新档案后执行 Pack200 规范化
    -e  为捆绑到可执行 jar 文件的独立应用程序
        指定应用程序入口点
    -0  仅存储; 不使用任何 ZIP 压缩
    -P  保留文件名中的前导 '/' (绝对路径) 和 ".." (父目录) 组件
    -M  不创建条目的清单文件
    -i  为指定的 jar 文件生成索引信息
    -C  更改为指定的目录并包含以下文件
    
如果任何文件为目录, 则对其进行递归处理。
清单文件名, 档案文件名和入口点名称的指定顺序
与 'm', 'f' 和 'e' 标记的指定顺序相同。
例如，将当前目录下的a.class和b.class打包到test.jar中：

jar cvf test.jar a.class b.class
查看jar包中的文件列表，会递归显示：

    jar -tf test.jar
    META-INF/
    META-INF/MANIFEST.MF
    jiecheng.class

例如，将com目录归档到d:\dp.jar中。

    jar cvf d:\dp.jar com/
    已添加清单
    正在添加: com/(输入 = 0) (输出 = 0)(存储了 0%)
    正在添加: com/longshuai/(输入 = 0) (输出 = 0)(存储了 0%)
    正在添加: com/longshuai/home/(输入 = 0) (输出 = 0)(存储了 0%)
    正在添加: com/longshuai/home/Bird.class(输入 = 420) (输出 = 291)(压缩了 30%)
    正在添加: com/longshuai/home/Bird.java(输入 = 136) (输出 = 100)(压缩了 26%)
    正在添加: com/longshuai/home/Cat.class(输入 = 417) (输出 = 289)(压缩了 30%)
    正在添加: com/longshuai/home/Cat.java(输入 = 134) (输出 = 99)(压缩了 26%)

有了jar文件，就可以直接设置classpath的路径为jar文件名，这样在搜索类文件时就会直接从jar文件内搜索。例如classpath设置为：

.;d:\myjava;d:\dp.jar
类搜索机制
在java虚拟机搜索类文件时，除了classpath环境变量指定的路径，还会先搜索两个默认的路径:jre/lib和jre/lib/ext下的jar文件中似乎否有待搜索的类。

例如，当classpath设置为".;d:\myjava;d:\myjar.jar"时，要搜索com.longshuai.com.Cat类文件：

    (a).先搜索jre/lib和jre/lib/ext下的jar文件;
    (b).再搜索当前目录下是否有com\longshuai\com\Cat.class;
    (c).再搜索d:\myjava\Cat.class;
    (d).搜索d:\myjar.jar文件中是否有com.longshuai.com.Cat类。

如果在某个java源文件中引用了某个类，则在编译时，将通过以下几种方式判断该类是否合理有效：

    (1).搜索导入的包类中是否包含该类。
    (2).搜索隐式导入的java.lang包，该包是默认导入的。
    (3).当前文件中是否定义了该类。
    (4).按照类路径的搜索规则((a)-(d))搜索其中是否有该类。

### 继承
类与类之间能体现"什么是什么"的语义逻辑，就能实现类的继承。例如，猫是动物，那么猫类可以继承动物类，而猫类称为子类，动物类称为父类。

子类继承父类后，子类就具有了父类所有的成员，包括成员变量、方法。实际上在内存中，new子类对象时，heap中划分了一部分区域存放从父类继承来的属性。例如，new parent得到的区域A，new child得到的区域B，区域A在区域B中。

子对象中之所以包含父对象，是因为在new子对象的时候，首先调用子类构造方法构造子对象，在开始构造子对象的时候又首先调用父类构造方法构造父对象。也就是说，在形成子对象之前，总是先形成父对象，然后再慢慢的补充子对象中自有的属性。具体内容见"继承时构造方法的重写super()"。

![]({{ site.baseurl }}/post_imgs/class.png)

子类不仅具有父类的成员，还具有自己独有的成员，例如有自己的方法、自己的成员变量。子类、父类中的成员名称不同时这很容易理解，但它们也可能是同名的。如果子类中有和父类继承的同名方法，例如父类有eat()方法，子类也有eat()方法，则这可能是方法的重写(见下文)。如果子类中的成员变量和父类的成员变量同名，则它们是相互独立的，例如父类有name属性，子类还自己定义了一个name属性，这是允许的，因为可以分别使用this和super来调用它们。

继承类时使用extends关键字。继承时，java只允许从一个父类继承。

    class Person  {
        String name;
        int age;

        void eat() { System.out.println("eating...");}
        void sleep() {System.out.println("sleep...");}
    }

    class Student extends Person {
        int studentID;

        Student(int id,String name,int age) {
            this.name = name;
            this.age = age;
            this.studentID = id;
        }

        void study() {System.out.println("studing...");}
    }

    public class Inherit {
        public static void main(String[] args) {
            Student s1 = new Student(1,"Malongshuai",23);
            System.out.println(s1.studentID+","+s1.name+","+s1.age);
            s1.eat();
            s1.sleep();
            s1.study();
        }
    }