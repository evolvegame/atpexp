'use strict';

var _ = require('lodash');
var Industry = require('./industry.model');

// Get list of industry
exports.index = function(req, res) {
  var query = Industry.find();
  query.sort('industry');
  query.exec(function (err, industries) {
	    if(err) { return handleError(res, err); }
	    return res.json(200, industries);
});
};

function handleError(res, err) {
  return res.send(500, err);
}