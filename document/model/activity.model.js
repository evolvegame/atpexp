'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ActivitySchema = new Schema({
  actvityName: String,
  weightageForActivity: Number,
  percentageCompletion: Number
});
module.exports = mongoose.model('Activity', ActivitySchema);
