window.onload = function () {
	var hs = document.getElementsByTagName('input')[0];
	//var str = document.getElementsByTagName('input')[0].value;
	hs.onfocus = function() {
		if(this.value == this.defaultValue){
			this.value = '';
			this.style.color = '#000';
		}
	}
	hs.onblur = function() {
		if(this.value == ''){
			this.value = this.defaultValue;
			this.style.color = '#ccc';
		}
	}
}