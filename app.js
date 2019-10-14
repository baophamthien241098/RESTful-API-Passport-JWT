var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();
const auth = require('./routes/auth');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const passport    = require('passport');
require('./passport');
app.use('/user', auth);
app.use('/me', passport.authenticate('jwt', {session: false}), usersRouter);

module.exports = app;
