var http = require("http");
var server = http.createServer(function (req, res) {

}).listen(3000);

setTimeout(function () {
	server.close(
		//function () {
		//	//process.exit();
		//	clearInterval(timer);
		//}
	);
}, 2500);

var timer = setInterval(function () {
	console.log(process.memoryUsage());
}, 1000);

timer.unref();