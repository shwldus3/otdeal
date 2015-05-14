// 푸쉬 관련 db처리
// db_push.js

var mysql = require('mysql');
var db_config = require('./db_config');
var pool = mysql.createPool(db_config);


/**
 * PUSH 등록하기
 * @param  {[array]}   datas    [ps_token, user_id]
 * @param  {Function} callback
 * @return {[boolean]}            [성공여부]
 */
exports.register = function(datas, callback){
	pool.getConnection(function(err, conn){
		if(err) throw err;
		var sql = "insert into TBPUSH (ps_token, user_id, ps_usecheck, ps_regdate, ps_upregdate, ps_upregtime) values(?, ?, 'Y', now(), now(), current_timestamp)";
		conn.query(sql, datas, function(err, row){
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
 * PUSH 사용여부수정
 * @param  {[array]}   datas    [inputData : ps_usecheck, user_id]
 * @param  {Function} callback
 * @return {[boolean]}            [성공여부]
 */
exports.update = function(datas, callback){
	pool.getConnection(function(err, conn){
		if(err) throw err;
		var sql = "update TBPUSH set ps_usecheck=?, ps_upregdate=now(), ps_upregtime=current_timestamp where user_id=?";
		conn.query(sql, datas, function(err, row){
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
 * PUSH 보내기
 * @param  {Function} callback
 * @return {[array]}            [푸쉬 토큰]
 */
exports.push = function(callback){
	poll.getConnection(function(err, conn){
		if(err) throw err;
		var sql = "select ps_token from TBPUSH where ps_usecheck='Y'";
		conn.query(sql, function(err, rows){
			if(err) throw err;
			console.log('rows', rows);
			conn.release();
			callback(rows);
		});
	});
};