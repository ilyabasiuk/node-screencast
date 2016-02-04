var path = require("path");
var util = require("util");
var http = require("http");

function HttpError (statusCode, message) {
	Error.apply(this, arguments);
	Error.captureStackTrace(this, HttpError);

	this.status = statusCode;
	this.message = message || http.STATUS_CODES[statusCode] || "Error";
}

HttpError.prototype.name = "HttpError";

exports.HttpError = HttpError;