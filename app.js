var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var ODD_test = require('./routes/ODD_test');
var test_template = require('./routes/test_template');
var tree_page = require('./routes/tree_page');
var tree_page2 = require('./routes/tree_page2');
var tree_configuration = require('./routes/tree_configuration');


var io = require('socket.io')();
io.sockets.on('connection', function (socket) {
  console.log('client connect');
  // laborLive.WSConstruct(socket);
  socket.on('ODD_test_js', function (new_data) {
    // we tell the client to execute 'new message'
    console.log('from app.js to html')
    //console.log(new_data);
    socket.broadcast.emit('update_DB_data', {
      app_js: new_data
    });
  });
});

var app = express();
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

app.use('/', routes);
app.use('/users', users);
app.use('/ODD_test',ODD_test);
app.use('/test_template',test_template);
app.use('/tree_page',tree_page);
app.use('/tree_page2',tree_page2)
app.use('/tree_configuration',tree_configuration);


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
