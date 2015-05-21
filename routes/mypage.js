var express = require('express');
var router = express.Router();
var db_mypage = require('../models/db_mypage');
var async = require('async');
/*
 업무명 : 회원정보 상세
 전송방식 : get
 url : /mypage
 */
router.get('/', function(req, res, next) {

  var user_id = req.session.user_id;

  db_mypage.userInfoList(user_id, function(lists){
    if(lists){
      res.json({success : 1, msg : "성공적으로 수행되었습니다.", result : lists});
    } else {
      res.json({success : 0, msg : "에러가 발생하였습니다.", result : "fail"});
    }
  });
});

/*
 업무명 : 회원정보 수정하기
 전송방식 : post
 url : /mypage
 */
router.post('/', function(req, res, next){
  var user_id = req.session.user_id;
  var size_id = req.body.size_name;
  var user_age = req.body.user_age;
  var user_gender = req.body.user_gender;
  var nickname = req.body.nickname;

  var dataArr = [size_id, user_age, user_gender, nickname, user_id];

  db_mypage.usrInfoUpdate(dataArr, function(output) {
    if(output){
      res.json({success : 1, msg : "성공적으로 수행되었습니다.", result : "success"});
    } else {
      res.json({success : 0, msg : "에러가 발생하였습니다.", result : "fail"});
    }
  });
});


/*
 업무명 : 장바구니 상세보기(장바구니 리스트)
 전송방식 : get
 url : /mypage/basket
 */
router.get('/basket', function(req, res, next) {

  var user_id = req.session.user_id;

  db_mypage.bsklist(user_id, function(lists){
    if(lists){
      res.json({success : 1, msg : "성공적으로 수행되었습니다.", result : {bskArr:lists}});
    } else {
      res.json({success : 0, msg : "에러가 발생하였습니다.", result : "fail"});
    }
  });
});


/*
 업무명 : 장바구니 수정하기
 전송방식 : post
 url : /mypage/basket
 */
router.post('/basket', function(req, res, next) {

  var user_id = req.session.user_id;
  var bsk_cnt = req.body.bsk_cnt;
  var color_name = req.body.color_name;
  var size_id = req.body.size_id;
  var item_id= req.body.item_id;
  var bsk_id = req.body.bsk_id;

  var dataArr = [item_id, color_name, size_id, user_id, bsk_cnt, bsk_id];
  // console.log('dataArr', dataArr);

  db_mypage.bskupdate(dataArr, function(row) {
    if(row){
      res.json({success : 1, msg : "성공적으로 수행되었습니다.", result : "success"});
    } else {
      res.json({success : 0, msg : "에러가 발생하였습니다.", result : "fail"});
    }
  });
});

/**
* 장바구니 삭제
*/
exports.bskdelete = function(bsk_id, callback){
  pool.getConnection(function(err, conn){
    var result = false;
    if(err) throw err;
    if(typeof bsk_id == 'string'){
      deleteBsk(bsk_id, function(success){
        console.log(success);
        callback(success);
      });
    }else if(bsk_id.constructor == Array){
      async.each(bsk_id, function(id, callback){
        deleteBsk(id, function(success){
          result = success;
          callback(null);
        });
      }, function(err){
        if(err) throw err;
        // console.log(result);
        callback(result);
        });
    }else{
      callback(false);
    }
    conn.release();

    function deleteBsk(id, callback){
      var sql = "delete from TBBSK where bsk_id=?";
      conn.query(sql, id, function(err, row){
        if(err) throw err;
        console.log('row', row);
        if(row.affectedRows == 1) {
          callback(true);
        }else{
          callback(false);
        }
      });
    } // deleteBsk
  });
};

/*
 업무명 : 찜목록 (위시리스트)
 전송방식 : get
 url : /mypage/like
 */
router.get('/like', function(req, res, next) {
  var user_id = req.body.user_id;
    console.log('user_id', user_id);
    db_mypage.like(user_id, function(rows){
      console.log('rows123', rows);
      if(rows){
        res.json({success : 1, msg : "성공적으로 수행되었습니다.", likeArr : rows});
      } else {
        res.json({success : 0, msg : "에러가 발생하였습니다.", result : "fail"});
      }
    });
});

module.exports = router;
