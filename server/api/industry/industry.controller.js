'use strict';

var _ = require('lodash');
var Industry = require('./industry.model');

// Get list of industry
exports.index = function(req, res) {
  Industry.find(function (err, customers) {
    if(err) { return handleError(res, err); }
    return res.json(200, customers);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}