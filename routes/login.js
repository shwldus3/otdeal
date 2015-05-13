var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var db_login = require('../models/db_login');
var graph = require('fbgraph');
var async = require('async');

// json -> obj 처리 참고
//var obj = JSON.parse(access_token);
//console.log(obj.access_token);

/*
 업무명 : 페이스북 정보 저장
 전송방식 : post
 url : /login/facebook
 */
router.post('/facebook', function(req, res, next) {
  // var access_token = "CAACEdEose0cBAC2qn4aEMcxozXifHYZCIFLlHWHWrgj3G9COyK0egEjvWGH32nK7vWRm751L6bZA0xQVOGwNCFYvoVZBmBxfkVBLa6Bg7OlRxgq12MfZBlxf2k70kYCMw02gGFxdZCSCq0p1pxmrsHkULT3SUQVI6ZAkItPYXtyaZAJTLiq6pxXCmnc7cL1KR2bbwBdZAIEMIWxEAB0Od5Hn";
  var access_token = req.body.access_token;
  var user_id = req.session.user_id;

  var name = '';
  // 액세스 토큰으로 정보 받아오기.
  function getfbinfo(access_token, callback) {
    graph.setAccessToken(access_token);
    graph.get("me", function (err, res) {
      console.log(res);
      name = res.name;
      callback(null, name);
    });
  }

  async.waterfall([
      function(callback) {
        getfbinfo(access_token, callback);
      }
    ],
    function(err, result){
      if(err) console.error('err', err);
      console.log('result', result);

      var dataArr = [user_id, name, access_token];
      console.log('dataArr', dataArr);

      db_login.fblogin(dataArr, function(success){
        if(success){
          res.json({success : 1, msg : "성공적으로 수행되었습니다.", result : "success"});
        } else {
          res.json({success : 0, msg : "에러가 발생하였습니다.", result : "fail"});
        }
      });
    });
});


/**
 * 세션 임시저장
 */
router.get('/test', function(req, res, next) {
  req.session.user_id = "qwerty";
  res.json({success : 1, msg : "성공적으로 수행되었습니다.", result : "success"});
});


module.exports = router;