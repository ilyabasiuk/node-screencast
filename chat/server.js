var http = require("http");
var fs = require("fs");
var url = require("url");
var EventEmitter = require("events");
var messages = new EventEmitter();

http.createServer(function (req, res) {
	if (req.url === "/publish" && req.method === "POST") {
		handlePOST(req, res, processNewMessage);
	} if (req.url === "/subscribe") {
		processSubscribe(req, res);
	}else {
		fs.readFile("index.html", function (err, data) {
			if (err) throw err;
			res.end(data);
		})
	}
}).listen(3000);

function handlePOST (request, response, callback) {
	var jsonString = "";
	request.on('data', function (data) {
		data && (jsonString += data);
	});
	request.on('end', function () {
		callback(request, response, JSON.parse(jsonString));
	});
}
function processNewMessage (req, res, data) {
	console.log(data.message);
	messages.emit("message", data.message);
	res.end("OK");
}

function processSubscribe (req, res) {
	var cleanUp = function () {
			console.log("cleanUp")
			messages.removeListener("message", sendData);
		},
		sendData = function (data) {
			console.log(data);
			res.end(data);
			cleanUp();
		};

	messages.on("message", sendData);
	res.on("close", cleanUp);
}