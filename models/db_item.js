// 상품 및 주문 관련 db 처리
// db_item.js

var mysql = require('mysql');
var async = require('async');
var moment = require('moment');
var path = require('path');

var logger = require('../routes/static/logger.js');
var db_config = require('./db_config');
var pool = mysql.createPool(db_config);
var fileutil = require('../utils/fileutil.js');



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
					if(row[0].cnt === 1){
					// 단일 상품인 경우
						// logger.debug('[상품정보] results[0] : ', results[0]);
						logger.debug('[이미지정보] results[1] : ', results[1]);
						var outputData = {};
						outputData = results[0];
						outputData.imageArr = [];
						outputData.imageArr = results[1];
						callback(null, outputData);
					}else{
					// 그룹 상품인 경우
						// logger.debug('[그룹상품정보] results[0][0] : ', results[0][0]);
						// logger.debug('[단일상품정보] resu	lts[0][1] : ', results[0][1]);
						logger.debug('[이미지정보] results[1] : ', results[1]);
						var outputData = {};
						outputData = results[0][0];
						outputData.singleItemArr = results[0][1];
						outputData.imageArr = results[1];
						callback(null, outputData);
					}
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
		var sql = "select img_id, img_name, img_idx as img_seq, img_viewcd, path, img_thumbnail as thumbnail from TBIMG where item_id=?";
		conn.query(sql, item_id, function(err, rows){
			if(err) logger.error('err', err);
			// logger.debug(rows);
			conn.release();

			//이미지 width, height 가져오기
			fileutil.getFileInfo(rows, function(err, imagerows){
				callback(null, imagerows);
			});
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


/**
 * 주문하기
 * @param  {[object]}   datas    {itemArr, user_id, bsk_id, total_price}
 * @param  {Function} callback
 * @return {[object]}            {}
 */
exports.order = function(datas, callback){
	var user_id = datas.user_id;
	var total_price = datas.total_price;

	//TBODR insert
	var currentDate = moment().format('YYYYMMDD');
	var random6 = Math.floor(Math.random() * 1000000);
	var order_id = currentDate + random6;
	var success1, success2;
	logger.debug(order_id);

	var inputarr1 = [order_id, user_id, total_price];
	pool.getConnection(function(err, conn){
		if(err) console.err('err', err);
		var sql = "insert into TBODR (order_id, user_id, order_paystat, total_price, order_regdate, order_stat) values(?, ?, '0', ?, now(), '0')";
		conn.query(sql, inputarr1, function(err, row){
			if(err) logger.error('err', err);
			logger.debug('row', row);
			success1 = false;
			if(row.affectedRows == 1){
				success1 = true;
			}
			conn.release();
		});
	});

	async.forEachSeries(datas.itemArr, function(item, callback){
		logger.debug(item.item_id);
		pool.getConnection(function(err, conn){
			if(err) logger.error('err', err);
			var inputarr2 = [order_id, item.item_id, item.item_cnt];
			var sql = "insert into TBODRITM (order_id, item_id, item_cnt) values(?, ?, ?)";
			conn.query(sql, inputarr2, function(err, row){
				if(err) logger.error('err', err);
				logger.debug('row', row);
				success2 = false;
				if(row.affectedRows == 1){
					success2 = true;
				}
				conn.release();
				callback(null);
			});
		});
	}, function(err){
		// each(for) 문장 처리 후 결과 처리과정
		logger.debug(success1);
		logger.debug(success2);
		if(success1 && success2){
			callback({"order_id" : order_id});
		}else{
			callback(false);
		}
	});

};
