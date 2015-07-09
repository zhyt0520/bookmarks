// 竖分隔线拖动
window.onload = function(){
	document.getElementById('line').onmousedown = function(){
		var old_width = document.getElementById('left').offsetWidth;
		var old_x = event.clientX;
		document.onmousemove = function(){
			var new_x = old_width + event.clientX - old_x;
			var min_x = 175;
			var max_x = document.getElementById('top').offsetWidth - 300;
			// var max_x = document.getElementById('top').offsetWidth * 0.7;
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

// 左侧目录点击后显示和隐藏子元目录
function toggle_children(this_ele){
	var child_div=this_ele.parentNode.childNodes;
	for(var i=0;i<child_div.length;i++){
		// 需要分辨是儿子还是孙子
		if(child_div[i].nodeName=='DIV'){
			if(child_div[i].style.display=='block'){
				child_div[i].style.display='none';
			}else{
				child_div[i].style.display='block';
			}
		}
	}
	if(this_ele.className=='iconfont icon-xiangxia'){
		this_ele.className='iconfont icon-xiangyou';
	}else{
		this_ele.className='iconfont icon-xiangxia';
	}
}

// 右侧右键菜单
// document.oncontextmenu = function(){
// 	if(event.button==2){
// 		var x=event.clientX;
// 		var y=event.clientY;
// 		document.getElementById('contextmenu').style.left=x+'px';
// 		document.getElementById('contextmenu').style.top=y+'px';
// 		document.getElementById('contextmenu').style.visibility='visible';
// 		document.getElementById('contextmenu').style.position='fixed';
// 		document.getElementById('contextmenu').style.display='block';
// 	}
// 	return false
// }
// document.onclick = function(){
// 	document.getElementById('contextmenu').style.visibility='hidden';
// }
function context_menu_right(this_ele){
	this_ele.oncontextmenu=function(){
		if(event.button==2){
			var x=event.clientX;
			var y=event.clientY;
			document.getElementById('contextmenu_right').style.left=x+'px';
			document.getElementById('contextmenu_right').style.top=y+'px';
			document.getElementById('contextmenu_right').style.visibility='visible';
			document.getElementById('contextmenu_right').style.position='fixed';
			document.getElementById('contextmenu_right').style.display='block';
		}
		return false
	}
	document.onclick = function(){
		document.getElementById('contextmenu_right').style.visibility='hidden';
	}
}

// 动态更新右侧内容
function dis_url_ajax(id){
	var xmlhttp;
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			var clean = document.getElementById('content_right');
			clean.parentNode.removeChild(clean);
			var content_right = document.createElement('div');
			content_right.id='content_right';
			content_right.className='content';
			// content_right.setAttribute('id','content_right');
			// 另一种设置id方法
			document.getElementById('right').appendChild(content_right);
			// 把服务器返回内容填充到右侧二级div内<div id='content_right' class='content'></div>
			content_right.innerHTML=xmlhttp.responseText;
		}
	}
	xmlhttp.open('get','dis_url_ajax.php?q='+id,true);
	xmlhttp.send();
}

// 新建url
function add_url(this_ele){

}

// 新建folder
function add_folder(this_ele){

}