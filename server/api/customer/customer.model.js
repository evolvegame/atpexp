'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var CustomerSchema = new Schema({
  name:String,
  revenue:Number,
  region:String,
  regionCode:String,
  country:String,
  countryCode:String,
  customerISOCountryCode:String,
  businessRisk :Number, //TODO: This can be deleted
  industry:String,
  industryCode:String,
  experienceScoreNeeded:Number,
  minOfferScore:Number,
  offerCount:Number,
  numberOfCustomers: Number,
  groupCustomerName: String,
  marketType: String, // Possible values are 'Local Market Portfolio' & 'Individual'
  buyerPortfolio:[
  {
	region:String,
    regionCode:String,
    country:String,
    countryCode:String,
    buyerISOCountryCode:String,
    industry:String,
    industryCode:String,
    tpe:Number,
    rating:Number,
    cla:Number,
    numberOfOrganisation: Number,
  }
    ]

  });

module.exports = mongoose.model('Customer', CustomerSchema);
