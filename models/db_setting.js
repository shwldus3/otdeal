// 설정 관련 db처리
// db_setting.js

var mysql = require('mysql');
var db_config = require('./db_config');
var pool = mysql.createPool(db_config);