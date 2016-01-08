'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var RoundSchema = new Schema({
  roundId: Number,
  roundName: String,
  roundStartDate: Date,
  roundEndDate: Date,
  currentFlag: Boolean,
  calculationFlag:Boolean
});
module.exports = mongoose.model('Round', RoundSchema);
