var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

var port = process.env.PORT || 1234;

//Heroku has a weird node version
var exists = (fs.exists) ? fs.exists : path.exists;

var serve = http.createServer(function(req, res) {
	var urlParts = url.parse(req.url, true);

	if(urlParts.pathname == "" || urlParts.pathname == "/" || urlParts.pathname == "/index" || urlParts.pathname == "/index.html") {
				
		fs.readFile(__dirname + "/assets/downjs.html", function(err, data) {
			if(err) {
				console.log(err);
				res.end();
				return false;
			}

			res.end(data);
		});

	} else {
		exists(__dirname + "/assets/" + path.basename(urlParts.pathname), function(exists) {
			if(exists) {
				fs.readFile(__dirname + "/assets/" + path.basename(urlParts.pathname), function(err, data) {
					if(err) {
						console.log(err);
						res.end();
						return false;
					}

					res.end(data);
				});

			} else {
				res.statusCode = 404;
				res.end("File Not Found!");
			}
		});
	}

}).listen(port);
