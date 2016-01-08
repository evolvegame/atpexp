'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RoundSchema = new Schema({
round: Number,
roundName:String,
roundStartDate: Date,
roundEndDate: Date,
currentRoundFlag:Boolean,
calculationFlag:Boolean
});

module.exports = mongoose.model('Round', RoundSchema);
