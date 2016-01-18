var User = require("./user");
console.log(User);
function run() {
	var vasya = new User("Вася");
	var petya = new User("Петя");

	vasya.hello(petya);
	console.log(global.test);
}

if (module.parent) {
	exports.run = run;
} else {
	run();
}