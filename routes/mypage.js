var express = require('express');
var router = express.Router();

// 마이페이지-개인큐레이션-상세보기
router.get('/style', function(req, res, next) {
  var output = {
    "stA_name": "stA_01",
    "stB_name" : "stB_01",
    "stC_name" : "stC_01"
  };
  res.json({ result : output });
});

// 마이페이지-개인큐레이션-수정하기
router.post('/style', function(req, res, next) {
  var output = {
    "stA_name": "stA_01",
    "stB_name" : "stB_01",
    "stC_name" : "stC_01"
  };
  res.json({ result : output });
});

// 마이페이지-장바구니-상세보기
router.get('/basket', function(req, res, next) {
  var output = {
    "item_name" : "흰셔츠",
    "bsk_cnt" : "1",
    "color_name" : "black",
    "item_price" : "45000",
    "total_price" : "45000",
    "bsk_regdate" : "2015-04-27",
    "bsk_regtime" : "2015-04-27 14:19:00"
};
  res.json({ result : output });
});

// 마이페이지-장바구니-수정하기
router.post('/basket', function(req, res, next) {
  var output = {
    "item_size" : "55",
    "bsk_cnt" : "1",
    "bsk_regdate" : "2015-04-27",
    "bsk_regtime" : "2015-04-27 14:24:00"
  };
  res.json({ result : output });
});

// 마이페이지-주문배송내역-회원주문내역
router.get('/order', function(req, res, next) {
  var user_id = req.body.user_id;
  var order_id = req.body.order_id;

  var output = {
    "order_id" : "20150427123456",
    "total_price" : "45000",
    "item_name" : "흰셔츠",
    "order_cnt" : "1",
    "order_paystat" : "결제완료",
    "order_regdate" : "2015-04-27",
    "order_regtime" : "2015-04-27 14:39:00",
    "dlvr_stat" : "1"
  };
  res.json({ result : output });
});

router.post('/order', function(req, res, next) {
  var user_id = "riuqlfjsdkjfkls";
  var order_id = "20150427123456";
});
module.exports = router;
