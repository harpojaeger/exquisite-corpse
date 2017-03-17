<?php
//testing server
$server="xxxxxx";
//real server
//$server="xxxxxx";
$username="xxxxxx";
$password="xxxxxxx";
$mysql=mysql_connect($server,$username,$password);
//testing server
mysql_select_db("xxxxxx",$mysql)
//real server
//mysql_select_db("xxxxxxx",$mysql);
?>