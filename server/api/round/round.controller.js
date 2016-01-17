'use strict';

var _this = this;
var Round = require('./round.model');
var Teams = require('../team/team.model');
var Customers = require('../customer/customer.model');
var CalcController = require('./calculation');
var agreementConverter = require('./agreement.conversion');
var calcResults = require('./calculationResults');
var _ = require('lodash');
var async = require('async');

// Get list of rounds
exports.index = function(req, res) {
  Round.find(function(err, rounds) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, rounds);
  });
};

exports.addRound = function(req, res) {
  var newRound = new Round(req.body);
  newRound.save(function(err, round) {
    if (err) return validationError(res, err);
    return res.json(201, round);
  });
};


// Get current round
exports.currentRound = function(req, res) {
  console.log('Getting current round');
  Round.findOne({
    "currentRoundFlag": true
  }, function(err, round) {
    if (err) return handleError(res, err);
    if (!round) return res.json(401);
    console.log("Current round is -- " + round.currentRoundFlag);
    return res.json(round);
  });
};

//update currentRoundFlag and End Date for Curr Round
exports.endCurrRound = function(req, res) {
  console.log("Ending the Current Round before creating new one");
  try {
    var currRoundId = parseInt(req.params.entryId);
  } catch (err) {
    if (err) res.send(500);
  }
  // Find the current round and merge with the new values
  Round.findOne({
    "round": currRoundId
  }, function(err, round) {
    if (err) {
      console.error("Cannot find the current round to end" + err);
      return handleError(res, err);
    }
    if (!round) {
      console.error("Current round is not valid to end");
      return res.send(404);
    }
    var updated = _.merge(round, req.body);
    updated.save(function(err) {
      if (err) {
        console.error(
          "Current round cannot be ended due to technical issues" + err);
        return handleError(res, err);
      } else {
        setNewRoundLevelInfo(currRoundId + 1, function(err) {
          if (err) return res.send(500);
          return res.json(200, round);
        });
      }
    });
  });

  console.log("Ended Current Round successfully");
};

// to check whether a value is null or undefined
function checkVariables(input) {
  if (input != null && input != 'undefined') return true;
  else return false;
}

