<?php
include("mysql.php");
if($id=$_GET[id]){
$query="SELECT * FROM `completed` WHERE id=$id";
$result=mysql_query($query);
$poem=mysql_fetch_assoc($result);
echo_poem($poem);
}else{
$query="select * from `completed` where 1 order by id DESC";
$result=mysql_query($query);
while($poem=mysql_fetch_assoc($result))
echo_poem($poem);
}
function echo_poem($poem){
$timestamp_should_exist=($poem[time_started]!=0||$poem[time_completed]!=0);
if($timestamp_should_exist)
$timestamp='<span class="timestamp"> (';
if($poem[time_started]!=0)
$timestamp.=date("n/j/y g:i:s a",$poem[time_started]+3600*3)." - ";
if($poem[time_completed]!=0)
$timestamp.=date("n/j/y g:i:s a",$poem[time_completed]+3600*3)." EST)";
if($timestamp_should_exist)
$timestamp.="</span>";
echo("<br><a name=\"".$poem[id]."\" href=\"#top\">Poem #".$poem[id].":</a>$timestamp<br>".$poem[text]);
}
?>