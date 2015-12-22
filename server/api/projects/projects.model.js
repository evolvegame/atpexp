'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectsSchema = mongoose.Schema({
  type: String,
  name: String,
  amount: Number
});




module.exports = mongoose.model('Projects', ProjectsSchema);
