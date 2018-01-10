function Empty( jQueryElement ){
	var self = this;
	self.jQueryElement = jQueryElement;

	this.map = function( f ){
		console.warn( "Map executed on empty object with id: %s", self.jQueryElement.attr( "id" ) );
	};

	this.fmap = function( f ){
		console.warn( "Map executed on empty object with id: %s", self.jQueryElement.attr( "id" ) );
	};
}
////////////////////////////////////////////////////////////////////////////////////////////////////////
function domMap( selector ){
	var jQueryElement = $( selector );
	return new Mapper( jQueryElement );
}

function value( value ){
	var setValue = function( value, jQueryElement ){
		jQueryElement.val( value );
		return new Mapper( jQueryElement ); 
	};

	var valueSetter = setValue.bind( null, value );
	return valueSetter;
}

function click( jQueryElement ){
	jQueryElement.click();
	return new Mapper( jQueryElement ); 
}


function empty( jQueryElement ){
	return new Empty( jQueryElement );
}

function first( jQueryElement ){
	var firstElement = jQueryElement[ 0 ];
	return new Mapper( firstElement );
}

function notEmpty( jQueryElement ){
	if( jQueryElement.length === 0 ){
		return new Empty( jQueryElement );
	}else{
		return new Mapper( jQueryElement );
	}
}

