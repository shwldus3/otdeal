var express = require('express');
var router = express.Router();
var logger = require('./static/logger.js');
var db_item = require('../models/db_item');

var db = require('../models/db_config_mongo');
require('../models/clickmodel');
var ClickModel = db.model('Click');


/*
업무명 : 클릭정보저장
전송방식 : post
url : /item/click
 */
router.post('/click', function(req, res, next){
	var user_id = req.body.user_id;
	var item_id = req.body.item_id;

	var click = new ClickModel({
		user_id : user_id,
		item_id : item_id
	});
	click.save(function(err, result){
		if(err) logger.error('err', err);
		var outputData = {
			'click_id' : result.click_id,
			'user_id' : result.user_id,
			'item_id' : result.item_id
		};
		if(outputData){
			res.json({ success:1, msg:"성공적으로 수행되었습니다.", result:outputData });
		}else{
			res.json({ success:0, msg:"수행도중 에러가 발생했습니다." });
		}
	});
});


/*
업무명 : 상품상세정보
전송방식 : post
url : /item
 */
router.post('/', function(req, res, next) {
	var item_id = req.body.item_id;
	logger.debug(item_id);
	db_item.itemDetail(item_id, function(err, outputData){
		logger.debug(outputData);
		if(outputData){
			res.json({ success:1, msg:"성공적으로 수행되었습니다.", result:outputData });
		}else{
			res.json({ success:0, msg:"수행도중 에러가 발생했습니다." });
		}
	});
});


/*
업무명 : 장바구니등록
전송방식 : post
url : /item/bsk
 */
router.post('/bsk', function(req, res, next) {
	var user_id = req.body.user_id;
	var item_id = req.body.item_id;
	var bsk_cnt = req.body.bsk_cnt;
	// var result = { "bsk_id": "1" };
	var input_arr = [user_id, item_id, bsk_cnt];
	db_item.bsk(input_arr, function(result){
		if(result){
			res.json({ success: 1, msg:"성공적으로 수행되었습니다." });
		}else{
			res.json({ success: 0, msg:"수행도중 에러가 발생했습니다." });
		}
	});
});


/*
업무명 : 주문결제하기 (사용안함)
전송방식 : post
url : /item/order
 */
// router.post('/order', function(req, res, next) {
// 	var itemArr = req.body.itemArr;
// 	var user_id = req.body.user_id;
// 	var bsk_id = req.body.bsk_id;
// 	var order_cnt = req.body.order_cnt;
// 	var order_paycd = req.body.order_paycd;
// 	var order_paypoint = req.body.order_paypoint;
// 	var total_price = req.body.total_price;
// 	var order_paystat = req.body.order_paystat;
// 	var result = {
// 		"order_id" : "20150501574571",
// 		"itemArr" : [{
// 			"item_id" : 4,
// 			"item_name" : "바지1_S",
// 			"item_cnt" : 1,
// 			"item_price" : 30000,
// 		},{
// 			"item_id" : 6,
// 			"item_name" : "바지2_S",
// 			"item_cnt" : 2,
// 			"item_price" : 60000,
// 		}],
// 		"total_price" : 90000,
// 	};
// 	if(result){
// 			res.json({ success:1, msg:"성공적으로 수행되었습니다.", result:result });
// 	}else{
// 		res.json({ success:0, msg:"수행도중 에러가 발생했습니다." });
// 	}
// });


module.exports = router;
