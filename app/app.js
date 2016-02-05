var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var log = require("libs/log")(module);
var error = require("error");
var HttpError = error.HttpError;
var mongoose = require("libs/mongoose");
//var routes = require('./routes/index');
var routes = require("./routes/users");

var errorhandler = require('errorhandler')

var app = express();
var config = require("config");

log.info(config.get("port"));

app.engine("ejs", require("ejs-locals")); //layout partial block
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const MongoStore = require('connect-mongo')(session);

app.use(session({ resave: true,
					saveUninitialized: true,
					cookie: config.get("session:cookie"),
					name: config.get("session:key"),
					secret: config.get("session:secret"),
					store: new MongoStore({
						mongooseConnection: mongoose.connection
					}) }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
	req.session.numberOfVisits =  req.session.numberOfVisits + 1 || 1;
	//res.send("Visits:" + req.session.numberOfVisits);
	next();
});

app.use(require("middleware/sendHttpError"));
app.use("/", routes);

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
