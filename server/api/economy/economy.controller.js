'use strict';

var _ = require('lodash');
var Economy = require('./economy.model');

// Get list of economys
exports.index = function(req, res) {
  Economy.find(function (err, economys) {
    if(err) { return handleError(res, err); }
    return res.json(200, economys);
  });
};

// Get a single economy
exports.show = function(req, res) {
  console.log('** req.params.id: ', req.params.id);
  Economy.findById(req.params.id, function (err, economy) {
    if(err) { return handleError(res, err); }
    if(!economy) { return res.send(404); }
    return res.json(economy);
  });
};

// Creates a new economy in the DB.
exports.create = function(req, res) {
  Economy.create(req.body, function(err, economy) {
    if(err) { return handleError(res, err); }
    return res.json(201, economy);
  });
};

// Updates an existing economy in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Economy.findById(req.params.id, function (err, economy) {
    if (err) { return handleError(res, err); }
    if(!economy) { return res.send(404); }
    if (economy.__v != req.body.__v) {
      economy.__v -= 1
    }
    var updated = _.extend(economy, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, economy);
      console.log('200', economy)
    });
  });
};

// Deletes a economy from the DB.
exports.destroy = function(req, res) {
  Economy.findById(req.params.id, function (err, economy) {
    if(err) { return handleError(res, err); }
    if(!economy) { return res.send(404); }
    economy.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}