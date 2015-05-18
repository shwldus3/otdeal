var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var db_login = require('../models/db_login');
var graph = require('fbgraph');
var async = require('async');

/*
 업무명 : 페이스북 정보 저장
 전송방식 : post
 url : /login/facebook
 */
router.post('/facebook', function(req, res, next) {
  var token = req.body.access_token;
  var user_id = req.body.user_id;
  var id = '';
  var name = '';
  // 액세스 토큰으로 정보 받아오기.
  function getfbinfo(token, callback) {
    graph.setAccessToken(token);
    graph.get("me", function (err, res) {
      // console.log(res);
      id = res.id;
      name = res.name;
      // var data = [id, name]
      callback(null, id, name);
    });
  }

  async.waterfall([
      function(callback) {
        getfbinfo(token, callback);
      }
    ],
    function(err, result){
      if(err) throw err;
      console.log('result', result);

      var dataArr = [id, name, user_id];
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