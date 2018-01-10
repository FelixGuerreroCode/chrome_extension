function navigationContext(){
	return {
		name : "Login_Module",
		commandTitleMappings : {
			"myASRS | Arizona State Retirement System :: Logout Complete" : { actionMethod : logoutComplete, enable : true }
		},
		commandMappings : {
			"command" : { actionMethod : pwebLoginScreen, enable : true },
			"polLoginForm" : { actionMethod : polLoginForm, enable : true }
		}
	};
}

function Empty(){
	this.map = function(){
		console.log( "Username is empty" );
		// do nothing
	};
}

function checkEmptyUserName( credentials ){
	var username = credentials.username;

	if( username === undefined || username === null ){
		return new Empty();
	}else{
		return wrap( credentials );	
	}
}

function logoutComplete( context ){
	clickElementById( "returnToLoginLink" );
}

function pwebLoginScreen(){
	setApplicationAsPWEB();

	var credentials = getCredentials();
	var credentialsWrap = wrap( credentials );

	var populateForm = function( credentials ){
		setElementValueById( "j_username_id", credentials.username );
		setElementValueById( "j_password", credentials.password );

		if( credentials.username.lastIndexOf( "coyot" ) === -1 ){
			clickElementById( "submit" );
		}else{
			console.error( "Invalid credentials in PWEB: %o", credentials );
		}
	};

	credentialsWrap.map( checkEmptyUserName )
		.map( populateForm );
}

function polLoginForm(){
	setApplicationAsPOL();

	var credentials = getCredentials();
	var credentialsWrap = wrap( credentials );

	var populateForm = function( credentials ){

		if( credentials.username.lastIndexOf( "coyot" ) > -1 ){
			setElementValueById( "j_username", credentials.username );
			setElementValueById( "j_password", credentials.password );
			clickElementById( "submitButton" );
		}else{
			console.error( "Invalid credentials in POL: %o", credentials );
		}
	};

	credentialsWrap.map( checkEmptyUserName )
		.map( populateForm );
}

function getCredentials(){
	var username = getUserName();
	var application = getApplicationName();
	var credentials = {
		username : username,
		application : application,
		password : "Go@gile4"
	};

	var logger = console.log;

	if( credentials.username === null || credentials.password === null ){
		logger = console.error;
	}

	logger( "Credentials username %s", credentials.username  );
	logger( "Credentials pasword %s", credentials.password  );

	return credentials;
}


