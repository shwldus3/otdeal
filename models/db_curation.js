// db_recommend.js

var mysql = require('mysql');
var logger = require('../routes/static/logger.js');
var db_config = require('./db_config');
var pool = mysql.createPool(db_config);
var async = require('async');
var fileutil = require('../utils/fileutil.js');


exports.findItemIdArr = function(user_id, callback){
	pool.getConnection(function(err, conn){
		async.series([
			function(callback){
				findbskArr(user_id, callback);
	    },
	    function(callback){
	    	findorderArr(user_id, callback);
	    },
	    function(callback){
	    	findlikeArr(user_id, callback);
	    }
		], function(err, result){
			if(err) throw err;
			// console.log('result', result);
			conn.release();
			callback(result);
		});

		function findbskArr(user_id, callback){
			// console.log('user_id', user_id);
			if(err) throw err;
			var sql = 'select if(itm.item_grcd=0 and itm.item_grid is not NULL, itm.item_grid, bsk.item_id) as item_id, bsk.bsk_regtime as regtime from TBBSK bsk, TBITM itm where bsk.user_id = ? and itm.item_id = bsk.item_id';
			conn.query(sql, user_id, function(err, rows){
				if(err) throw err;
				// console.log('rows', rows);
				// conn.release();
				callback(null, rows);
			});
		}

		function findorderArr(user_id, callback){
			// console.log('user_id', user_id);
			if(err) throw err;
			var sql = 'select if(itm.item_grcd=0 and itm.item_grid is not NULL, itm.item_grid, odritm.item_id) as item_id, odr.order_regtime as regtime from TBODR odr, TBODRITM odritm, TBITM itm where user_id = ? and odritm.order_id = odr.order_id and itm.item_id = odritm.item_id';
			conn.query(sql, user_id, function(err, rows){
				if(err) throw err;
				// console.log('rows', rows);
				// conn.release();
				callback(null, rows);
			});
		}

		function findlikeArr(user_id, callback){
			// console.log('user_id', user_id);
			if(err) throw err;
			var sql = 'select item_id, like_regtime as regtime from TBLK where user_id = ?';
			conn.query(sql, user_id, function(err, rows){
				if(err) throw err;
				// console.log('rows', rows);
				// conn.release();
				callback(null, rows);
			});
		}

	});
};