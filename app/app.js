var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var log = require("libs/log")(module);
var error = require("error");
var HttpError = error.HttpError;
var ObjectID = require("mongodb").ObjectID;
var routes = require('./routes/index');
var users = require('./routes/users');

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

app.get("/", function (req, res, next) {
	res.render("index", {
		title: "Hello world"
	});
});

var User = require("models/user").User;
app.get("/users", function (req, res, next) {
	User.find({}, function (err, users) {
		if (err) return next(err);
		//res.end(users.map((user) => user.username).join("*"));
		res.json(users);
	})
});

app.get("/user/:id", function (req, res, next) {
	try {
		var id = new ObjectID(req.params.id);
	} catch (e) {
		return next(404);
	}
	User.findById(id, function (err, user) {
		if (err) return next(err);
		if (!user) return next(new error.HttpError(404, "Юзер потерялся"));
		//res.end(users.map((user) => user.username).join("*"));
		res.json(user);
	});
});

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
//// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
//
//// uncomment after placing your favicon in /public
////app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
//
//app.use('/', routes);
//app.use('/users', users);
//
//// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//  var err = new Error('Not Found');
//  err.status = 404;
//  next(err);
//});
//
//// error handlers
//
//// development error handler
//// will print stacktrace
//if (app.get('env') === 'development') {
//  app.use(function(err, req, res, next) {
//    res.status(err.status || 500);
//    res.render('error', {
//      message: err.message,
//      error: err
//    });
//  });
//}
//
//// production error handler
//// no stacktraces leaked to user
//app.use(function(err, req, res, next) {
//  res.status(err.status || 500);
//  res.render('error', {
//    message: err.message,
//    error: {}
//  });
//});


module.exports = app;
