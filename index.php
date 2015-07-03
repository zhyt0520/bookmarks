<!DOCTYPE html>
<html>
<head>
	<title>zhyt's bookmark.</title>
	<link type="text/css" rel="stylesheet" href="style.css">
	<script type="text/javascript" src="javascript.js"></script>
	<?php require 'config.php' ?>
	<?php require 'functions.php' ?>
</head>
<body>
	<div id='top'>
		<div class='content'>zhyt's bookmark.</div>
	</div>
	<div id='left'>
		<div class='content' id='left_content'>
			<?php $conn=connect_db(); $res=dis_dir($conn); ?>
		</div>
	</div>
	<div id='line'></div>
	<div id='right'>
		<div class='content' id='right_content'>
			<?php dis_url($conn,$res); ?>
		</div>
	</div>
	<?php require 'contextmenu.php' ?>
</body>
</html>