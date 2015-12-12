'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CountrySchema = new Schema({
	sno: String,
  country: String,
 
});

module.exports = mongoose.model('Country', CountrySchema);
