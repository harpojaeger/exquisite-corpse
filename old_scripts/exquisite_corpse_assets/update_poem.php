<?php
include("mysql.php");
function submit_line($id,$submission){

if($submission!=""){

$assets=get_existing_assets($id);
$full=$assets[full];
$lastline=$assets[lastline];
$query="UPDATE poems SET full='$full$lastline',last_entry='$submission' WHERE `id` = '$id'";
if(mysql_query($query)){
//echo("edited successfully<br>");
mail("xxxxxxxx",time().": $id updated",html_entity_decode($submission));
}else{
//echo("error in editing".mysql_error()."<br>");
//mail("xxxxxxxx",time().": query",$query);
//echo($query);
}
}
}

function get_existing_assets($id){
$query="SELECT full FROM poems WHERE `id` = '$id'";
if($result=mysql_query($query)){
$full=mysql_fetch_assoc($result);
//print_r($full);
//echo("retrieved poem's full text successfully.<br>");
}else{
//echo("error in retrieving full text<br>");
}
$query="SELECT last_entry FROM poems WHERE `id` = '$id'";
if($result=mysql_query($query)){
$lastline=mysql_fetch_assoc($result);
//print_r($lastline);
//echo("retrieved poem's last_entry successfully.<br>");
}else{
//echo("error in retrieving last entry<br>");
}
$query="SELECT time_started FROM poems WHERE `id` = '$id'";
if($result=mysql_query($query)){
$time_started=mysql_fetch_assoc($result);
}else{
//echo("error in retrieving time started<br>");
}
$lastline=$lastline[last_entry];
$full=$full[full];
$time_started=$time_started[time_started];
if($full!="")
$full.="<br>";
return(array("full"=>$full,"lastline"=>$lastline,"time_started"=>$time_started));
}

function end_poem($id,$submission){
$assets=get_existing_assets($id);
$full=$assets[full];
$lastline=$assets[lastline];
$time_started=$assets[time_started];
//echo("full:$full<br>lastline:$lastline<br>submission:$submission<br>");
if($submission!="")
$lastline.="<br>";
$result=mysql_fetch_assoc(mysql_query("select count(*) from completed"));
$num_completed_poems=$result["count(*)"];
$newid=$num_completed_poems+1;
$query="INSERT INTO completed (id,text,time_completed,time_started) VALUES('$newid','$full$lastline$submission','".time()."','$time_started')";
if(mysql_query($query))
mysql_query("DELETE from poems where `id` = '$id'");

//mail("xxxxxxxx",time().": query",$query);

mail("xxxxxxxx",time().": $id -> $newid","http://harpojaeger.com/projects/exquisite-corpse#$newid\n".str_replace("<br>","\n",$full.$lastline.$submission));
}
foreach($_GET as $key=>$value)
$$key=htmlentities(($value),ENT_QUOTES);



if($action=="add"){
submit_line($id,$submission);
}elseif($action=="end"){
end_poem($id,$submission);
}
?>