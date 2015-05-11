// 상품 및 주문 관련 db 처리
// db_item.js

var mysql = require('mysql');
var async = require('async');
var logger = require('../routes/static/logger.js');
var db_config = require('./db_config');
var pool = mysql.createPool(db_config);


/**
 * 업무명 : 상품상세
 * @param  {[int]}   item_id
 * @param  {Function} callback
 * @return {[array]}            [상품배열, 이미지배열]
 */
exports.itemDetail = function(item_id, callback){
	pool.getConnection(function(err, conn){
		if(err) logger.error('err', err);
		var sql = "select count(*) as cnt from TBITM where item_id=? or item_grid=?";
		conn.query(sql, [item_id, item_id], function(err, row){
			if(err) logger.error('err', err);
			logger.debug(row);
			conn.release();
			async.series([
				function(callback) {
				// 상품정보
					logger.debug('getItemInfo 실행');
					getItemInfo(row, item_id, callback);
				},
				function(callback) {
				// 이미지정보
					logger.debug('getImgInfo 실행');
					getImgInfo(item_id, callback);
				}
			],
			// 모든 자료를 한번에 모아서 받을 수 있습니다.
			function(err, results) {
				if (err) {
					logger.error(err);
				} else {
					var outputData;
					if(row[0].cnt === 1){
					// 단일 상품인 경우
						logger.debug('[상품정보] results[0] : ', results[0]);
						logger.debug('[이미지정보] results[1] : ', results[1]);
						outputData = results[0];
						outputData.imageArr = results[1];
					}else{
					// 그룹 상품인 경우
						logger.debug('[그룹상품정보] results[0][0] : ', results[0][0]);
						logger.debug('[단일상품정보] results[0][1] : ', results[0][1]);
						logger.debug('[이미지정보] results[1] : ', results[1]);
						outputData = results[0][0];
						outputData.singleItemArr = results[0][1];
						outputData.imageArr = results[1];
					}
					callback(null, outputData);
				}
			});
		});
	});
};


/**
 * 메소드 : 상품정보를 가져오는 메소드
 * @param  {[int]}   item_id
 * @param  {Function} callback
 */
function getItemInfo(row, item_id, callback){
	logger.debug(row[0].cnt);
	logger.debug(item_id);
	if(row[0].cnt === 1){
		// 단일 상품인 경우,
		logger.debug('getItemInfo >>>>> 단일 상품인 경우');
		pool.getConnection(function(err, conn){
			if(err) logger.error('err', err);
			var sql = "select a.item_id, a.item_name, a.item_grcd, a.color_name as item_color, a.item_content, a.item_cnt, a.item_price, a.item_saleprice, ((a.item_price-a.item_saleprice)/a.item_price*100) as item_sale, a.size_name as item_size, a.size_id as item_sizeid, b.shop_id, b.shop_name, b.shop_addr as shop_address, b.shop_tel, b.shop_tel_hm, b.shop_ceo from TBITM as a, TBSHP as b where a.item_id=? and a.item_grcd=0 and a.shop_id = b.shop_id";
			conn.query(sql, item_id, function(err, rows){
				if(err) logger.error('err', err);
				logger.debug(rows);
				conn.release();
				callback(null, rows[0]);
			});
		});
	}else{
		// 그룹(통합) 상품인 경우,
		logger.debug('getItemInfo >>>>> 그룹 상품인 경우');
		async.series([
			function(callback) {
			// 그룹상품정보
				logger.debug('getItemInfo >>>>> 그룹 상품인 경우 >>>>> 그룹가져오기');
				pool.getConnection(function(err, conn){
					if(err) logger.error('err', err);
					var sql = "select a.item_id, a.item_name, a.item_grcd, a.color_name as item_color, a.item_content, a.item_cnt, a.item_price, a.item_saleprice, ((a.item_price-a.item_saleprice)/a.item_price*100) as item_sale, a.size_name as item_size, a.size_id as item_sizeid, b.shop_id, b.shop_name, b.shop_addr as shop_address, b.shop_tel, b.shop_tel_hm, b.shop_ceo from TBITM as a, TBSHP as b where a.item_id=? and a.item_grcd=1 and a.shop_id = b.shop_id";
					conn.query(sql, item_id, function(err, rows){
						if(err) logger.error('err', err);
						logger.debug(rows);
						conn.release();
						callback(null, rows[0]);
					});
				});
			},
			function(callback) {
			// 단일상품정보
				logger.debug('getItemInfo >>>>> 그룹 상품인 경우 >>>>> 단일가져오기');
				pool.getConnection(function(err, conn){
					if(err) logger.error('err', err);
					var sql = "select a.item_id, a.item_name, a.item_grcd, a.color_name as item_color, a.item_content, a.item_cnt, a.item_price, a.item_saleprice, ((a.item_price-a.item_saleprice)/a.item_price*100) as item_sale, a.size_name as item_size, a.size_id as item_sizeid from TBITM as a where a.item_grid=? and a.item_grcd=0";
					conn.query(sql, item_id, function(err, rows){
						if(err) logger.error('err', err);
						logger.debug(rows);
						conn.release();
						callback(null, rows);
					});
				});
			}
		],
		// 모든 자료를 한번에 모아서 받을 수 있습니다.
		function(err, results) {
			if (err) {
				logger.error(err);
			} else {
				callback(null, results);
			}
		});
	}
}


function getImgInfo(item_id, callback){
	logger.debug(item_id);
	pool.getConnection(function(err, conn){
		if(err) logger.error('err', err);
		var sql = "select img_id, img_idx as img_seq, img_name, path, img_width, img_height, img_thumbnail as thumbnail from TBIMG where item_id=?";
		conn.query(sql, item_id, function(err, rows){
			if(err) logger.error('err', err);
			logger.debug(rows);
			conn.release();
			callback(null, rows);
		});
	});
}


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