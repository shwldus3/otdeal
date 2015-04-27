var express = require('express');
var router = express.Router();

/*
 업무명 : 스타일 상세보기
 전송방식 : get
 url : /mypage/style
 */
router.get('/style', function(req, res, next) {

  var user_id = "qwerty";

  var output = {
    "stA_name": "베이직",
    "stB_name" : "럭셔리",
    "stC_name" : "오피스"
  };

  if(output){
    res.json({success : 1, msg : "성공적으로 수행되었습니다.", result : output});
  } else {
    res.json({success : 0, msg : "에러가 발생하였습니다.", result : "fail"});
  }
});


/*
 업무명 : 스타일 수정하기
 전송방식 : post
 url : /mypage/style
 */
router.post('/style', function(req, res, next) {
  var user_id = "qwerty";
  var st_gubun = "A";
  var stA_cd = "stA_01";
  var stB_cd = "stB_01";
  var stC_cd = "stC_01";

  var output = {
    "stA_name": "베이직",
    "stB_name" : "럭셔리",
    "stC_name" : "오피스"
  };

  if(output){
    res.json({success : 1, msg : "성공적으로 수행되었습니다.", result : output});
  } else {
    res.json({success : 0, msg : "에러가 발생하였습니다.", result : "fail"});
  }
});


/*
 업무명 : 장바구니 상세보기
 전송방식 : get
 url : /mypage/basket
 */
router.get('/basket', function(req, res, next) {
  var user_id = "qwerty";

  var outputs = [
    {
    "item_name" : "흰셔츠",
    "bsk_cnt" : "1",
    "color_name" : "white",
    "item_price" : "45000",
    "total_price" : "45000",
    "bsk_regdate" : "2015-04-27",
    "bsk_regtime" : "2015-04-27 14:19:00"
    },
    {
      "item_name" : "노랑셔츠",
      "bsk_cnt" : "1",
      "color_name" : "yellow",
      "item_price" : "45000",
      "total_price" : "45000",
      "bsk_regdate" : "2015-04-27",
      "bsk_regtime" : "2015-04-27 15:10:00"
    },
    {
      "item_name" : "파랑셔츠",
      "bsk_cnt" : "1",
      "color_name" : "blue",
      "item_price" : "45000",
      "total_price" : "45000",
      "bsk_regdate" : "2015-04-27",
      "bsk_regtime" : "2015-04-27 15:11:00"
    }
  ];

  if(outputs){
    res.json({success : 1, msg : "성공적으로 수행되었습니다.", result : outputs});
  } else {
    res.json({success : 0, msg : "에러가 발생하였습니다.", result : "fail"});
  }
});


/*
 업무명 : 장바구니 수정하기
 전송방식 : post
 url : /mypage/basket
 */
router.post('/basket', function(req, res, next) {
  var user_id = "qwerty";
  var bsk_id = "1";

  var item_size = "55";
  var bsk_cnt = "3";
  var bsk_regdate = "2015-04-27";
  var bsk_regtime = "2015-04-27 15:20:00";

  var output = {
    "item_size" : "66",
    "bsk_cnt" : "1",
    "bsk_regdate" : "2015-04-27",
    "bsk_regtime" : "2015-04-27 16:58:00"
  };

  if(output){
    res.json({success : 1, msg : "성공적으로 수행되었습니다.", result : output});
  } else {
    res.json({success : 0, msg : "에러가 발생하였습니다.", result : "fail"});
  }
});


/*
 업무명 : 주문내역 리스트
 전송방식 : get
 url : /mypage/order
 */
router.get('/order', function(req, res, next) {
  var user_id = "qwerty";
  var order_id = "20150427123456";

  var output = [
    {
    "order_id" : "20150427123456",
    "total_price" : "45000",
    "item_name" : "흰셔츠",
    "order_cnt" : "1",
    "order_paystat" : "미결제",
    "order_regdate" : "2015-04-27",
    "order_regtime" : "2015-04-27 14:39:00",
    "dlvr_stat" : "1"
    },
    {
      "order_id" : "20150425234567",
      "total_price" : "36000",
      "item_name" : "노랑셔츠",
      "order_cnt" : "1",
      "order_paystat" : "결제완료",
      "order_regdate" : "2015-04-25",
      "order_regtime" : "2015-04-25 10:17:40",
      "dlvr_stat" : "2"
    },
    {
      "order_id" : "20150421345678",
      "total_price" : "36000",
      "item_name" : "검정셔츠",
      "order_cnt" : "2",
      "order_paystat" : "결제완료",
      "order_regdate" : "2015-04-21",
      "order_regtime" : "2015-04-21 22:31:11",
      "dlvr_stat" : "1"
    }
  ];
  if(output){
    res.json({success : 1, msg : "성공적으로 수행되었습니다.", result : output});
  } else {
    res.json({success : 0, msg : "에러가 발생하였습니다.", result : "fail"});
  }
});


/*
 업무명 : 주문배송취소
 전송방식 : post
 url : /mypage/order/delete
 */
router.post('/order/delete', function(req, res, next) {
  var user_id = "qwerty";
  var order_id = "20150427123456";
  var datas = [user_id, order_id];

  if(datas){
    res.json({success : 1, msg : "성공적으로 수행되었습니다.", result : "success"});
  } else {
    res.json({success : 0, msg : "에러가 발생하였습니다.", result : "fail"});
  }
});

module.exports = router;
