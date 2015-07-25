// 全局变量
// 当前左侧被选中的目录的数据库id
var selected_db_id=0;
// 若左侧内容下有目录，把第一个目录的数据库id赋给selected_db_id，作为默认选中目录
if($('#content_left').find('p').first().attr('id')){
	// 元素id为db+number，用substr(2)截取字符串从第三个字符往后的部分
	selected_db_id=$('#content_left').find('p').first().attr('id').substr(2);
	$('#content_left').find('p').first().css({'border':'1px solid rgb(84,155,247)','background':'rgb(218,233,254)'});
}
// 当前左侧被选中的目录的数据库path
var	selected_db_depth=-1;
// 设置变量控制右键菜单功能的启用与禁用
var is_enable_contextmenu={
	modify:false,
	remove:false,
	rename:false,
	add_url:false,
	add_folder:true
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
function toggle_children(){
	var child_div=$(event.target).parent().children('div');
	for(var i=0;i<child_div.length;i++){
		if(child_div[i].style.display=='block'){
			child_div[i].style.display='none';
		}else{
			child_div[i].style.display='block';
		}
	}
	if($(event.target).attr('class')=='iconfont icon-xiangxia'){
		$(event.target).attr('class','iconfont icon-xiangyou');
	}else{
		$(event.target).attr('class','iconfont icon-xiangxia');
	}
}


// 页面内鼠标按下事件
$(document).mousedown(function(){
	// 屏蔽系统右键菜单
	document.oncontextmenu=function(){return false}
	// 右侧鼠标右击,出现自定义右键菜单
	// 若鼠标右键按下，且点击事件的父元素有#right（即在右侧div内部点击的鼠标右键），获取鼠标位置并赋给右键菜单div
	if(event.which==3 && $(event.target).closest('#right').length>0){
		var x=event.clientX;
		var y=event.clientY;
		$('#contextmenu').css({'left':x+'px','top':y+'px','display':'block'});
		// 控制右键菜单添加网页条目的功能
		// 若左侧有当前选中目录selected_db_id>0，enable添加网页功能，右键菜单对应条目黑色，否则对应条目灰色
		if(selected_db_id>0){
			is_enable_contextmenu.add_url=true;
			$('#add_url').css('color','rgb(0,0,0)');
		}else{
			is_enable_contextmenu.add_url=false;
			$('#add_url').css('color','rgb(183,183,183)');
		}
	}
	// 页面内左击，关闭右键菜单
	// 若鼠标左键按下，且点击事件的父元素无右键菜单，关闭菜单
	if(event.which==1 && $(event.target).closest('#contextmenu').length==0){
		$('#contextmenu').css('display','none');
	}
	// 页面内左击，删除新建条目
	// 若鼠标左键按下，新建条目存在，url表单内容为空，点击事件的父元素无右键菜单、无新建条目，删除新建条目
	if(event.which==1 && $('#new_item') && $('#input_url').val()=='' && $(event.target).closest('#contextmenu').length==0 && $(event.target).closest('#new_item').length==0){
		$('#new_item').remove();
	}
	// 页面内左击，完成新建条目
	// 若鼠标左键按下，点击事件父元素无右键菜单、无新建条目，name表单数据不为空,url表单数据不为空，则数据传给ajax.php，关闭新建条目，显示新建结果
	if(event.which==1 && $(event.target).closest('#contextmenu').length==0 && $(event.target).closest('#new_item').length==0 && $('#input_name').val() && $('#input_url').val()){
		var name=$('#input_name').val();
		var url=$('#input_url').val();
		// 用ajax传递数据id,depth,name,url给ajax.php，在右侧#content_right内加载返回内容
		$('#content_right').load('ajax.php',{'mark':'new_item','id':selected_db_id,'depth':selected_db_depth,'name':name,'url':url},function(response,status,xhr){
			// 如果失败，打印错误信息
			if(status=='error'){
				console.log('xhr.status: '+xhr.status+', xhr.statusText: '+xhr.statusText)
			}
		})
	}
	// 左侧鼠标右击，出现自定义右键菜单
	if(event.which==3 && $(event.target).closest('#left').length>0){
		var x=event.clientX;
		var y=event.clientY;
		$('#contextmenu').css({'left':x+'px','top':y+'px','display':'block'});
		// 若鼠标右击对象为<p class='dir'>，则把对象的id数字赋给selected_db_id
		if($(event.target).attr('class')=='dir'){
			selected_db_id=$(event.target).attr('id').substr(2);
		}
		// 控制右键菜单添加网页条目的功能
		// 若左侧有当前选中目录selected_db_id>0，enable添加网页功能，右键菜单对应条目黑色，否则对应条目灰色
		if(selected_db_id>0){
			is_enable_contextmenu.add_url=true;
			$('#add_url').css('color','rgb(0,0,0)');
		}else{
			is_enable_contextmenu.add_url=false;
			$('#add_url').css('color','rgb(183,183,183)');
		}
		// 获得点击对象的目录深度，控制右键菜单添加文件夹的功能，和条目文字颜色显示
		var tree=$(event.target).parent().attr('class');
		switch(tree){
			case 'tree0':
			selected_db_depth=0;
			is_enable_contextmenu.add_folder=true;
			break;
			case 'tree1':
			selected_db_depth=1;
			is_enable_contextmenu.add_folder=true;
			break;
			case 'tree2':
			selected_db_depth=2;
			is_enable_contextmenu.add_folder=false;
			break;
			default:
			selected_db_depth=-1;
			is_enable_contextmenu.add_folder=true;
		}
		if(is_enable_contextmenu.add_folder){
			$('#add_folder').css('color','rgb(0,0,0)');
		}else{
			$('#add_folder').css('color','rgb(183,183,183)');
		}
	}
	// 页面内左击，删除新建文件夹form
	// 若鼠标左键按下，新建文件夹form存在，input_folder表单内容为空，点击事件的父元素无右键菜单、无新建文件夹form，删除新建文件夹form
	if(event.which==1 && $('#new_folder') && $('#input_folder').val()=='' && $(event.target).closest('#contextmenu').length==0 && $(event.target).closest('#new_folder').length==0){
		$('#new_folder').remove();
	}
	// 页面内左击，完成新建文件夹
	// 若鼠标左键按下，点击事件父元素无右键菜单、无新建文件夹form，folder表单数据不为空，则数据传给ajax.php，关闭新建文件夹form，显示新建结果
	if(event.which==1 && $(event.target).closest('#contextmenu').length==0 && $(event.target).closest('#new_folder').length==0 && $('#input_folder').val()){
		var folder=$('#input_folder').val();
		var last_insert_id;
		// 用ajax传递数据id,depth,folder给ajax.php
		$.post('ajax.php',{'mark':'new_folder','id':selected_db_id,'depth':selected_db_depth,'folder':folder},function(response,status,xhr){
			// 如果失败，打印错误信息
			if(status=='error'){
				console.log('xhr.status: '+xhr.status+', xhr.statusText: '+xhr.statusText)
			}
			// 数据库返回最近一次插入数据的id
			last_insert_id=response;
		})
		var new_folder_html='<div class="tree'+(selected_db_depth+1)+'"><i class="iconfont icon-xiangyou" onclick="toggle_children()" style="visibility:hidden"></i><p class="dir" id="db'+last_insert_id+'" onclick="left_dir_click('+last_insert_id+','+(selected_db_depth+1)+')">'+folder+'</p></div>';
		$('#db'+selected_db_id).parent().children().last().after(new_folder_html);
		$('#db'+selected_db_id).parent().children().last().css('display','block');
		$('#new_folder').remove();

	}
})


// 左侧目录单击事件函数
// 参数，被点击目录的数据库id；
function left_dir_click(db_id,db_depth){
	// ajax更新右侧显示内容
	var xmlhttp;
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			// 把服务器返回内容填充到右侧二级div内<div id='content_right' class='content'></div>
			document.getElementById('content_right').innerHTML=xmlhttp.responseText;
		}
	}
	xmlhttp.open('get','ajax.php?mark=left_dir_click&id='+db_id,true);
	xmlhttp.send();
	// 更改当前被点击目录的背景
	if(selected_db_id!=db_id){
		$(event.target).css({'border':'1px solid rgb(84,155,247)','background':'rgb(218,233,254)'});
	}
	// 更改前一次被点击目录的背景
	if(selected_db_id && selected_db_id!=db_id){
		$('#db'+selected_db_id).css({'border':'1px solid transparent','background':'rgb(255,255,255)'});
	}
	// 把当前点击的左侧dir的数据库id记录入selected_db_id
	selected_db_id=db_id;
	// 把当前点击的左侧dir的数据库depth记录入selected_db_depth
	selected_db_depth=db_depth;
}


