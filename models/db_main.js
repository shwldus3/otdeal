// 메인 페이지 관련 db 처리
// db_main.js

var mysql = require('mysql');
var logger = require('../routes/static/logger.js');
var db_config = require('./db_config');
var pool = mysql.createPool(db_config);
var async = require('async');
var fileutil = require('../utils/fileutil.js');

/**
 * 업무명 : 초기 이미지 선택 리스트
 * @param  {Function} callback
 * @return {[object]}            [랜덤 아이템이미지 배열]
 */
exports.cuList = function(callback){
	pool.getConnection(function(err, conn){
		if(err) console.error('err', err);

		async.waterfall([
			function(callback){
				getRNumArr(callback);
			},
			function(rNumArr, callback){
				getItemImg(rNumArr, callback);
			}
		],
		function(err, result){
			console.log('result', result);
			conn.release();
			callback(result);
		});

		function getRNumArr(callback){
			var sql = 'select count(*) as num from itemImg';
			conn.query(sql, function(err, row){
				if(err) console.error('err', err);
				var rNum;
				var rNumArr = [];

				// while문 12번 돌리기
				async.whilst(
			    function () {
			    	// console.log('rNumArr.length', rNumArr.length);
			    	return rNumArr.length < 12;
			    },
			    function (callback) {
		        // setTimeout(callback, 1000);
		        var i = 0;
		        async.waterfall([
		        	function(callback){
		        		(function(i){
		        			process.nextTick(function(){
		        				var num = (row[0].num)-1;
		        				// console.log('num', num);
		        				rNum = Math.floor((Math.random() * num) + 1);
		        				// console.log('rNum', rNum);
		        				callback(null, rNum);
		        			});
		        		})(i);
		        		i = i + 1;
		        	},
		        	function(rNum, callback){
		        		// console.log('rNum', rNum);
		        		var check = rNumArr.indexOf(rNum);
		        		// console.log('check', check);
		        		if(check==-1){
		        			rNumArr.push(rNum);
		        			callback(null, rNumArr);
		        		} else {
		        			callback(null);
		        		}
		        	}
		        ], function(err, result){
		        	// console.log('rNumArr',rNumArr);
		        	callback();
		        });
			    },
			    function (err) {
			        if(err) console.log('err', err);
			        // console.log('rNumArr',rNumArr);
			        callback(null, rNumArr);
			        // console.log('rNumArr.length', rNumArr.length);
			    }
				);
			});
		} // getRNumArr

		function getItemImg(rNumArr, callback){
			var itemimgArr = [];
			async.each(rNumArr, function(limit, callback){
				var sql = 'select * from itemImg order by item_id asc limit ?,1';
				conn.query(sql, limit, function(err, rows){
					// console.log('rows', rows);
					if(err) console.error('err', err);
					itemimgArr.push(rows[0]);
					// console.log('itemimgArr',itemimgArr);
					callback(null, itemimgArr);
				});
			}, function(err){
					if(itemimgArr){
						//이미지 width, height 가져오기
						fileutil.getFileInfo(itemimgArr, function(err, itemimgArr){
							callback(null, itemimgArr);
						});
						// callback(null, itemimgArr);
					} else {
						callback(null, false);
					}
			});
		} // getItemImg

	});
};

/**
 * 업무명 : 사용자 선택정보저장
 * @param  {[array]}   dataArr  [inputData : tel_uuid, user_id, user_gender, user_age, size_id]
 * @param  {Function} callback
 * @return {[boolean]}            [성공여부]
 */
exports.infoInsert = function(dataArr, callback){
	pool.getConnection(function(err, conn){
		if(err) console.log('err', err);
		var sql = 'insert into TBUSR (tel_uuid, user_id, user_gender, user_age, size_id) values(?, ?, ?, ?, ?)';
		conn.query(sql, dataArr, function(err, row){
			if(err) console.log('err', err);
			console.log('row', row);
			var success = false;
			if(row.affectedRows == 1){
				success = true;
			}
			conn.release();
			callback(success);
		});
	});
};



