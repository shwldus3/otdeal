var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');
var session = require('express-session');

var routes = require('./routes/index');
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
app.use(require('express-domain-middleware'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use('/', routes);
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
app.set('port', 3000);
var server = http.createServer(app);
server.listen(app.get('port'));
console.log('서버가 '+app.get('port') + '번 포트에서 실행중입니다.');

var domain = require('domain');
app.use(function(req, res, next) {
    var requestDomain = domain.create();
    requestDomain.add(req);
    requestDomain.add(res);
    requestDomain.on('error', function(err, res){
      next(err);
    });
    requestDomain.run(function(res){
      next();
    });
});

module.exports = app;
