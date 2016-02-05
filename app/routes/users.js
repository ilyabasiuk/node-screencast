var error = require("error");
var HttpError = error.HttpError;
var ObjectID = require("mongodb").ObjectID;
var express = require('express');
var router = express.Router();

router.get("/", function (req, res, next) {
	res.render("index", {
		title: "Hello world"
	});
});

var User = require("models/user").User;
router.get("/users", function (req, res, next) {
	User.find({}, function (err, users) {
		if (err) return next(err);
		//res.end(users.map((user) => user.username).join("*"));
		res.json(users);
	})
});

router.get("/user/:id", function (req, res, next) {
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

module.exports = router;
