module.exports.authorize = function(req, res, next) {
	if (req.user) {console.log('login')
		next();
	} else {
		res.status(403).redirect('/login');
	}
}
module.exports.pagenotfound = function(req, res, next) {
	res.render('404-not-found', { status: 404, url: req.url });
}