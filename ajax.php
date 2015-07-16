<?php

require 'config.php';
require 'functions.php';

// 根据左侧dir的数据库id查询内容，并返回右侧条目
if($_GET['id']){
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


?>