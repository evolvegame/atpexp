'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DepartmentsSchema = mongoose.Schema({
  name: String,
  size: [{
	  unit: String,
	  cost: Number
  	}]
  });

module.exports = mongoose.model('Departments', DepartmentsSchema);
