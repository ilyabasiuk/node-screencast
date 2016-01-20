var http = require("http");
var server = new http.Server(); // EventEmitter
// hrrp.Server -> net.Server -> EventEmitter
server.listen(1377, "127.0.0.1");
var counter = 0;
console.log(http.Server);
var emit = server.emit;

server.emit = function (name) {
	console.log(name);
	emit.apply(server, arguments);
};
server.on("request", function (req, res) {
	res.end("Hello World!!" + ++counter);
});