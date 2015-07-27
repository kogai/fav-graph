"use bable";

import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';

import { secret } from 'credential.js';
import routers from 'routers/';

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
	secret: secret
,	cookie: {
		maxAge: 30 * 24 * 60 * 60 * 1000
	}
}));

app.use(passport.initialize());
app.use(passport.session());


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

app.use(routers);

app.listen(process.env.PORT || 3000, function(){
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

*/
