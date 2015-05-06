var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var main = require('./routes/main');
var item = require('./routes/item');
var mypage = require('./routes/mypage');
var setting = require('./routes/setting');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use('/', routes);
app.use('/users', users);
app.use('/login', login);
app.use('/main', main);
app.use('/item', item);
app.use('/mypage', mypage);
app.use('/setting', setting);

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


var http = require('http');
app.set('port', 8080);
var server = http.createServer(app);
server.listen(app.get('port'));
console.log('서버가 '+app.get('port') + '번 포트에서 실행중입니다.');

//// http와 https 정의
//var http = require('http');
//var https = require('https');
//var fs = require('fs');
//
//var options = {
//  key : fs.readFileSync('./key.pem', 'utf-8'),
//  cert : fs.readFileSync('./server.crt','utf-8')
//};
////console.log('options.key',options.key);
////console.log('options.cert',options.cert);
//
//var http_port = 80;
//var https_port = 443;
//
//http.createServer(app).listen(http_port, function(){
//  console.log('HTTP Server listening on port' + http_port);
//});
//
//https.createServer(options, app).listen(https_port, function(){
//  console.log('HTTPS Server listening on port' + https_port);
//});

module.exports = app;
