var db = require("./db");
db.connnect();
var User = require("./user");

function run() {
	var vasya = new User("Вася");
	var petya = new User("Петя");

	vasya.hello(petya);
	console.log(global.test);
	console.log(db.getPhrase("Run successful"));
}

if (module.parent) {
	exports.run = run;
} else {
	run();
}