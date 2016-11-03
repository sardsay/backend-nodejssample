var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var AuthenSchema = new Schema({
	username: String,
	password: String
});

AuthenSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Authen', AuthenSchema);