var http = require("http");
var fs = require("fs");


http.createServer(function (req,res) {
	if (req.url == "/") {
		fs.readFile("index.html", function (err, info) {
			console.log(info, err);
			//if (err) throw err;
			if (err) {
				console.error(err);
				res.statusCode = 500;
				res.end("На сервере произошла ошибка");
				return;
			}
			res.end(info);
		});
	} else {
		res.end("Hello");
	}

}).listen(3000);
