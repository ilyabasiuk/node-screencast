var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var schema = mongoose.Schema({
	name: String
});

schema.methods.say = function () {
	console.log("%s: %s",this.get("name"), "meow!" );
};
var Cat = mongoose.model('Cat', schema); // cats collection

var kitty = new Cat({
	name: 'Zildjian'
});
kitty.save(function (err, kitty, affected) {
	kitty.say();
});

//kitty.save(function (err) {
//	if (err) // ...
//		console.log('meow');
//});