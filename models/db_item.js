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

var db = require('../models/db_config_mongo');
require('../models/clickmodel');
var ClickModel = db.model('Click');

/**
 * 업무명 : 상품상세
 * @param  {[int]}   item_id
 * @param  {Function} callback
 * @return {[array]}            [상품배열, 이미지배열]
 */
exports.itemDetail = function(item_id, user_id, callback){
	pool.getConnection(function(err, conn){
		if(err) throw err;
		var sql = "select count(*) as cnt from TBITM where item_id=? or item_grid=?";
		conn.query(sql, [item_id, item_id], function(err, row){
			if(err) throw err;
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
				if (err) throw err;
				if(row[0].cnt === 1){
				// 단일 상품인 경우
					// logger.debug('[상품정보] results[0] : ', results[0]);
					// logger.debug('[이미지정보] results[1] : ', results[1])
					getLikeInfo(results[0], item_id, user_id, function(outputData){
						outputData.imageArr = [];
						outputData.imageArr = results[1];
						callback(null, outputData);
					});
				}else{
				// 그룹 상품인 경우
					// logger.debug('[그룹상품정보] results[0][0] : ', results[0][0]);
					// logger.debug('[단일상품정보] resu	lts[0][1] : ', results[0][1]);
					// logger.debug('[이미지정보] results[1] : ', results[1]);

					getLikeInfo(results[0][0], item_id, user_id, function(outputData){
						outputData.singleItemArr = results[0][1];
						outputData.imageArr = results[1];
						callback(null, outputData);
					});
				}
			});
		});
	});
};

/*
상품상세 좋아요 출력
 */
