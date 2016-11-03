var router = require('express').Router();
var authen = require('../controllers/authen');
router
	.get('/', authen.index)
	.get('/login', authen.index)
		// .post('/login', authen.passportLogin)
	.post('/login', authen.passportLogin, function(req, res) {
		res.redirect('/users')
		// res.send('Authenticated !!!');
	})
	.post('/logout', authen.passportLogout);


module.exports = router;