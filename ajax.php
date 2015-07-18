<?php

require 'config.php';
require 'functions.php';


// 根据左侧dir的数据库id查询内容，并返回右侧条目
if(isset($_GET['id'])){
	// 获取XMLHttpRequest传输的数据q
	$id=$_GET['id'];
	$conn=connect_db();
	$query='select * from bookmarks where parentid = '.$id.' and isdir = 0';
	$result=$conn->prepare($query);
	$result->execute();
	$res=$result->fetchall(PDO::FETCH_ASSOC);
	$response=echo_db_res($res);
	echo $response;
	$_GET['id']='';
}

// js新建右侧条目，传递参数：id为当前左侧选中dir的数据库id；name和url为新建条目的名称和网址；返回右侧conten_right的内容
if(isset($_GET['id'],$_GET['name'],$_GET['url'])){
	$id=$_GET['id'];
	$name=$_GET['name'];
	$url=$_GET['url'];
	$conn=connect_db();
	// ！！！存储数据需要知道当前选中目录的path,是不是用左侧dir单击函数来传递，那么需要ajax返回两个结果分别处理，怎么办
	$query='insert into bookmarks ()';
}

?>