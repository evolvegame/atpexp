'use strict';

var _ = require('lodash');
var RatingBand = require('./ratingBand.model');

// Get list of industry
exports.index = function(req, res) {
  RatingBand.find(function (err, ratingBands) {
    if(err) { return handleError(res, err); }
    return res.json(200, ratingBands);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}