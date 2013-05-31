var SVG = require('./svg').SVG;
var Code39 = require('tualo-code39').Code39;
var DataMatrix = require('tualo-datamatrix').DataMatrix;

var types = {
	Code39: Code39,
	DataMatrix: DataMatrix
};

var Barcode = function(options){
	this.type = 'Code39';
	
	this.width = 100;
	this.height = 50;
	this.unit = 'mm';
	this.barWidth = 3;
	
	for(var optionName in options){
		this[optionName]=options[optionName];
	}
}

Barcode.prototype.getSVG =  function(code,fullFile){
	var svg = new SVG({
		width: this.width,
		height: this.height,
		unit: this.unit
	});
	if (typeof types[this.type]==='undefined'){
		throw new Error(this.type+' is not supported');
	}else{
		switch(this.type){
			case 'Code39':
				var simpleCode = new Code39();
				var sequence = simpleCode.getCode(code);
				var positionX = 0;
				var positionY = 0;
				var wide = this.barWidth;
				var narrow = this.barWidth/3;
				for(var i =0;i<sequence.length;i++){
					var symbol = sequence.charAt(i);
					switch(symbol){
						case 'n':
							positionX+=narrow;
							break;
						case 'w':
							positionX+=wide;
							break;
						case 'N':
							svg.rect(positionX,positionY,narrow,this.height);
							positionX+=narrow;
							break;
						case 'W':
							svg.rect(positionX,positionY,wide,this.height);
							positionX+=wide;
							break;
					}
				} 
				break;
		}
	}
	return svg.toString(fullFile);
}

exports.Barcode = Barcode;