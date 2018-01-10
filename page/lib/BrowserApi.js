var secondsDelay = 0;

function isEmployerHomePage( title ){
	var status = false;
	if( title === "myASRS | Arizona State Retirement System :: Employer Home" ){
		status = true;
	}

	return status;
}

function isParticipantHomePage( title ){
	var status = false;
	if( title === "myASRS | Arizona State Retirement System :: Participant Home" ){
		status = true;
	}

	return status;
}

function isLogoutCompletePage( title ){
	var status = false;
	if( title === "myASRS | Arizona State Retirement System :: Logout Complete" ){
		status = true;
	}

	return status;
}

function setValueInElementById( theId, theValue ){
	var element = getElementByIdWrapper( theId );
	element.value = theValue; 
}

function getValueInElementById( theId ){
	var element = getElementByIdWrapper( theId );
	return element.value; 
}

function getHtmlInElementById( theId ){
	var element = getElementByIdWrapper( theId );
	return element.innerHTML; 
}

function selectMenuOption( theId, indexValue ){
	var element = getElementByIdWrapper( theId );
	element.options[ indexValue ].selected = true;
}

function verifyErrorVisible( theId ){
	var element = getElementByIdWrapper( theId );
	var state = element.style.display;
	if( state === "none" ){
		alert( "Error message for element: " + theId + " is not visible" );
	}
}

function isElementVisible( theId ){
	var element = document.getElementById( theId );
	var state = true;
	if( element === undefined || element === null ){
		state = false;
	}else{
		var visibilityState = element.style.display;
		if( visibilityState === "none" ){
			state = false;
		}
	}

	return state;
}

function uncheckedRadioButtonById( theId, state ){
	var element = getElementByIdWrapper( theId );
	element.checked = false;
}

function verifyState( status, message ){
	if( status === false ){
		alert( message );
	}
}

function elementHasClassById( theId, className ){
	var element = getElementByIdWrapper( theId );
	var cssClass = element.className;
	if( cssClass.lastIndexOf( className ) > 0 ){
		return true;
	}else{
		return false;
	}
}

function getElementByIdWrapper( theId ){
	var element = document.getElementById( theId );
	if( element === undefined || element === null ){
		element = {
			click : function(){
				console.log( "PAGE: Attempting to click on missing element: " + theId );
			},
			className : "testing",
			value : "",
			html : ""
		};
	}
	return element;
}

function clickElementById( theId ){
	var element = getElementByIdWrapper( theId );
	element.click();
}

function clickHrefById( theId ){
	var element = getElementByIdWrapper( theId );
	element[ 0 ].click();
}

function checkRadioButtonById( theId ){
	var element = getElementByIdWrapper( theId );
	element.checked = true;
	element.click();
}

function setElementValueById( theId, value ){
	var element = getElementByIdWrapper( theId );
	element.value = value;
}

function executeForm( id, formContext ){
	if( formContext.enable ){
		setTimeout( formContext.actionMethod, secondsDelay * 1000 );
	}
	console.log( "PAGE: Function Invocation :      " + formContext.enable + "       " + new Date() );
}

function setTimer( seconds ){
	secondsDelay = seconds;
}

function getJspTitle( jspPath ){
	var name = "";
	if( jspPath !== undefined ){
		var lastDot = jspPath.lastIndexOf( "." );
		var lastUnderscore = jspPath.lastIndexOf( "_" );

		if( lastDot > 0 ){
			name = jspPath.substring( lastDot + 1, lastUnderscore ) + ".jsp";
		}
	}

	return name;
}

function getJavascriptLibraries(){
	var scriptLibraries = document.querySelectorAll("script");
	var jsList = Array.apply( null, scriptLibraries );
	var developmentJavascripts = jsList.filter( function( jsSrc ){
		return jsSrc.src.lastIndexOf( "servicepurchase" ) > -1;
	});

	developmentJavascripts.forEach( function( script ){
		console.log( "PAGE Scripts: " );
		console.log( script.src );
	});
}

function stringGen(len){
	var text = "";

	var charset = "abcdefghijklmnopqrstuvwxyz";

	for( var i=0; i < len; i++ ){
		text += charset.charAt(Math.floor(Math.random() * charset.length));
	}
	return text;
}

function scrollTo( theId ){
	var element = getElementByIdWrapper( theId );
	element.scrollIntoView( true );
}

function getUserName(){
	var username = localStorage.getItem( "username" );	
	return username;
}

function setApplicationAsPOL(){
	localStorage.setItem( "application", "pol" );
}

function setApplicationAsPWEB(){
	localStorage.setItem( "application", "pweb" );
}

function getApplicationName(){
	var application = localStorage.getItem( "application" );	
	return application;
}

function isApplicationAsPWEB(){
	var application = localStorage.getItem( "application" );
	return ( application === "pweb" );
}

function getSsn(){
	var ssn = localStorage.getItem( "ssn" );	
	return ssn;
}

function isApplicationAsPOL(){
	var application = localStorage.getItem( "application" );
	return ( application === "pol" );
}

function wrap( value ){
	return new Wrap( value );	
}

function Wrap( value ){
	this.map = function( f ){
		return f( value );
	};
}

function getJavascriptLibraries(){
	var scriptLibraries = document.querySelectorAll("script");
	var jsList = Array.apply( null, scriptLibraries );
	var developmentJavascripts = jsList.filter( function( jsSrc ){
		return jsSrc.src.lastIndexOf( "servicepurchase" ) > -1;
	});

	console.groupCollapsed( "Javascript Elements" );
		developmentJavascripts.forEach( function( script ){
			console.log( "%s : %o", script.src, script );
		});
	console.groupEnd();
}

function getCssLibraries(){
	var cssLibraries = document.querySelectorAll("link");
	var cssList = Array.apply( null, cssLibraries );
	var devCss = cssList.filter( function( cssSrc ){
		return cssSrc.href.lastIndexOf( "servicepurchase" ) > -1;
	});

	console.groupCollapsed( "CSS Elements" );
		devCss.forEach( function( css ){
			console.log( "%s : %o", css.href, css );
		});
	console.groupEnd();
}


function participantHome( context ){
	clickElementById( "linkToServicePurchase" );
}

function replaceHrefToLocalUrl( element ){
	var jQueryElement = $( element );
	var href = jQueryElement.attr( "data-href" );
	var portString = "8080";
	var portIndex = href.lastIndexOf( portString );
	var hrefTruncated = href.substring( portIndex + portString.length, href.length );

	jQueryElement.attr( "data-href", hrefTruncated );

	return domWrap( element );
}

function setElementOnFocusById( theId ){
	var element = getElementByIdWrapper( theId );
	element.focus();
}

function setElementOnBlurById( theId ){
	var element = getElementByIdWrapper( theId );
	element.blur();
}
