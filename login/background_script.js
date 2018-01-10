chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
	if (changeInfo.status == 'complete' && tab.active) {
		loadBackgroundSupportScripts( tab );
	}

	/**
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
			window.location = "j_spring_security_logout";
		}
	});
	*/
});


function loadBackgroundSupportScripts( tab ){
	chrome.tabs.executeScript(tab.ib, { file: 'lib/BrowserApi.js' });
	chrome.tabs.executeScript(tab.ib, { file: 'lib/WorkItemsApi.js' });
	chrome.tabs.executeScript(tab.ib, { file: 'lib/mustache.js' });
	chrome.tabs.executeScript(tab.ib, { file: 'lib/jquery.js' });
	chrome.tabs.executeScript(tab.ib, { file: 'lib/ramda.js' });
	chrome.tabs.executeScript(tab.ib, { file: 'lib/curry.js' });
	chrome.tabs.executeScript(tab.ib, { file: 'src/FormActions.js' });

	chrome.tabs.executeScript(tab.ib, { file: 'content_script.js' });
}


