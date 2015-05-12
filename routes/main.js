var express = require('express');
var router = express.Router();
var db_main = require('../models/db_main');

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
	var uuid = '12341234';
	var images1 = [
		{
			"item_id" : 1,
	    "img_id" : 1,
	    "path" : "/images/item/thumbnail",
	    "img_name" : "img1.jpg",
	    "img_width" : 180,
	    "img_height" : 277
	  },
  	{
  		"item_id" : 2,
      "img_id" : 2,
      "path" : "/images/item/thumbnail",
      "img_name" : "img2.jpg",
      "img_width" : 180,
      "img_height" : 277
    },
  	{
  		"item_id" : 3,
      "img_id" : 3,
      "path" : "/images/item/thumbnail",
      "img_name" : "img3.jpg",
      "img_width" : 180,
      "img_height" : 277
    },
  	{
  		"item_id" : 4,
      "img_id" : 4,
      "path" : "/images/item/thumbnail",
      "img_name" : "img4.jpg",
      "img_width" : 180,
      "img_height" : 277
    }
  ];

	var images2 = [
		{
			"item_id" : 5,
	    "img_id" : 5,
	    "path" : "/images/item/thumbnail",
	    "img_name" : "img5.jpg",
	    "img_width" : 180,
	    "img_height" : 277
	  },
  	{
  		"item_id" : 6,
      "img_id" : 6,
      "path" : "/images/item/thumbnail",
      "img_name" : "img6.jpg",
      "img_width" : 180,
      "img_height" : 277
    },
  	{
  		"item_id" : 7,
      "img_id" : 7,
      "path" : "/images/item/thumbnail",
      "img_name" : "img7.jpg",
      "img_width" : 180,
      "img_height" : 277
    },
  	{
  		"item_id" : 8,
      "img_id" : 8,
      "path" : "/images/item/thumbnail",
      "img_name" : "img8.jpg",
      "img_width" : 180,
      "img_height" : 277
    }
  ];

	var images3 = [
		{
			"item_id" : 9,
	    "img_id" : 9,
	    "path" : "/images/item/thumbnail",
	    "img_name" : "img9.jpg",
	    "img_width" : 180,
	    "img_height" : 277
	  },
  	{
  		"item_id" : 10,
      "img_id" : 10,
      "path" : "/images/item/thumbnail",
      "img_name" : "img10.jpg",
      "img_width" : 180,
      "img_height" : 277
    },
  	{
  		"item_id" : 11,
      "img_id" : 11,
      "path" : "/images/item/thumbnail",
      "img_name" : "img11.jpg",
      "img_width" : 180,
      "img_height" : 277
    },
  	{
  		"item_id" : 1,
      "img_id" : 1,
      "path" : "/images/item/thumbnail",
      "img_name" : "img1.jpg",
      "img_width" : 180,
      "img_height" : 277
    }
  ];

  var outputs = [images1, images2, images3];

  if(outputs){
    res.json({success : 1, msg : "성공적으로 수행되었습니다.", result : outputs});
  } else {
    res.json({success : 0, msg : "에러가 발생하였습니다.", result : "fail"});
  }
});

/*
업무명 : 스타일선택
전송방식 : post
url : /main/style
 */
router.post('/style', function(req, res, next) {
	var uuid = "";
	var stA_name = "";
	var stB_name = "";
	var stC_name = "";
	var result = {"user_id": "Q24S14"};
	if(result){
		res.json({ success:1, msg:"성공적으로 수행되었습니다.", result:result });
	}else{
		res.json({ success:0, msg:"수행도중 에러가 발생했습니다." });
	}

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
전송방식 : get
url : /main/recent
 */
router.post('/recent', function(req, res, next) {
	var user_id = req.body.user_id;

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
업무명 : 좋아요등록
전송방식 : post
url : /main/like
 */
router.post('/like', function(req, res, next) {
	var user_id = req.body.user_id;
	var item_id = req.body.item_id;
	var result = "ok";
	var input_arr = [user_id, item_id];
	db_main.like(input_arr, function(result){
		if(result){
			res.json({ success:1, msg:"성공적으로 수행되었습니다.", result:"success" });
		}else{
			res.json({ success:0, msg:"수행도중 에러가 발생했습니다.", result:"false" });
		}
	});
});



module.exports = router;
