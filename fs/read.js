var fs = require("fs");

fs.readFile(__filename + "1", {encoding: "utf-8"},function (err, data) {
	if (err) {
		console.log(err);
	} else {
		console.log(data);
		console.log(data[0]);
		console.log(data.length);
	}
});
