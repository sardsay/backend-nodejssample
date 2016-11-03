var mongoose = require('mongoose');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var User = require('../src/models/user');


module.exports = function(app) {
	app.use(passport.initialize());
	app.use(passport.session());

	passport.use(new localStrategy(User.authenticate()));
	passport.serializeUser(User.serializeUser());
	passport.deserializeUser(User.deserializeUser());
	
}
