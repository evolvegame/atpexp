'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DepartmentsSchema = mongoose.Schema({
  name: String,
	description: String,
  size: [{
	  unit: String,
	  cost: Number,
	  numberOfBenefits: Number
  	}]
  });

module.exports = mongoose.model('Departments', DepartmentsSchema);
