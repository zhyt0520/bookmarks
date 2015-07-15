<?php

require 'config.php';
require 'functions.php';
// 获取XMLHttpRequest传输的数据q
$id=$_GET['q'];
$conn=connect_db();
$query='select * from bookmarks where parentid = '.$id.' and isdir = 0';
$result=$conn->prepare($query);
$result->execute();
$res=$result->fetchall(PDO::FETCH_ASSOC);
$response=echo_db_res($res);
echo $response;

?>