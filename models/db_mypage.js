// 마이페이지 관련 db 처리
// db_mypage.js

var mysql = require('mysql');
var db_config = require('./db_config');
var pool = mysql.createPool(db_config);