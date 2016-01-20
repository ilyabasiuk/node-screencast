var http = require("http");
var server = new http.Server(); // EventEmitter

server.listen(1377, "127.0.0.1");

server.on("request", function (req, res) {
	res.end("Hello World!!");
})