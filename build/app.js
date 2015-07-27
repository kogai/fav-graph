'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _credentialJs = require('credential.js');

var _routers = require('routers/');

var _routers2 = _interopRequireDefault(_routers);

"use bable";

var app = (0, _express2['default'])();

app.use(_bodyParser2['default'].json());
app.use((0, _cookieParser2['default'])());
app.use((0, _expressSession2['default'])({
	secret: _credentialJs.secret,
	cookie: {
		maxAge: 30 * 24 * 60 * 60 * 1000
	}
}));

app.use(_passport2['default'].initialize());
app.use(_passport2['default'].session());

app.set('views', _path2['default'].join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(_express2['default']['static'](_path2['default'].join(__dirname, 'public')));

app.use(_routers2['default']);

app.listen(process.env.PORT || 3000, function () {
	console.log('server start listening.');
});

/*
app.use('/', routes);
app.use('/account', account);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
	'use strict';
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		'use strict';
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	'use strict';
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

module.exports = app;
*/