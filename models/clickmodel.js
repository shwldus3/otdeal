var mongoose = require('mongoose');
var db = require('../models/db_config_mongo');

var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(db);

var ClickSchema = new mongoose.Schema({
	user_id : String,
	item_id : Number,
	regtime : { type : Date, default : Date.now }
});


// 몽고디비에서 날짜형식 바꾸기 위한 소스
// ClickSchema.virtual('myregdate').get(function(){
// 	return formatDate(this.regdate);
// });
ClickSchema.set('toJSON', { virtuals : true });

ClickSchema.plugin(autoIncrement.plugin, { model: 'Click', field: 'click_id', startAt : 0, incrementBy : 1 });

var Click = db.model('Click', ClickSchema);

function formatDate(date){
	var year = date.getFullYear();
	var month = date.getMonth()+1; // 0부터 시작하니까 +1해주기.
	var day = date.getDate();
	var hour = date.getHours();
	var minutes = date.getMinutes();
	var second = date.getSeconds();
	// YYYY-MM-DD hh:mm:ss
	var fmdate = year + '-' + (month>9?month:'0'+month) + '-' + (day>9?day:'0'+day) + ' ' + (hour>9?hour:'0'+hour) + ':' + (minutes>9?minutes:'0'+minutes) + ':' + (second>9?second:'0'+second);
	return fmdate;
}