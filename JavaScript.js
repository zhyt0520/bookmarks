function $(id){
	return document.getElementById(id)
}
window.onload = function(){
	// 竖分隔线拖动
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
	// 右键菜单
	document.oncontextmenu = function(){
		// if(!event) event=window.event;
		if(event.button==2){
			var x=event.clientX;
			var y=event.clientY;
			$('contextmenu').style.left=x+'px';
			$('contextmenu').style.top=y+'px';
			$('contextmenu').style.visibility='visible';
			$('contextmenu').style.position='fixed';
		}
		return false
	}
	document.onclick = function(){
		$('contextmenu').style.visibility='hidden';
	}
}
// 左侧目录点击后显示和隐藏子元素
function toggle_children(self){
		var z = self.parentNode.getElementsByTagName('div')[0].className;
		// var zz = z.childNodes;
		console.log(z);
}