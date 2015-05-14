var express = require('express');
var router = express.Router();
var gcm = require('node-gcm');
var db_push = require('../models/db_push');


/*
 업무명 : PUSH토큰저장
 전송방식 : post
 url : /push/register
 */
router.post('/register', function(req, res, next){
	var user_id = req.body.user_id;
	var ps_token = req.body.ps_token;
	var datas = [ps_token, user_id];
	db_push.register(datas, function(result){
		if(!result) throw "fail";
		res.json({success : 1, msg : "성공적으로 수행되었습니다.", result : "success"});
	});
});


/*
 업무명 : PUSH사용여부수정
 전송방식 : post
 url : /push/update
 */
router.post('/update', function(req, res, next) {

	var user_id = req.body.user_id;
	var ps_usecheck = req.body.ps_usecheck;
	var datas = [ps_usecheck, user_id];
	db_push.update(datas, function(result){
		if(result){
			res.json({success : 1, msg : "성공적으로 수행되었습니다.", result : "success"});
		} else {
			res.json({success : 0, msg : "에러가 발생하였습니다.", result : "fail"});
		}
	});
});


/*
 업무명 : PUSH보내기
 전송방식 : post
 url : /push
 */
router.post('/', function(req, res, next){
	var message = new gcm.Message();
	var sender = new gcm.Sender('AIzaSyDueiYv4SW-UGzLYfiFNfpmBfzA1NjkRu0');
	var send_msg = req.body.send_msg;
	var send_title = req.body.send_title;

	db_push.push(function(result){
		if(!result) throw "fail";
		if(result.length > 0){
			message.addData(send_title);
			message.addData(send_msg);
			sender.sendNoRetry(message, result, function(err, result){
				if(err) throw "fail";
				res.json({success : 1, msg : "성공적으로 수행되었습니다.", result : "success"});
			});
		}
	});
});


module.exports = router;