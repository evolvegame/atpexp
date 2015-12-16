'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FranceSchema = new Schema({
	HEADLINE: String,
    INTRO_TEXT:String,
    ENG: String,
    SPAN:String,
    DEU:String,
    ITA: String,
    FRE:String
});

module.exports = mongoose.model('France', FranceSchema);
