'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StrategySchema = new Schema({
	strategyNo: String,
  strategyName: String,
  strategyRatingBand: String,
  country: String,
  industry: String
});

module.exports = mongoose.model('Strategy', StrategySchema);
