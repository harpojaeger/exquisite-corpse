function ajaxRequest(){
if(window.XMLHttpRequest){
	//for ie7, firefox, chrome, opera, safari
	return new XMLHttpRequest();
	alert("XMLHttpRequest created");
}else if(window.ActiveXObject){
	//for ie6, ie5
	return new ActiveXObject("Microsoft.XMLHTTP");
	alert("Microsoft.XMLHTTP created");
}else{
	alert("Your browser does not support AJAX.");
	return;
}
}