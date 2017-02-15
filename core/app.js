var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var request = require('request');

var mailer = require('express-mailer');
var fs = require('fs');
var pdf = require('html-pdf');

// Connecting to database
var mongoose = require('mongoose');
// var Role = require('./Models/Role');
mongoose.connect('mongodb://localhost/sailtracker');
//
// Role.create({
//   name: "Admin"
// });
//
// Role.create({
//   name: "User"
// });

var app = express();
var methodOverride = require('method-override')
app.use(methodOverride('_method'));

// Router loading
var webRoutes = require('./routes/web');
var sensorsRoutes = require('./routes/sensors');
var simulatorRoutes = require('./routes/simulator');
var biRoutes = require('./routes/bi');
var omcRoutes = require('./routes/omc');

var app = express();
var methodOverride = require('method-override')
app.use(methodOverride('_method'));

// Mailer setup
mailer.extend(app, {
  from: 'sailtracker@anthozano.fr',
  host: 'auth.smtp.1and1.fr', // hostname
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: 'sailtracker@anthozano.fr',
    pass: 'sailtracker2017'
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'attempt',
  resave: false,
  saveUninitialized: true,
  cookie: {secure: false}
}));

// module.exports = mailer;

// Routers
app.use(sensorsRoutes);
app.use(webRoutes);
app.use(simulatorRoutes);
app.use(biRoutes);
app.use(omcRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
