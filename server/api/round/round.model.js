'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RoundSchema = new Schema({
  currentRound: Number,
  calculated: Boolean
});

module.exports = mongoose.model('Round', RoundSchema);