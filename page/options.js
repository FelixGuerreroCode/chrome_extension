function sendEvent( data, responseHandler ){
	chrome.tabs.query( { active: true, currentWindow: true }, function(tabs) {
		console.log( "INFO: Sending Event %o" + data );
		chrome.tabs.sendMessage( tabs[0].id, data, responseHandler );
	});

	//setTimeout( window.close, 1000 );
}


function createMustacheElement( mapping ){
	var checked = "";
	if( mapping.enable === true ){
		checked = "checked='true'";
	}
	var option = Mustache.render( "{{id}} --- ><input type='checkbox' name='formNames' class='formNames' " + checked + " id='{{id}}' value='{{id}}' ><br>", mapping );
	return option;
}


function formResponseHandler( response ){
	var commandMappings = response.commandMappings;

	var contents = "";
	
	var addMustacheToContents = function( contents, mapping ){
		var mustacheElement = createMustacheElement( mapping );
		contents += mustacheElement;
		return contents;
	};
	
	commandMappings.forEach( function( mapping ){
		contents = addMustacheToContents( contents, mapping );
	});

	var formRows = document.getElementById("formRows");

	formRows.innerHTML = contents;
}

document.addEventListener( 'DOMContentLoaded' , function(){
	var data = { id : "retrieveFormObjectList" };
	sendEvent( data, formResponseHandler );
	
	var formControllerButton = $( "#formControllerButton" );
	
	formControllerButton.asEventStream( "click" )
		.onValue( function( event ){
			var formNames = $( ".formNames" ).toArray();
			formNames.forEach( function( element ){
				var checkbox = $( element );
				var storageUpdate = { id : "storageUpdate", formName : checkbox.attr( "id" ), checked : checkbox.prop( "checked" ) };
				sendEvent( storageUpdate, function(){} );
			});
		});	

}, false );
