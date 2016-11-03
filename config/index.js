var env = process.env.NODE_ENV || 'dev';

var config = {
	dev: {
		express: {
			port: 7778
		},
		mongodb: {
			uri: 'mongodb://localhost/test'
		}
	},
	production: {
		express: {
			port: 80
		},
		mongodb: {
			uri: 'mongodb://www.test.com/test'
		}
	}
}

module.exports = config[env];