'use strict';

var express = require('express');
var controller = require('./country.controller');
var service = require('./country.service');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:country/:industry/getWeatherSymbolRating', controller.getWeatherSymbolRating);
//router.get('/mapData', service.avgAllCountries);
router.get('/mapData', service.getCountriesforMap);
router.post('/:industryName/mapData', service.avgIndustries);
router.get('/:countryName/:industryName/getWeatherSymbol', service.getWeatherSymbol);
router.post('/:industryName/:countryName/industryELData', service.industryCountryEL);
router.post('/:countryName/:currentRound/industryAggrData',auth.isAuthenticated(),service.getBuyerAggrCLA);

module.exports = router;