var express = require('express');
var router = express.Router();

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
			"thumbnail" : {
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
			"thumbnail" : {
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
			"thumbnail" : {
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
			"thumbnail" : {
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
			"thumbnail" : {
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
			"thumbnail" : {
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
			"thumbnail" : {
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
			"thumbnail" : {
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
router.get('/recent', function(req, res, next) {
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
			"thumbnail" : {
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
			"thumbnail" : {
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
업무명 : Q&A리스트 -> 댓글 처리 어떻게 할지 봐야함
전송방식 : get
url : /main/qna
 */
router.get('/qna', function(req, res, next) {
	/*
	var output = {
		"qnaArr" : [{
			"qna_seq" : 1,
			"qna_id" : 1,
			"qna_title" : "상품 문의드립니다",
			"qna_content" : "사이즈가 어떻게 되나요?",
			"qna_gubun" : "1",//비밀글
			"user_id" : "Q24S14",
			"qna_parentid" : "",
			"qna_regdate" : "",
			"qna_regtime" : ""
		}, {
			"qna_seq" : 2,
			"qna_id" : 2,
			"qna_title" : "상품 문의드립니다",
			"qna_content" : "컬러감이 사진 그대로 나오나요?",
			"qna_gubun" : "0",//비밀글 아님
			"user_id" : "Q24S14",
			"qna_parentid" : "",
			"qna_regdate" : "",
			"qna_regtime" : ""
		}, {
			"qna_seq" : 3,
			"qna_id" : 3,
			"qna_title" : "상품 문의드립니다",
			"qna_content" : "사진에 나오는 모델 실 사이즈가 어떻게 되나요?",
			"qna_gubun" : "1",//비밀글 아님
			"user_id" : "Q24S14",
			"qna_parentid" : "",
			"qna_regdate" : "",
			"qna_regtime" : ""
		}]
	};
	*/
	var item_id = parseInt(item_id, 10);
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
	var shop_id = "";
	var item_id = "";
	var user_id = "";
	var qna_parentid = "";
	var qna_title = "";
	var qna_content = "";
	var qna_gubun = "1";//1:정상, 0:비밀글
	// var output = "ok";
	var input_arr = [shop_id, item_id, user_id,qna_parentid, qna_title, qna_content, qna_gubun];
	db_main.qnaInsert(input_arr, function(result){
		if(result){
			res.json({ success:1, msg:"성공적으로 수행되었습니다.", result:"success" });
		}else{
			res.json({ success:0, msg:"수행도중 에러가 발생했습니다.", result:"false" });
		}
	});
});


/*
업무명 : 좋아요등록
전송방식 : post
url : /main/like
 */
router.post('/like', function(req, res, next) {
	var user_id = "";
	var item_id = "";
	// var result = "ok";
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
