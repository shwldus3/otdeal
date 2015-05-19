var express = require('express');
var router = express.Router();
var logger = require('./static/logger.js');
var db_item = require('../models/db_item');

var db = require('../models/db_config_mongo');
require('../models/clickmodel');
var ClickModel = db.model('Click');
var domain = require('domain');
var d = domain.create();


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
		item_id : item_id,
		gubun : 'click'
	});
	click.save(function(err, result){
		if(err) throw err;
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
	var user_id = req.body.user_id;
	logger.debug(item_id);
	db_item.itemDetail(item_id, function(err, outputData){
		if(err) throw err;
		if(outputData){
			var click = new ClickModel({
				user_id : user_id,
				item_id : item_id,
				gubun : 'click'
			});
			click.save(function(err, result){
				if(err) throw err;
			});

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
	var user_id = req.session.user_id;
	var item_id = req.body.item_id;
	var bsk_cnt = req.body.bsk_cnt;
	var input_arr = [user_id, item_id, bsk_cnt];
	db_item.bsk(input_arr, function(result){
		if(result){
			var click = new ClickModel({
				user_id : user_id,
				item_id : item_id,
				gubun : 'basket'
			});
			click.save(function(err, result){
				if(err) throw err;
			});
			res.json({ success: 1, msg:"성공적으로 수행되었습니다." });
		}else{
			res.json({ success: 0, msg:"수행도중 에러가 발생했습니다." });
		}
	});
});


/*
업무명 : 주문하기
전송방식 : post
url : /item/order
 */
router.post('/order', function(req, res, next) {
	var item_id = req.body.item_id;
	var item_cnt = req.body.item_cnt;
	var user_id = req.session.user_id;
	var total_price = req.body.total_price;
	logger.debug(item_id);
	logger.debug(item_cnt);
	logger.debug(user_id);
	var datas = { 'item_id' : item_id, 'item_cnt' : item_cnt, 'user_id' : user_id, 'total_price' : total_price };
	db_item.order(datas, function(result){
		logger.debug(result);
		if(result){
			res.json({ success:1, msg:"성공적으로 수행되었습니다.", result:result });
		}else{
			res.json({ success:0, msg:"수행도중 에러가 발생했습니다." });
		}
	});
});


module.exports = router;
