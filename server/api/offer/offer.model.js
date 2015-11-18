'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OfferSchema = new Schema({
  customerId: String,
  round: Number,
  ar1: Number,
  ar2: Number,
  ar3: Number,
  avgAr: Number,
  price: Number,
  serviceScore: Number
});

module.exports = mongoose.model('Offer', OfferSchema);
