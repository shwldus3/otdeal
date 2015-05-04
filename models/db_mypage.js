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

exports.bsklist = function(user_id, callback){
  pool.getConnection(function(err, conn){
    if(err) console.log('err', err);
    var sql = "select 0000 from 0000 where 0000 and user_id=?"; // 쿼리문 작성해라 성원아!!!>0<
    conn.query(sql, user_id, function(err, rows){
      if(err) console.error('err', err);
      console.log('rows', rows);
      conn.release();
      callback(rows);
    });
  });
};


exports.bskupdate = function(dataArr, done){
  pool.getConnection(function(err, conn) {
    var sql = 'update member set name=?, email=?, tel=?, address=?, job=?, gender=?, birth=?, modidate=now() where id=? and passwd=?';
    conn.query(sql, dataArr, function(err, row){
      if(err) {
        console.log('err', err);
      } else {
        console.log('row', row);
      }
      var success = false;
      if(row.affectedRows == 1) {
        success = true;
      }
      done(success);
      conn.release();
    });
  });
};

exports.orderlist = function(dataArr, callback){
  pool.getConnection(function(err, conn){
    if(err) console.error('err', err);

    var sql = "select TBODR.order_id, TBODR.total_price , TBITM.item_name, TBODR.order_cnt, TBODR.order_paystat, TBODR.order_regdate, TBODR.order_regtime, TBDLVR.dlvr_stat from TBODR, TBITM, TBDLVR where TBODR.order_id=TBDLVR.order_id and TBITM.item_id=TBODR.item_id and user_id=? and order_id=?";
    conn.query(sql, dataArr, function(err,rows){
      if(err) console.error('err', err);
      console.log('rows', rows);
      conn.release();
      callback(rows);
    });
  });
};


exports.delete = function(dataArr, callback){
  pool.getConnection(function(err, conn){
    if(err) console.error('err', err);
    var sql = "delete from TBODR where user_id=? and order_id=?";
    conn.query(sql, dataArr, function(err, row){
      if(err) console.error('err', err);
      var success = false;
      if(row.affectedRows == 1){
        success = true;
      }
      conn.release();
      callback(success);
    });
  });
};