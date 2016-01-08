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

exports.addRound=function(req,res,next){
  var newRound = new Round(req.body);
  newRound.save(function(err, round) {
    if (err) return validationError(res, err);
    return res.json(201, round);
  });
};

// Get current round
exports.currentRound = function (req, res, next) {
  console.log('Getting current road');
  Round.findOne({"currentRoundFlag":true},function (err, round) {
  if (err) return next(err);
    if (!round) return res.json(401);
    console.log("New round is -- "+round.currentRoundFlag);
    return res.json(round);
  });
};

//update currentRoundFlag and End Date for Curr Round
exports.endCurrRound = function (req,res,next){
  console.log("Ending the Current Round before creating new one");
  var currRoundId = req.params.entryId;
  // Find the current round and merge with the new values
  Round.findOne({"round":currRoundId}, function (err, round) {
    if (err) {
      console.error("Cannot find the current round to end"+err);
      return handleError(res, err);
    }
    if(!round) {
      console.error("Current round is not valid to end");
      return res.send(404);
    }
    var updated = _.merge(round, req.body);
    updated.save(function (err) {
      if (err) {
        console.error(
          "Current round cannot be ended due to technical issues"+err);
        return handleError(res, err);
      }
      return res.json(200, round);
    });
  });

  console.log("Ended Current Round successfully");
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
