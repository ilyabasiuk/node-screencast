//module.exports = exports = this

var db = require("../db");

function User(name) {
	this.name = name;
}

User.prototype.hello = function (who) {
	console.log(db.getPhrase("Hello") + ", " + who.name);
};

console.log("user.js is required");

module.exports = User;
global.test = "Test";