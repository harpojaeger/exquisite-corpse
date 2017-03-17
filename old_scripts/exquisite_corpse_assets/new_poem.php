<?php
include("mysql.php");

function create_new_poem($submission){
if($submission!=""){

$result=mysql_fetch_assoc(mysql_query("select count(*) from poems"));
$num_open_poems=$result["count(*)"];
$result=mysql_fetch_assoc(mysql_query("select count(*) from completed"));
$num_completed_poems=$result["count(*)"];
//echo($newid);
$newid="uncompleted".($num_open_poems+1+$num_completed_poems);

mail("xxxxxxx",time().": $newid",html_entity_decode($submission));
//}else{
//echo("error in retrieving id");
//}
$query="INSERT INTO poems (id,last_entry,time_started) VALUES('$newid','$submission','".time()."')";
//mail("me@harpojaeger.com",time().": new query",$query);
if($result=mysql_query($query)){
//echo("created successfully<br>");
}else{
//echo("error in creating new poem".mysql_error()."<br>");
}
}
}
create_new_poem(htmlentities($_GET[newsubmission],ENT_QUOTES));
//echo($_POST[newsubmission]);
//echo(htmlentities(stripslashes($_GET[newsubmission]),ENT_QUOTES));

?>