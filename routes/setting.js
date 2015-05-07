var express = require('express');
var router = express.Router();
var db_setting = require('../models/db_setting');
/*
 업무명 : 푸쉬여부수정
 전송방식 : post
 url : /setting/push
 */
router.post('/push', function(req, res, next) {

  var user_id = "qwerty";
  var ps_usecheck = "0";
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
      res.json({success : 1, msg : "성공적으로 수행되었습니다.", result : ntcArr});
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

  var os_gubun = "A";

  var result = {
    "version_now" : "1.1.1"
  };
  db_setting.version(function(os_gubun, result){
    if(result){
      res.json({success : 1, msg : "성공적으로 수행되었습니다.", result : result});
    } else {
      res.json({success : 0, msg : "에러가 발생하였습니다.", result : "fail"});
    }
  });
});


module.exports = router;
