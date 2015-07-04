<?php

require 'config.php';
require 'functions.php';
// 获取XMLHttpRequest传输的数据q
$id=$_GET['q'];
$conn=connect_db();
$response=dis_url_ajax($conn,$id);
echo $response;

?>