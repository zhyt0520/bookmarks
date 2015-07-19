<!DOCTYPE html>
<html>
<head>
	<title>zhyt's bookmark.</title>
	<link type="text/css" rel="stylesheet" href="style.css">
	<?php require 'config.php' ?>
	<?php require 'functions.php' ?>
	<?php $conn=connect_db(); ?>
</head>
<body>
	<div id='page'>
		<div id='top'>
			<div class='content'>
				<div>zhyt's bookmark.</div>
				<div>js函数貌似不需要用参数来传递this，记得试验</div>
			</div>
		</div>
		<div id='left'>
			<div class='content' id='content_left'><?php if(isset($conn)){$res=dis_dir($conn);} ?></div>
		</div>
		<div id='line'></div>
		<div id='right'>
			<div class='content' id='content_right'><?php if(isset($conn)){dis_url($conn,$res);} ?></div>
		</div>
	</div>
	<?php require 'contextmenu.php' ?>
	<script type="text/javascript" src="javascript.js"></script>
</body>
</html>