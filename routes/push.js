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
	var send_msg = req.body.send_msg;
	var send_title = req.body.send_title;

	db_push.push(function(registration_ids){
		if(registration_ids.length > 0){
			var message = new gcm.Message({
				collapseKey: 'demo',
				delayWhileIdle: true,
				timeToLive: 3,
				data: {
					"send_title": send_title,
					"send_msg": send_msg
				}
			});
			var sender = new gcm.Sender('AIzaSyDueiYv4SW-UGzLYfiFNfpmBfzA1NjkRu0');
			console.log(message);
			console.log(registration_ids);
			sender.send(message, registration_ids, function(err, result){
				if(err) console.error(err);
				else    console.log(result);
				if(result.success==1){
					res.json({success : 1, msg : "성공적으로 수행되었습니다.", result : "success"});
				}else{
					res.json({success : 0, msg : "에러가 발생하였습니다.", result : "fail"});
				}
			});
		}else{
			res.json({success : 0, msg : "푸쉬 발송할 디바이스가 없습니다.", result : "fail"});
		}
	});
});


module.exports = router;