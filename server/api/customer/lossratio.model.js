'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var LossRatioSchema = new Schema({
    Country: String,
	Industry: String,
	MeanEL: Number,
	StandardDeviationEL:Number
  });

module.exports = mongoose.model('LossRatio', LossRatioSchema);