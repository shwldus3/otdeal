// 마이페이지 관련 db 처리
// db_mypage.js

var mysql = require('mysql');
var db_config = require('./db_config');
var pool = mysql.createPool(db_config);

exports.update = function(dataArr, callback){
  pool.getConnection(function(err, conn){
    if(err) console.error('err', err);
    var sql = "update board set title=?, content=? where num=? and passwd=?";
    conn.query(sql, datas, function(err, row){
      if(err) console.error('err', err);
      var output = false;
      if(row.affectedRows == 1){
        output = true;
      }
      conn.release();
      callback(output);
    });
  });
};