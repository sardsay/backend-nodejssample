var mongoose = require('mongoose');
var Schema = mongoose.Schema;

	var CountersSchema = new Schema({
		_id :String,
    	seq :Number 
	});

	CountersSchema.statics.increment = function (field, callback) {
    	return this.findByIdAndUpdate(field, { $inc: { seq: 1 } }, {new: true, upsert: true, select: {seq: 1}}, callback);
	};
module.exports = mongoose.model('Counters', CountersSchema);
