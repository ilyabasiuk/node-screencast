var winston = require("winston");
var ENV = process.env.NODE_ENV;
var path = require("path");

function getLogger (module) {
	var filePath = module.filename.split(path.sep).slice(-2).join(path.sep);

	return new winston.Logger({
		transports: [
			new winston.transports.Console({
				colorize: true,
				level: ENV == "development" ? "debug" : "error",
				label: filePath
			})
		]
	});
}

module.exports = getLogger;