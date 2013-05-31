var SVG = require('./svg').SVG;
var Code39 = require('tualo-code39').Code39;
var Datamatrix = require('tualo-datamatrix').Datamatrix;

var types = {
	Code39: Code39,
	Datamatrix: Datamatrix
};

var Barcode = function(options){
	this.type = 'Code39';
	this.fillColor = 'black';
	this.strokeColor = 'black';
	this.strokeWidth = 0;
	this.width = 100;
	this.height = 50;
	this.unit = 'mm';
	this.barWidth = 3;
	
	this.calculatedWidth = 0;
	this.calculatedHeight=0;
	for(var optionName in options){
		this[optionName]=options[optionName];
	}
}

Barcode.prototype.getCalculatedWidth=function(){
	return this.calculatedWidth;
}
Barcode.prototype.getCalculatedHeight=function(){
	return this.calculatedHeight;
}

Barcode.prototype.getSVG =  function(code,fullFile){
	var svg = new SVG({
		fillColor: this.fillColor,
		strokeColor: this.strokeColor,
		strokeWidth: this.strokeWidth,
		width: function(scope){
			return function(){
				if (scope.width==='auto'){
					return scope.calculatedWidth;
				}else{
					return scope.width;
				}
			}
		}(this),
		height: function(scope){
			return function(){
				if (scope.height==='auto'){
					return scope.calculatedHeight;
				}else{
					return scope.height;
				}
			}
		}(this),
		unit: this.unit
	});
	if (typeof types[this.type]==='undefined'){
		throw new Error(this.type+' is not supported');
	}else{
		switch(this.type){
			case 'Datamatrix':
				var dm = new Datamatrix();
				var ascii = dm.getDigit(code,false);
				var positionX = 0;
				var positionY = 0;
				var wide = this.barWidth;
				var lines=ascii.split("\n");
				for(var lineNumber in lines){
					var columns = lines[lineNumber].split('');
					positionX=0;
					for(var columnNumber in columns){
						if (lineNumber==0){
							this.calculatedWidth+=wide;
						}
						if (columns[columnNumber]==='1'){
							svg.rect(positionX,positionY,wide,wide);
						}
						positionX+=wide;
					}
					positionY+=wide;
					this.calculatedHeight+=wide;
				}
				break;
			case 'Code39':
				var simpleCode = new Code39();
				var sequence = simpleCode.getCode(code);
				var positionX = 0;
				var positionY = 0;
				var wide = this.barWidth;
				var narrow = this.barWidth/3;
				var barcode_height = (this.height==='auto')?50:this.height;
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
							svg.rect(positionX,positionY,narrow,barcode_height);
							positionX+=narrow;
							break;
						case 'W':
							svg.rect(positionX,positionY,wide,barcode_height);
							positionX+=wide;
							break;
					}
					
				} 
				this.calculatedWidth+=positionX;
				this.calculatedHeight+=barcode_height;
				break;
		}
	}
	return svg.toString(fullFile);
}

exports.Barcode = Barcode;