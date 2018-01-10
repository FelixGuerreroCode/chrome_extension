chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
	if( request.id === "retrieveFormObjectList" ){
		console.log( request );
		var context = navigationContext();
		sendResponse( context );
		console.log( "the listener is listening event" );
	}else if( request.id === "storageUpdate" ){
		localStorage.setItem( request.formName, request.checked );
	}else{
		console.error( "event not captured" );
	}
});

