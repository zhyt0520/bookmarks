<?php

// 确保DB_NAME数据库内无DB_TABLE数据表，或者
// 确保DB_TABLE数据表结构与下述符合：
// 'Id int not null auto_increment,'.
// 'Depth int not null,'.
// 'ParentId int not null,'.
// 'IsDir int not null,'.
// 'Name varchar(100),'.
// 'Url varchar(255) not null,'.
// 'primary key(Id));'

// 定义数据库信息
define('DB_HOST', 'localhost');
define('DB_NAME', 'zhyt');
define('DB_TABLE','bookmarks');
define('DB_USER', 'zhyt');
define('DB_PASSWORD', 'zhyt0520');

?>