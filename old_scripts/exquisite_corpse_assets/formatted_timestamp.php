<?php
include("mysql_test_credentials.php");
$mysql=mysql_connect($server,$username,$password);
mysql_select_db("ecsandbox",$mysql);
$result=mysql_fetch_assoc(mysql_query("SELECT `time_completed` FROM `completed` WHERE `id`='".$_GET[id]."'"));
if($result[time_completed])
echo(date("n/j/y g:i:s a",$result[time_completed])." EST");
?>