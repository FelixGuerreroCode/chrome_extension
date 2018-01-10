function isInSpRejectQueue( document ){
 	var rejectQueueHeader = "Queue: SP Rejects";
	if( document.body.innerHTML.indexOf( rejectQueueHeader ) > 0 ){
	       return true;
	}else{
		return false;
	}
}
