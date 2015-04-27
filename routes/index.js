 var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(output){
    res.json({success : 1, msg : "성공적으로 수행되었습니다.", result : output}); // 모바일서버의 경우
  } else {
    res.json({success : 0, msg : "에러가 발생하였습니다.", result : "fail"});
  }
});

module.exports = router;
