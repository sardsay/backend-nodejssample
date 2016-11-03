var express = require('express');
var app = express();
var router = express.Router();
var csrf = require('csurf')
var flash = require('connect-flash');
var config = require('./config');

/*
	parser setup
 */

app.use(require('cookie-parser')());
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(csrf({ cookie: true }))
// app.use(function (req, res, next) {
//     res.cookie("XSRF-TOKEN",req.csrfToken());
//     return next();
// });
// error handler 
app.use(function (err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') return next(err)
 
  // handle CSRF token errors here 
  res.status(403)
  res.send('form tampered with')
})

/*
	express session setup
 */
require('./libs/session')(app);

/*
	mongoose connection
 */
require('./libs/mongoose')(config);

/*
	passport setup
 */
require('./libs/passport')(app);
app.use(flash());
/*
	csrf  setup
 */
// require('./libs/csrf')(app);
/*
	model setup
 */
// require('./app/models/customer')();

/*
	swig setup
 */
require('./libs/swig')(app);

/*
	static routes setup
 */
var path = require('path');
app.use(express.static(path.resolve(__dirname, 'public')));
// app.get('/', function(req, res) {
// 	// res.sendFile(path.resolve(__dirname, 'public/index.html'));
// 	res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
// });

/*
	authorization
 */

app.use(require('./src/routes/authen'));
// app.use((require('./src/policies/passport')).authorize);


// app.use(router);
/*
	routes setup
 */
require('./libs/routes')(app);


app.listen(config.express.port);