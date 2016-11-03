module.exports = function(app) {
	app.use('/users', require('../src/routes/user'));
	// app.use('/news', require('../src/routes/news'));
	
}
