// 全局变量
//当前左侧被选中的目录的数据库id
var selected_db_id;
//当前左侧被选中的目录的数据库path
var	selected_db_path;


// 竖分隔线拖动
document.getElementById('line').onmousedown = function(){
	var old_width = document.getElementById('left').offsetWidth;
	var old_x = event.clientX;
	document.onmousemove = function(){
		var new_x = old_width + event.clientX - old_x;
		var min_x = 120;
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


// 左侧目录点击后显示和隐藏子目录
function toggle_children(){
	var child_div=this.parentNode.childNodes;
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
	if(this.className=='iconfont icon-xiangxia'){
		this.className='iconfont icon-xiangyou';
	}else{
		this.className='iconfont icon-xiangxia';
	}
}


// 页面内鼠标按下事件
$(document).mousedown(function(){
	// 屏蔽系统右键菜单
	document.oncontextmenu=function(){return false}
	// 右侧鼠标右击,出现自定义右键菜单
	// 若鼠标右键按下，且点击事件的父元素有#right，获取鼠标位置并赋给右键菜单div
	if(event.which==3 && $(event.target).closest('#right').length>0){
		// console.log('右侧右击')
		var x=event.clientX;
		var y=event.clientY;
		$('#contextmenu_right').css({'left':x+'px','top':y+'px','display':'block'});
	}
	// 页面内左击，关闭自定义右键菜单
	// 若鼠标左键按下，且点击事件的父元素无右键菜单，关闭菜单
	if(event.which==1 && $(event.target).closest('#contextmenu_right').length==0){
		$('#contextmenu_right').css('display','none');
	}
	// 页面内左击，删除新建条目
	// 若鼠标左键按下，新建条目存在，url表单内容为空，点击事件的父元素无右键菜单、无新建条目，删除新建条目
	if(event.which==1 && $('#new_item') && $('#input_url').val()=='' && $(event.target).closest('#contextmenu_right').length==0 && $(event.target).closest('#new_item').length==0){
		console.log(event.target)
		$('#new_item').remove();
	}
	// 页面内左击，完成新建条目（数据传给ajax.php，关闭新建条目，显示新建结果）
	
})


// 页面内左键单击事件
// document.onclick = function(){
// 	// 关闭右键菜单
// 	document.getElementById('contextmenu_right').style.display='none';
// 	// 完成右侧新建条目
// 	if(document.getElementById('input_url') && document.getElementById('input_url').value){
// 		var input_name=document.getElementById('input_name').value;
// 		var input_url=document.getElementById('input_url').value;
// 		// 关闭右侧新建表单
// 		var clean=document.getElementById('new_item');
// 		clean.parentNode.removeChild(clean);
// 		var xmlhttp;
// 		xmlhttp=new XMLHttpRequest();
// 		xmlhttp.onreadystatechange=function(){
// 			if(xmlhttp.readyState==4 && xmlhttp.status==200){
// 				// 关闭新建表单元素
// 				var clean=document.getElementById('new_item');
// 				clean.parentNode.removeChild(clean);
// 				// 右侧内容元素'content_right'追加responseText的内容
// 				document.getElementById('content_right').innerHTML+=xmlhttp.responseText;
// 			}
// 		}
// 	xmlhttp.open('get','ajax.php?id='+selected_db_id+'name='+input_name+'&&url='+input_url,true);
// 	xmlhttp.send();
// 	}
// }


// 左侧目录单击事件函数
// 参数，被点击目录的数据库id；
function left_dir_click(db_id){
	// ajax更新右侧显示内容
	var xmlhttp;
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			// 把服务器返回内容填充到右侧二级div内<div id='content_right' class='content'></div>
			document.getElementById('content_right').innerHTML=xmlhttp.responseText;
		}
	}
	xmlhttp.open('get','ajax.php?id='+db_id,true);
	xmlhttp.send();
	// 更改当前被点击目录的背景
	if(selected_db_id!=db_id){
		this.style.border='1px solid rgb(84,155,247)';
		this.style.background='rgb(218,233,254)';
	}
	// 更改前一次被点击目录的背景
	if(selected_db_id){
		previous=document.getElementById('db'+selected_db_id);
		previous.style.border='1px solid transparent';
		previous.style.background='rgb(255,255,255)';
	}
	// 把当前点击的左侧dir数据库id记录入selected_db_id
	selected_db_id=db_id;
}


// 右侧用鼠标hover控制url显示状态
function hover_dis(){
	this.childNodes[1].style.visibility='visible';
}
function hover_in_dis(){
	this.childNodes[1].style.visibility='hidden';
}


// 右侧新建url
function right_add_url(){
	// 若新建条目不存在，则新建
	if($('#new_item').length==0){
		var new_form=document.createElement('form');
		new_form.setAttribute('id','new_item');
		var new_name=document.createElement('input');
		new_name.setAttribute('id','input_name');
		new_name.setAttribute('placeholder','名称');
		var new_url=document.createElement('input');
		new_url.setAttribute('id','input_url');
		new_url.setAttribute('placeholder','网址');
		new_form.appendChild(new_name);
		new_form.appendChild(new_url);
		document.getElementById('content_right').appendChild(new_form);
	}
	// 关闭菜单
	$('#contextmenu_right').css('display','none');
}


// 新建folder
function right_add_folder(){

}