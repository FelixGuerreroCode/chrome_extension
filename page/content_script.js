var formsTriggered = false;

(function() {
	setTimer( 0.5 );
	var forms = document.forms;
	var context = navigationContext();
	var commandMappings = context.commandMappings; 

	console.group( "Form Handler : " );
		var formsArray = Array.prototype.slice.call( forms );

		if( formsArray.length > 0 ){
			if( context.name !== "Login_Module" ){
				console.group( "Form Objects of Plugin [%s] ", context.name );
					formsArray.forEach( function( form ){
						console.log( ">Form id: [%s] %o", form.id, form ); 
					});
				console.groupEnd();
			}
			processFormElements( formsArray, context );
		}else{
			console.warn( "No Forms to be processed" ); 
		}

		processTitle( document.title, context );

	console.groupEnd();
})();

function processTitle( title, context ){
	var linkMapping = findActionMapper( title, context.commandTitleMappings );

	if( linkMapping !== undefined && linkMapping !== null ){
		console.log( "Processing Title Page [%s]", title );
		commandExecutor( title, linkMapping );
	}else{
		console.log( "Title Page [%s] not processed", title );
	}
}

function findActionMapper( id, mappings ){
	var mapping =  mappings.find( function( mapping, index, array ){
		return mapping.id === id;	
	});



	if( mapping === undefined || mapping === null ){
		console.warn( "Mapper with ID %s not found in Array of handlers", id );
		console.log( "Handlers Available: ", mappings );
	}else{
		var localStorageEnable = localStorage.getItem( id );
		if( localStorageEnable !== null ){
			mapping.enable = localStorageEnable;
			console.warn( "Mapper with ID %s is being overriden by extension option configuration as %s", id, localStorageEnable );
		}
	}

	return mapping;
}

function commandExecutor( id, command ){
	if( command !== undefined ){
		if( command.enable !== "false" && command.enable !== false ){ 
			var formArgumentWrapper = function(){
				var context = { formsTriggered : formsTriggered, id : id };
				command.actionMethod( context );
				formsTriggered = true;
			};
			setTimeout( formArgumentWrapper, secondsDelay * 1000 );
		}

	}
}

function processFormElements( formObjects, context ){
	var formsTriggered = false;
	formObjects.forEach( function( form ){
		var id = form.id;
		var name = form.name;

		if( name !== "hiddenFormFields" ){
			var command = findActionMapper( id, context.commandMappings );
			commandExecutor( id, command );
		}

	});
}

