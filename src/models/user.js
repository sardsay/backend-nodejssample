var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var mongoosePaginate = require('super-pagination').mongoose;
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	_id: Number,
	username: {
		type : String,
		unique : true,
		trim : true,
		required: true
	},
	password : String,
	salt: String,
	name: String,
	group: String,
	status: String,
	
},{ timestamps: { createdAt: 'created_at' } });
UserSchema.plugin(mongoosePaginate,{
    theme : 'bootstrap'
});
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);