// 右侧用鼠标hover控制url显示状态
function hover_dis(){
	this.childNodes[1].style.visibility='visible';
}
function hover_in_dis(){
	this.childNodes[1].style.visibility='hidden';
}

// 右键菜单条目，添加网页
// 若左侧有当前选中目录，新建条目
$('#add_url').click(function(){
	// is_enable_contextmenu.add_url为真，才有执行的语句
	if(is_enable_contextmenu.add_url){
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
		$('#contextmenu').css('display','none');
	}
})


// 右键菜单条目，添加文件夹
// 获取点击事件目标的数据库id和depth，新建新文件夹
$('#add_folder').click(function(){
	// is_enable_contextmenu.add_folder为真，才有执行的语句
	if(is_enable_contextmenu.add_folder){
		// 若新建文件夹form不存在，则新建
		if($('#new_folder').length==0){
			// 左侧内容空白处右击
			if(selected_db_depth==-1){
				$('#content_left').append('<form class="tree'+(selected_db_depth+1)+'" id="new_folder"><input id="input_folder" placeholder="新建文件夹" /></form>')
			// 左侧文件夹上右击
			}else{
				$('#db'+selected_db_id).parent().children().last().after('<form class="tree'+(selected_db_depth+1)+'" id="new_folder"><input id="input_folder" placeholder="新建文件夹" /></form>')
				$('#new_folder').css('display','block');
			}
		}
		// 关闭菜单
		$('#contextmenu').css('display','none');
	}
})