/**
 * 업무명 : 좋아요 등록
 * @param  {[array]}   datas	[inputData : user_id, item_id]
 * @param  {Function} callback
 * @return {[boolean]}			[성공여부]
 */
exports.like = function(datas, callback){
	pool.getConnection(function(err, conn){
		if(err) console.error('err', err);
		var sql = "insert into TBLK (user_id, item_id, like_regdate) values(?, ?, now())";
		conn.query(sql, datas, function(err, row){
			if(err) console.error('err', err);
			logger.debug('row', row);
			var success = false;
			if(row.affectedRows == 1){
				success = true;
			}
			conn.release();
			callback(success);
		});
	});
};


/**
 * 업무명 : 최근 본 상품
 * @param  {[array]}   dataArr [inputData : user_id]
 * @param  {Function} callback [description]
 * @return {[object]}          [아이템썸네일배열]
 */
exports.recentList = function(dataArr, callback){
	console.log('dataArr', dataArr);
	pool.getConnection(function(err, conn){
		if(err) console.error('err', err);
		var itmArr = [];
		async.each(dataArr, function(item_id, callback){
			console.log('item_id', item_id);
			var sql = "select item_id, path, img_name from TBIMG where item_id=? and img_thumbnail='Y'";
			conn.query(sql, item_id, function(err, row){
				if(err) console.error('err', err);
				console.log('row', row);
				if(row[0]) {
					itmArr.push(row[0]);
				}
				console.log('itmArr', itmArr);
				callback(null, itmArr);
			});
		}, function(err){
			if(itmArr){
				callback(itmArr);
			} else {
				callback(false);
			}
		});
		conn.release();
	});
};


/**
 * QNA List
 * @param  {[array]}   data     [inputData : item_id]
 * @param  {Function} callback
 * @return {[array]}            [list 데이터]
 */
exports.qnalist = function(data, callback){
	pool.getConnection(function(err, conn){
		if(err) console.error('err', err);
		var sql = "select qna_id, qna_title, qna_content, qna_gubun, user_id, qna_parentid, qna_regdate, qna_regtime from TBQNA where item_id=?";
		conn.query(sql, data, function(err, rows){
			if(err) console.error('err', err);
			logger.debug('rows', rows);
			conn.release();
			var result = {qnaArr : rows};
			callback(result);
		});
	});
};


/**
 * QNA 질문글 등록
 * @param  {[array]}   datas    [inputData : shop_id, item_id, user_id, qna_title, qna_content, qna_gubun]
 * @param  {Function} callback
 * @return {[boolean]}            [성공여부]
 */
exports.qnaInsert_Q = function(datas, callback){
	pool.getConnection(function(err, conn){
		if(err) console.error('err', err);
		logger.debug(datas);
		var sql = "insert into TBQNA (shop_id, item_id, user_id, qna_title, qna_content, qna_gubun, qna_regdate) values(?, ?, ?, ?, ?, ?, now())";
		conn.query(sql, datas, function(err, row){
			if(err) console.error('err', err);
			logger.debug('row', row);
			var success = false;
			if(row.affectedRows == 1){
				success = true;
			}
			conn.release();
			callback(success);
		});
	});
};


/**
 * QNA 답변글 등록
 * @param  {[array]}   datas    [inputData : shop_id, item_id, user_id, qna_parentid, qna_title, qna_content, qna_gubun]
 * @param  {Function} callback
 * @return {[boolean]}            [성공여부]
 */
exports.qnaInsert_A = function(datas, callback){
	pool.getConnection(function(err, conn){
		if(err) console.error('err', err);
		var sql = "insert into TBQNA (shop_id, item_id, user_id, qna_parentid, qna_title, qna_content, qna_gubun, qna_regdate) values(?, ?, ?, ?, ?, ?, ?, now())";
		conn.query(sql, datas, function(err, row){
			if(err) console.error('err', err);
			logger.debug('row', row);
			var success = false;
			if(row.affectedRows == 1){
				success = true;
			}
			conn.release();
			callback(success);
		});
	});
};