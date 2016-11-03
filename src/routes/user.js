var router = require('express').Router();
var userController = require('../controllers/user');
var policy = require('../policies/passport');

router
	.get(policy.authorize)
	.get('/', userController.index)
	.get('/emails', userController.emails)
	.get('/create', userController.create)
	.get('/edit/:id', userController.edit)
	.post(policy.authorize)
	.post('/store', userController.store)
	.post('/', userController.index)
	.post('/update', userController.update)
	.post('/destroy', userController.destroy);

module.exports = router;