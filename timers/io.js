var fs = require("fs");



fs.open(__filename, "r", function (err, info) {
	console.log("IO");
});

setImmediate(function () {
	console.log("setImmediate");
});

setTimeout(function () {
	console.log("setTimeout")
}, 0);

process.nextTick(function () {
	console.log("nextTick")
});

// setImmediate == setTimeout(fn, 0) после IO
// process.nextTick == setTimeout(fn, 0) до IO