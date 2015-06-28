function $(id){
	return document.getElementById(id)
}
window.onload = function(){
	$('line').onmousedown = function(){
		var old_width = $('left').offsetWidth;
		var old_x = event.clientX;
		document.onmousemove = function(){
			var new_x = old_width + event.clientX - old_x;
			var min_x = 150;
			var max_x = $('top').offsetWidth * 0.7;
			new_x < min_x && (new_x = min_x);
			new_x > max_x && (new_x = max_x);
			$('left').style.width = new_x + 'px';
		}
		return false
	}
	document.onmouseup = function(){
		document.onmousemove = null;
	}
}