// recommend.js
var express = require('express');
var router = express.Router();
var db_curation = require('../models/db_curation');
var HashMap = require('hashmap');
var async = require('async');
var dateutils = require('date-utils');

// 몽고디비 사용
var db = require('../models/db_config_mongo');
require('../models/clickmodel');
var ClickModel = db.model('Click');

/*
추천~~~~
*/
router.get('/recmd/item', function(req, res, next){
	var user_id = '';
	var clickArr ='';
	var userIdArr = [];

	db_curation.findUserId(function(rows){
		// console.log('rows', rows);
		// console.log('rows[0].user_id', rows[0].user_id);
		// console.log('rows[1].user_id', rows[1].user_id);
		// console.log('rows.length', rows.length);

		var i = 0;
		async.whilst(
		    function () { return i < rows.length-1; },
		    function (callback) {
		        // console.log('rows[i].user_id', rows[i].user_id);
	        	userIdArr.push(rows[i].user_id);
	        	i++;
		        callback();
		        // setTimeout(callback, 1000);
		    },
		    function (err) {
		    	if(err) throw err;
		    	// console.log('userIdArr', userIdArr);
		    }
		);

	async.each(userIdArr, function(user_id, callback){
		// console.log('async userIdArr', userIdArr);
		console.log('user_id', user_id);
		// click된 item_id 각각을 받아온다.
		ClickModel.find({user_id:user_id},{_id:0,item_id:1,user_id:1,regtime:1}).exec(function(err, docs){
			clickArr = docs;
			// console.log('clickArr', clickArr);
		}); // MongoDB

		// bsk, order, like된 item_id 각각을 받아온다.
		db_curation.findItemIdArr(user_id, function(dataArr){
			// console.log('user_id', user_id);
			// console.log('db_main에서 잘 받아오나 dataArr', dataArr);
			var bskArr = dataArr[0];
			var orderArr = dataArr[1];
			var likeArr = dataArr[2];
			// console.log('clickArr', clickArr);
			// console.log('bskArr', bskArr);
			// console.log('orderArr', orderArr);
			// console.log('likeArr', likeArr);

			// 시간가중치 적용
			async.series({
			  clickArr: function(callback){
			    // console.log('click');
					getTimeWeight(clickArr, callback);
			  },
			  bskArr: function(callback){
			  	// console.log('bsk');
			  	getTimeWeight(bskArr, callback);
			  },
			  orderArr: function(callback){
			  	// console.log('order');
			  	getTimeWeight(orderArr, callback);
			  },
			  likeArr: function(callback){
			  	// console.log('like');
			  	getTimeWeight(likeArr, callback);
			  }
			}, function(err, result) {
		    if(err) throw err;
		    // console.log('result_time', result);
		    // callback(null, result);

		    // 항목가중치 적용
		    async.series({
		      clickArr: function(callback){
		        // console.log('click');
		    		getItemWeight(result.clickArr, 0.05, callback);
		      },
		      bskArr: function(callback){
		      	// console.log('bsk');
		      	getItemWeight(result.bskArr, 0.25, callback);
		      },
		      orderArr: function(callback){
		      	// console.log('order');
		      	getItemWeight(result.orderArr, 0.5, callback);
		      },
		      likeArr: function(callback){
		      	// console.log('like');
		      	getItemWeight(result.likeArr, 0.2, callback);
		      }
		    }, function(err, result){
		    	if(err) throw err;
		    	// console.log('result_item', result);
		    	// callback(null, result);

		    	var clickWeightArr = result.clickArr;
		    	var bskWeightArr = result.bskArr;
		    	var orderWeightArr = result.orderArr;
		    	var likeWeightArr = result.likeArr;

		    	var combineArr = [];

		    	// console.log('clickWeightArr', clickWeightArr);
		    	// console.log('bskWeightArr', bskWeightArr);
		    	// console.log('orderWeightArr', orderWeightArr);
		    	// console.log('likeWeightArr', likeWeightArr);

		    	async.series([
		    		function(callback){
		    			pushArr(clickWeightArr, combineArr, callback);
		    		},
		    		function(callback){
		    			pushArr(bskWeightArr, combineArr, callback);
		    		},
		    		function(callback){
		    			pushArr(orderWeightArr, combineArr, callback);
		    		},
		    		function(callback){
		    			pushArr(likeWeightArr, combineArr, callback);
		    		}
	    		], function(err, result){
	    			if(err) throw err;
	    			// console.log('result_combineArr', result);
	    			// console.log('combineArr', combineArr);
	    			// callback(null, result);

	    			var map = new HashMap();

	    			async.each(combineArr, function(data, callback){
	    				var value = map.get(data[0]);
	    				if(value == null){
	    					map.set(data[0], data[1]);
	    				} else {
	    					map.set(data[0], (data[1]+value));
	    				}
	    				callback(null, map);
	    			}, function(err){
	    				if(err) throw err;
	    				// console.log('map', map);
	    				// callback(null, map);

	    				var interestArr = [];
	    				map.forEach(function(value, key){
	    					var arr = new Array();
	    					arr.push(parseInt(key));
	    					arr.push(parseFloat((value).toFixed(3)));
	    					interestArr.push(arr);
	    				});

	    				console.log('interestArr', interestArr);
							callback(null, interestArr);

// callback();
	    			}); // async.each(combineArr, function(data, callback)
// callback();
	    		}); // interestArr에 push series
// callback();
		    }); // 항목가중치 series
// callback();
			}); // 시간가중치 series
// callback();
		}); // db_curation.findItemIdArr
		// callback();

	}, function(err){
		// if(err) throw err;

		if( err ) {
		  // One of the iterations produced an error.
		  // All processing will now stop.
		  console.log('error!');
		} else {
		  console.log('processed successfully');
		}
	});
}); // db_curation.findUserId

});






// 시간가중치 얻는 함수
function getTimeWeight(dataArr, callback){
	// console.log('dataArr', dataArr);
	var timeWeightArr = [];
	async.each(dataArr, function(data, callback){
		var dayDiff = (data.regtime).getDaysBetween(Date.today());

		if(dayDiff > 1){
			var log = Math.log(dayDiff) / Math.LN10;
		} else if(dayDiff = 1) {
			var log = 0.23
		} else if(dayDiff = 0) {
			var log = 0.30
		}
		var itemArr = new Array();
		itemArr[0] = data.item_id;
		itemArr[1] = 1 / log;
		timeWeightArr.push(itemArr);
		// console.log('dayDiff', dayDiff);
		// console.log('log', log);
		callback(null, timeWeightArr);
	}, function(err){
		if(err) throw err;
		// console.log('timeWeightArr', timeWeightArr);
		callback(null, timeWeightArr);
	});
}

// 항목 가중치 얻는 함수
function getItemWeight(dataArr, itemweight, callback){
	async.each(dataArr, function(data, callback){
		data[1] = (data[1]*itemweight).toFixed(3);
		// console.log('data',data);
		// console.log('dataArr', dataArr);
		callback(null, dataArr);
	}, function(err){
		if(err) throw err;
		callback(null, dataArr);
	});
}

// clickArr, bskArr, orderArr, likeArr를
// combineArr에 push해서 하나로 만든다.
function pushArr(dataArr, combineArr, callback){
	async.each(dataArr, function(data, callback){
		// console.log('data', data);
		data[1] = parseFloat(data[1]);
		combineArr.push(data);
		// console.log('combineArr', combineArr);
		callback(null, combineArr);
	}, function(err){
		if(err) throw err;
		callback(null, combineArr);
	});
}

module.exports = router;