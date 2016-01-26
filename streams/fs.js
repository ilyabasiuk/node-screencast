var fs = require("fs");

var stream = new fs.ReadStream("big1.html");

stream.on("readable", function () {
	var data = stream.read();
	console.log(data && data.length);
});

stream.on("end", function (){
	console.log("THE END");
});

stream.on("error", function (err) {
	console.log(err);
})