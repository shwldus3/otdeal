// 메인 페이지 관련 db 처리
// db_main.js

var mysql = require('mysql');
var db_config = require('./db_config');
var pool = mysql.createPool(db_config);