function getLikeInfo(outputData, item_id, user_id, callback){
	pool.getConnection(function(err, conn){
		if(err) throw err;
		var inputArr = [item_id, user_id];
		var item_like_yn = '';
		var sql = "select item_id from TBLK where item_id = ? and user_id=?";
		conn.query(sql, inputArr, function(err, row){
			if(err) throw err;
			logger.debug('row', row);
			console.log(row);

			if(row[0]) {
				item_like_yn = 'Y';
			}else{
				item_like_yn = 'N';
			}
			// logger.debug('item_like_yn', item_like_yn);
			outputData.item_like_yn = item_like_yn;
			logger.debug('outputData',outputData);
			conn.release();
			callback(outputData);
		});
	});
}

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
			if(err) throw err;
			var sql = "select a.item_id, a.item_name, a.item_grcd, a.color_name as item_color, a.item_content, a.item_cnt, a.item_price, a.item_saleprice, Floor((a.item_price-a.item_saleprice)/a.item_price*100) as item_sale, a.size_name as item_size, a.size_id as item_sizeid, b.shop_id, b.shop_name, b.shop_addr as shop_address, b.shop_tel, b.shop_tel_hm, b.shop_ceo from TBITM as a, TBSHP as b where a.item_id=? and a.item_grcd=0 and a.shop_id = b.shop_id";
			conn.query(sql, item_id, function(err, rows){
				if(err) throw err;
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
					if(err) throw err;
					var sql = "select a.item_id, a.item_name, a.item_grcd, a.color_name as item_color, a.item_content, a.item_cnt, a.item_price, a.item_saleprice, Floor((a.item_price-a.item_saleprice)/a.item_price*100) as item_sale, a.size_name as item_size, a.size_id as item_sizeid, b.shop_id, b.shop_name, b.shop_addr as shop_address, b.shop_tel, b.shop_tel_hm, b.shop_ceo from TBITM as a, TBSHP as b where a.item_id=? and a.item_grcd=1 and a.shop_id = b.shop_id";
					conn.query(sql, item_id, function(err, rows){
						if(err) throw err;
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
					if(err) throw err;
					var sql = "select a.item_id, a.item_name, a.item_grcd, a.color_name as item_color, a.item_content, a.item_cnt, a.item_price, a.item_saleprice, Floor((a.item_price-a.item_saleprice)/a.item_price*100) as item_sale, a.size_name as item_size, a.size_id as item_sizeid from TBITM as a where a.item_grid=? and a.item_grcd=0";
					conn.query(sql, item_id, function(err, rows){
						if(err) throw err;
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
				throw err;
			} else {
				callback(null, results);
			}
		});
	}
}


function getImgInfo(item_id, callback){
	logger.debug(item_id);
	pool.getConnection(function(err, conn){
		if(err) throw err;
		var sql = "select img_id, img_name, img_idx as img_seq, img_viewcd, path, img_thumbnail as thumbnail from TBIMG where item_id=?";
		conn.query(sql, item_id, function(err, rows){
			if(err) throw err;
			logger.debug(rows);
			conn.release();

			//이미지 width, height 가져오기
			fileutil.getFileInfo(rows, function(err, imagerows){
				if(err) throw err;
				callback(null, imagerows);
			});
			// callback(null,rows);
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
		if(err) throw err;
		var sql = "insert into TBBSK (user_id,item_id,bsk_cnt,bsk_regdate) values(?,?,?,now())";
		conn.query(sql, datas, function(err, row){
			if(err) throw err;
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
 * @return {[string or boolean]}            {성공 시, 주문아이디 반환/ 실패 시, false 반환}
 */
exports.order = function(datas, callback){
	var currentDate = moment().format('YYYYMMDD');
	var random6 = Math.floor(Math.random() * 1000000);
	var order_id = currentDate + random6;
	logger.debug(order_id);
	pool.getConnection(function(err, conn){
		if(err) throw err;
		async.series([
			function(callback) {
			// TBODR에 주문정보 Insert
				logger.debug('setTBODR 실행');
				insertTBODR(conn, datas, order_id, callback);
			},
			function(callback) {
			// TBODRITM에 주문 아이템 정보 Insert
				logger.debug('setTBODRITM 실행');
				insertTBODRITM(conn, datas, order_id, callback);
			}
		],
		// 모든 자료를 한번에 모아서 받을 수 있습니다.
		function(err, results) {
			if(results[0] && results[1]){
				callback({"order_id" : order_id});
			}else{
				callback(false);
			}
		});
		conn.release();
	});
};


/**
 * TBODR에 주문정보 Insert
 * @param {[objects]}   [conn, datas, order_id, callback]
 * @param {Function} callback		[boolean]
 */
function insertTBODR(conn, datas, order_id, callback){
	var inputArr = [order_id, datas.user_id, datas.total_price];
	var sql = "insert into TBODR (order_id, user_id, order_paystat, total_price, order_regdate, order_stat) values(?, ?, '0', ?, now(), '0')";
	conn.query(sql, inputArr, function(err, row){
		if(err) throw err;
		logger.debug('row', row);
		if(row.affectedRows == 1){
			callback(null, true);
		}else{
			callback(null, false);
		}
	});

}


/**
 * TBODRITM에 주문 아이템 정보 Insert
 * @param {[objects]}   conn, datas, order_id, callback
 * @param {Function} callback  [boolean]
 */
function insertTBODRITM(conn, datas, order_id, callback){
	console.log(datas.item_id);
	console.log(typeof datas.item_id);
	var i = 0;
	var success = '';
	if(typeof datas.item_id  == "string"){
		var inputArr = [order_id, datas.item_id, datas.item_cnt];
		insertOdrItm(inputArr);
		var click = new ClickModel({
			user_id : datas.user_id,
			item_id : datas.item_id,
			gubun : 'order'
		});
		click.save(function(err, result){
			if(err) throw err;
		});
		callback(null, true);
	}else if((datas.item_id).constructor == Array){
		async.each(datas.item_id, function(item_id, callback){
			logger.debug(i);
			var inputArr = [order_id, item_id, datas.item_cnt[i]];
			insertOdrItm(inputArr);
			i++;
			var click = new ClickModel({
				user_id : datas.user_id,
				item_id : item_id,
				gubun : 'order'
			});
			click.save(function(err, result){
				if(err) throw err;
			});
			callback(null);
		}, function(err){
			// each(for) 문장 처리 후 결과 처리과정
			if(err) throw err;
			callback(null, true);
		});
	}else{
		callback(null, false);
	}


	function insertOdrItm(inputArr){
		var sql = "insert into TBODRITM (order_id, item_id, item_cnt) values(?, ?, ?)";
		conn.query(sql, inputArr, function(err, row){
			if(err) throw err;
		});
	}
}