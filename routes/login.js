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
 업무명 : 페이스북에서 토큰으로 받은 정보 디비에 저장...언젠가 쓰겠지뭐
 전송방식 : post
 url : /login/facebook
 */
router.post('/facebook', function(req, res, next) {
  var access_token = "CAACEdEose0cBAC2qn4aEMcxozXifHYZCIFLlHWHWrgj3G9COyK0egEjvWGH32nK7vWRm751L6bZA0xQVOGwNCFYvoVZBmBxfkVBLa6Bg7OlRxgq12MfZBlxf2k70kYCMw02gGFxdZCSCq0p1pxmrsHkULT3SUQVI6ZAkItPYXtyaZAJTLiq6pxXCmnc7cL1KR2bbwBdZAIEMIWxEAB0Od5Hn";
  //var access_token = req.body.access_token;

  // user_id를 난수 6자리로 생성.
  function randomValueBase64 (len) {
    return crypto.randomBytes(Math.ceil(len * 3 / 4))
      .toString('base64')   // convert to base64 format
      .slice(0, len)        // return required number of characters
      .replace(/\+/g, '0')  // replace '+' with '0'
      .replace(/\//g, '0'); // replace '/' with '0'
  }
  var user_id = randomValueBase64(6);  // value 'jWHSOz'
  //console.log('user_id',user_id);
  req.session.user_id = user_id; // user_id 세션에 담기.
  //console.log('req.session.user_id', req.session.user_id);

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
      console.log('result', result); // results [ 'one', 'two' ]

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

module.exports = router;


/*
 업무명 : 페이스북로그인
 전송방식 : get
 url : /login/facebook
 */
//router.get('/facebook', function(req, res, next) {
//  var access_token = "CAACEdEose0cBADJPZAhbaE7hkkRFlwqJAbWyMvA3WTBk8aLkrOGutlrre29l5o10z2dvZA2VLwgAMksrcccZBie71ZBQNo4Dxh41TCoUM745CqfaZCJZCsff13SiljMSQY3MNRzBd1ZCQ2fITZAEEgsNJXSrsPbYUBvmyXQrM45vlazVIESkLOahn9zJTAZBKUloRpR572CVeJ8yakm7Yuzb6"; // 나중에 fbgraph 참고하기.
//
//  function randomValueBase64 (len) {
//    return crypto.randomBytes(Math.ceil(len * 3 / 4))
//      .toString('base64')   // convert to base64 format
//      .slice(0, len)        // return required number of characters
//      .replace(/\+/g, '0')  // replace '+' with '0'
//      .replace(/\//g, '0'); // replace '/' with '0'
//  }
//
//  var user_id = randomValueBase64(6);  // value 'jWHSOz'
//
//  //req.session.user_id = user_id;
//  console.log('user_id', user_id);
//  res.json({success: 1, msg: "성공적으로 수행되었습니다.", result: "success"});
//
//  //db_login.fblogin(access_token, function(success){
//  //  if(success) {
//  //    res.json({success: 1, msg: "성공적으로 수행되었습니다.", result: "success"});
//  //  } else {
//  //    res.json({success: 0, msg: "에러가 발생하였습니다.", result : "fail"});
//  //  }
//  //});
//
//  /*
//  var access_token = "123"; // 나중에 fbgraph 참고하기.
//  res.json({success : 1, msg : "성공적으로 수행되었습니다.", result : "success"});
//  */
//
//});
