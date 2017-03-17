<?php
include("mysql.php");
$id=mysql_fetch_assoc(mysql_query("select id from poems order by rand() limit 1",$mysql));
print_r($id[id]);
?>