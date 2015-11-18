'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CustomerSchema = new Schema({
  name: String,
  country: String,
  countryCode: String,
  region: String,
  regionCode: String,
  industry: String,
  buyerCountry1: String,
  buyerIndustry1: String,
  buyerTpe1: Number,
  buyerCountry2: String,
  buyerIndustry2: String,
  buyerTpe2: Number,
  buyerCountry3: String,
  buyerIndustry3: String,
  buyerTpe3: Number
});

module.exports = mongoose.model('Customer', CustomerSchema);
