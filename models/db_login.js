// 페이스북 로그인 관련 db 처리
// db_login.js

var mysql = require('mysql');
var db_config = require('./db_config');
var pool = mysql.createPool(db_config);

exports.fblogin = function(dataArr, done){
  pool.getConnection(function (err, conn) {
    if(err) console.log('err', err);

    var sql = "insert into TBUSR (user_id, token) values(?,?)";
    conn.query(sql, dataArr, function(err, row) {
      if (err) console.log('err', err);
      var success = false;
      if(row.affectedRows == 1 ){
        success = true;
      }
      done(success);
      conn.release();
    });
  });
};


