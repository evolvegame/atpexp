'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ratingBandSchema = new Schema({
	sno: Number,
	ratingFrom: Number,
	ratingTo: Number 
});

module.exports = mongoose.model('ratingBand', ratingBandSchema);
