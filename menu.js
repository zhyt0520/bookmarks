document.oncontextmenu = function(){
	// if(!event) event=window.event;
	if(event.button==2){
		var x=event.clientX;
		var y=event.clientY;
		$('contextmenu').style.left=x+'px';
		$('contextmenu').style.top=y+'px';
		$('contextmenu').style.visibility='visible';
		$('contextmenu').style.position='fixed';
	}
	return false
}
document.onclick = function(){
	$('contextmenu').style.visibility='hidden';
}
