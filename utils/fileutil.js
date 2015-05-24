var imagemagick = require('imagemagick');
var async = require('async');
var path = require('path');
var logger = require('../routes/static/logger.js');

var utils = {
	/**
	 * 파일 가로, 세로 정보 확인
	 * @param  {[array]} rows [row당 필수정보 : path, img_name]
	 * @return {[array]}      [각 row에 width와 height를 추가하여 전체 rows를 다시 반환]
	 */
	getFileInfo : function (rows, callback){
		var filepath;
		async.eachSeries(rows, function(row, callback){
			// logger.debug(row.img_viewcd);
			if(row.img_viewcd == 1){
				filepath = path.join('./public', row.path, row.img_name);
				// logger.debug(filepath);
				imagemagick.identify(filepath, function(err, features){
					if (err){
						row.width = null;
						row.height = null;
						callback(null);
					}else{
						row.width = features.width;
						row.height = features.height;
						callback(null);
					}
				});
			}else{
				callback(null);
			}
		}, function(err){
			// each(for) 문장 처리 후 결과 처리과정
			callback(null, rows);
		});
	}

};

module.exports = utils;