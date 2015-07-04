// 竖分隔线拖动
window.onload = function(){
	document.getElementById('line').onmousedown = function(){
		var old_width = document.getElementById('left').offsetWidth;
		var old_x = event.clientX;
		document.onmousemove = function(){
			var new_x = old_width + event.clientX - old_x;
			var min_x = 150;
			var max_x = document.getElementById('top').offsetWidth * 0.7;
			new_x < min_x && (new_x = min_x);
			new_x > max_x && (new_x = max_x);
			document.getElementById('left').style.width = new_x + 'px';
		}
		return false
	}
	document.onmouseup = function(){
		document.onmousemove = null;
	}
}

// 左侧目录点击后显示和隐藏子元素
function toggle_children(this_ele){
	var child_div = this_ele.parentNode.getElementsByTagName('div');
	for(var i=0;i<child_div.length;i++){
		if(child_div[i].style.display=='block'){
			child_div[i].style.display='none';
		}else{
			child_div[i].style.display='block';
		}
		if(this_ele.className=='iconfont icon-xiangxia'){
			this_ele.className='iconfont icon-xiangyou';
		}else{
			this_ele.className='iconfont icon-xiangxia';
		}
	}
}

// 右键菜单
document.oncontextmenu = function(){
	if(event.button==2){
		var x=event.clientX;
		var y=event.clientY;
		document.getElementById('contextmenu').style.left=x+'px';
		document.getElementById('contextmenu').style.top=y+'px';
		document.getElementById('contextmenu').style.visibility='visible';
		document.getElementById('contextmenu').style.position='fixed';
	}
	return false
}
document.onclick = function(){
	document.getElementById('contextmenu').style.visibility='hidden';
}

// 动态更新右侧内容
function dis_url_ajax(id){
	var xmlhttp;
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			var clean = document.getElementById('right_content');
			clean.parentNode.removeChild(clean);
			var right_content = document.createElement('div');
			right_content.id='right_content';
			right_content.className='content';
			// right_content.setAttribute('id','right_content');
			// 另一种设置id方法
			document.getElementById('right').appendChild(right_content);
			// 把服务器返回内容填充到右侧二级div内<div id='right_content' class='content'></div>
			right_content.innerHTML=xmlhttp.responseText;
			console.log(xmlhttp.responseText);
		}
	}
	xmlhttp.open('get','dis_url_ajax.php?q='+id,true);
	xmlhttp.send();
}