// Update current round document to set 'calculated' to 'true'
exports.calculateRound = function(req, res) {
  //  Variable declaration
  var toBeCalculatedRound;
  var teamAdmin;
  var errorMsg;
  var allTeams;
  var allCustomers;
  var customerAllocation = {};
  var currentRoundDetails;
  var expScores = [];
  var teamCalcJSON = {};
  var sortedJSON = {};
  var expScoreFactor = {};

  if (!checkVariables(req) || !checkVariables(req.params.roundId) || !checkVariables(req.body)) {
    errorMsg = new Error('Invalid input for Calculation');
    console.error(errorMsg.message);
    return handleErrors(res, errorMsg, 400);
  }

  // Get the inputs to the function and store it local variables for later use
  toBeCalculatedRound = req.params.roundId;
  teamAdmin = req.body;

  // if the user is not admin he should be thrown error
  if (!checkVariables(teamAdmin) || !checkVariables(teamAdmin.role) || teamAdmin.role != 'admin') {
    errorMsg = new Error('User is not authorized for this function');
    return handleErrors(res, errorMsg, 403);
  };
  // start the calculcation
  console.log("Starting calculation for round =" + toBeCalculatedRound + " initiated by - " + teamAdmin.name);
  // Start - async.series1 - series of steps executed sequentially
  async.series({
      // validate whether the calculation needs to be done for the current round
      step1: function(callback) {
        console.log("Starting validation for current round");
        CalcController.validateRound(toBeCalculatedRound, function(err, round) {
          if (err) return callback(err);
          currentRoundDetails = round;
          console.log("Validation completed. Can proceed to Step 2");
          callback(null, round);
        });
      }

      ,
      step2: function(callback) {
        console.log("Step 2: Starting deletion of existing calculation details for the current round");
        CalcController.deleteCalcRoundDetails(toBeCalculatedRound, function(err, teams) {
          if (err) return callback(err);
          console.log("Step 2 completed. Proceed to Step 3");
          callback(null, teams);
        });
      }


      ,
      step3: function(callback) {
        console.log("Step 3: Get All the Teams");
        CalcController.findAllTeams(toBeCalculatedRound, function(err, teams) {
          if (err) return callback(err);
          allTeams = teams;
          console.log("Step 3 completed. Proceed to Step 4");
          callback(null, teams);
        });
      }


      ,
      step4: function(callback) {
        console.log("Step 4: Get All the Customers");
        CalcController.findAllCustomers(function(err, customers) {
          if (err) return callback(err);
          allCustomers = customers;
          console.log("Step 4 completed.Proceed to Step 5");
          callback(null, customers);
        });
      }


      ,
      step5: function(callback) {
        console.log("Step 5: Build Customer Allocation Details");
        CalcController.buildAllocation(allCustomers, function(err, allocation) {
          if (err) return callback(err);
          customerAllocation = allocation;
          console.log("Step 5 completed.. Proceed to Step 6");
          callback(null, allocation);
        });
      }


      ,
      step6: function(callback) {
        console.log("Step 6: Calculate Experience Score" + allTeams.length);
        var result = {};
        var input = {};
        input["allTeams"] = allTeams;
        input["currentRound"] = toBeCalculatedRound;
        CalcController.calculateExpScorePoints(input, function(err, resultJSON) {
          if (err) return callback(err);
          expScores = resultJSON['value1'];
          teamCalcJSON = resultJSON['value2'];
          console.log("Step 6 completed.Proceed to Step 7");
          callback(null, resultJSON);
        });
      }


      ,
      step7: function(callback) {
        console.log("Step 7: ExpScore Sorting");
        CalcController.expScoreSorting(expScores, function(err, result) {
          if (err) return callback(err);
          sortedJSON = result;
          var input = {};
          CalcController.findAllTeams(toBeCalculatedRound, function(err, teams) {
            if (err) return callback(err);
            allTeams = teams;
            input["allTeams"] = allTeams;
            input["sortedJSON"] = sortedJSON;
            input["currRound"] = toBeCalculatedRound;
            CalcController.expScoreRanking(input,function(err,result){
              if(err) return callback(err);
              console.log("Step 7 completed.Proceed to Step 8");
              callback(null, sortedJSON);
            });
          });
        });
      }

      ,
      step8: function(callback) {
        console.log("Step 8: ExpScore Factor Calculation");
        CalcController.expScoreFactor(sortedJSON, function(err, result) {
          if (err) return callback(err);
          expScoreFactor = result;
          console.log("Step 8 completed.Proceed to Step 9");
          callback(null, result);
        });
      }

      ,
      step9: function(callback) {
        console.log("Step 9: Offer Score per team calculation");
        var input = {};
        input["customerAllocation"] = customerAllocation;
        input["allTeams"] = allTeams;
        input["teamCalcJSON"] = teamCalcJSON;
        input["expScoreFactor"] = expScoreFactor;
        CalcController.calcOfferScore(input, function(err, result) {
          if (err) return callback(err);
          customerAllocation = result;
          console.log("Step 9 completed. Proceed to Step 10");
          callback(null, result);
        });
      }

      ,
      step10: function(callback) {
        console.log("Step 10: Customer Allocation");
        var input = {};
        input["customerAllocation"] = customerAllocation;
        input["toBeCalculatedRound"] = toBeCalculatedRound;
        agreementConverter.agreementConversion(input, function(err, result) {
          if (err) return callback(err);
          expScoreFactor = result;
          console.log("Step 10 completed.Proceed to Step 11");
          callback(null, result);
        });
      }

      ,
      step11: function(callback) {
        console.log("Step 11: Populate round level values");
        calcResults.populateValues(toBeCalculatedRound,function(err,result){
          if (err) return callback (err);
          console.log("Step 11 completed. Proceed to Step 12");
          callback(null);
        })

      }
    },
    // End - async.series1. Handle results
    function(err, results) {
      if (err != undefined && err != null) handleErrors(res, err, 500);
      else res.send(200, true);
    }
  );
};

