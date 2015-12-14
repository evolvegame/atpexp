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

//Deletes a customer from the DB.
exports.destroy = function(req, res) {
	Strategy.findById(req.params.sno, function (err, strategy) {
    if(err) { return handleError(res, err); }
    if(!strategy) { return res.send(404); }
    strategy.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}