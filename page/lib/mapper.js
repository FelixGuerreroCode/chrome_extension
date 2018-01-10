function Mapper( val ){
	this.val = val;

	this.map = function( f, arg ){
		return f( this.val, arg );
	};

	this.fmap = function( f, arg ){
		return new Mapper( f( this.val, arg ) );
	};

	this.toString = function(){
		return "Mapper : [" + this.val + "]";
	};

	return this;
}
