'use strict';

var Departments = require('./departments.model');


var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of departments
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  Departments.find({}, function (err, departments) {
    if(err) return res.send(500, err);
    res.json(200, departments);
  });
};

