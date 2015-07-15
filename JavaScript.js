// 把对象传入函数，对其属性做更改，是通过引用/指针的方式
// 定义对象mydata，定义属性selected_db_id，记录当前显示在右侧的dir的数据库id
var mydata={
	selected_db_id:null,

}

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
function context_menu_right(this_ele){
	this_ele.oncontextmenu=function(){
		if(event.button==2){
			var x=event.clientX;
			var y=event.clientY;
			document.getElementById('contextmenu_right').style.left=x+'px';
			document.getElementById('contextmenu_right').style.top=y+'px';
			document.getElementById('contextmenu_right').style.display='block';
		}
		return false
	}
}

// 页面内左键单击事件
document.onclick = function(){
	// 关闭右键菜单
	document.getElementById('contextmenu_right').style.display='none';
	// 关闭右侧新建网页条目
	
}

// 左侧目录单击事件函数
// 参数1，this；参数2，被点击目录的数据库id；参数3，自定义数据对象mydata；
function dir_click_left(this_ele,db_id,mydata){
	// ajax更新右侧显示内容
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
	xmlhttp.open('get','dis_url_ajax.php?q='+db_id,true);
	xmlhttp.send();
	// 更改当前被点击目录的背景
	if(mydata.selected_db_id!=db_id){
		this_ele.style.border='1px solid rgb(84,155,247)';
		this_ele.style.background='rgb(218,233,254)';
	}
	// 更改前一次被点击目录的背景
	if(mydata.selected_db_id){
		previous=document.getElementById('db'+mydata.selected_db_id);
		previous.style.border='1px solid transparent';
		previous.style.background='rgb(255,255,255)';
	}
	mydata.selected_db_id=db_id;
}

// 右侧用鼠标hover控制url显示状态
function hover_dis(this_ele){
	this_ele.childNodes[1].style.visibility='visible';
}
function hover_in_dis(this_ele){
	this_ele.childNodes[1].style.visibility='hidden';
}

// 新建url
// 还没完成！！！
function add_url(this_ele,mydata){
	var new_name=document.createElement('input');
	new_name.style.width='100px';
	var new_url=document.createElement('input');
	new_url.style.width='200px';
	new_url.style.marginLeft='10.5px';
	document.getElementById('content_right').appendChild(new_name);
	document.getElementById('content_right').appendChild(new_url);
}

// 新建folder
function add_folder(this_ele){

}