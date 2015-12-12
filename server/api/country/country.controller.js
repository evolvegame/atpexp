'use strict';

var _ = require('lodash');
var Country = require('./country.model');

// Get list of industry
exports.index = function(req, res) {
  Country.find(function (err, countries) {
    if(err) { return handleError(res, err); }
    return res.json(200, countries);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}