var mongoose = require("libs/mongoose");
var async = require("async"); // Promise, Fibers
var User = require("models/user").User;


// 1. drop db
// 2. create & save 3 users
// 3. close connection

async.series([
	open,
	dropDatabase,
	createUsers,
	close
], function (err, results) {
	if (err) throw err;
	console.log(arguments);
});

function open(callback) {
	mongoose.connection.on("open", callback);
}

function dropDatabase (callback) {
	var db = mongoose.connection.db;
	db.dropDatabase(callback);
}

function createUsers (callback) {
	var users = [
		{username: "Вася", password: "supervasya"},
		{username: "Петя", password: "123"},
		{username: "admin", password: "thetruehero"}
	];

	async.each(users, function (userData, callback) {
		var user = new User(userData);
		user.save(callback);
	}, callback);
}

function close(callback) {
	mongoose.disconnect(callback);
}
