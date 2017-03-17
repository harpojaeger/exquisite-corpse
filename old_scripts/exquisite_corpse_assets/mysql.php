<?php
$testing="xxxxxx";
$real="xxxxxxx";
$use=$real;

$mysql=mysql_connect("xxxx","xxxxx","xxxxxx");
mysql_select_db($use,$mysql);
header('Access-Control-Allow-Origin: http://www.harpojaeger.com');
?>
