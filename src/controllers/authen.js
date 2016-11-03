var User = require('../models/user');
var passport = require('passport');
var MyCoreFunction = require('../../libs/mycorefunction');

module.exports.index = function(req, res) {

	if (!req.user) {
		res.render('login',{ csrfToken: req.csrfToken(), response:req.flash()});
	}else{
		res.redirect('/users')
	}
	
}
module.exports.passportLogin =  function(req, res, next) {
		var user = {
			username: req.body.txtemail,
			password: req.body.txtpassword
		}
		
		User.authenticate()(user.username, user.password, function(err, user, options) {
			if (!user) {
				// console.log(err)
				res.send('Error');
			} else {
				req.login(user, function(err) {
					next();
				});
			}
		});
		
}

module.exports.passportLogout = function(req, res) {
	req.logout();
	res.redirect('/login')
}