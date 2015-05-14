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
var push = require('./routes/push');

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
app.use('/push', push);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.json({ success:0, msg:"[404] 해당 프로토콜을 찾을 수 없습니다."});
  next();
});

// error handlers
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.log(err);
  res.json({ success:0, msg:"수행도중 에러가 발생했습니다.", result: err.message});
  next();
  // next(err);
});


var http = require('http');
app.set('port', 3000);
var server = http.createServer(app);
server.listen(app.get('port'));
console.log('서버가 '+app.get('port') + '번 포트에서 실행중입니다.');


module.exports = app;
