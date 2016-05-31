'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CountrySchema = new Schema({
	sno: String,
	region:String,
    country: String,
    isoNumericalCode: String,
    termData: [{
    		termId: Number,
    		industryName: String,
    		meanEL: Number,
        	standardDeviationEL: Number,
        	weatherSymbolRating: Number    		
    }]
        	
 
});

module.exports = mongoose.model('Country', CountrySchema);
