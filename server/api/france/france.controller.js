'use strict';

var _ = require('lodash');
var France = require('./france.model');

// Get list of industry
exports.index = function(req, res) {
  France.find(function (err, frances) {
    if(err) { return handleError(res, err); }
    return res.json(200, frances);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}