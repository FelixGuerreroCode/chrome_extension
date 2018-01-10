chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
	console.log( "LOGIN: Processing Event : %o ", request );

	if( request.event === "ssn" ){
		var ssn = request.ssn;
		console.log( "LOGIN: Setting ssn: " + ssn );
		localStorage.setItem( "ssn", ssn );
	}else if( request.event === "username" ){
		var user = request.user;
		console.log( "LOGIN: Setting user name: " + user.username );
		localStorage.setItem( "username", user.username );
		localStorage.setItem( "application", user.application );

		var windowLocation = null;

		if( isApplicationAsPWEB() ){
			windowLocation = "/pweb-front/j_spring_security_logout";
		}else{
			windowLocation = "/j_spring_security_logout";
		}
		window.location = windowLocation; 
	}else if( request.event === "costLetterId" ){
		console.log( "LOGIN: Setting costLetterId : " + request.costLetterId + " of type : " + request.isInvoice );
		localStorage.setItem( "costLetterId", request.costLetterId );
		localStorage.setItem( "isInvoice", request.isInvoice );
	}
});
