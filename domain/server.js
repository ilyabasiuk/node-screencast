var http = require("http");
var fs = require("fs");

function handler(req, res) {
	if (req.url === "/") {
		fs.readFile("index1.html", function (err, data) {
			if (err) throw err;
			res.end(data);
		});
	} else {
		res.statusCode = 404;
		res.end("Not Found");
	}
}

var server = http.createServer(handler);
module.exports = server;