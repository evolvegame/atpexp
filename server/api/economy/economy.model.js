'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EconomySchema = new Schema({
  __v: Number,
  name: String,
  code: String,
  data: Array,
  color: String,
  draggableY: Boolean,
  type: String,
  marker: Boolean,
  hover: Boolean
});

module.exports = mongoose.model('Economy', EconomySchema);