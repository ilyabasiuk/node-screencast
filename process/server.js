//node server.js --port=3000
//supervisor -- server.js --port=3000
var http = require("http");
console.log(require("optimist").argv);

http.createServer(function (req, res) {
	res.end("The server is runing");
}).listen(require("optimist").argv.port || 3000);