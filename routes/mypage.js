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

/*
 업무명 : 찜목록 (위시리스트)
 전송방식 : get
 url : /mypage/like
 */
router.get('/like', function(req, res, next) {
  var user_id = req.session.user_id;
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
