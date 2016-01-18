var db = require("db");
db.connect();
var log = require("logger")(module);
var User = require("user");

function run() {
	var vasya = new User("Вася");
	var petya = new User("Петя");

	vasya.hello(petya);
	log(global.test);
	log(db.getPhrase("Run successful"));
}

if (module.parent) {
	exports.run = run;
} else {
	run();
}