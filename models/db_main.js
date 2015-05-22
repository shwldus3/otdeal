// 메인 페이지 관련 db 처리
// db_main.js

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





/**
 * 업무명 : UUID 찾기
 * @param  {[string]}   tel_uuid [사용자UUID]
 * @param  {Function} callback
 * @return {[object]}            [user_id, tel_uuid 객체]
 */
 exports.findUUID = function(tel_uuid, callback){
 	pool.getConnection(function(err, conn){
 		console.log('tel_uuid', tel_uuid);
 		if(err) throw err;
 		var sql = 'select user_id, tel_uuid from TBUSR where tel_uuid=?';
 		conn.query(sql, tel_uuid, function(err, row){
 			if(err) throw err;
 			console.log('row', row);
 			conn.release();
 			callback(row);
 		});
 	});
 };


 /**
  * 업무명 : 초기 이미지 선택 리스트
  * @param  {Function} callback
  * @return {[object]}            [랜덤 아이템이미지 배열]
  */
 exports.cuList = function(callback){
 	pool.getConnection(function(err, conn){
 		if(err) throw err;

 		async.waterfall([
 			function(callback){
 				getRNumArr(callback);
 			},
 			function(rNumArr, callback){
 				getItemImg(rNumArr, callback);
 			}
 		],
 		function(err, result){
 			if(err) throw err;
 			console.log('result', result);
 			conn.release();
 			callback(result);
 		});

 		function getRNumArr(callback){
 			var sql = 'select count(*) as num from itemImg';
 			conn.query(sql, function(err, row){
 				if(err) throw err;
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
 			        if(err) throw err;
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
 					if(err) throw err;
 					itemimgArr.push(rows[0]);
 					// console.log('itemimgArr',itemimgArr);
 					callback(null, itemimgArr);
 				});
 			}, function(err){
 				if(err) throw err;
 				if(itemimgArr){
 					//이미지 width, height 가져오기
 					// fileutil.getFileInfo(itemimgArr, function(err, itemimgArr){
 					// 	// if(err) throw err;
 					// 	callback(null, itemimgArr);
 					// });
 					callback(null, itemimgArr);
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
	console.log('dataArr', dataArr);
	pool.getConnection(function(err, conn){
		if(err) throw err;
		var sql = 'insert into TBUSR (tel_uuid, user_id, user_gender, user_age, size_id, nickname) values(?, ?, ?, ?, ?, ?)';
		conn.query(sql, dataArr, function(err, row){
			if(err) throw err;
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
 * 업무명 : 추천아이템 메인리스트
 * @param  {[type]}   data     [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
exports.recmd_item = function(user_id, callback){
	pool.getConnection(function(err, conn){
		if(err) throw err;

		async.waterfall([
 			function(callback){
 				getItemInfo(callback);
 			},
 			function(itemInfoRows, callback){
 				getLikeYn(itemInfoRows, callback);
 			}
 		],
 		function(err, result){
 			if(err) throw err;
 			console.log('result', result);
 			conn.release();
 			callback(result);
 		});


 		function getItemInfo(callback){
 			var sql = "select a.item_id, a.item_name, a.item_price, a.item_saleprice, Floor((a.item_price-a.item_saleprice)/a.item_price*100) as item_sale, a.launch_date, a.item_regdate, a.item_regtime, b.img_id, b.path, b.img_name from TBITM as a, TBIMG as b where (item_grcd=0 and item_grid is NULL or item_grcd=1 and item_grid is NULL) and a.item_id = b.item_id and b.img_thumbnail = 'Y' order by launch_date desc";
			conn.query(sql, user_id, function(err, itemInfoRows){
				if(err) throw err;
				// console.log('itemInfoRows', itemInfoRows);
				if(itemInfoRows){
					callback(null, itemInfoRows);
				}else{
					callback(null);
				}
			});
 		}


 		function getLikeYn(itemInfoRows, callback){
 			async.each(itemInfoRows, function(itemInfoRow, callback){
				// logger.debug('item_id', itemInfoRow.item_id);
				var inputArr = [itemInfoRow.item_id, user_id];
				var item_like_yn = '';
				var sql = "select item_id from TBLK where item_id = ? and user_id=?";
				conn.query(sql, inputArr, function(err, row){
					if(err) throw err;
					// logger.debug('row', row);
					if(row[0]) {
						item_like_yn = 'Y';
					}else{
						item_like_yn = 'N';
					}
					// logger.debug('item_like_yn', item_like_yn);
					itemInfoRow.item_like_yn = item_like_yn;
					// logger.debug('row',itemInfoRow);
					callback(null);
				});
			}, function(err){
				if(err) throw err;
				if(itemInfoRows){
					logger.debug(itemInfoRows);
					// logger.debug(itemInfoRows);
					//이미지 width, height 가져오기
					// fileutil.getFileInfo(itemInfoRows, function(err, itemInfoRows){
					// 	if(err) throw err;
					// 	callback(null, itemInfoRows);
					// });
 					callback(null, itemInfoRows);
				} else {
					callback(null, false);
				}
			});
 		};
	});
};


/**
 * 업무명 : 세상에단하나 아이템리스트
 * @param  {[type]}   data     [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
exports.recmd_oneforyou = function(user_id, callback){
	pool.getConnection(function(err, conn){
		if(err) throw err;

		async.waterfall([
 			function(callback){
 				getItemInfo(callback);
 			},
 			function(itemInfoRows, callback){
 				getLikeYn(itemInfoRows, callback);
 			}
 		],
 		function(err, result){
 			if(err) throw err;
 			console.log('result', result);
 			conn.release();
 			callback(result);
 		});


 		function getItemInfo(callback){
 			var sql = "select a.item_id, a.item_name, a.item_price, a.item_saleprice, Floor((a.item_price-a.item_saleprice)/a.item_price*100) as item_sale, a.item_cnt, a.launch_date, a.item_regdate, a.item_regtime, b.img_id, b.path, b.img_name from TBITM as a, TBIMG as b where (item_grcd=0 and item_grid is NULL or item_grcd=1 and item_grid is NULL) and a.item_id = b.item_id and b.img_thumbnail = 'Y' and a.item_cnt='1' order by launch_date desc";
			conn.query(sql, user_id, function(err, itemInfoRows){
				if(err) throw err;
				// console.log('itemInfoRows', itemInfoRows);
				if(itemInfoRows){
					callback(null, itemInfoRows);
				}else{
					callback(null);
				}
			});
 		}


 		function getLikeYn(itemInfoRows, callback){
 			async.each(itemInfoRows, function(itemInfoRow, callback){
				// logger.debug('item_id', itemInfoRow.item_id);
				var inputArr = [itemInfoRow.item_id, user_id];
				var item_like_yn = '';
				var sql = "select item_id from TBLK where item_id = ? and user_id=?";
				conn.query(sql, inputArr, function(err, row){
					if(err) throw err;
					// logger.debug('row', row);
					if(row[0]) {
						item_like_yn = 'Y';
					}else{
						item_like_yn = 'N';
					}
					// logger.debug('item_like_yn', item_like_yn);
					itemInfoRow.item_like_yn = item_like_yn;
					// logger.debug('row',itemInfoRow);
					callback(null);
				});
			}, function(err){
				if(err) throw err;
				if(itemInfoRows){
					// logger.debug(itemInfoRows);
					//이미지 width, height 가져오기
					// fileutil.getFileInfo(itemInfoRows, function(err, itemInfoRows){
					// 	if(err) throw err;
					// 	logger.debug('오긴오는거냐며');
					// 	callback(null, itemInfoRows);
					// });
 						callback(null, itemInfoRows);
				} else {
					callback(null, false);
				}
			});
 		};
	});
};



/**
 * 업무명 : 좋아요 랭킹리스트
 * @param  {[type]}   data     [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
exports.recmd_like = function(user_id, callback){
	pool.getConnection(function(err, conn){
		if(err) throw err;

		async.waterfall([
 			function(callback){
 				getItemInfo(callback);
 			},
 			function(itemInfoRows, callback){
 				getLikeYn(itemInfoRows, callback);
 			}
 		],
 		function(err, result){
 			if(err) throw err;
 			console.log('result', result);
 			conn.release();
 			callback(result);
 		});


 		function getItemInfo(callback){
 			var sql = "select a.item_id, a.item_name, a.item_price, a.item_saleprice, Floor((a.item_price-a.item_saleprice)/a.item_price*100) as item_sale, a.launch_date, a.item_regdate, a.item_regtime, b.img_id, b.path, b.img_name from TBITM as a, TBIMG as b where (item_grcd=0 and item_grid is NULL or item_grcd=1 and item_grid is NULL) and a.item_id = b.item_id and b.img_thumbnail = 'Y' and a.item_cnt='1' order by launch_date desc";
			conn.query(sql, user_id, function(err, itemInfoRows){
				if(err) throw err;
				// console.log('itemInfoRows', itemInfoRows);
				if(itemInfoRows){
					callback(null, itemInfoRows);
				}else{
					callback(null);
				}
			});
 		}


 		function getLikeYn(itemInfoRows, callback){
 			async.each(itemInfoRows, function(itemInfoRow, callback){
				// logger.debug('item_id', itemInfoRow.item_id);
				var inputArr = [itemInfoRow.item_id, user_id];
				var item_like_yn = '';
				var sql = "select item_id from TBLK where item_id = ? and user_id=?";
				conn.query(sql, inputArr, function(err, row){
					if(err) throw err;
					// logger.debug('row', row);
					if(row[0]) {
						item_like_yn = 'Y';
					}else{
						item_like_yn = 'N';
					}
					// logger.debug('item_like_yn', item_like_yn);
					itemInfoRow.item_like_yn = item_like_yn;
					// logger.debug('row',itemInfoRow);
					callback(null);
				});
			}, function(err){
				if(err) throw err;
				if(itemInfoRows){
					// logger.debug(itemInfoRows);
					//이미지 width, height 가져오기
					// fileutil.getFileInfo(itemInfoRows, function(err, itemInfoRows){
					// 	if(err) throw err;
					// 	logger.debug('오긴오는거냐며');
					// 	callback(null, itemInfoRows);
					// });
 			callback(null, itemInfoRows);
				} else {
					callback(null, false);
				}
			});
 		};
	});
};



/**
 * 업무명 : 카테고리 정렬
 * @param  {[type]}   data     [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
exports.category = function(inputData, callback){
	pool.getConnection(function(err, conn){
		if(err) throw err;
		var user_id = inputData.user_id;
		var sort_gubun = inputData.sort_gubun;
		var ctg_id = inputData.ctg_id;
		logger.debug(sort_gubun);

		async.waterfall([
 			function(callback){
 				getItemInfo(callback);
 			},
 			function(itemInfoRows, callback){
 				getLikeYn(itemInfoRows, callback);
 			}
 		],
 		function(err, result){
 			if(err) throw err;
 			console.log('result', result);
 			conn.release();
 			callback(result);
 		});


 		function getItemInfo(callback){
 			var sql = "";
 			switch(sort_gubun){
 				case '0': //최신순
 					sql = "select a.item_id, a.item_name, a.item_price, a.item_saleprice, Floor((a.item_price-a.item_saleprice)/a.item_price*100) as item_sale, a.launch_date, a.item_regdate, a.item_regtime, b.img_id, b.path, b.img_name from TBITM as a, TBIMG as b where (item_grcd=0 and item_grid is NULL or item_grcd=1 and item_grid is NULL) and a.item_id = b.item_id and b.img_thumbnail = 'Y' and a.ctg_id = ? order by launch_date desc";
 					break;
 				case '1': //높은 가격순
 					sql = "select a.item_id, a.item_name, a.item_price, a.item_saleprice, Floor((a.item_price-a.item_saleprice)/a.item_price*100) as item_sale, a.launch_date, a.item_regdate, a.item_regtime, b.img_id, b.path, b.img_name from TBITM as a, TBIMG as b where (item_grcd=0 and item_grid is NULL or item_grcd=1 and item_grid is NULL) and a.item_id = b.item_id and b.img_thumbnail = 'Y' and a.ctg_id = ? order by a.item_saleprice desc";
 					break;
 				case '2': //낮은 가격순
 					sql = "select a.item_id, a.item_name, a.item_price, a.item_saleprice, Floor((a.item_price-a.item_saleprice)/a.item_price*100) as item_sale, a.launch_date, a.item_regdate, a.item_regtime, b.img_id, b.path, b.img_name from TBITM as a, TBIMG as b where (item_grcd=0 and item_grid is NULL or item_grcd=1 and item_grid is NULL) and a.item_id = b.item_id and b.img_thumbnail = 'Y' and a.ctg_id = ? order by a.item_saleprice asc";
 					break;
 				case '3': //할인율순
 					sql = "select a.item_id, a.item_name, a.item_price, a.item_saleprice, Floor((a.item_price-a.item_saleprice)/a.item_price*100) as item_sale, a.launch_date, a.item_regdate, a.item_regtime, b.img_id, b.path, b.img_name from TBITM as a, TBIMG as b where (item_grcd=0 and item_grid is NULL or item_grcd=1 and item_grid is NULL) and a.item_id = b.item_id and b.img_thumbnail = 'Y' and a.ctg_id = ? order by a.item_sale desc";
 					break;
 				default:
 					sql = "select a.item_id, a.item_name, a.item_price, a.item_saleprice, Floor((a.item_price-a.item_saleprice)/a.item_price*100) as item_sale, a.launch_date, a.item_regdate, a.item_regtime, b.img_id, b.path, b.img_name from TBITM as a, TBIMG as b where (item_grcd=0 and item_grid is NULL or item_grcd=1 and item_grid is NULL) and a.item_id = b.item_id and b.img_thumbnail = 'Y' and a.ctg_id = ? order by launch_date desc";
 			}

			conn.query(sql, ctg_id, function(err, itemInfoRows){
				if(err) throw err;
				// console.log('itemInfoRows', itemInfoRows);
				if(itemInfoRows){
					callback(null, itemInfoRows);
				}else{
					callback(null);
				}
			});
 		}


 		function getLikeYn(itemInfoRows, callback){
 			async.each(itemInfoRows, function(itemInfoRow, callback){
				// logger.debug('item_id', itemInfoRow.item_id);
				var inputArr = [itemInfoRow.item_id, user_id];
				var item_like_yn = '';
				var sql = "select item_id from TBLK where item_id = ? and user_id=?";
				conn.query(sql, inputArr, function(err, row){
					if(err) throw err;
					// logger.debug('row', row);
					if(row[0]) {
						item_like_yn = 'Y';
					}else{
						item_like_yn = 'N';
					}
					// logger.debug('item_like_yn', item_like_yn);
					itemInfoRow.item_like_yn = item_like_yn;
					// logger.debug('row',itemInfoRow);
					callback(null);
				});
			}, function(err){
				if(err) throw err;
				if(itemInfoRows){
					// logger.debug(itemInfoRows);
					//이미지 width, height 가져오기
					// fileutil.getFileInfo(itemInfoRows, function(err, itemInfoRows){
					// 	if(err) throw err;
					// 	logger.debug('오긴오는거냐며');
					// 	callback(null, itemInfoRows);
					// });
 					callback(null, itemInfoRows);
				} else {
					callback(null, false);
				}
			});
 		};
	});
};


/**
 * 업무명 : 좋아요 등록
 * @param  {[array]}   datas	[inputData : user_id, item_id]
 * @param  {Function} callback
 * @return {[boolean]}			[성공여부]
 */
exports.likeRegister = function(datas, callback){
	pool.getConnection(function(err, conn){
		if(err) throw err;
		var sql = "insert into TBLK (user_id, item_id, like_regdate) values(?, ?, now())";
		conn.query(sql, datas, function(err, row){
			if(err) throw err;
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
 * 업무명 : 좋아요 삭제
 * @param  {[array]}   datas	[inputData : user_id, item_id]
 * @param  {Function} callback
 * @return {[boolean]}			[성공여부]
 */
exports.likeDelete = function(datas, callback){
	pool.getConnection(function(err, conn){
		if(err) throw err;
		var sql = "delete from TBLK where user_id=? and item_id=?";
		conn.query(sql, datas, function(err, row){
			if(err) throw err;
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
		if(err) throw err;
		var itmArr = [];
		async.each(dataArr, function(item_id, callback){
			console.log('item_id', item_id);
			var sql = "select item_id, path, img_name from TBIMG where item_id=? and img_thumbnail='Y'";
			conn.query(sql, item_id, function(err, row){
				if(err) throw err;
				console.log('row', row);
				if(row[0]) {
					itmArr.push(row[0]);
				}
				console.log('itmArr', itmArr);
				callback(null, itmArr);
			});
		}, function(err){
			if(err) throw err;
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
		if(err) throw err;
		var sql = "select qna_id, qna_title, qna_content, qna_gubun, user_id, qna_parentid, qna_regdate, qna_regtime from TBQNA where item_id=?";
		conn.query(sql, data, function(err, rows){
			if(err) throw err;
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
		if(err) throw err;
		logger.debug(datas);
		var sql = "insert into TBQNA (shop_id, item_id, user_id, qna_title, qna_content, qna_gubun, qna_regdate) values(?, ?, ?, ?, ?, ?, now())";
		conn.query(sql, datas, function(err, row){
			if(err) throw err;
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
		if(err) throw err;
		var sql = "insert into TBQNA (shop_id, item_id, user_id, qna_parentid, qna_title, qna_content, qna_gubun, qna_regdate) values(?, ?, ?, ?, ?, ?, ?, now())";
		conn.query(sql, datas, function(err, row){
			if(err) throw err;
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