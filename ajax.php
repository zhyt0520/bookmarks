<?php

require 'config.php';
require 'functions.php';

// 左侧目录点击后更新右侧内容
// 获取当前被点击的左侧目录的数据库id，查询其下属网址条目，输出右侧html内容，并返回
if(isset($_GET['mark'],$_GET['id']) && $_GET['mark']=='left_dir_click'){
	// 获取XMLHttpRequest传输的数据id
	$id=$_GET['id'];
	$conn=connect_db();
	$query='select * from '.DB_TABLE.' where parentid = '.$id.' and isdir = 0';
	$result=$conn->prepare($query);
	$result->execute();
	$res=$result->fetchall(PDO::FETCH_ASSOC);
	// 调用函数dis_db_res根据数据库查询结果输出右侧html内容
	$response=dis_db_res($res);
	echo $response;
}

// 新建右侧条目
// 传递参数：id为当前左侧选中dir的数据库id；name和url为新建条目的名称和网址；返回右侧conten_right的内容
if(isset($_REQUEST['mark'],$_REQUEST['id'],$_REQUEST['depth'],$_REQUEST['name'],$_REQUEST['url']) && $_REQUEST['mark']=='new_item'){
	$id=$_REQUEST['id'];
	$depth=$_REQUEST['depth'];
	$name=$_REQUEST['name'];
	$url=$_REQUEST['url'];
	$conn=connect_db();
	$query='insert into '.DB_TABLE.
		'(Id,Depth,ParentId,IsDir,Name,Url) '.
		'values '.
		'(null,'.($depth+1).','.$id.',0,"'.$name.'","'.$url.'");';
	$result=$conn->prepare($query);
	$result->execute();
	$query='select * from '.DB_TABLE.' where parentid = '.$id.' and isdir = 0';
	$result=$conn->prepare($query);
	$result->execute();
	$res=$result->fetchall(PDO::FETCH_ASSOC);
	// 调用函数dis_db_res根据数据库查询结果输出右侧html内容
	$response=dis_db_res($res);
	echo $response;
}

?>