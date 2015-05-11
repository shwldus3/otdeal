// 마이페이지 관련 db 처리
// db_mypage.js

var mysql = require('mysql');
var db_config = require('./db_config');
var pool = mysql.createPool(db_config);
var async = require('async');
var forEach = require('async-foreach').forEach;

exports.update = function(dataArr, callback){
  pool.getConnection(function(err, conn){
    if(err) console.error('err', err);
    var sql = "update TBUSR set size_id=?, user_age=?, user_gender=?, nickname=? where user_id = ?";
    conn.query(sql, dataArr, function(err, row){
      if(err) {
        console.log('err', err);
      } else {
        console.log('row', row);
      }
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
    var sql = "select bsk.bsk_id, bsk.bsk_cnt, bsk.bsk_regdate, bsk.bsk_regtime, itm.item_name, itm.item_price, itm.item_saleprice, sz.size_name, itm.color_name from TBBSK bsk ,TBITM itm, TBSZ sz where bsk.user_id = ? and bsk.item_id = itm.item_id and itm.size_id = sz.size_id;";

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
    if(err) console.log('err', err);

    async.waterfall([
      function(callback){
        findItmid(dataArr, callback);
      },
      function(dataArr, row, callback){
        update_bsk(dataArr, row, callback)
      }
    ],
    function(err, success){
      if(err) console.error('err', err);
      done(success);
      conn.release();
    });

    function findItmid(dataArr, callback){
      var dataSelect = [dataArr[0], dataArr[1], dataArr[2]];
      console.log('dataSelect', dataSelect);
      var sql = 'select itm.item_id from TBITM itm, (select item_grid from TBITM where item_id=?) aa where itm.color_name=? and itm.size_id=? and itm.item_grid = aa.item_grid';
      conn.query(sql, dataSelect, function(err, row){
        if(err) console.log('err', err);
        console.log('row', row);
        // conn.release();
        callback(null, dataArr, row);
      });
    } // findItmid

    function update_bsk(dataArr, row, callback){
      var dataUpdate = [dataArr[4], ""+row[0].item_id, dataArr[3], dataArr[5]];

      console.log('dataUpdate', dataUpdate);
      var sql = 'update TBBSK set bsk_cnt=?, item_id = ? where user_id=? and bsk_id=?';
        conn.query(sql, dataUpdate, function(err, row){
          if(err) console.log('err', err);
          console.log('row', row);

          var success = false;
          if(row.affectedRows == 1) {
            success = true;
          }
          // done(success);
          // conn.release();
          callback(null, success);
      });
    } // update_bsk

  });
};





// exports.bskupdate2 = function(dataArr2, done){
//   pool.getConnection(function(err, conn) {

//     var sql = 'update TBBSK set bsk_cnt=?, bsk_regdate=now(), item_id = ? where user_id=? and bsk_id=?';
//       conn.query(sql, dataArr, function(err, row){
//         if(err) console.log('err', err);
//         console.log('row', row);

//         var success = false;
//         if(row.affectedRows == 1) {
//           success = true;
//         }
//         done(success);
//         conn.release();
//     });
//   });
// };





// function findGrid(dataArr, callback){
//   var sql = 'select item_grid from TBITM where item_id=?';
//   conn.query(sql, dataArr[3], function(err, row){
//     if(err) console.log('err', err);
//     console.log('row', row);
//     callback(null, dataArr, row);
//   }
// }

// // user_id에 해당하는 order_id 받아오기
// select odritm.item_id, odritm.order_id
// from TBODRITM odritm
// where odritm.order_id in (select order_id from TBODR where user_id = 'qwerty')

// // order_id에 해당하는 아이템 정보 받아오기
// select itm.item_name, itm.color_name, sz.size_name, odr.total_price, odr.order_paystat, dlvr.dlvr_stat, odr.order_regdate, odr.order_regtime
// from TBITM itm, TBSZ sz, TBODR odr, TBDLVR dlvr,
//     (select *
//     from TBODRITM odritm
//     where odritm.order_id = '20150507333333') a
// where itm.item_id = a.item_id
// and itm.size_id = sz.size_id
// and a.order_id = odr.order_id
// and dlvr.order_id = a.order_id

// var sql2 = "select itm.item_name, itm.color_name, sz.size_name, odr.total_price, odr.order_paystat, dlvr.dlvr_stat, odr.order_regdate, odr.order_regtime from TBITM itm, TBSZ sz, TBODR odr, TBDLVR dlvr, (select * from TBODRITM odritm where odritm.order_id = ?) a where itm.item_id = a.item_id and itm.size_id = sz.size_id and a.order_id = odr.order_id and dlvr.order_id = a.order_id"
// conn.query(sql2, rows, function(err, rows){
//   if(err) console.error('err', err);
//   console.log('sql2 rows', rows);

// });

// exports.orderlist = function(user_id, callback){
//   pool.getConnection(function(err, conn){
//     if(err) console.error('err', err);
//     var sql = "select odritm.item_id, odritm.order_id from TBODRITM odritm where odritm.order_id in (select order_id from TBODR where user_id = ?)";
//     conn.query(sql, user_id, function(err, rows){
//       if(err) console.error('err', err);
//       console.log('rows', rows);
//       conn.release();
//       callback(rows);
//     });
//   });
// };


// exports.delete = function(dataArr, callback){
//   pool.getConnection(function(err, conn){
//     if(err) console.error('err', err);
//     var sql = "delete from TBODR where user_id=? and order_id=?";
//     conn.query(sql, dataArr, function(err, row){
//       if(err) console.error('err', err);
//       var success = false;
//       if(row.affectedRows == 1){
//         success = true;
//       }
//       conn.release();
//       callback(success);
//     });
//   });
// };