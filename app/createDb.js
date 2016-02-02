var mongoose = require("libs/mongoose");
mongoose.set("debug", true);
var async = require("async"); // Promise, Fibers

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
	console.log("Drop database: will be execute after mongoose  apply its settings to db :(");
	// use db.users.getIndexes() from mongo console to check if indexes was created
	db.dropDatabase(callback);
}

function createUsers (callback) {
	require("models/user");

	var users = [
		{username: "Вася", password: "supervasya"},
		{username: "Петя", password: "123"},
		{username: "admin", password: "thetruehero"}
	];

	async.each(users, function (userData, callback) {
		var user = new mongoose.models.User(userData);
		user.save(callback);
	}, callback);
}

function close(callback) {
	mongoose.disconnect(callback);
}
