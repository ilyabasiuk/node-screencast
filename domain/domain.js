var domain = require("domain");

var d = domain.create();

d.on("error", function (err) {
	console.log("Домен перехватил %s", err);
});

d.run(function () {
	//ERROR();
	setTimeout(function () {
		console.error(process.domain);
		fs.readFile(__filename, function () {
			ERROR();
		});
		//ERROR();
	}, 1000);
});