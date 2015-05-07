// 마이페이지 관련 db 처리
// db_mypage.js

var mysql = require('mysql');
var db_config = require('./db_config');
var pool = mysql.createPool(db_config);
var async = require('async');
var forEach = require('async-foreach').forEach;

exports.update = function(dataobj, callback){
  pool.getConnection(function(err, conn){
    if(err) console.error('err', err);
    var sql = "update board set title=?, content=? where num=? and passwd=?";
    conn.query(sql, dataobj, function(err, row){
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
    var sql = "select bsk.item_id, bsk.bsk_cnt, bsk.bsk_regdate, bsk.bsk_regtime, itm.item_name, itm.item_price, itm.item_saleprice, sz.size_name, itm.color_name from TBBSK bsk ,TBITM itm, TBSZ sz where bsk.user_id = ? and bsk.item_id = itm.item_id and itm.size_id = sz.size_id;";

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

exports.orderlist = function(user_id, callback){
  pool.getConnection(function(err, conn){
    if(err) console.error('err', err);
    var sql = "select dlvr.dlvr_stat, itm.item_id, itm.item_name, itm.color_name, sz.size_name, odr.order_id, odr.order_cnt, odr.total_price, odr.order_paystat, odr.order_regdate, odr.order_regtime from TBITM itm, TBSZ sz, TBODR odr, TBDLVR dlvr, (select * from TBODRITM odritm where odritm.order_id in (select order_id from TBODR where user_id = ?) ) a where itm.item_id = a.item_id and itm.size_id = sz.size_id and a.order_id = odr.order_id and dlvr.order_id = a.order_id";
    conn.query(sql, user_id, function(err, rows){
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