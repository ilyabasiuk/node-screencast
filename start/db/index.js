var phrases;

exports.connnect = function () {
	phrases = require("./phrases");
}

exports.getPhrase = function (name) {
	if (!phrases[name]) {
		throw new Error("Нет такой фразы: +" + name);
	}
	return phrases[name];
};