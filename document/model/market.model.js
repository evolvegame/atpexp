'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var MarketSchema = new Schema({
  customer: {
    businessName: Number,
    businessRevenue: String,
    businessCountry: Number,
    businessrisk: Number,
    experiencescoreneeded: Number
  }
  ,
  buyerPortfolio: [{buyerCountry: String, buyerIndustry: String, buyerRating: Number, cla: Number}],
  country: {
    countryId: String,
    countryName: String,
    gdp: Number
  }

});

module.exports = mongoose.model('Market', MarketSchema);
