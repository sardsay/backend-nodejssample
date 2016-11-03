module.exports = function(app) {
	app.use(require('express-session')({
		secret: 'secret',
		resave: false,
		saveUninitialized: false,
		cookie: { maxAge: 6000 }
	}));
}