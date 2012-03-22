var http = require('http');
var url = require('url');
var fs = require('fs');

var port = process.env.PORT || 1234;

var serve = http.createServer(function(req, res) {
	var urlParts = url.parse(req.url, true);

	if(urlParts.pathname == "" || urlParts.pathname == "/" || urlParts.pathname == "/index") {
				
		fs.readFile(__dirname + "/assets/downjs.html", function(err, data) {
			if(err) {
				console.log(err);
				res.end();
				return false;
			}

			res.end(data);
		});

	} else if(urlParts.pathname == "/downjs.css") {
		fs.readFile(__dirname + "/assets/downjs.css", function(err, data) {
			if(err) {
				console.log(err);
				res.end();
				return false;
			}

			res.end(data);
		});
	}

}).listen(port);
