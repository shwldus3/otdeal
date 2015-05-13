var express = require('express');
var router = express.Router();
var db_main = require('../models/db_main');
var crypto = require('crypto');
var async = require('async');

// 몽고디비 사용
var db = require('../models/db_config_mongo');
require('../models/clickmodel');
var ClickModel = db.model('Click');

/*
업무명 : 초기 이미지 선택 리스트
전송방식 : get
url : /main/curation
 */
router.get('/curation', function(req, res, next){
	// var uuid = req.body.uuid;
	db_main.cuList(function(result){
		var page1Arr = [result[0], result[1], result[2], result[3]];
		var page2Arr = [result[4], result[5], result[6], result[7]];
		var page3Arr = [result[8], result[9], result[10], result[11]];

		var result = {
			page1Arr : page1Arr,
			page2Arr : page2Arr,
			page3Arr : page3Arr
		 };

		if(result){
					res.json({ success:3, msg:"성공적으로 수행되었습니다.", result : result});
		}else{
			res.json({ success:0, msg:"수행도중 에러가 발생했습니다." });
		}
	});
});

/*
업무명 : 사용자 선택정보저장
전송방식 : post
url : /main/userinfo
 */
router.post('/userinfo', function(req, res, next) {
	var tel_uuid = req.body.uuid;
	var item_id1 = req.body.item_id1;
	var item_id2 = req.body.item_id2;
	var item_id3 = req.body.item_id3;
	var user_gender = req.body.user_gender;
	var user_age = req.body.user_age;
	var size_id = req.body.size_id;

	// user_id를 난수 6자리로 생성.
	function randomValueBase64 (len) {
	  return crypto.randomBytes(Math.ceil(len * 3 / 4))
	    .toString('base64')   // convert to base64 format
	    .slice(0, len)        // return required number of characters
	    .replace(/\+/g, '0')  // replace '+' with '0'
	    .replace(/\//g, '0'); // replace '/' with '0'
	}
	var user_id = randomValueBase64(6);  // value 'jWHSOz'
	//console.log('user_id',user_id);
	req.session.user_id = user_id; // user_id 세션에 담기.
	//console.log('req.session.user_id', req.session.user_id);

	var dataArr = [tel_uuid, user_id, user_gender, user_age, size_id];

	var itemArr = [item_id1, item_id2, item_id3];

 	for(i=0; i<3; i++){
 		var click = new ClickModel({
 			item_id : itemArr[i],
 			user_id : user_id
 		});
 		click.save(function(err, doc){
 			if(err) console.error('err', err);
	 		console.log('doc', doc);
		});
 	}; //for

	db_main.infoInsert(dataArr, function(success){
		if(success){
			res.json({ success:1, msg:"성공적으로 수행되었습니다.", result: user_id });
		}else{
			res.json({ success:0, msg:"수행도중 에러가 발생했습니다." });
		}
	});
});


/*
업무명 : 상품추천리스트
전송방식 : get
url : /main/recmd/item
 */
router.get('/recmd/item', function(req, res, next) {
	var user_id = "";
	var result = {
		"itemArr" : [{
			"item_seq" : 1,
			"item_id" : 1,
			"item_name" : "원피스단일상품",
			"item_price" : 30000,
			"item_saleprice" : 15000,
			"item_sale" : "50%",
			"launch_date" : "2015-01-01",
			"item_regdate" : "2015-04-27",
			"item_regtime" : "2015-04-27 14:33:30",
			"item_like_yn" : "Y",
			"imgObj" : {
				"img_id" : "4",
				"path" : "/item/thumbnail",
				"img_name" : "img4.jpg",
				"img_width" : 300,
				"img_height" : 400
			}
		}, {
			"item_seq" : 2,
			"item_id" : 2,
			"item_name" : "바지그룹상품",
			"item_price" : 55000,
			"item_saleprice" : 45000,
			"item_sale" : "19%",
			"launch_date" : "2015-01-01",
			"item_regdate" : "2015-04-27",
			"item_regtime" : "2015-04-27 14:33:30",
			"item_like_yn" : "N",
			"imgObj" : {
				"img_id" : "9",
				"path" : "/item/thumbnail",
				"img_name" : "img9.jpg",
				"img_width" : 300,
				"img_height" : 400
			}
		}, {
			"item_seq" : 3,
			"item_id" : 3,
			"item_name" : "아우터",
			"item_price" : 100000,
			"item_saleprice" : 85000,
			"item_sale" : "15%",
			"launch_date" : "2015-01-01",
			"item_regdate" : "2015-04-27",
			"item_regtime" : "2015-04-27 14:33:30",
			"item_like_yn" : "Y",
			"imgObj" : {
				"img_id" : "10",
				"path" : "/item/thumbnail",
				"img_name" : "img10.jpg",
				"img_width" : 300,
				"img_height" : 400
			}
		}]
	};
	if(result){
			res.json({ success:1, msg:"성공적으로 수행되었습니다.", result:result });
	}else{
		res.json({ success:0, msg:"수행도중 에러가 발생했습니다." });
	}
});


/*
업무명 : 수량1개추천리스트
전송방식 : get
url : /main/recmd/oneforyou
 */
router.get('/recmd/oneforyou', function(req, res, next) {
	var user_id = "";
	var result = {
		"itemArr" : [{
			"item_seq" : 1,
			"item_id" : 1,
			"item_name" : "원피스단일상품",
			"item_price" : 30000,
			"item_saleprice" : 15000,
			"item_sale" : "50%",
			"launch_date" : "2015-01-01",
			"item_regdate" : "2015-04-27",
			"item_regtime" : "2015-04-27 14:33:30",
			"item_like_yn" : "Y",
			"imgObj" : {
				"img_id" : "4",
				"path" : "/item/thumbnail",
				"img_name" : "img4.jpg",
				"img_width" : 300,
				"img_height" : 400
			}
		}, {
			"item_seq" : 2,
			"item_id" : 2,
			"item_name" : "바지그룹상품",
			"item_price" : 55000,
			"item_saleprice" : 45000,
			"item_sale" : "19%",
			"launch_date" : "2015-01-01",
			"item_regdate" : "2015-04-27",
			"item_regtime" : "2015-04-27 14:33:30",
			"item_like_yn" : "N",
			"imgObj" : {
				"img_id" : "9",
				"path" : "/item/thumbnail",
				"img_name" : "img9.jpg",
				"img_width" : 300,
				"img_height" : 400
			}
		}, {
			"item_seq" : 3,
			"item_id" : 3,
			"item_name" : "아우터",
			"item_price" : 100000,
			"item_saleprice" : 85000,
			"item_sale" : "15%",
			"launch_date" : "2015-01-01",
			"item_regdate" : "2015-04-27",
			"item_regtime" : "2015-04-27 14:33:30",
			"item_like_yn" : "Y",
			"imgObj" : {
				"img_id" : "10",
				"path" : "/item/thumbnail",
				"img_name" : "img10.jpg",
				"img_width" : 300,
				"img_height" : 400
			}
		}]
	};
	if(result){
			res.json({ success:1, msg:"성공적으로 수행되었습니다.", result:result });
	}else{
		res.json({ success:0, msg:"수행도중 에러가 발생했습니다." });
	}
});


/*
업무명 : 좋아요랭킹리스트
전송방식 : get
url : /main/recmd/like
 */
router.get('/recmd/like', function(req, res, next) {
	var user_id = "";
	var result = {
		"itemArr" : [{
			"item_seq" : 1,
			"item_id" : 1,
			"item_name" : "원피스단일상품",
			"item_price" : 30000,
			"item_saleprice" : 15000,
			"item_sale" : "50%",
			"launch_date" : "2015-01-01",
			"item_regdate" : "2015-04-27",
			"item_regtime" : "2015-04-27 14:33:30",
			"item_like_yn" : "Y",
			"imgObj" : {
				"img_id" : 4,
				"path" : "/item/thumbnail",
				"img_name" : "img4.jpg",
				"img_width" : 300,
				"img_height" : 400
			}
		}, {
			"item_seq" : 2,
			"item_id" : 2,
			"item_name" : "바지그룹상품",
			"item_price" : 55000,
			"item_saleprice" : 45000,
			"item_sale" : "19%",
			"launch_date" : "2015-01-01",
			"item_regdate" : "2015-04-27",
			"item_regtime" : "2015-04-27 14:33:30",
			"item_like_yn" : "N",
			"imgObj" : {
				"img_id" : 9,
				"path" : "/item/thumbnail",
				"img_name" : "img9.jpg",
				"img_width" : 300,
				"img_height" : 400
			}
		}, {
			"item_seq" : 3,
			"item_id" : 3,
			"item_name" : "아우터",
			"item_price" : 100000,
			"item_saleprice" : 85000,
			"item_sale" : "15%",
			"launch_date" : "2015-01-01",
			"item_regdate" : "2015-04-27",
			"item_regtime" : "2015-04-27 14:33:30",
			"item_like_yn" : "Y",
			"imgObj" : {
				"img_id" : 10,
				"path" : "/item/thumbnail",
				"img_name" : "img10.jpg",
				"img_width" : 300,
				"img_height" : 400
			}
		}]
	};
	if(result){
			res.json({ success:1, msg:"성공적으로 수행되었습니다.", result:result });
	}else{
		res.json({ success:0, msg:"수행도중 에러가 발생했습니다." });
	}
});


/*
업무명 : 카테고리
전송방식 : get
url : /main/category
 */
router.get('/category', function(req, res, next) {
	var user_id = "";
	var sort_gubun = "";
	var result = {
		"itemArr" : [{
			"item_seq" : 1,
			"item_id" : 1,
			"item_name" : "원피스단일상품",
			"item_price" : 30000,
			"item_saleprice" : 15000,
			"item_sale" : "50%",
			"launch_date" : "2015-01-01",
			"item_regdate" : "2015-04-27",
			"item_regtime" : "2015-04-27 14:33:30",
			"item_like_yn" : "Y",
			"imgObj" : {
				"img_id" : "4",
				"path" : "/item/thumbnail",
				"img_name" : "img4.jpg",
				"img_width" : 300,
				"img_height" : 400
			}
		}, {
			"item_seq" : 2,
			"item_id" : 2,
			"item_name" : "바지그룹상품",
			"item_price" : 55000,
			"item_saleprice" : 45000,
			"item_sale" : "19%",
			"launch_date" : "2015-01-01",
			"item_regdate" : "2015-04-27",
			"item_regtime" : "2015-04-27 14:33:30",
			"item_like_yn" : "N",
			"imgObj" : {
				"img_id" : "9",
				"path" : "/item/thumbnail",
				"img_name" : "img9.jpg",
				"img_width" : 300,
				"img_height" : 400
			}
		}, {
			"item_seq" : 3,
			"item_id" : 3,
			"item_name" : "아우터",
			"item_price" : 100000,
			"item_saleprice" : 85000,
			"item_sale" : "15%",
			"launch_date" : "2015-01-01",
			"item_regdate" : "2015-04-27",
			"item_regtime" : "2015-04-27 14:33:30",
			"item_like_yn" : "Y",
			"imgObj" : {
				"img_id" : "10",
				"path" : "/item/thumbnail",
				"img_name" : "img10.jpg",
				"img_width" : 300,
				"img_height" : 400
			}
		}]
	};
	if(result){
			res.json({ success:1, msg:"성공적으로 수행되었습니다.", result:result });
	}else{
		res.json({ success:0, msg:"수행도중 에러가 발생했습니다." });
	}
});


/*
업무명 : 최근본상품
전송방식 : post
url : /main/recent
 */
router.post('/recent', function(req, res, next) {
	var user_id = req.session.user_id;

	ClickModel.find({user_id:user_id},{item_id:1}).sort({regtime:-1}).limit(10).exec(function(err, docs){
		if(err) console.error('err', err);
		// console.log('docs', docs);
		// console.log('JSON.stringify(docs)', JSON.stringify(docs));

		var dataArr = [];

		for(var i=0; i<docs.length; i++){
			var item_id = docs[i].item_id;
			dataArr.push(item_id);
		}

		db_main.recentList(dataArr, function(itmArr){
			if(itmArr){
						res.json({ success:1, msg:"성공적으로 수행되었습니다.", result: itmArr});
			}else{
				res.json({ success:0, msg:"수행도중 에러가 발생했습니다." });
			}
		});
	});
});


/*
업무명 : Q&A리스트 -> 댓글 처리 어떻게 할지 봐야함
전송방식 : get
url : /main/qna
 */
router.post('/qna', function(req, res, next) {
	var item_id = parseInt(req.body.item_id, 10);
	console.log('item_id : ', item_id);
	db_main.qnalist(item_id, function(result){
		console.log('result', result);
		if(result){
			res.json({ success:1, msg:"성공적으로 수행되었습니다.", result:result });
		}else{
			res.json({ success:0, msg:"수행도중 에러가 발생했습니다." });
		}
	});
});


/*
업무명 : Q&A등록
전송방식 : post
url : /main/qna
 */
router.post('/qna', function(req, res, next) {
	var shop_id = req.body.shop_id;
	var item_id = req.body.item_id;
	var user_id = req.body.user_id;
	var qna_parentid = req.body.qna_parentid;
	var qna_title = req.body.qna_title;
	var qna_content = req.body.qna_content;
	var qna_gubun = "1";//1:정상, 0:비밀글
	var input_arr;
	if(qna_parentid){
		//답변글
		input_arr= [shop_id, item_id, user_id, qna_parentid, qna_title, qna_content, qna_gubun];
		db_main.qnaInsert_A(input_arr, function(result){
			if(result){
				res.json({ success:1, msg:"성공적으로 수행되었습니다.", result:"success" });
			}else{
				res.json({ success:0, msg:"수행도중 에러가 발생했습니다.", result:"false" });
			}
		});
	}else{
		//질문글
		input_arr = [shop_id, item_id, user_id, qna_title, qna_content, qna_gubun];
		db_main.qnaInsert_Q(input_arr, function(result){
			if(result){
				res.json({ success:1, msg:"성공적으로 수행되었습니다.", result:"success" });
			}else{
				res.json({ success:0, msg:"수행도중 에러가 발생했습니다.", result:"false" });
			}
		});
	}
});


/*
업무명 : 좋아요등록/삭제
전송방식 : post
url : /main/like
 */
router.post('/like', function(req, res, next) {
	var user_id = req.body.user_id;
	var item_id = req.body.item_id;
	var like_yn = req.body.like_yn;
	var result = "ok";
	var input_arr = [user_id, item_id];
	if(like_yn == 'Y'){
		//좋아요 등록
		db_main.likeRegister(input_arr, function(result){
			if(result){
				res.json({ success:1, msg:"성공적으로 수행되었습니다.", result:"success" });
			}else{
				res.json({ success:0, msg:"수행도중 에러가 발생했습니다.", result:"false" });
			}
		});
	}else{
		//좋아요 삭제
		db_main.likeDelete(input_arr, function(result){
			if(result){
				res.json({ success:1, msg:"성공적으로 수행되었습니다.", result:"success" });
			}else{
				res.json({ success:0, msg:"수행도중 에러가 발생했습니다.", result:"false" });
			}
		});
	}

});



module.exports = router;
