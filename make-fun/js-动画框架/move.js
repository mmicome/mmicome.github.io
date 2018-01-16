// ------------ 功能实现 ---------------

//多物体运动下 考虑闭包因素
//for(;i<obj.length;){
// 	  obj[i].timer = null;
//	  obj[i].alpha = 30;
//	  ...
//    contentMove(this,json[attr])
//    clearInterval(obj.timer);
//}
//    ****多物体运动最好不要共用变量****

function contentMove(obj,json,fn) {
  clearInterval(obj.timer?obj.timer:null);
  var flag;
  obj.timer = setInterval(function() {
    flag = true;
    for(var attr in json) {
      var icur = 0;
      if(attr == 'opacity') {
        icur = Math.round(parseFloat(getStyle(obj,attr))*100);
      } else {
        var icur =  parseInt(getStyle(obj,attr));
      }
      //变速
      var speed = (json[attr] - icur)/5;
      //动画必须处理浮点数为整数
      speed = speed>0?Math.ceil(speed):Math.floor(speed);
      if(icur != json[attr]) {
        flag = false;
      }
      if(attr == 'opacity') {
        obj.style.opacity = (icur + speed)/100;
        //obj.style.filter = 'alpha(opacity=' + (icur + speed) + ')';
      } else {
        obj.style[attr] = icur + speed + 'px';
      }
    }
    if(flag) {
      clearInterval(obj.timer);
      if(fn) {
        fn();
      }
    }
  },30);
};
//通用获取属性函数
function getStyle(obj,attr) {
  if(obj.currentStyle) {
    return obj.currentStyle[attr];
  } else {
    return getComputedStyle(obj,false)[attr];
  }
}
