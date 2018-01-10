var userList =  [ 
	{ username : "xyz1134", description : "Member: None" , application : "pweb" }, 
	{ username : "sweet69summer", description : "Member: After tax testing" , application : "pweb" },
	{ username : "SFDFinance", description : "Employer: CNW Manual creation for mreidy" , application : "pweb" },
	{ username : "mreidy", description : "Employer: CNW Manual creation. Employee of SFDFinance" , application : "pweb" },
	{ username : "prplson", description : "Employer with CNW" , application : "pweb" },
	{ username : "cshoema1", description : "Employee with CNW" , application : "pweb" },
	{ username : "Maricopa County", description : "Employer: Employer login" , application : "pweb" },
	{ username : "21jULY61", description : "PDA Testing" , application : "pweb" },
	{ username : "PdDaniels", description : "LOA Testing" , application : "pweb" },
	{ username : "svillegas", description : "LOA Testing" , application : "pweb" },
	{ username : "Gabby", description : "Employer Admin for Yuma Count Airport Authority" , application : "pweb" },
	{ username : "19077GBoyce", description : "Mil Call Up User 1" , application : "pweb" },
	{ username : "18914KCall", description : "Mil Call Up User 2" , application : "pweb" },
	{ username : "coyote1", description : "POL Testing" , application : "pol" },
	{ username : "coyote4", description : "POL Testing" , application : "pol" },
	{ username : "coyote5", description : "POL Testing" , application : "pol" },
	{ username : "coyote6", description : "POL Testing" , application : "pol" }
];

function loadUserList(){
	var formDiv = document.getElementById("formDiv");


	var optionElements = function(){
		var contents = "";

		return {
			addContents : function( element ){
				var option = Mustache.render( "<input type='radio' name='users' class='users' value='{{username}}'>{{username}} -> {{description}}<br>", element );
				contents += option;
			},
			getContents : function(){
				return contents;
			}
		};
	};

	var menuOptions = optionElements();
	userList.forEach( menuOptions.addContents );
	formDiv.innerHTML = menuOptions.getContents();

	var elements = $( ".users" ).toArray();

	elements.forEach( function( element ){
		$( element ).click( saveUser );
	});

	$( "#ssnButton" ).click( function( event ){
		var ssn = $( "#ssn" ).val();
		var data =  { event : "ssn", ssn :  ssn };
		sendEvent( data );
	});

	$( "#usernameButton" ).click( function( event ){
		var username = $( "#username" ).val();

		var user = { username : username, description : "Dynamically inserted" , application : "pweb" }; 
		var data =  { event : "username", user :  user };

		sendEvent( data );
	});

	$( "#costLetterIdButton" ).click( function( event ){
		var costLetterId = $( "#costLetterId" ).val();
		var isInvoice = $( "#costLetterTypeInvoiceYes" ).prop( "checked" );

		var data =  { event : "costLetterId", costLetterId : costLetterId, description : "Cost Letter Id" , application : "pol", isInvoice : isInvoice };

		sendEvent( data );
	});

	var ssn = localStorage.getItem( "ssn" );
	$( "#ssn" ).val( ssn );

	var costLetterId = localStorage.getItem( "costLetterId" );
	$( "#costLetterId" ).val( costLetterId );

	$('body').height(480); 
	$('body').width(650); 
	$('html').height(520); 
	$('html').width(660); 
}

function saveUser( event ){
	var jQueryMenu = $( event.target );
	var userName = jQueryMenu.val(); 

	var matchingUser = userList.filter( function( user ){
		if( user.username === userName ){
			return true;
		}
		return false;
	});

	var data =  { event : "username", user:  matchingUser[ 0 ] };
	sendEvent( data );
}

function sendEvent( data ){
	chrome.tabs.query( { active: true, currentWindow: true }, function(tabs) {
		console.log( "INFO: Sending Event %o" + data );
		chrome.tabs.sendMessage( tabs[0].id, data );
	});
	setTimeout( window.close, 1000 );
}


document.addEventListener('DOMContentLoaded', loadUserList, false );
