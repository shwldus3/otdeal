// 마이페이지 관련 db 처리
// db_mypage.js

var mysql = require('mysql');
var db_config = require('./db_config');
var pool = mysql.createPool(db_config);
var async = require('async');
var logger = require('../routes/static/logger.js');
var forEach = require('async-foreach').forEach;
var fileutil = require('../utils/fileutil.js');

exports.userInfoList = function(user_id, callback){
  pool.getConnection(function(err, conn){
    if(err) throw err;
    var sql = 'select user_id, size_id, user_age, user_gender, nickname from TBUSR where user_id=?';

    conn.query(sql, user_id, function(err, rows){
      if(err) throw err;
      console.log('rows', rows);
      conn.release();
      callback(rows);
    });
  });
};

exports.usrInfoUpdate = function(dataArr, callback){
  pool.getConnection(function(err, conn){
    if(err) throw err;
    var sql = "update TBUSR set size_id=?, user_age=?, user_gender=?, nickname=? where user_id = ?";
    conn.query(sql, dataArr, function(err, row){
      if(err) throw err;
      console.log('row', row);
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
    if(err) throw err;

    var sql = "select bsk.bsk_id, bsk.bsk_cnt, bsk.bsk_regdate, bsk.bsk_regtime, itm.item_id, itm.item_name, itm.item_price, itm.item_saleprice, sz.size_name, itm.color_name, img.path, img.img_name from TBBSK bsk ,TBITM itm, TBSZ sz, itemImg img where bsk.user_id = ? and bsk.item_id = itm.item_id and itm.size_id = sz.size_id and if(itm.item_grcd=0 and itm.item_grid is not NULL, img.item_id = itm.item_grid, img.item_id = itm.item_id)";

    conn.query(sql, user_id, function(err, rows){
      if(err) throw err;
      console.log('rows', rows);
      conn.release();
      callback(rows);
    });
  });
};

exports.bskupdate = function(dataArr, done){
  pool.getConnection(function(err, conn) {
    if(err) throw err;

    async.waterfall([
      function(callback){
        findItmid(dataArr, callback);
      },
      function(dataArr, row, callback){
        update_bsk(dataArr, row, callback);
      }
    ],
    function(err, success){
      if(err) throw err;
      done(success);
      conn.release();
    });

    function findItmid(dataArr, callback){
      var dataSelect = [dataArr[0], dataArr[1], dataArr[2]];
      console.log('dataSelect', dataSelect);
      var sql = 'select itm.item_id from TBITM itm, (select item_grid from TBITM where item_id=?) aa where itm.color_name=? and itm.size_id=? and itm.item_grid = aa.item_grid';
      conn.query(sql, dataSelect, function(err, row){
        if(err) throw err;
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
          if(err) throw err;
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

/*
업무명 : 장바구니 삭제하기
전송방식 : post
url : /mypage/basket/delete
*/
router.post('/basket/delete', function(req, res, next) {

  var user_id = req.session.user_id;
  var bsk_id = req.body.bsk_id;
  if(!user_id) res.json({success : 0, msg : "로그인을 해주세요.", result : "fail"});

  db_mypage.bskdelete(bsk_id, function(result) {
    if(result){
      res.json({success : 1, msg : "성공적으로 수행되었습니다.", result : "success"});
    } else {
      res.json({success : 0, msg : "에러가 발생하였습니다.", result : "fail"});
    }
  });
});


/**
 * 찜목록 (위시리스트)
 * @param  {[type]} data    [description]
 * @param  {[type]} calback [description]
 * @return {[type]}         [description]
 */
exports.like = function(user_id, callback){
  pool.getConnection(function(err, conn){
    if(err) throw err;
    var sql = 'select itm.item_name, itm.item_price, itm.item_saleprice, img.path, img.img_name, Floor((itm.item_price-itm.item_saleprice)/itm.item_price*100) as discount_rate from TBLK lk, TBITM itm, itemImg img where lk.user_id= ? and lk.item_id = itm.item_id and lk.item_id = img.item_id';
    conn.query(sql, user_id, function(err, rows){
      if(err) throw err;
      console.log('rows', rows);
      //이미지 width, height 가져오기
      fileutil.getFileInfo(rows, function(err, rows){
        if(err) throw err;
        callback(rows);
      });
      conn.release();
      // callback(rows);
    });
  });
};
