'use strict';

var _this = this;
var _ = require('lodash');
var Round = require('./round.model');
var Teams = require('../team/team.model');
var async = require('async');
var Promise=require('bluebird');


// Get list of rounds
exports.index = function (req, res) {
  Round.find(function (err, rounds) {
    if(err) { return handleError(res, err); }
    return res.json(200, rounds);
  });
};

exports.addRound=function(req,res){
  var newRound = new Round(req.body);
  newRound.save(function(err, round) {
    if (err) return validationError(res, err);
    return res.json(201, round);
  });
};


// Get current round
exports.currentRound = function (req, res) {
  console.log('Getting current round');
  Round.findOne({"currentRoundFlag":true},function (err, round){
    if (err) {
      return handleError(res, err);
    }
    if (!round) {
        return res.json(401);
    };
    console.log("Current round is -- "+round.currentRoundFlag);
    return res.json(round);
  });
};

//update currentRoundFlag and End Date for Curr Round
exports.endCurrRound = function (req,res){
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

  var toBeCalculatedRound = req.params.roundId;
  var teamAdmin=req.body;
  var error= new Error('User is not authorized for this function');
  console.log("Starting calculation for round ="+toBeCalculatedRound+" initiated by - "+teamAdmin.name );

  if(teamAdmin.role!='admin'){
    console.error('User is not authorized for this function');
    return handleErrors(res,error,403);
  };

  var allTeams;
  async.series([
   function(callback){
    validateRound(toBeCalculatedRound,function(err,round){
      if(err){
        return handleErrors(res,error,412);
      }
      var flag=round.currentRoundFlag;
      if(!flag){
        return handleErrors(res,error,412);
      }
      callback();
    });
    },
   function(callback){
    Teams.find({role: 'user',roundLevelInformation: {$elemMatch:{roundNumber:toBeCalculatedRound}}}).exec(function(err,teams){
        if(err){
          console.log("Calculation: Error in finding teams");
        }
        allTeams = teams;
        // async.forEach(teams,function(team,callback){
        //
        // });
        for(var i=0;i<teams.length;i++){
          var team = teams[i];
          console.log(team.name);
          console.log(team.role);
        }
        callback();
    });
  }
]);
  // if(req.body._id) { delete req.body._id; }
  // Round.findById(req.params.id, function (err, round) {
  //   if (err) { return handleError(res, err); }
  //   if(!round) { return res.send(404); }
  //   var updated = _.merge(round, req.body);
  //   updated.save(function (err) {
  //     if (err) { return handleError(res, err); }
  //     // run your function upon 'calculated' update
  //     calculateCurrentRound(res, round); // todo: setup callback function
  //
  //     return res.json(200, round);
  //   });
  // });
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
}

function calculateCurrentRound (res, round) {
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

function validateRound(currentRound,callback){
      Round.findOne({"round":currentRound}).exec(function (err, round){
        if(err){
          callback(err);
        }else{
          if(!round){
            console.log("I am here 1");
            callback(new Error("error"));
          }else{
             console.log("I am here skdfakjsfh"+round);
             callback(null,round);
          }
        }
      });
  }

function handleErrors(res, err,errorCode) {
  if(errorCode==403){
    return res.send(403, err);
  }
  if(errorCode==412){
    return res.send(412, err);
  }

}
