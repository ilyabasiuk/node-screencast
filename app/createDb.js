var mongoose = require("libs/mongoose");
var async = require("async"); // Promise, Fibers
var User = require("models/user").User;


// 1. drop db
// 2. create & save 3 users
// 3. close connection
console.log(mongoose.connection.readyState);

mongoose.connection.on("open", function () {
	var db = mongoose.connection.db;
	db.dropDatabase(function (err) {
		if (err) throw err;

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
				var admin = new User({username: "Петя", password: "thetruehero"});
				admin.save(function (err) {
					callback(err, admin);
				});
			}
		], function (err, results) {
			console.log(arguments);
			mongoose.disconnect();
		});

	});
});
