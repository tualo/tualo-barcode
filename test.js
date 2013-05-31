var http = require('http');
var Barcode = require('./lib/barcode').Barcode;

var server = http.createServer(function(req, res) {
	res.writeHead(200);
	var code_39_svg = (new Barcode({
		type: 'Code39',
		width: 300
	})).getSVG('tualo.de',true);

	var datamatrix_svg = (new Barcode({
		type: 'Datamatrix',
		fillColor: 'blue',
		strokeColor: 'darkblue',
		strokeWidth: 1,
		width: 'auto',
		height: 'auto'
	})).getSVG('http://tualo.de',true);
	
	res.end('<html><body style="background: white;">'+code_39_svg+'<br/><br/>'+datamatrix_svg+'</body></html>');
});

server.listen(parseInt(process.env.PORT) || 3000);
console.log("server listening on port %d …", server.address().port);