var express = require('express');
var router = express.Router();
var db_setting = require('../models/db_setting');
/*
 업무명 : 푸쉬여부수정
 전송방식 : post
 url : /setting/push
 */
router.post('/push', function(req, res, next) {

  var user_id = req.session.user_id;
  var ps_usecheck = req.body.ps_usecheck;
  var datas = [ps_usecheck, user_id];
  db_setting.push(datas, function(result){
    if(result){
      res.json({success : 1, msg : "성공적으로 수행되었습니다.", result : "success"});
    } else {
      res.json({success : 0, msg : "에러가 발생하였습니다.", result : "fail"});
    }
  });
});


/*
 업무명 : 공지사항 리스트
 전송방식 : get
 url : /setting/notice
 */

router.get('/notice', function(req, res, next) {
  db_setting.notice(function(ntcArr){
    if(ntcArr){
      res.json({success : 1, msg : "성공적으로 수행되었습니다.", ntcArr : ntcArr});
    } else {
      res.json({success : 0, msg : "에러가 발생하였습니다.", result : "fail"});
    }
  });
});


/*
 업무명 : 버전정보관리
 전송방식 : get
 url : /setting/version
 */
router.get('/version', function(req, res, next) {
  var os_gubun = req.body.os_gubun;
  db_setting.version(function(os_gubun, result){
    if(result){
      res.json({success : 1, msg : "성공적으로 수행되었습니다.", result : result});
    } else {
      res.json({success : 0, msg : "에러가 발생하였습니다.", result : "fail"});
    }
  });
});

module.exports = router;
