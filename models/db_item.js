// 상품 및 주문 관련 db 처리
// db_item.js

var mysql = require('mysql');
var db_config = require('./db_config');
var pool = mysql.createPool(db_config);


/**
 * 상품상세정보
 * @param  {[int]}   data     [상품아이디]
 * @param  {Function} callback
 * @return {[array]}            [상품상세정보 배열]
 */
exports.itemDetail = function(data, callback){
	pool.getConnection(function(err, conn){
		if(err) console.err('err', err);
		var sql = "";
		conn.query(sql, data, function(err, rows){
			if(err) console.error('err', err);
			console.log('rows', rows);
			conn.release();
			var result = {
				singleItemArr : rows,
				imageArr : rows
				// qnaArr : rows
			};
			callback(result);
		});
	});
};


/**
 * 장바구니 등록
 * @param  {[array]}   datas    [inputData : user_id, item_id, bak_cnt]
 * @param  {Function} callback
 * @return {[boolean]}            [성공여부]
 */
exports.bsk = function(datas, callback){
	pool.getConnection(function(err, conn){
		if(err) console.err('err', err);
		var sql = "insert into TBBSK (user_id,item_id,bsk_cnt,bsk_regdate) values(?,?,?,now())";
		conn.query(sql, datas, function(err, row){
			if(err) console.error('err', err);
			console.log('row',row);
			var success = false;
			if(row.affectedRows == 1){
				success = true;
			}
			conn.release();
			callback(success);
		});
	});
};