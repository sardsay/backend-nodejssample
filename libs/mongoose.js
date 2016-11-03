var mongoose = require('mongoose');

module.exports = function(config) {

	mongoose.connect(config.mongodb.uri);

	var db = mongoose.connection;

	db.on('error', function () {
		throw new Error('unable to connect to database at ' + config.db);
	});

}