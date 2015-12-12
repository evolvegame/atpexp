'use strict';

var _ = require('lodash');
var Strategy = require('./strategy.model');

// Get list of industry
exports.index = function(req, res) {
  Strategy.find(function (err, strategies) {
    if(err) { return handleError(res, err); }
    return res.json(200, strategies);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}