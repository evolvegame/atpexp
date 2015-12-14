'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StrategySchema = new Schema({
	strategyNo: String,
  strategyName: String,
  strategyRatingBand1: String,
  strategyRatingBand2: String,
  strategyRatingBand3: String,
  strategyRatingBand4: String,
  strategyRatingBand5: String,
  country: String,
  industry: String
});

module.exports = mongoose.model('Strategy', StrategySchema);
