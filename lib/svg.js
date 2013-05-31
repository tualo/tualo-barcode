var DOMtoString=function(dom){
	var start = '<';
	var tag = dom.tag;
	var attr = '';
	if (typeof dom.attr!=='undefined'){
		for(var i in dom.attr){
			attr+=' ';
			attr+=dom.attr[i].key;
			attr+='="'+dom.attr[i].value+'"';
		}
	}
	var end = '/>';
	if (typeof dom.childs!='undefined'){
		var chld = '';
		for(var i in dom.childs){
			chld+=DOMtoString(dom.childs[i]);
		}
		end = '>'+chld+'</'+tag+'>';
	}else if (typeof dom.text!='undefined'){
		end = '><![CDATA['+dom.text+']]></'+tag+'>';
	}
	return [start,tag,attr,end].join('');
};

var SVG = function(options){
	this.dom = [];
	this.fillColor='black';
	this.strokeColor='black';
	this.strokeWidth=1;
	this.unit='mm';
	this.width=100;
	this.height=100;
	
	for(var optionName in options){
		this[optionName]=options[optionName];
	}
}

/**
* returns the svg-string 
*/
SVG.prototype.toString=function(fullFile){
	if (fullFile===true){
		var dom = {
			tag: 'svg',
			attr:[
				{key: 'width',value: this.width+this.unit},
				{key: 'height',value: this.height+this.unit}
			],
			childs: this.dom
		};
		return '<?xml version="1.0" encoding="UTF-8" standalone="no"?>'
			+"\n\r"
			+'<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">'
			+"\n\r"
			+DOMtoString(dom);

	}else{
		return DOMtoString(dom);
	}
}

SVG.prototype.rect=function(x,y,width,height,fillColor,strokeColor,strokeWidth){
	if (typeof x==='undefined'){ x=0; }
	if (typeof y==='undefined'){ y=0; }
	if (typeof width==='undefined'){ width=0; }
	if (typeof height==='undefined'){ height=0; }

	if (typeof fillColor==='undefined'){ fillColor=this.fillColor; }
	if (typeof strokeColor==='undefined'){ strokeColor=this.strokeColor; }
	if (typeof strokeWidth==='undefined'){ strokeWidth=this.strokeWidth; }
	this.dom.push({
		tag: 'rect',
		attr: [
			{key:'x',value: (x)+this.unit},
			{key:'y',value: (y)+this.unit},
			{key:'width',value: (width)+this.unit},
			{key:'height',value: (height)+this.unit},
			{key:'fill',value: fillColor},
			{key:'stroke',value: strokeColor},
			{key:'stroke-width',value: strokeWidth}
		]
	});
}

exports.SVG = SVG;