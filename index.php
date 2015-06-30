<!DOCTYPE html>
<html>
<head>
	<title>zhyt's bookmark.</title>
	<link type="text/css" rel="stylesheet" href="style.css">
	<script type="text/javascript" src="drag.js"></script>
	<script type="text/javascript" src="menu.js"></script>
	<?php require 'config.php' ?>
	<?php require 'functions.php' ?>
</head>
<body>
	<div id='top'>
		<div class='content'>zhyt's bookmark.</div>
	</div>
	<div id='left'>
		<div class='content'>
			<?php
			connect_db();
			dis_dir($conn);
			?>
		</div>
	</div>
	<div id='line'></div>
	<div id='right'>
		<div class='content'>
			<p>oqadfasdfasdfwef</p>
			<p>oqwadsfsdfgsdgfsdfgsdfgsdfgsdfgdsgsdgadsfsaef</p>
			<p>oqwef</p>
		</div>
	</div>
	<?php require 'contextmenu.php' ?>
</body>
</html>