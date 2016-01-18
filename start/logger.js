
module.exports = function (module) {
	return function () {
		var args = [module.id].concat([].slice.call(arguments));
		console.log.apply(console, args);
	}
};
