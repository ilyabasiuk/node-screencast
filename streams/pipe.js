var http = require("http");
var fs = require("fs");

new http.Server(function (req, res) {
	if (req.url == "/big.html") {
		console.log(process.memoryUsage());
		var file = new fs.ReadStream("big.html");
		sendFile(file, res);
	} else  {
		res.end("No such file");
	}
}).listen(3000);

function sendFile(file, res) {
	//file.on("readable", write);
	//function write() {
	//	var fileContent = file.read();
	//
	//	if (fileContent && !res.write(fileContent)) {
	//		file.removeListener("readable", write);
	//		res.once("drain", function () {
	//			file.on("readable", write);
	//			write();
	//		})
	//	}
	//}
	//file.on("end", function () {
	//	res.end();
	//});
	file.pipe(res);
	//file.pipe(process.stdout); could put readable in one or more writable
	file.on("error", function() {
		res.statusCode = 500;
		res.end("Server Error");
		console.log(err);
	});

	file
		.on("open", function () {
			console.log("open");
		})
		.on("close", function () {
			console.log("close");
		});

	res.on("close", function () {
		file.destroy();
	});
}