function handleError(res, err) {
  return res.send(500, err);
}

/**
 * ENGINE STARTS HERE
 */

function handleNextRound(round) {
  var startMsg = 'Initiating round ' + round.currentRound;
  console.log(startMsg); // look in the terminal where you ran grunt serve
}

function calculateCurrentRound(res, round) {
  Round.findById(round._id, function(err, round) {
    if (err) {
      return handleError(res, err)
    }
    if (!round) {
      return res.send(404)
    }
    round.calculated = true;
    round.save(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return true; // callback value
    });
  });
}

function handleErrors(res, err, errorCode) {
  console.log("In handle errors -->" + err.message)
  return res.status(errorCode).send({
    type: "serverError",
    message: err.message
  });
}

function initializeRoundLevelInfo(newRound) {
  var roundLevelInformation = {};
  roundLevelInformation['round'] = newRound;
  roundLevelInformation['capital'] = 0;
  roundLevelInformation['premium'] = 0;
  roundLevelInformation['claims'] = 0;
  roundLevelInformation['grossIncome'] = 0;
  roundLevelInformation['claimsRatio'] = 0;
  roundLevelInformation['profit'] = 0;
  roundLevelInformation['investment'] = 0;
  roundLevelInformation['experienceScore'] = 0;
  roundLevelInformation['salesforceSize'] = 0;
  roundLevelInformation['underwriterDepartmentSize'] = 0;
  roundLevelInformation['iTMaintenance'] = 0;
  roundLevelInformation['marketingBudget'] = 0;
  roundLevelInformation['facilities'] = 0;
  roundLevelInformation['totalExpense'] = 0;
  roundLevelInformation['rankingPosition'] = 0;
  roundLevelInformation['experienceScoreAmount'] = 0;
  roundLevelInformation['countryLevelRankingPosition'] = 0;
  roundLevelInformation['experienceScoreRankingPosition'] = 0;
  roundLevelInformation['CountryLevelExperienceScoreRankingPosition'] = 0;
  roundLevelInformation['customers'] = 0;
  roundLevelInformation['project'] = [];
  roundLevelInformation['department'] = [];
  return roundLevelInformation;
}

function setNewRoundLevelInfo(nextRoundNum, callback) {
  async.waterfall([
      function(callback) {
        Teams.find({
          roundLevelInformation: {
            $elemMatch: {
              'round': nextRoundNum
            }
          }
        }).exec(function(err, teams) {
          if (err) return callback(err);
          callback(null, teams);

        });
      },
      function(teams, callback) {
        async.forEach(teams,
          function(team, callback) {
            var roundsInfo = team.roundLevelInformation;
            async.forEachSeries(roundsInfo,
              function(roundInfo, callback) {
                if (roundInfo != null && roundInfo != undefined && roundInfo.round != null && roundInfo.round != undefined && roundInfo.round == nextRoundNum) {
                  var roundInfoId = roundInfo._id;
                  roundsInfo.pull(roundInfoId);
                  team.save(function(err) {
                    if (err != null) return callback(err);
                    console.log("Deleting duplicate round info -->" + team.name);
                    callback(null);
                  });
                }
              }

              ,
              function(err) {
                if (err) return callback(err);
                callback(null);
              }
            )
          },
          function(err) {
            if (err) return callback(err);
            callback(null);
          }
        );
      },
      function(callback) {
        Teams.find().exec(function(err, teams) {
          if (err) return callback(err);
          callback(null, teams);
        });
      },
      function(teams, callback) {
        async.forEach(teams,
          function(team, callback) {
            var newRoundInfo = initializeRoundLevelInfo(nextRoundNum);
            team.roundLevelInformation.push(newRoundInfo);
            team.save(function(err) {
              if (err != null) return callback(err);
              console.log("Saving team with new round info-->" + team.name);
              callback(null);
            });
          },
          function(err) {
            if (err) return callback(err);
            callback(null);
          });
      }
    ],
    function(err) {
      if (err) return callback(err);
      callback(null);
    })

}
