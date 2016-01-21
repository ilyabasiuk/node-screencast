// http://127.0.0.1/echo?message=Hello
var http = require("http");
var url = require("url");

var server = new http.Server(function (req, res) {
	var urlParsed = url.parse(req.url, true);
	if (urlParsed.pathname === "/echo" && urlParsed.query.message) {
		res.setHeader("cache-control", "no-cache"); //removeHeader
		//res.writeHead(200, "OK", {"Cache-control": "no-cache"});
		res.end(urlParsed.query.message);
		return
	}

	res.statusCode = 404;
	res.end("Page not found");
});

server.listen(1377, "127.0.0.1");