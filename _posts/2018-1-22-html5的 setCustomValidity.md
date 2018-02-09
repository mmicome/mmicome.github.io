---
layout: post
title: "html5的 setCustomValidity"
date: 2018-1-22
description: "html5的 setCustomValidity"
tag: h5-form
comments: true
---
1. 默认提示
html5丰富了表单验证，例如：

    <form>
        <input type=text required />
        <input type=submit>
    </form>

如果text中没有输入内容，点击提交按钮，会提示“请填写此字段。”

事件顺序如下：

  （1）submit按钮的click事件，若取消默认事件，则终止
  （2）html5表单验证和提示，若表单验证不通过，则提示第一个不合法输入，并终止
  （3）form表单的submit事件，若取消默认事件，则终止

**注意：**
用js触发form的submit事件，会直接进入第（3）步，不会进行html5表单验证。要想出现html5的验证提示，必须经过submit按钮。

2. 自定义提示
HTML5为所有表单元素添加了一个JS属性：input.validity(有效性)

我们给input添加一个id为user,在控制台输出user.validity查看该属性的内容：

![]({{ site.baseurl }}/post_imgs/validity.png)

使用setCustomValidity设置了自定义提示后，
validity.customError就会变成true，则checkValidity总是会返回false。

而且，表单验证是根据checkValidity来决定是否提示的。

所以，应该使用validity的以下属性来设置和取消自定义提示：
badInput，customError，patternMismatch，rangeOverflow，rangeUnderflow，stepMismatch，tooLong，typeMismatch，valid，valueMissing

其中，取消自定义提示的方式如下：

  setCustomValidity('')
  setCustomValidity(null)
  setCustomValidity(undefined)

  例子：

      ```js
      <form>
          <input id=text1 type=text required />
          <input id=submit1 type=submit>
      </form>
      <script>
          document.querySelector('#submit1').addEventListener('click',function(){
              var $text1= document.querySelector('#text1');

              $text1.validity.valueMissing
                  ?$text1.setCustomValidity('The value can\'t be empty.')
                  : $text1.setCustomValidity('');
          },false);
      </script>
      ```

  或者：

      ```js
      $text1.setCustomValidity((function(){
          if($text1.validity.valueMissing){
              return 'The value can\'t be empty.';
          }

          //不写return或者写“return;”表示“return undefined;”
      }()));
      ```

**注：检测有效性，及新添属性和方法**

　　在JavaScript中使用checkValidity()方法可以检测表单中的某个字段是否有效。所有表单字段都有这个方法，如果字段的值是有效的，这份方法会返回true，否则则是false。与checkValidity()方法相比，validity属性可以告诉你很多东西。

   valid:true//当前输入是否有效

　　valueMissing : 输入值为空时

　　typeMismatch : 控件值与预期类型不匹配

　　patternMismatch : 输入值不满足pattern正则

　　tooLong : 超过maxLength最大限制

    tooShort :   false //输入的字符数小于minlength

　　rangeUnderflow : 验证的range最小值

　　rangeOverflow：验证的range最大值

　　stepMismatch: 验证range 的当前值 是否符合min、max及step的规则

　　customError： 不符合自定义验证，是否设置setCustomValidity(); 自定义验证

　　placeholder : 输入框提示信息

　　autocomplete : 是否保存用户输入值。默认为on，关闭提示选择off

　　autofocus : 指定表单获取输入焦点

　　list和datalist : 为输入框构造一个选择列表。list值为datalist标签的id

　　Formaction : 在submit里定义提交地址

上述属性值的特性：

  (1)只要有一个验证方面错误，某个属性就为true，valid值为false

  (2)只有没有任何验证错误，所有的属性都为false，valid才能为true

  (3)上述的每个错误在浏览器内部都有一个预定义的错误提示消息

  (4)所有的错误消息中，只要存在“自定义的错误消息”，浏览器只显示自定义的错误消息，优先级高于浏览器预定义的错误消息

  (5)当前没有自定义错误消息，所以customError :  false

  设置自定义错误消息的方法：

  input.setCustomValidity('错误提示消息');

  //这个相当于将input.validity.customError:true

  取消自定义错误消息的方法：

  input.setCustomValidity("");

  //这个相当于将input.validity.customError:false

    ```js
    if(input.validity && !input.validity.valid){
        if(input.validity.valueMissing){
            alert("不能为空")
        }else if(input.validity.typeMismatch){
            alert("控件值与预期类型不匹配");
        }
    }
    ```

考虑到事件顺序，form的submit事件中只有在表单验证通过后才会触发。

所以，可以在form的submit事件中，通过取消默认行为，用ajax提交数据。

      ```js
      document.querySelector('#form1').addEventListener('submit',function(e){
          //ajax

          e.preventDefault();
      },false);
      ```
