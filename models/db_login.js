// 페이스북 로그인 관련 db 처리
// db_login.js

var mysql = require('mysql');
var db_config = require('./db_config');
var pool = mysql.createPool(db_config);