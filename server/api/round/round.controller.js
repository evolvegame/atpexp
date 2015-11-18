'use strict';

var _ = require('lodash');
var Round = require('./round.model');

// Get list of rounds
exports.index = function (req, res) {
  Round.find(function (err, rounds) {
    if(err) { return handleError(res, err); }
    return res.json(200, rounds); 
  });
};

// Creates a new round
exports.newRound = function (req, res) {
  Round.create(req.body, function(err, round) {
    if(err) { return handleError(res, err); }

    // run your function upon newRound creation
    handleNextRound(round)

    return res.json(201, round); // leave this at the end of the line for the frontend callback
  });
};

// Update current round document to set 'calculated' to 'true'
exports.calculateRound = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Round.findById(req.params.id, function (err, round) {
    if (err) { return handleError(res, err); }
    if(!round) { return res.send(404); }
    var updated = _.merge(round, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }

      // run your function upon 'calculated' update
      calculateCurrentRound(res, round); // todo: setup callback function

      return res.json(200, round);
    });
  });
};

function handleError (res, err) {
  return res.send(500, err);
}

/**
 * ENGINE STARTS HERE
 */

function handleNextRound (round) {
  var startMsg = 'Initiating round ' + round.currentRound;
  console.log(startMsg); // look in the terminal where you ran grunt serve
};

function calculateCurrentRound (res, round) {
  // initialize calculations on current round
  
  // your algorithms go here

  // go to next round
  Round.findById(round._id, function (err, round) {
    if (err) { return handleError(res, err)}
    if (!round) {return res.send(404)}
    round.calculated = true;
    round.save(function (err) {
      if (err) {return handleError(res, err); }
      return true; // callback value
    });
  });
}