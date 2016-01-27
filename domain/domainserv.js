var domain = require("domain");
var fs = require("fs"), http = require("http");
var d = domain.create(), server;

d.on("error", function (err) {
	console.log("Домен перехватил %s", err);
});

d.run(function () {
	// d.enter -> process domain
	server = new http.createServer();
	// d.exit
});

server.on("boom", function () {
	setTimeout(function () {
		console.error(process.domain);
		fs.readFile(__filename, function () {
			ERROR();
		});
		//ERROR();
	}, 1000);
});

server.emit("boom");