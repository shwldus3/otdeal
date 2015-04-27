var express = require('express');
var router = express.Router();

/*
 업무명 : 푸쉬여부수정
 전송방식 : post
 url : /setting/push
 */
router.post('/push', function(req, res, next) {

  var user_id = "qwerty";
  var push_gubun = "0";
  var datas = [user_id, push_gubun];

  if(datas){
    res.json({success : 1, msg : "성공적으로 수행되었습니다.", result : "success"});
  } else {
    res.json({success : 0, msg : "에러가 발생하였습니다.", result : "fail"});
  }
});


/*
 업무명 : 공지사항 리스트
 전송방식 : get
 url : /setting/notice
 */
router.get('/notice', function(req, res, next) {
  var output = [
    {
    "ntc_id" : "1",
    "admin_id" : "aaa",
    "admin_name" : "염성원",
    "ntc_title" : "주문 배송 취소 공지사항",
    "ntc_content" : "마이페이지에서 주문 내역 취소를 누르세여~~~ 뀨",
    "ntc_stat" : "N",
    "ntc_regdate" : "2015-04-27",
    "ntc_regtime" : "2015-04-27 16:27:00"
    },
    {
      "ntc_id" : "1",
      "admin_id" : "aaa",
      "admin_name" : "노지연",
      "ntc_title" : "스타일 수정 공지사항",
      "ntc_content" : "마이페이지에서 스타일 수정을 누르세여~~~ 뀨",
      "ntc_stat" : "N",
      "ntc_regdate" : "2015-04-27",
      "ntc_regtime" : "2015-04-27 16:30:00"
    }
  ];

  if(output){
    res.json({success : 1, msg : "성공적으로 수행되었습니다.", result : output});
  } else {
    res.json({success : 0, msg : "에러가 발생하였습니다.", result : "fail"});
  }
});


/*
 업무명 : 버전정보관리
 전송방식 : get
 url : /setting/version
 */
router.get('/version', function(req, res, next) {

  var os_gubun = "A";

  var output = {
     "version_now" : "1.1.1",
     "os_gubun" : "A"
  };

  if(output){
    res.json({success : 1, msg : "성공적으로 수행되었습니다.", result : output});
  } else {
    res.json({success : 0, msg : "에러가 발생하였습니다.", result : "fail"});
  }
});
module.exports = router;
