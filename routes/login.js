var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var db_login = require('../models/db_login');

/*
 업무명 : 페이스북에서 토큰으로 받은 정보 디비에 저장...언젠가 쓰겠지뭐
 전송방식 : post
 url : /login/facebook
 */

router.post('/facebook', function(req, res, next) {
  var access_token = '{access_token : 123123 }'; // json 어떻게 받는지 몰라아아아아

  var obj = JSON.parse(access_token);
  console.log(obj.access_token);

  // user_id를 난수 6자리로 생성.
  function randomValueBase64 (len) {
    return crypto.randomBytes(Math.ceil(len * 3 / 4))
      .toString('base64')   // convert to base64 format
      .slice(0, len)        // return required number of characters
      .replace(/\+/g, '0')  // replace '+' with '0'
      .replace(/\//g, '0'); // replace '/' with '0'
  }
  var user_id = randomValueBase64(6);  // value 'jWHSOz'
  console.log('user_id',user_id);

  //req.session.user_id = user_id; // user_id 세션에 담기.
  //var id = req.session.user_id;
  //console.log('id', id);

  var dataArr = [user_id, access_token];

  db_login.fblogin(dataArr, function(success){
    if(success){
      res.json({success : 1, msg : "성공적으로 수행되었습니다.", result : "success"});
    } else {
      res.json({success : 0, msg : "에러가 발생하였습니다.", result : "fail"});
    }
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
