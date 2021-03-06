'use strict';

var Projects = require('./projects.model');


var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of teams
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  Projects.find({}, function (err, projects) {
    if(err) return res.send(500, err);
    res.json(200, projects);
  });
};

