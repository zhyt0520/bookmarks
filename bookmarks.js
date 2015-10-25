// 全局变量
// 当前左侧被选中的目录的数据库id
var selected_dir_db_id=null;
// 若左侧内容下有目录，把第一个目录的数据库id赋给selected_dir_db_id，作为默认选中目录
if($('#content_left').find('p').first().attr('id')){
	// 元素id为db+number，用substr(2)截取字符串从第三个字符往后的部分
	selected_dir_db_id=$('#content_left').find('p').first().attr('id').substr(2);
	$('#content_left').find('p').first().css({'border':'1px solid rgb(84,155,247)','background':'rgb(218,233,254)'});
}
// 当前左侧被选中的目录的数据库path
var	selected_db_depth=-1;
// 当前右侧被选中的条目的数据库id
var selected_item_db_id=null;
// 设置变量控制右键菜单功能的启用与禁用
var is_enable_contextmenu={
	modify:false,
	remove:false,
	rename:false,
	add_url:false,
	add_folder:true,
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

// 页面内鼠标按下事件
$(document).mousedown(function(){

	// 位置：无位置
	// 屏蔽系统右键菜单
	document.oncontextmenu=function(){return false}

	// 位置：整个页面
	// 页面内左击，关闭右键菜单
	if(event.which==1 && $(event.target).closest('#contextmenu').length==0){
		$('#contextmenu').css('display','none');
	}
	// 页面内左击，删除新建条目
	if(event.which==1 && $('#new_item') && $('#input_url').val()=='' && $(event.target).closest('#contextmenu').length==0 && $(event.target).closest('#new_item').length==0){
		$('#new_item').remove();
	}
	// 页面内左击，完成新建条目
	if(event.which==1 && $(event.target).closest('#contextmenu').length==0 && $(event.target).closest('#new_item').length==0 && $('#input_name').val() && $('#input_url').val()){
		complete_new_item();
	}
	// 页面内左击，删除新建文件夹form
	if(event.which==1 && $('#new_folder') && $('#input_folder').val()=='' && $(event.target).closest('#contextmenu').length==0 && $(event.target).closest('#new_folder').length==0){
		$('#new_folder').remove();
	}
	// 页面内左击，完成新建文件夹
	if(event.which==1 && $(event.target).closest('#contextmenu').length==0 && $(event.target).closest('#new_folder').length==0 && $('#input_folder').val()){
		complete_new_folder();
	}
	// 空白处单击，取消 selected_item_db_id 的选择
	if((event.which==1 || event.which==3) && $(event.target).closest('#contextmenu').length==0 && $(event.target).closest('.item').length==0){
		$('#db'+selected_item_db_id).css({'border':'1px solid transparent','background':'rgb(255,255,255)'});
		$('#db'+selected_item_db_id).children('.url').css('visibility','hidden');
		selected_item_db_id=null;
	}

	// 位置：左侧
	// 左侧,鼠标右击，出现自定义右键菜单
	if(event.which==3 && $(event.target).closest('#left').length>0){
		// 若鼠标右击对象为<p class='dir'>，则把对象的 id 数字赋给 selected_dir_db_id
		if($(event.target).attr('class')=='dir'){
			$('.dir').css({'border':'1px solid transparent','background':'rgb(255,255,255)'});
			$(event.target).css({'border':'1px solid rgb(84,155,247)','background':'rgb(218,233,254)'});
			selected_dir_db_id=$(event.target).attr('id').substr(2);
		// 否则是在左侧空白处右击，当前选中id应为0
		}else{
			selected_dir_db_id=0;
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
		// 更新被选中条目id
		selected_item_db_id=null;
	}

	// 位置：右侧
	// 右侧,鼠标右击,出现自定义右键菜单
	if(event.which==3 && $(event.target).closest('#right').length>0){
	}

	// 位置：左侧或者右侧
	// 鼠标右击，显示自定义右键菜单
	if(event.which==3 && ($(event.target).closest('#left').length>0 || $(event.target).closest('#right').length>0)){
		var x=event.clientX;
		var y=event.clientY;
		// 循环 is_enable_contextmenu 的属性，控制右键菜单 css
		for(property in is_enable_contextmenu){
			is_enable_contextmenu[property] ? $('#'+property).css('color','rgb(0,0,0)') : $('#'+property).css('color','rgb(183,183,183)');
		}
		// !!! 需要调整菜单的显示位置
		$('#contextmenu').css({'left':x+'px','top':y+'px','display':'block'});
	}
});

// 左侧鼠标左击目录，更新右侧的内容显示，改变css，更新全局变量
$('#content_left').on('click','p',function(){
	var db_id=$(event.target).attr('id').substr(2);
	var db_depth=$(event.target).parent().attr('class').substr(4);
	$('#content_right').load('ajax.php',{'mark':'left_dir_click','id':db_id},function(response,status,xhr){
		// 如果失败，打印错误信息
		if(status=='error'){
			console.log('xhr.status:'+xhr.status+', xhr.statusText:'+xhr.statusText)
		}
	});
	if(db_id!=selected_dir_db_id){
		$('#content_left p').css({'border':'1px solid transparent','background':'rgb(255,255,255)'});
		$(event.target).css({'border':'1px solid rgb(84,155,247)','background':'rgb(218,233,254)'});
		selected_dir_db_id=db_id;
		selected_db_depth=db_depth;
	}
	// 更新被选中条目id
	selected_item_db_id=null;
});

// 左侧单击三角、双击目录，显示和隐藏子目录
// note 该函数至于 $(document).mousedown(function(){ 之前的话，会导致其内部的单击事件被屏蔽，放在其后面，则双击事件会分别执行一次单击和双击

// ！！！ 代码需要优化，有空再改
function toggle_children(){
	var child_div=$(event.target).parent().children('div');
	// 切换子目录是否显示
	if($(event.target)[0].tagName=='P'){
		for(var i=0;i<child_div.length;i++){
			if(child_div[i].style.display=='block'){
				child_div[i].style.display='none';
			}else{
				child_div[i].style.display='block';
			}
		}
		if($(event.target).prev().attr('class')=='tringle_down'){
			$(event.target).prev().attr('class','tringle_right');
		}
		else if($(event.target).prev().attr('class')=='tringle_right'){
			$(event.target).prev().attr('class','tringle_down');
		}
	}
	if($(event.target)[0].tagName=='I'){
		for(var i=0;i<child_div.length;i++){
			if(child_div[i].style.display=='block'){
				child_div[i].style.display='none';
			}else{
				child_div[i].style.display='block';
			}
		}
		if($(event.target).attr('class')=='tringle_down'){
			$(event.target).attr('class','tringle_right');
		}else if($(event.target).attr('class')=='tringle_right'){
			$(event.target).attr('class','tringle_down');
		}
	}
}

// 右侧条目的鼠标事件
// note 用 on 绑定多个事件的写法，如果绑定多个选择器，全部跟 .item 写到一组引号内
$('#content_right').on({
	// 右侧用鼠标hover控制url显示状态
	mouseenter:function(){
		$(this).children('.url').css('visibility','visible');
	},
	mouseleave:function(){
		if($(this).attr('id').substr(2)!=selected_item_db_id){
			$(this).children('.url').css('visibility','hidden');
		}
	},
	// 右侧鼠标左击或右击url条目，改变css，更新selected_item_db_id
	mousedown:function(){
		// enable 右键菜单的删除功能
		is_enable_contextmenu.remove=true;
		if(is_enable_contextmenu.remove){
			$('#remove').css('color','rgb(0,0,0)');
		}else{
			$('#remove').css('color','rgb(183,183,183)');
		}
		// 去除所有条目的边框和背景效果
		$('.item').css({'border':'1px solid transparent','background':'rgb(255,255,255)'});
		$('.url').css('visibility','hidden');
		// 给选中条目添加边框和背景效果
		$(this).css({'border':'1px solid rgb(84,155,247)','background':'rgb(218,233,254)'});
		$(this).children('.url').css('visibility','visible');
		selected_item_db_id=$(this).attr('id').substr(2);
	},
	// 双击右侧条目，在新标签页打开相应url
	dblclick:function(){
		var url=$(this).children('.url').text();
		var a=$('<a href="http://'+url+'" target="_blank"></a>')[0];
		var e=document.createEvent('MouseEvents');
		e.initEvent('click',true,true);
		a.dispatchEvent(e);
	},
},'.item');

// 完成右侧新建条目的函数
function complete_new_item(){
	var name=$('#input_name').val();
	var url=$('#input_url').val();
	// 用ajax传递数据id,depth,name,url给ajax.php，在右侧 #content_right 内加载返回内容
	$('#content_right').load('ajax.php',{'mark':'new_item','id':selected_dir_db_id,'depth':selected_db_depth,'name':name,'url':url},function(response,status,xhr){
		// 如果失败，打印错误信息
		if(status=='error'){
			console.log('xhr.status: '+xhr.status+', xhr.statusText: '+xhr.statusText)
		}
	});
}

// 完成左侧新建目录的函数
function complete_new_folder(){
	var folder=$('#input_folder').val();
	// 用ajax传递数据id,depth,folder给ajax.php
	$.post('ajax.php',{'mark':'new_folder','id':selected_dir_db_id,'depth':selected_db_depth,'folder':folder},function(response,status,xhr){
		// 如果失败，打印错误信息
		if(status=='error'){
			console.log('xhr.status: '+xhr.status+', xhr.statusText: '+xhr.statusText)
		}
		// note 下面这部分代码必须放到 post 的回调函数内部，否则会先于 post 执行，造成 response 无法赋值给 new_folder_html
		// 数据库返回最近一次插入数据的id
		var last_insert_id=response;
		// 显示当前选中目录的左侧的三角
		if($('#db'+selected_dir_db_id).prev().attr('class')=='folder_only'){
			$('#db'+selected_dir_db_id).prev().attr('class','tringle_down');
		}
		console.log(last_insert_id)
		var new_folder_html='<div class="tree'+(selected_db_depth+1)+'"><i class="folder_only" onclick="toggle_children()"></i><p class="dir" id="db'+last_insert_id+'" ondblclick=toggle_children()">'+folder+'</p></div>';
		console.log(new_folder_html)
		if(selected_dir_db_id>0){
			$('#db'+selected_dir_db_id).parent().children().last().after(new_folder_html);
			$('#db'+selected_dir_db_id).parent().children().last().css('display','block');
		}else{
			// selected_dir_db=0,在最末添加新建文件夹
			$('#content_left').children().last().after(new_folder_html);
			$('#content_left').children().last().css('display','block');
		}
		$('#new_folder').remove();
	});
}

// 用回车键完成新建条目
$('#content_right').on('keydown','#input_url',function(){
	if(event.keyCode==13 && $('#input_name').val() && $('#input_url').val()){
		complete_new_item();
	}
});

// 用回车键完成新建文件夹
$('#content_left').on('keydown','#input_folder',function(){
	if(event.keyCode==13 && $('#input_folder').val()){
		// form 下单个 input 时回车键会执行 form 提交，用 event.preventDefault() 方法阻止元素发生默认的行为
		event.preventDefault();
		complete_new_folder();
	}
});


// ===========================================================================
// 下面是右键菜单的代码

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
			new_name.focus();
		}else{
			$('#input_name').focus();
		}
		$('#contextmenu').css('display','none');
	}else{
		$('#contextmenu').css('display','none');
	}
});

