var express = require('express');
var router = express.Router();
var db_mypage = require('../models/db_mypage');
var async = require('async');
/*
 업무명 : 회원정보 수정하기
 전송방식 : post
 url : /mypage
 */
router.post('/', function(req, res, next){
  console.log('req.body', req.body);
  //var title = req.body.title;
  //var content = req.body.content;
  //var	num = req.body.num;
  //var	passwd = req.body.passwd;
  //var datas = [title, content, num, passwd];

  var dataobj =   // 어려워어려워 때려쳐
    {
      user_id : req.session.user_id,
      size_name : req.body.size_name,
      user_age : req.body.user_age,
      user_gender : req.body.user_gender,
      nickname : req.body.nickname,
      styArr : [{
        sty_cd: req.body.sty_cd,
        sty_name: req.body.sty_name,
        sty_gubun: req.body.sty_gubun
      }]
    };

  db_mypage.update(dataobj, function(output) {
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

  var user_id = 'qwerty';
  //var user_id = req.session.user_id;

  db_mypage.bsklist(user_id, function(lists){
    if(lists){
      res.json({success : 1, msg : "성공적으로 수행되었습니다.", result : lists});
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

  //var user_id = req.session.user_id;

  var bsk_id = req.body.bsk_id;
  var size_name = req.body.size_name;
  var color_name = req.body.color_name;
  var bsk_cnt = req.body.bsk_cnt;
  var bsk_regdate = req.body.bsk_regdate;
  var bsk_regtime = req.body.bsk_regtime;

  var user_id = "qwerty";

  var dataArr = [user_id, bsk_id, size_name, color_name, bsk_cnt, bsk_regdate, bsk_regtime];

  db_mypage.bskupdate(dataArr, function(success) {
    if(success){
      res.json({success : 1, msg : "성공적으로 수행되었습니다.", result : "success"});
    } else {
      res.json({success : 0, msg : "에러가 발생하였습니다.", result : "fail"});
    }
  });
});


/*
 업무명 : 주문내역 리스트
 전송방식 : get
 url : /mypage/order
 */
router.get('/order', function(req, res, next) {

  var user_id = 'qwerty';
  //var user_id = req.session.user_id;
  // var order_id = "20150507222222";
  // var dataArr = [user_id, order_id];

  db_mypage.orderlist(user_id, function(lists){

    if(lists){
      console.log('lists', lists);

      var odrArr = [lists.order_id, lists.order_cnt, lists.total_price, lists.order_paystat, lists.dlvr_stat, lists.order_regdate, lists.order_regtime];

      // async.each(lists, function(list, callback){
      //   var singleItemArr = [list.item_name, list.color_name, list.size_name];

      //   // console.log('singleItemArr',singleItemArr);
      //   // console.log('odrArr', odrArr);

      // });

      res.json({success : 1, msg : "성공적으로 수행되었습니다.", result : lists});
    } else {
      res.json({success : 0, msg : "에러가 발생하였습니다.", result : "fail"});
    }

  });
});



/*
 업무명 : 주문배송취소
 전송방식 : post
 url : /mypage/order/delete
 */
router.post('/order/delete', function(req, res, next) {
  var user_id = req.session.user_id;
  var order_id = "20150427123456";

  var dataArr = [user_id, order_id];

  db_mypage.delete(dataArr, function(success){
    if(success){
      res.json({success : 1, msg : "성공적으로 수행되었습니다.", result : "success"});
    } else {
      res.json({success : 0, msg : "에러가 발생하였습니다.", result : "fail"});
    }
  });
});

module.exports = router;
