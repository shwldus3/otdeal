var express = require('express');
var router = express.Router();
var db_main = require('../models/db_main');
var crypto = require('crypto');
var async = require('async');
var dateutils = require('date-utils');
var HashMap = require('hashmap');

// 몽고디비 사용
var db = require('../models/db_config_mongo');
require('../models/clickmodel');
var ClickModel = db.model('Click');

/*
업무명 : 저장된 UUID 찾기
전송방식 : post
url : /main/findUUID
 */
router.post('/findUUID', function(req, res, next) {
	var tel_uuid = req.body.tel_uuid;
	if(!tel_uuid) throw err;
	console.log('tel_uuid', tel_uuid);

	db_main.findUUID(tel_uuid, function(row){
		console.log('row', row);
		if(row.length!=0){ // 기존에 저장된 uuid가 있으면
			console.log('if');
			var user_id = row[0].user_id;
			console.log('row[0].user_id', row[0].user_id);
			console.log('user_id_if', user_id);

			res.json({ success:1, msg:"성공적으로 수행되었습니다.", result: user_id });

		} else { // 기존에 저장된 uuid가 없으면
			console.log('else');
			res.json({ success:0, msg:"저장된 uuid가 없습니다." });
		}
		// callback(null, user_id);
	});
});


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
					res.json({ success:1, msg:"성공적으로 수행되었습니다.", imgArr : result});
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
	var tel_uuid = req.body.tel_uuid;
	var item_id1 = req.body.item_id1;
	var item_id2 = req.body.item_id2;
	var item_id3 = req.body.item_id3;
	var user_gender = req.body.user_gender;
	var user_age = req.body.user_age;
	var size_id = req.body.size_id;
	var nickname = req.body.nickname;
	var user_id = '';

	var itemArr = [item_id1, item_id2, item_id3];

	// user_id를 난수 6자리로 생성.
	function randomValueBase64 (len) {
	  return crypto.randomBytes(Math.ceil(len * 3 / 4))
	    .toString('base64')   // convert to base64 format
	    .slice(0, len)        // return required number of characters
	    .replace(/\+/g, '0')  // replace '+' with '0'
	    .replace(/\//g, '0'); // replace '/' with '0'
	}
	user_id = randomValueBase64(6);  // value 'jWHSOz'
	console.log('user_id', user_id);
	var dataArr = [tel_uuid, user_id, user_gender, user_age, size_id, nickname];

	console.log('dataArr', dataArr);

 // 클릭정보 몽고디비에 저장.
 	for(i=0; i<3; i++){
 		var click = new ClickModel({
 			item_id : itemArr[i],
 			user_id : user_id,
 			regtime : Date.now()
 		});
 		click.save(function(err, doc){
 			if(err) throw err;
	 		// console.log('doc', doc);
		});
 	}; //for

	db_main.infoInsert(dataArr, function(success){
		console.log('dataArr_db_infoInsert', dataArr);
		if(success){
			res.json({ success:1, msg:"성공적으로 수행되었습니다.", result: user_id });
		}else{
			res.json({ success:0, msg:"수행도중 에러가 발생했습니다." });
		}
	});
});


/*
업무명 : 상품추천리스트
전송방식 : post
url : /main/recmd/item
 */
router.post('/recmd/item', function(req, res, next) {
	var user_id = req.body.user_id;

	db_main.recmd_item(user_id, function(result){
		if(result){
			res.json({ success:1, msg:"성공적으로 수행되었습니다.", result:result });
		}else{
			res.json({ success:0, msg:"수행도중 에러가 발생했습니다." });
		}
	});
});


/*
업무명 : 수량1개추천리스트
전송방식 : post
url : /main/recmd/oneforyou
 */
router.post('/recmd/oneforyou', function(req, res, next) {
	var user_id = req.body.user_id;

	db_main.recmd_oneforyou(user_id, function(result){
		if(result){
			res.json({ success:1, msg:"성공적으로 수행되었습니다.", result:result });
		}else{
			res.json({ success:0, msg:"수행도중 에러가 발생했습니다." });
		}
	});
});


/*
업무명 : 좋아요랭킹리스트
전송방식 : get
url : /main/recmd/like
 */
router.post('/recmd/like', function(req, res, next) {
	var user_id = req.body.user_id;

	db_main.recmd_like(user_id, function(result){
		if(result){
			res.json({ success:1, msg:"성공적으로 수행되었습니다.", result:result });
		}else{
			res.json({ success:0, msg:"수행도중 에러가 발생했습니다." });
		}
	});
});


/*
업무명 : 카테고리
전송방식 : get
url : /main/category
 */
router.post('/category', function(req, res, next) {
	var user_id = req.body.user_id;
	var sort_gubun = req.body.sort_gubun;
	var ctg_id = req.body.ctg_id;

	var inputData = {
		user_id : user_id,
		sort_gubun : sort_gubun,
		ctg_id : ctg_id
	};

	db_main.category(inputData, function(result){
		if(result){
			res.json({ success:1, msg:"성공적으로 수행되었습니다.", result:result });
		}else{
			res.json({ success:0, msg:"수행도중 에러가 발생했습니다." });
		}
	});
});


/*
업무명 : 최근본상품
전송방식 : post
url : /main/recent
 */
router.post('/recent', function(req, res, next) {
	var user_id = req.body.user_id;
	ClickModel.find({user_id:user_id},{item_id:1}).sort({regtime:-1}).limit(10).exec(function(err, docs){
		if(err) throw err;
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
router.post('/qnaInsert', function(req, res, next) {
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
				var click = new ClickModel({
					user_id : user_id,
					item_id : item_id
				});
				click.save(function(err, result){
					if(err) throw err;
				});
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
