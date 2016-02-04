var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var log = require("libs/log")(module);
var error = require("error");
var HttpError = error.HttpError;
var routes = require('./routes/index');

var errorhandler = require('errorhandler')

var app = express();
var config = require("config");

log.info(config.get("port"));

app.engine("ejs", require("ejs-locals")); //layout partial block
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//Middleware
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require("middleware/sendHttpError"));
require("./routes/users")(app);

app.use(function (err, req, res, next) {
	//NODE_ENV = "production"
	if (typeof err === "number") {
		err = new HttpError(err);
	}
	if (err instanceof HttpError) {
		res.sendHttpError(err);
	} else {
		if (app.get("env") == "development") {
			var errorHandler = errorhandler();
			errorHandler(err, req, res, next);
		} else {
			res.sendHttpError();
		}
	}
});

module.exports = app;
