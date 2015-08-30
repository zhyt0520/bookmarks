<?php

// 连接数据库
function connect_db(){
	$dsn='mysql:host='.DB_HOST.';dbname='.DB_NAME;
	try{
		$conn = new PDO ($dsn,DB_USER,DB_PASSWORD);
	}
	catch(PDOException $e)
	{
		echo '数据库连接失败，请检查config.php文件内的配置数据。<br>错误信息：' . $e->getMessage(); 
	}
	if(isset($conn)){
		// 若数据表DB_TABLE不存在，创建数据表
		if (!$conn->query('show tables like '.DB_TABLE)){
			$query='create table bookmarks ('.
				'Id int not null auto_increment,'.
				'Depth int not null,'.
				'ParentId int not null,'.
				'IsDir int not null,'.
				'Name varchar(100) not null,'.
				'Url varchar(255),'.
				'primary key(Id));';
			$result=$conn->prepare($query);
			$result->execute();
		}
		return $conn;
	}
}

// 查询目录并在左侧显示
// 传入参数：数据库连接$conn；
// 返回isdir=1的查询结果$res
function dis_dir($conn){
	$query='select * from '.DB_TABLE.' where isdir = 1';
	// $result=$conn->query('select * from zhyt where isdir=1');
	// query 直接连 SQL 语句
	$result=$conn->prepare($query);
	$result->execute();
	$res=$result->fetchall(PDO::FETCH_ASSOC);
	echo echo_left($res);
	return $res;
}


// 根据数据库返回结果循环输出左侧目录
// 传入参数：数据库的查询结果，二维数组
function echo_left($res){
	// 判断最外层depth=0的目录是否有子目录，用来控制左侧三角图标的显示
	for($i=0;$i<count($res);$i++){
		// 外层循环把所有都设置成hidden
		$has_children[$i]="style='visibility:hidden'";
		for($j=0;$j<count($res);$j++){
			// 内层循环，如果第i个有子目录，设置成visible
			if($res[$i]['Id']==$res[$j]['ParentId']){
				$has_children[$i]="style='visibility:visible'";
			}
		}
	}
	// 三层循环输出左侧目录树
	for($i=0;$i<count($res);$i++){
		if($res[$i]['Depth']==0){
			echo "<div class='tree0'><i class='iconfont icon-xiangyou' onclick='toggle_children()' ".$has_children[$i]."></i><p class='dir' id='db".$res[$i]['Id']."' ondblclick='toggle_children()'>".$res[$i]['Name'].'</p>';
			for($j=0;$j<count($res);$j++){
				if($res[$j]['ParentId']==$res[$i]['Id']){
					echo "<div class='tree1'><i class='iconfont icon-xiangyou' onclick='toggle_children()' ".$has_children[$j]."></i><p class='dir' id='db".$res[$j]['Id']."' ondblclick='toggle_children()'>".$res[$j]['Name'].'</p>';
					for($k=0;$k<count($res);$k++){
						if($res[$k]['ParentId']==$res[$j]['Id']){
							echo "<div class='tree2'><i class='iconfont icon-xiangyou' onclick='toggle_children()' ".$has_children[$k]."></i><p class='dir' id='db".$res[$k]['Id']."' ondblclick='toggle_children()'>".$res[$k]['Name'].'</p>';
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


// 根据数据库返回结果循环输出右侧条目
// 传入参数：数据库的查询结果，二维数组
function echo_right($res){
	$response='';
	for ($i=0;$i<count($res);$i++){
		$response.='<div class="item" id="db'.$res[$i]['Id'].'"><div class="name">name: '.$res[$i]['Name'].'</div><div class="url">url: '.$res[$i]['Url'].'</div></div>';
	}
	return $response;
}

// 默认显示第一个目录下的书签
// 传入参数：1、数据库连接；2、数据库isdir=1的查询结果
function dis_url($conn,$res){
	if(count($res)>0){
		$frist_id=$res[0]['Id'];
		$query='select * from '.DB_TABLE.' where parentid = '.$frist_id.' and isdir = 0';
		$result=$conn->prepare($query);
		$result->execute();
		$res_url=$result->fetchall(PDO::FETCH_ASSOC);
		echo echo_right($res_url);
	}
}

?>