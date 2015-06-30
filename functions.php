<?php

function connect_db(){
	global $conn;
	$dsn='mysql:host='.DB_HOST.';dbname='.DB_NAME;
	try{
		$conn = new PDO ($dsn,DB_USER,DB_PASSWORD);
		// $conn = new PDO ("mysql:host=localhost;dbname=zhyt",DB_USER,DB_PASSWORD);
		echo 'connect database successfully.';
	}
	catch(PDOException $e)
	{
		echo 'connect database failed: ' . $e->getMessage(); 
	}
}
function dis_dir($conn){
	$query='select * from bookmarks where isdir = 1';
	// $result=$conn->query('select * from zhyt where isdir=1');
	// query 直接连 SQL 语句
	$result=$conn->prepare($query);
	$result->execute();
	$res=$result->fetchall(PDO::FETCH_ASSOC);
	echo count($res);
	for($i=0;$i<count($res);$i++){
		if($res[$i]['Depth']==0){
			echo "<div class='dir".$i."'>".$res[$i]['Name'];
			for($j=0;$j<count($res);$j++){
				if($res[$j]['ParentId']==$res[$i]['Id']){
					echo "<div class='dir".$j."'>".$res[$j]['Name'];
					for($k=0;$k<count($res);$k++){
						if($res[$k]['ParentId']==$res[$j]['Id']){
							echo "<div calss='dir".$k."'>".$res[$k]['Name'];
							echo '</div>';
						}
					}
					echo '</div>';
				}
			}
			echo '</div>';
		}
	}
}
function dis_url(){
	
}
function disconnect_db(){
	if($conn){
		$conn=null;
	}
}

?>