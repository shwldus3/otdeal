var winston = require('winston');
var moment = require('moment');
var logger = new winston.Logger({
	transports : [
		new winston.transports.Console({
			level : 'debug',
			colorize : true
		}),
		new winston.transports.DailyRotateFile({
			level : 'info',
			json : false,
			timestamp : function(){	return moment().format("YYYY-MM-DD HH:mm:ss.SSS"); },
			maxsize : 1000*1024,
			filename : 'app-logging',
			dataPattern : '.yyyy-MM-dd.log'
		})
	]
});

module.exports = logger;