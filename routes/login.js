var express = require('express');
var router = express.Router();

/*
 ������ : ���̽��Ϸα���
 ���۹�� : get
 url : /login/facebook
 */
router.get('/facebook', function(req, res, next) {
  var access_token = "123"; // ���߿� fbgraph �����ϱ�.

  res.json({success : 1, msg : "���������� ����Ǿ����ϴ�.", result : "success"});

});

/*
 ������ : ���̽��Ͽ��� ��ū���� ���� ���� ��� ����...������ ��������
 ���۹�� : post
 url : /login/facebook
 */
router.post('/facebook', function(req, res, next) {
  var access_token = "123"; // ���߿� fbgraph �����ϱ�.

  var output = { // ��� ���� ������ ���߿� �� �߰�.
    "email" : "gfdjkl@naver.com"
  };

  if(output){
    res.json({success : 1, msg : "���������� ����Ǿ����ϴ�.", result : output});
  } else {
    res.json({success : 0, msg : "������ �߻��Ͽ����ϴ�.", result : "fail"});
  }
});
module.exports = router;
