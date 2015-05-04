var mongoose = require('mongoose');
var db = require('../models/db');

var StyleASchema = new mongoose.Schema({
	stA_cd : String,
	stA_name : String,
	regdate : {type:Date, default:Date.now}
});
var StyleA = db.model('User', StyleASchema);

var StyleBSchema = new mongoose.Schema({
	stB_cd : String,
	stB_name : String,
	regdate : {type:Date, default:Date.now}
});
var StyleB = db.model('User', StyleBSchema);

var StyleCSchema = new mongoose.Schema({
	stC_cd : String,
	stC_name : String,
	regdate : {type:Date, default:Date.now}
});
var StyleC = db.model('User', StyleCSchema);

var StyleSchema = new mongoose.Schema({
	stA : String,
	stB : String,
	stC : String,
	regdate : {type:Date, default:Date.now}
});

var StyleA = db.model('User', StyleASchema);

