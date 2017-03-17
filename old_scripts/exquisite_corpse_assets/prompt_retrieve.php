<?php include("mysql.php");
$result=mysql_fetch_assoc(mysql_query("select last_entry from poems where `id`='".$_GET[id]."'"));
echo($result[last_entry]);
?>