// 페이스북 로그인 관련 db 처리
// db_login.js

var mysql = require('mysql');
var db_config = require('./db_config');
var pool = mysql.createPool(db_config);

/**
 * 업무명 : 페이스북 정보 저장
 * @param  {[type]}   dataArr [inputDate : user_id, name, access_token]
 * @param  {Function} done
 * @return {[boolean]}        [성공여부]
 */
exports.fblogin = function(dataArr, done){
  pool.getConnection(function (err, conn) {
    if(err) console.log('err', err);

    var sql = "insert into TBUSR (user_id, name, token, user_regdate) values(?,?,?, now())";
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


