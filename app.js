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

var tree_page2 = require('./routes/tree_page2');
var tree_configuration = require('./routes/tree_configuration');

var one_for_all_test = require('./routes/one_for_all_test');

var dashboard = require('./routes/dashboard');

var io = require('socket.io')();
var app = express();

var real_time_listener_receiver_thrower = require("./module_js/real_time_listener_receiver_thrower");
real_time_listener_receiver_thrower.initiate_listener();
real_time_listener_receiver_thrower.initiate_middle_receiver_and_thrower(io);


//var real_time_module = require("./module_js/real_time_module");
//var io = require('socket.io')();
// io.sockets.on('connection', function (socket) {
//   console.log("hello!!!!!!!!!!!!!!!");
//   real_time_module.app_js_middle_receiver_and_thrower(socket,'ODD_test_js','update_DB_data');
// });


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
app.use('/inspect',one_for_all_test);
app.use('/users', users);
app.use('/ODD_test',ODD_test);
app.use('/test_template',test_template);

app.use('/tree_page2',tree_page2);
app.use('/tree_configuration',tree_configuration);

app.use('/dashboard',dashboard);


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
