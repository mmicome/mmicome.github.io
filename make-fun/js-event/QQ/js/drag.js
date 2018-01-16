//class 获取dom对象 兼容ie10以下
//性能较低

function getByClass(clsName,parent) {
	var oparent=parent?document.getElementById(parent):document,
		eles=[],
		elements=oparent.getElementsByTagName('*');
	for(var i=0,l=elements.length; i<l; i++) {
		if(elements[i].className == clsName) {
			eles.push(elements[i]);
		}
	}
	return eles;
}

window.onload = drag;

function drag() {
	var otitle=getByClass('login_logo_webqq','loginPanel')[0];
  // 拖曳
	otitle.onmousedown=fnDown;
  // 关闭
  var oClose=document.getElementById('ui_boxyClose');
  oClose.onclick=function(){
      document.getElementById('loginPanel').style.display='none';
  }
  //切换状态
	var loginState=document.getElementById('loginState'),
			stateList=document.getElementById('loginStatePanel'),
			lis=stateList.getElementsByTagName('li'),
			stateTxt=document.getElementById('login2qq_state_txt'),
			loginStateShow=document.getElementById('loginStateShow');

	loginState.onclick=function(e){
		e = e || window.event;
		if(e.stopPropagation){
				 e.stopPropagation();
		}else{
				 e.cancelBubble=true;
		}
		stateList.style.display='block';
	}

	// 鼠标滑过、离开和点击状态列表时
	for(var i=0,l=lis.length;i<l;i++){
		 lis[i].onmouseover=function(){
			 this.style.background='#567';
		 }
		 lis[i].onmouseout=function(){
			 this.style.background='#FFF';
		 }
		 lis[i].onclick=function(e){
			 e = e || window.event;
			 if(e.stopPropagation){
				 e.stopPropagation();
			 }else{
				 e.cancelBubble=true;
			 }
			 var id=this.id;
			 stateList.style.display='none';
			 stateTxt.innerHTML=getByClass('stateSelect_text',id)[0].innerHTML;
			 loginStateShow.className='';
			 loginStateShow.className='login-state-show '+id;
		 }
	}
	document.onclick=function(){
		 stateList.style.display='none';
	}
}
function fnDown(event) {
	event = event || window.event;
	var oDrag = document.getElementById('loginPanel'),
  // 光标按下时光标和面板之间的距离
    	disX = event.clientX - oDrag.offsetLeft,
    	disY = event.clientY - oDrag.offsetTop;
  // 移动
	document.onmousemove = function(event) {
    event = event || window.event;
		fnMove(event,disX,disY);
	}
  // 释放鼠标
  document.onmouseup=function(){
    document.onmousemove=null;
    document.onmouseup=null;
  }
}

function fnMove(event,posX,posY) {
	var oDrag=document.getElementById('loginPanel'),
      l = event.clientX - posX,
	    t = event.clientY - posY,
	    winW = document.documentElement.clientWidth || document.body.clientWidth,
	   	winH = document.documentElement.clientHeight || document.body.clientHeight,
	    maxW = winW - oDrag.offsetWidth-10,
	    maxH = winH - oDrag.offsetHeight-10;
	if(l<0) {
		l=5;
	} else if(l>maxW) {
		l=maxW;
	}
	if(t<0) {
		t=10;
	} else if(t>maxH) {
		t=maxH;
	}
  oDrag.style.left=l+'px';
  oDrag.style.top=t+'px';
}
