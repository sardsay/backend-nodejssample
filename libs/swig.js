var swig = require('swig');
var path = require('path');

module.exports = function(app) {
	app.engine('html', swig.renderFile);
	app.set('views', path.resolve(__dirname, '../public', 'views'));
	app.set('view engine', 'html');
	app.set('view cache', false);
	swig.setDefaults({ cache: false });
}