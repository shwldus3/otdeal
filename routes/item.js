var express = require('express');
var router = express.Router();

/*
업무명 : 상품상세정보
전송방식 : post
url : /item
 */
router.get('/', function(req, res, next) {
	var item_id = "2";
	db_item.itemDetail(item_id, function(err, result){
		if(result){
			res.json({ success:1, msg:"성공적으로 수행되었습니다.", result:result });
		}else{
			res.json({ success:0, msg:"수행도중 에러가 발생했습니다." });
		}
	});
});
/*
router.get('/', function(req, res, next) {
	var item_id = "2";
	var output_single = {
		"item_id" : 1,
		"item_name" : "원피스단일상품",
		"gr_gubun" : "0",//0:단일상품, 1:그룹상품
		"item_color" : "검정",
		"item_content" : "상품내용입니다",
		"item_cnt" : 30,
		"item_price" : 30000,
		"item_saleprice" : 15000,
		"item_sale" : "50%",
		"item_size" : "S",
		"imageArr" : [{
			"img_seq" : 1,
			"img_id" : 1,
			"path" : "/item/thumbnail",
			"img_name" : "img1.jpg",
			"img_width" : 300,
			"img_height" : 400,
			"thumbnail" : "Y"
		}, {
			"img_seq" : 2,
			"img_id" : 2,
			"path" : "/item",
			"img_name" : "img2.jpg",
			"img_width" : 300,
			"img_height" : 400,
			"thumbnail" : "N"
		}, {
			"img_seq" : 3,
			"img_id" : 3,
			"path" : "/item",
			"img_name" : "img3.jpg",
			"img_width" : 300,
			"img_height" : 400,
			"thumbnail" : "N"
		}],
		"shop_name" : "(주)옷딜",
		"shop_id" : 1,
		"shop_address" : "서울특별시 관악구",
		"shop_tel" : "010-0000-0000",
		"shop_tel_hm" : "02-0000-0000",
		"shop_ceo" : "최윤내",
	};


	var output_group = {
		"item_id" : 2,
		"item_name" : "바지그룹상품",
		"gr_gubun" : "1",//그룹상품
		"item_color" : "",
		"item_content" : "상품내용입니다",
		"item_cnt" : "",
		"item_price" : 30000,
		"item_saleprice" : 15000,
		"item_sale" : "50%",
		"item_size" : "S",
		"singleItemArr" : [{
			"item_id" : 4,
			"item_name" : "바지1_S",
			"item_color" : "검정",
			"item_content" : "상품내용입니다11_S",
			"item_cnt" : 15,
			"item_price" : 30000,
			"item_saleprice" : 15000,
			"item_sale" : "50%",
			"item_size" : "S",
		}, {
			"item_id" : 5,
			"item_name" : "바지1_M",
			"item_color" : "검정",
			"item_content" : "상품내용입니다11_M",
			"item_cnt" : 5,
			"item_price" : 30000,
			"item_saleprice" : 15000,
			"item_sale" : "50%",
			"item_size" : "M",
		},{
			"item_id" : 6,
			"item_name" : "바지2_S",
			"item_color" : "화이트",
			"item_content" : "상품내용입니다22_S",
			"item_cnt" : 14,
			"item_price" : 30000,
			"item_saleprice" : 15000,
			"item_sale" : "50%",
			"item_size" : "S",
		},{
			"item_id" : 7,
			"item_name" : "바지2_M",
			"item_color" : "화이트",
			"item_content" : "상품내용입니다22_M",
			"item_cnt" : 11,
			"item_price" : 30000,
			"item_saleprice" : 15000,
			"item_sale" : "50%",
			"item_size" : "M",
		}],
		"imageArr" : [{
			"img_seq" : 1,
			"img_id" : 5,
			"path" : "/item",
			"img_name" : "img5.jpg",
			"img_width" : 300,
			"img_height" : 400,
			"thumbnail" : "Y"
		}, {
			"img_seq" : 2,
			"img_id" : 6,
			"path" : "/item",
			"img_name" : "img6.jpg",
			"img_width" : 300,
			"img_height" : 400,
			"thumbnail" : "N"
		}, {
			"img_seq" : 3,
			"img_id" : 7,
			"path" : "/item",
			"img_name" : "img7.jpg",
			"img_width" : 300,
			"img_height" : 400,
			"thumbnail" : "N"
		}],
		"shop_name" : "(주)옷딜",
		"shop_id" : 1,
		"shop_address" : "서울특별시 관악구",
		"shop_tel" : "010-0000-0000",
		"shop_tel_hm" : "02-0000-0000",
		"shop_ceo" : "최윤내",
	};
	if(output_group){
		res.json({ success:1, msg:"성공적으로 수행되었습니다.", result:output_group });
	}else{
		res.json({ success:0, msg:"수행도중 에러가 발생했습니다." });
	}
});
*/


/*
업무명 : 장바구니등록
전송방식 : post
url : /item/bsk
 */
router.post('/bsk', function(req, res, next) {
	var user_id = "";
	var item_id = "";
	var bsk_cnt = "";
	var output = { "bsk_id": "1" };
	var input_arr = [user_id, item_id, bak_cnt];
	db_item.bsk(input_arr, function(result){
		if(result){
			res.json({ success: 1, msg:"성공적으로 수행되었습니다." });
		}else{
			res.json({ success: 0, msg:"수행도중 에러가 발생했습니다." });
		}
	});
});


/*
업무명 : 주문결제하기
전송방식 : post
url : /item/order
 */
router.post('/order', function(req, res, next) {
	var imemArr = "";
	var user_id = "";
	var bsk_id = "";
	var order_cnt = "";
	var order_paycd = "";
	var order_paypoint = "";
	var total_price = "";
	var order_paystat = "";
	var result = {
		"order_id" : "20150501574571",
		"itemArr" : [{
			"item_id" : 4,
			"item_name" : "바지1_S",
			"item_cnt" : 1,
			"item_price" : 30000,
		},{
			"item_id" : 6,
			"item_name" : "바지2_S",
			"item_cnt" : 2,
			"item_price" : 60000,
		}],
		"total_price" : 90000,
	};
	if(result){
			res.json({ success:1, msg:"성공적으로 수행되었습니다.", result:result });
	}else{
		res.json({ success:0, msg:"수행도중 에러가 발생했습니다." });
	}
});


module.exports = router;
