var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/style', function(req, res, next) {
	var output = {"user_id": "Q24S14"};
	res.json({result:output});
});

module.exports = router;
