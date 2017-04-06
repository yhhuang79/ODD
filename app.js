var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var ODD_test = require('./routes/ODD_test');
var test_template = require('./routes/test_template');
var tree_configuration = require('./routes/tree_configuration');
var tree_configuration_display = require('./routes/tree_configuration_display');
var data_query = require('./routes/data_query');
var dashboard = require('./routes/dashboard');

var ODD = require('./module_js/ODD_BOT_module');
ODD.BOT();

var io = require('socket.io')();
var app = express();
var real_time_listener_receiver_thrower = require("./module_js/real_time_listener_receiver_thrower");
real_time_listener_receiver_thrower.initiate_listener();
real_time_listener_receiver_thrower.initiate_middle_receiver_and_thrower(io);
app.io=io;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
app.use('/dashboard',dashboard);
app.use('/tree_configuration',tree_configuration);
app.use('/tree_configuration_display',tree_configuration_display);
app.use('/inspect',data_query);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
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
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
