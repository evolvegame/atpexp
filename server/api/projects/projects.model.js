'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectsSchema = mongoose.Schema({
  name: String,
  description: String,
  type: String,
  amount: Number,
  experienceScore: Number
  });

module.exports = mongoose.model('Projects', ProjectsSchema);
