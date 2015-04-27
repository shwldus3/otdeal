var express = require('express');
var router = express.Router();

/*
 업무명 : 페이스북로그인
 전송방식 : get
 url : /login/facebook
 */
router.get('/facebook', function(req, res, next) {
  var access_token = "123"; // 나중에 fbgraph 참고하기.

  res.json({success : 1, msg : "성공적으로 수행되었습니다.", result : "success"});

});

/*
 업무명 : 페이스북에서 토큰으로 받은 정보 디비에 저장...언젠가 쓰겠지뭐
 전송방식 : post
 url : /login/facebook
 */
router.post('/facebook', function(req, res, next) {
  var access_token = "123"; // 나중에 fbgraph 참고하기.

  var output = { // 디비에 넣을 정보는 나중에 더 추가.
    "email" : "gfdjkl@naver.com"
  };

  if(output){
    res.json({success : 1, msg : "성공적으로 수행되었습니다.", result : output});
  } else {
    res.json({success : 0, msg : "에러가 발생하였습니다.", result : "fail"});
  }
});
module.exports = router;
