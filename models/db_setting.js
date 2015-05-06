// 설정 관련 db처리
// db_setting.js

var mysql = require('mysql');
var db_config = require('./db_config');
var pool = mysql.createPool(db_config);


/**
 * 푸쉬 여부 수정
 * @param  {[array]}   datas    [inputData : ps_usecheck, user_id]
 * @param  {Function} callback
 * @return {[boolean]}            [성공여부]
 */
exports.push = function(datas, callback){
	pool.getConnection(function(err, conn){
		if(err) console.err('err', err);
		var sql = "update TBPUSH set ps_usecheck=?, ps_upregdate=now(), ps_upregtime=current_timestamp where user_id=?";
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
 * 공지사항 리스트
 * @param  {Function} callback
 * @return {[object]}            [공지사항배열]
 */
exports.notice = function(callback){
	pool.getConnection(function(err, conn){
		if(err) console.err('err', err);
		var sql = "select ntc_id, admin_id, ntc_title, ntc_content, ntc_stat, ntc_regdate, ntc_regtime from TBNTC";
		conn.query(sql, function(err, rows){
			if(err) console.error('err', err);
			console.log('rows', rows);
			conn.release();
			var result = {ntcArr : rows};
			callback(result);
		});
	});
};


/**
 * 버전정보확인
 * @param  {[string]}   data   [os_gubun:운영체제구분코드]
 * @param  {Function} callback
 * @return {[object]}          [사용중인 현재버전정보]
 */
exports.version = function(data, callback){
	pool.getConnection(function(err, conn){
		if(err) console.error('err', err);
		var sql = "select version, os_gubun from TBVS where os_gubun=? and vs_check='Y'";
		conn.query(sql, data, function(err, rows){
			if(err) console.error('err', err);
			console.log('rows', rows[0]);
			callback(rows[0]);
		});
	});
};


