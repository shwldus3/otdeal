// 메인 페이지 관련 db 처리
// db_main.js

var mysql = require('mysql');
var db_config = require('./db_config');
var pool = mysql.createPool(db_config);

/**
 * 업무명 : 좋아요
 * @param  {[array]}   datas	[inputData : user_id, item_id]
 * @param  {Function} callback
 * @return {[boolean]}			[성공여부]
 */
exports.like = function(datas, callback){
	pool.getConnection(function(err, conn){
		if(err) console.error('err', err);
		var sql = "insert into TBLK (user_id,item_id,like_regdate) values(?,?,now())";
		conn.query(sql, datas, function(err, row){
			if(err) console.error('err', err);
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
			console.log('rows', rows);
			conn.release();
			var result = {qnaArr : rows};
			callback(result);
		});
	});
};


/**
 * QNA 등록
 * @param  {[array]}   datas    [inputData : ]
 * @param  {Function} callback
 * @return {[boolean]}            [성공여부]
 */
exports.qnaInsert = function(datas, callback){
	pool.getConnection(function(err, conn){
		if(err) console.error('err', err);
		var sql = "insert into TBQNA (shop_id,item_id,user_id,qna_parentid,qna_title,qna_content,qna_gubun,qna_regdate) values(?,?,?,?,?,?,?,now())";
		conn.query(sql, datas, function(err, row){
			if(err) console.error('err', err);
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