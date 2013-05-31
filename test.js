var http = require('http');
var Barcode = require('./lib/barcode').Barcode;



var server = http.createServer(function(req, res) {
	res.writeHead(200);
	var svg = (new Barcode({
		type: 'Code39',
		width: 300
	})).getSVG('tualo.de',true);

	var svg2 = (new Barcode({
		type: 'Datamatrix',
		fillColor: 'blue',
		strokeColor: 'darkblue',
		strokeWidth: 1,
		width: 'auto',
		height: 'auto'
	})).getSVG('ehrgfevfzefdhewhvfdgebfghefdeb vfdghg34zurt7364 34udf34v hgcqewf tualo.de',true);
	
	res.end('<html><body style="background: white;">'+svg+'<br/><br/>'+svg2+'</body></html>');
});

server.listen(parseInt(process.env.PORT) || 3000);
console.log("server listening on port %d …", server.address().port);