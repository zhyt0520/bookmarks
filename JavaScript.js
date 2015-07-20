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

// 右侧右键菜单
document.getElementById('right').onmousedown=function(){
	this.oncontextmenu=function(){
		if(event.button==2){
			var x=event.clientX;
			var y=event.clientY;
			document.getElementById('contextmenu_right').style.left=x+'px';
			document.getElementById('contextmenu_right').style.top=y+'px';
			document.getElementById('contextmenu_right').style.display='block';
			//若新建条目存在，且两表单均空，右键点击时删除
			if($('#new_item') && $('input_name').val()=='' && $('input_url').val()==''){
				$('#new_item').remove();
			}
		}
		return false
	}
}

// 页面内左键单击事件
document.onclick = function(){
	// 关闭右键菜单
	document.getElementById('contextmenu_right').style.display='none';
	// 完成右侧新建条目
	if(document.getElementById('input_url') && document.getElementById('input_url').value){
		var input_name=document.getElementById('input_name').value;
		var input_url=document.getElementById('input_url').value;
		// 关闭右侧新建表单
		var clean=document.getElementById('new_item');
		clean.parentNode.removeChild(clean);
		var xmlhttp;
		xmlhttp=new XMLHttpRequest();
		xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState==4 && xmlhttp.status==200){
				// 关闭新建表单元素
				var clean=document.getElementById('new_item');
				clean.parentNode.removeChild(clean);
				// 右侧内容元素'content_right'追加responseText的内容
				document.getElementById('content_right').innerHTML+=xmlhttp.responseText;
			}
		}
	xmlhttp.open('get','ajax.php?id='+selected_db_id+'name='+input_name+'&&url='+input_url,true);
	xmlhttp.send();
	}
}

// 关闭右侧新建条目
// 若点击位置非新建条目，非右键菜单，且新建条目两表单均为空，则关闭
// 如果把该功能直接加入document.onclick，会导致新建条目显示不出来

// !!!

$('div').not('#new_item').not('#contextmenu_right').click(function(){
	if ($('#input_name').val()=='' && $('#input_url').val()==''){
		$('#new_item').remove();
	};
});


// 左侧目录单击事件函数
// 参数，被点击目录的数据库id；
function dir_click_left(db_id){
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
function add_url(){
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
}

// 新建folder
function add_folder(){

}