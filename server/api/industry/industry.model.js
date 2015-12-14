'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var IndustrySchema = new Schema({
  sno: String,
  industry: String
});

module.exports = mongoose.model('Industry', IndustrySchema);
