// 메인 페이지 관련 db 처리
// db_main.js

var mysql = require('mysql');
var logger = require('../routes/static/logger.js');
var db_config = require('./db_config');
var pool = mysql.createPool(db_config);


exports.cuList = function(callback){
	pool.getConnection(function(err, conn){
		if(err) console.error('err', err);
		conn.query(sql, function(err, row){
			if(err) console.error('err', err);

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