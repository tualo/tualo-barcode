var http = require('http');
var barcode = require('./lib/barcode');



var server = http.createServer(function(req, res) {
	res.writeHead(200);
	var svg = barcode.SVG.getCode39("tualo.de");
	res.end('<html><body style="background: gray;">'+svg+'</body></html>');
});

server.listen(parseInt(process.env.PORT) || 3000);
console.log("server listening on port %d …", server.address().port);