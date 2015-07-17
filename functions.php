<?php

// 连接数据库
function connect_db(){
	$dsn='mysql:host='.DB_HOST.';dbname='.DB_NAME;
	try{
		$conn = new PDO ($dsn,DB_USER,DB_PASSWORD);
	}
	catch(PDOException $e)
	{
		echo 'connect database failed: ' . $e->getMessage(); 
	}
	return $conn;
}

// 查询目录并显示
// 传入数据库连接，返回isdir=1的查询结果
function dis_dir($conn){
	$query='select * from bookmarks where isdir = 1';
	// $result=$conn->query('select * from zhyt where isdir=1');
	// query 直接连 SQL 语句
	$result=$conn->prepare($query);
	$result->execute();
	$res=$result->fetchall(PDO::FETCH_ASSOC);
	// 判断是否有子目录
	// $has_children=array(count($res));
	for($i=0;$i<count($res);$i++){
		$has_children[$i]="style='visibility:hidden'";
		for($j=0;$j<count($res);$j++){
			if($res[$i]['Id']==$res[$j]['ParentId']){
				$has_children[$i]="style='visibility:visible'";
			}
		}
	}
	// 循环输出左侧dir目录结构，只有三层深度
	// 支持无限值深度怎么实现？确定最大值，然后用数组处理循环变量i,j,k？
	// $res_depth=array_column($res,'Depth'); // 需要php版本5.5以上
	// $res_depth_max=max($res_depth);
	// $ijk=range(0,$res_depth_max);

	// 最外层,即depth=0,循环输出（的前半部分，后面需补足分号和输出</div>）
	
	// 从第二次目录dir开始多重循环，循环变量m从1开始，而不是从0开始
	// for($m=0;$m<$res_depth_max;$m++){
	// 	for($ijk[$m]=0;$ijk[$m]<count($res);$ijk[$m]++){
	// 		if()
	// 	}
	// }

	// ！！！考虑是不是要整体改动左侧dir的输出结构
	// ！！！还是可以加一层循环，能够输出下面的样子

	for($i=0;$i<count($res);$i++){
		if($res[$i]['Depth']==0){
			echo "<div class='tree0'><i class='iconfont icon-xiangyou' onclick='toggle_children(this)' ".$has_children[$i]."></i><p class='dir' id='db".$res[$i]['Id']."' onclick='dir_click_left(this,".$res[$i]['Id'].",mydata)'>".$res[$i]['Name'].'</p>';
			for($j=0;$j<count($res);$j++){
				if($res[$j]['ParentId']==$res[$i]['Id']){
					echo "<div class='tree1'><i class='iconfont icon-xiangyou' onclick='toggle_children(this)' ".$has_children[$j]."></i><p class='dir' id='db".$res[$j]['Id']."' onclick='dir_click_left(this,".$res[$j]['Id'].",mydata)'>".$res[$j]['Name'].'</p>';
					for($k=0;$k<count($res);$k++){
						if($res[$k]['ParentId']==$res[$j]['Id']){
							echo "<div class='tree2'><i class='iconfont icon-xiangyou' onclick='toggle_children(this)' ".$has_children[$k]."></i><p class='dir' id='db".$res[$k]['Id']."' onclick='dir_click_left(this,".$res[$k]['Id'].",mydata)'>".$res[$k]['Name'].'</p>';
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

// 根据数据库返回结果循环输出右侧条目class=item
function echo_db_res($res){
	$response='';
	for ($i=0;$i<count($res);$i++){
		$response.='<div class="item" onmouseover=hover_dis(this) onmouseout=hover_in_dis(this)><div class="name">name: '.$res[$i]['Name'].'</div><div class="url">url: '.$res[$i]['Url'].'</div></div>';
	}
	return $response;
}

// 默认显示第一个目录下的书签
function dis_url($conn,$res){
	$frist_id=$res[0]['Id'];
	$query='select * from bookmarks where parentid = '.$frist_id.' and isdir = 0';
	$result=$conn->prepare($query);
	$result->execute();
	$res_url=$result->fetchall(PDO::FETCH_ASSOC);
	$response=echo_db_res($res_url);
	echo $response;
}


?>