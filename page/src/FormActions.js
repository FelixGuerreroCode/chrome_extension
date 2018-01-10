function navigationContext(){
	return {
		name : "Military Callup Request Invoice",
		commandTitleMappings : [
			{ id : "Peris Online :: Welcome", actionMethod : whowhatForm, enable : true },
			{ id : "Peris Online :: Member Summary", actionMethod : selectServiceRequest, enable : true }
		],
		commandMappings : [
			{ id : "milEmployerSummaryForm" , actionMethod : milEmployerSummaryForm, enable : true }
		]
	};
}

function milEmployerSummaryForm(){
	var newMilByEmployerButton = domMap( "#newMilByEmployer" );
	newMilByEmployerButton.map( click );
}	

function militaryCallup(){
	var milHomeLink = domMap( "#MilitaryCallUp span" );
	milHomeLink.map( click );
}

function actionForbidden(){
	militaryCallup();
}

function whowhatForm( context ){
	//window.location = "http://asrs-4970.asrs.local:8080/servicepurchase/invoice.do?costLetterId=6896&stepName=InvProcess";
	window.location = "http://asrs-4970.asrs.local:8080/servicepurchase/invoice.do?costLetterId=107388&stepName=InvProcess";
	//http://vm-teamh1.asrs.local:8080/servicepurchase/invoice.do?costLetterId=107486&stepName=InvProcess
}

function selectServiceRequest() {
	clickElementById( "serviceRequestLinkNew" );
}

