'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectsSchema = mongoose.Schema({
  name: String,
  type: String,
  amount: Number
  });

module.exports = mongoose.model('Projects', ProjectsSchema);
