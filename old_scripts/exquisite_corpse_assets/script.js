$(document).ready(function(){
$(".loader").hide();
update_everything();

$("#skiplink").click(function(){
	update_everything();

});
$("#add").click(function(){

	$.get("http://ec2-54-164-53-69.compute-1.amazonaws.com/exquisite_corpse_assets/update_poem.php?action=add&"+$("#editform").serialize());

	$("#submission").attr("value","");
	$("#editloader").fadeIn("fast");
	setTimeout(function(){update_everything();$("#editloader").fadeOut("fast");},1000);

});
$("#end").click(function(){

	$.get("http://ec2-54-164-53-69.compute-1.amazonaws.com/exquisite_corpse_assets/update_poem.php?action=end&"+$("#editform").serialize());
	$("#submission").attr("value","");
	$("#editloader").fadeIn("fast");
	setTimeout(function(){update_everything();$("#editloader").fadeOut("fast");},1000);

});
$("#start").click(function(){

$.get("http://ec2-54-164-53-69.compute-1.amazonaws.com/exquisite_corpse_assets/new_poem.php?&"+$("#createform").serialize());
$("#newsubmission").attr("value","");
$("#createloader").fadeIn("fast");
	setTimeout(function(){update_everything();$("#createloader").fadeOut("fast");},2000);

});
function update_everything(){
set_prompt_visibility();
refresh_prompt();
refresh_counters();
build_navigation();
update_completed_poems_list();


}
function set_prompt_visibility(){
$.get("http://ec2-54-164-53-69.compute-1.amazonaws.com/exquisite_corpse_assets/open_poems_counter.php",function(n){
if(n<1){
$("#already_poems").slideUp("slow");
//$("#already_poems").hide();
}else{
$("#already_poems").slideDown("slow");
}
});

}
function refresh_counters(){
$.get("http://ec2-54-164-53-69.compute-1.amazonaws.com/exquisite_corpse_assets/open_poems_counter.php",function(n){

	$("#num_open_poems").text(n);
	if(n==1){
	$("#are_is").text("is");
	$("#s").text("");
	}else{
	$("#are_is").text("are");
	$("#s").text("s");
	}
	});
	$("#num_completed_poems").load("http://ec2-54-164-53-69.compute-1.amazonaws.com/exquisite_corpse_assets/completed_poems_counter.php");
    }



function refresh_prompt(){

	$.get("http://ec2-54-164-53-69.compute-1.amazonaws.com/exquisite_corpse_assets/return_random_id.php",function(random_id){
		//alert(random_id);
		$("#promptline").fadeOut("fast");
		$("#promptline").load("http://ec2-54-164-53-69.compute-1.amazonaws.com/exquisite_corpse_assets/prompt_retrieve.php?id="+random_id);
		$("#promptline").fadeIn("fast");
//		$("#submission").attr("value","");
		$("#hidden_prompt_id").attr("value",random_id);
		//set the nth line counter
		$.get("http://ec2-54-164-53-69.compute-1.amazonaws.com/exquisite_corpse_assets/numlines.php?id="+random_id,function(numlines){
			$("#numlines").text(ord(numlines));
 		 });

	//alert($("#hidden_prompt_id").attr("value"));

	});
}

function ord(n){
var sfx = ["th","st","nd","rd"];
var val = n%100;
return n + (sfx[(val-20)%10] || sfx[val] || sfx[0]);
}
function build_navigation(){
$.get("http://ec2-54-164-53-69.compute-1.amazonaws.com/exquisite_corpse_assets/completed_poems_counter.php",function(n){
html="";
while(n/5!=Math.round(n/5))
n--;
for(n;n>0;n=n-5){
html+='<a href="#'+n+'">'+n+"<a/> ";
}
$("#poem_navigation").html(html);
});
}
function update_completed_poems_list(){
$("#completed_poems").load("http://ec2-54-164-53-69.compute-1.amazonaws.com/exquisite_corpse_assets/display_completed_poem.php");
}

});
