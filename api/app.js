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
mongoose.connect('mongodb://localhost/sailtracker');

var webRoutes = require('./routes/web');
var sensorsRoutes = require('./routes/sensors');
var simulatorRoutes = require('./routes/simulator');

var app = express();

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

// Routers
app.use(sensorsRoutes);
app.use(webRoutes);
app.use(simulatorRoutes);

app.get('/dashboard/mail', function (req, res) {
  request({
    uri: "http://localhost:3000/dashboard",
    method: 'GET'
  }, function (error, response, body) {
    if (error && response.statusCode != 200) {
      console.log("Server response: " + body);
    } else {
      console.log(body);
      pdf.create(body).toFile('../ressources/report.pdf', function (err, res) {
        if (err) return console.log(err);
        console.log(res); // { filename: '/app/businesscard.pdf' }
      });
      app.mailer.send('dashboard/index', {
        to: 'sailtracker@anthozano.fr', // REQUIRED. This can be a comma delimited string just like a normal email to field.
        subject: 'BI Report', // REQUIRED.
        attachments: {
          filename: "report.pdf",
          filepath: "ressources/report.pdf"
        }
      }, function (err) {
        if (err) {
          // handle error
          console.log(err);
          res.send('There was an error sending the email');
          return;
        }
      });
    }
  });
  res.redirect('/dashboard');
});

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
