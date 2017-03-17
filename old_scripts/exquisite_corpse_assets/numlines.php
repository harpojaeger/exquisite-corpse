<?php
include("mysql.php");
$result=mysql_fetch_assoc(mysql_query("SELECT * FROM `poems` WHERE `id`='".$_GET[id]."'"));
if($result[full]!=""){
echo(count(explode("<br>",$result[full])))+2;
}else{
echo("2");
}
?>