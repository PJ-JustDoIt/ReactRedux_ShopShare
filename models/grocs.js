

"use strict"

var mongoose = require('mongoose');

var grocSchema=mongoose.Schema({
	itemname:String,
	description:String,
	images:String,
	itemquantity:Number
});


var Grocs = mongoose.model('Grocs',grocSchema); // creating model from Schema
module.exports = Grocs;