'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var CustomerSchema = new Schema({
  name:String,
  revenue:Number,
  turnover:Number,
  region:String,
  regionCode:String,
  country:String,
  countryCode:String,
  businessRisk :Number,
  industry:String,
  industryCode:String,
  businessRisk:Number,
  experienceScoreNeeded:Number,
  minOfferScore:Number,
  offerCount:Number,
  buyerPortfolio:[
  {region:String,
    regionCode:String,
    country:String,
    countryCode:String,
    industry:String,
    industryCode:String,
    tpe:Number,
    rating:Number,
    cla:Number
  }
    ]

  });

module.exports = mongoose.model('Customer', CustomerSchema);
