'use strict';

var _ = require('lodash');
var Country = require('./country.model');

// Get list of industry
exports.index = function(req, res) {
  var query = Country.find();
  query.sort('country');
  query.exec(function (err, countries) {
	    if(err) { return handleError(res, err); }
	    return res.json(200, countries);
  });
};

//Get the weather symbol rating 
exports.getWeatherSymbolRating = function(req, res) {
  
  var country = req.params.country;
  var industry = req.params.industry;
  var query = Country.find({'country':country, 'industryName':industry});
//  Country.find({'country':country, 'industryName':industry}).max({'termData.termId'});
  query.max({'termData.termId':3});
  query.exec(function (err, countryWeatherSymbolRating) {
	    if(err) { return handleError(res, err); }
	    console.log('Countryies -- ' + JSON.stringify(countryWeatherSymbolRating));
	    return res.json(200, countryWeatherSymbolRating);
  });
  
  
};



function handleError(res, err) {
  return res.send(500, err);
}