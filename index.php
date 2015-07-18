<!DOCTYPE html>
<html>
<head>
	<title>zhyt's bookmark.</title>
	<link type="text/css" rel="stylesheet" href="style.css">
	<?php require 'config.php' ?>
	<?php require 'functions.php' ?>
</head>
<body>
	<div id='top'>
		<div class='content'>
			<div>zhyt's bookmark.</div>
		</div>
	</div>
	<div id='left'>
		<div class='content' id='content_left'><?php $conn=connect_db();if(isset($conn)){$res=dis_dir($conn);} ?></div>
	</div>
	<div id='line'></div>
	<div id='right' onmousedown='context_menu_right(this)'>
		<div class='content' id='content_right'><?php if(isset($conn)){dis_url($conn,$res);} ?></div>
	</div>
	<?php require 'context_menu.php' ?>
	<script type="text/javascript" src="javascript.js"></script>
</body>
</html>