// 상품 및 주문 관련 db 처리
// db_item.js

var mysql = require('mysql');
var db_config = require('./db_config');
var pool = mysql.createPool(db_config);