// 右键菜单条目，添加文件夹
// 获取点击事件目标的数据库id和depth，新建新文件夹
$('#add_folder').click(function(){
	// is_enable_contextmenu.add_folder为真，才有执行的语句
	if(is_enable_contextmenu.add_folder){
		// 若新建文件夹form不存在，则新建
		if($('#new_folder').length==0){
			// 左侧内容空白处右击
			if(selected_db_depth==-1){
				$('#content_left').append('<form class="tree'+(selected_db_depth+1)+'" id="new_folder"><input id="input_folder" placeholder="新建文件夹"/></form>');
				$('#input_folder').focus();
			// 左侧文件夹上右击
			}else{
				$('#db'+selected_dir_db_id).parent().children().last().after('<form class="tree'+(selected_db_depth+1)+'" id="new_folder"><input id="input_folder" placeholder="新建文件夹"/></form>')
				$('#new_folder').css('display','block');
				$('#input_folder').focus();
			}
		}else{
			$('#input_folder').focus();
		}
		$('#contextmenu').css('display','none');
	}else{
		$('#contextmenu').css('display','none');
	}
});

// 右键菜单条目，删除
$('#remove').click(function(){
	if(is_enable_contextmenu.remove){
		// 用ajax传递数据 id 给 ajax.php
		$.post('ajax.php',{'mark':'remove','id':selected_item_db_id,},function(response,status,xhr){
			// 如果失败，打印错误信息
			if(status=='error'){
				console.log('xhr.status: '+xhr.status+', xhr.statusText: '+xhr.statusText)
			}
		})
		$('#db'+selected_item_db_id).remove();
		$('#contextmenu').css('display','none');
	}else{
		$('#contextmenu').css('display','none');
	}
});