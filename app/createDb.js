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
	async.parallel([
		function (callback) {
			var vasya = new User({username: "Вася", password: "supervasya"});
			vasya.save(function (err) {
				callback(err, vasya);
			});
		},
		function (callback) {
			var petya = new User({username: "Петя", password: "123"});
			petya.save(function (err) {
				callback(err, petya);
			});
		},
		function (callback) {
			var admin = new User({username: "фвьшт", password: "thetruehero"});
			admin.save(function (err) {
				callback(err, admin);
			});
		}
	], callback);
}

function close(callback) {
	mongoose.disconnect(callback);
}
