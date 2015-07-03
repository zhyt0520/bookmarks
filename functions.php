<?php

// 连接数据库
function connect_db(){
	// global $conn;
	$dsn='mysql:host='.DB_HOST.';dbname='.DB_NAME;
	try{
		$conn = new PDO ($dsn,DB_USER,DB_PASSWORD);
		// $conn = new PDO ("mysql:host=localhost;dbname=zhyt",DB_USER,DB_PASSWORD);
		// echo 'connect database successfully.';
	}
	catch(PDOException $e)
	{
		echo 'connect database failed: ' . $e->getMessage(); 
	}
	return $conn;
}

// 查询目录并显示
function dis_dir($conn){
	$query='select * from bookmarks where isdir = 1';
	// $result=$conn->query('select * from zhyt where isdir=1');
	// query 直接连 SQL 语句
	$result=$conn->prepare($query);
	$result->execute();
	$res=$result->fetchall(PDO::FETCH_ASSOC);
	for($i=0;$i<count($res);$i++){
		if($res[$i]['Depth']==0){
			echo "<div class='dir0' id='dbdir".$res[$i]['Id']."' style='display:block'><p onclick='dis_url_ajax(".$res[$i]['Id'].")'>".$res[$i]['Name'].'</p>';
			for($j=0;$j<count($res);$j++){
				if($res[$j]['ParentId']==$res[$i]['Id']){
					echo "<div class='dir1' id='dbdir".$res[$j]['Id']."' style='display:none'><p onclick='dis_url_ajax(".$res[$j]['Id'].")'>".$res[$j]['Name'].'</p>';
					for($k=0;$k<count($res);$k++){
						if($res[$k]['ParentId']==$res[$j]['Id']){
							echo "<div calss='dir2' id='dbdir".$res[$k]['Id']."' style='display:none'><p onclick='dis_url_ajax(".$res[$k]['Id'].")'>".$res[$k]['Name'].'</p>';
							echo '</div>';
						}
					}
					echo '</div>';
				}
			}
			echo '</div>';
		}
	}
	return $res;
}

// 默认显示第一个目录下的书签
function dis_url($conn,$res){
	$frist_id=$res[0]['Id'];
	$query='select * from bookmarks where parentid = '.$frist_id.' and isdir = 0';
	$result=$conn->prepare($query);
	$result->execute();
	$res_url=$result->fetchall(PDO::FETCH_ASSOC);
	for($i=0;$i<count($res_url);$i++){
		echo '<p>name: '.$res_url[$i]['Name'].' url: '.$res_url[$i]['Url'];
	}
}

// 关闭数据库连接
function disconnect_db(){
	if($conn){
		$conn=null;
	}
}

?>