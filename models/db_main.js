// 메인 페이지 관련 db 처리
// db_main.js

var mysql = require('mysql');
var db_config = require('./db_config');
var pool = mysql.createPool(db_config);

/**
 * 업무명 : 좋아요
 * @param  {[array]}   datas	[inputData: user_id, item_id]
 * @param  {Function} callback
 * @return {[boolean]}			[insert성공여부]
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