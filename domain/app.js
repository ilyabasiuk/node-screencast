var domain = require("domain");
var serverDomain = domain.create();
var server;
serverDomain.on("error", function (err) {
	console.log("Домен перехватил %s", err);
	if (server) server.close();
	setTimeout(function () {
		process.exit();
	}, 1000).unref();
});

serverDomain.run(function() {
	var http = require("http");
	var handler = require("./server");

	server = http.createServer(function (req, res) {
		var reqDomain = domain.createDomain();
		reqDomain.add(req);
		reqDomain.add(res);
		reqDomain.run( function () {
			handler(req, res);
		});

		reqDomain.on("error", function (err) {
			console.log("Error for req = ", req.url);
			res.statusCode = 404;
			res.end("Server Error");
			serverDomain.emit("error", err);
		});
	});

	server.listen(3000);
});
