'use strict';

var Round = require('./round.model');
var Teams = require('../team/team.model');
var Customers = require('../customer/customer.model');
var async = require('async');

var _expScorePoint=1000;
var _selfInsured = "_SelfInsured";

function queryTeamsCurrentRound(roundNumber) {
  var query = Teams.find({
    role: 'user',
    customer: {
      $elemMatch: {
        calculatedRound: roundNumber
      }
    }
  });
  return query;
}

function queryAllTeams(roundNumber) {
  var query = Teams.find({
    role: 'user',
    roundLevelInformation: {
      $elemMatch: {
        round: roundNumber
      }
    }
  });
  return query;
}

// to check whether a value is null or undefined
function checkVariables(input) {
  if (input != null && input != 'undefined') return true;
  else return false;
}

exports.validateRound = function(currentRound, callback) {
  Round.findOne({
    "round": currentRound
  }).exec(function(err, round) {
    if (err) {
      return callback(err)
    } else if (!round || round == null || round === undefined) {
      return callback(new Error('Error in finding current round'))
    } else {
      if (!round.currentRoundFlag) {
        callback(new Error("Requested calculation is not for the current round"))
      } else callback(null, round)
    }
  });
}

exports.deleteCalcRoundDetails = function(currentRound, callback) {
  var query = queryTeamsCurrentRound(currentRound);
  async.waterfall([
    function(callback) {
      query.exec(function(err, teams) {
        if (err) return callback(err);
        callback(null, teams);
      });
    },
    function(teams, callback) {
      async.forEachSeries(teams,
        function(team, callback) {
          var customers = team.customer;
          customers.forEach(function(customer) {
            if (!checkVariables(customer.calculateRound) && customer.calculatedRound == currentRound) {
              console.log("Removing customer - " + customer.businessName + " from team - " + team.name);
              customers.pull(customer._id);
              console.log("Succesfully removed customer - " + customer.businessName + " from team - " + team.name);
            }
          });
          team.save(function(err) {
            if (err != null) return callback(err);
            console.log("Saving team -->" + team.name);
            callback(null, "Deletion for team completed");
          });
        },
        function(err) {
          if (err) return callback(err);
          callback(null, 'All customers from all teams deleted');
        });

    }

  ], function(err, result) {
    if (err) return callback(err);
    callback(null, "Deletion task completed successfully")
  });
}

exports.findAllTeams = function(currentRound, callback) {
  var query = queryAllTeams(currentRound);
  query.exec(function(err, teams) {
    if (err) return callback(err);
    if (!checkVariables(teams)) return callback(new Error("No Teams are present for current round"));
    console.log("Successfully retrieved teams");
    callback(null, teams);
  });
}

exports.findAllCustomers = function(callback) {
  Customers.find().exec(function(err, customers) {
    if (err) return callback(err);
    if (!checkVariables(customers)) return callback(new Error("No Customers are present for current round"));
    console.log("Successfully retrieved customers");
    callback(null, customers);
  });
}

exports.buildAllocation = function(allCustomers, callback) {
  var customerAllocation = {};
  try {
    allCustomers.forEach(function(customer){
      var customerName = customer.name;
      var minOfferScore = customer.minOfferScore;
      var customerAllocDetails = {};
      customerAllocDetails['allocatedTo'] = _selfInsured;
      customerAllocDetails['winningScore'] = minOfferScore;

      var customerDetailsJSON = {};
      customerDetailsJSON['businessRevenue'] = customer.revenue;
      customerDetailsJSON['businessCountry'] = customer.country;
      customerDetailsJSON['businessrisk'] = customer.businessRisk;
      customerDetailsJSON['experiencescoreneeded'] = customer.experienceScoreNeeded;
      //customerAllocDetail['totalPremium']=customer.revenue; // to be clarified and added
      //customerAllocDetail['totalClaims']=customer.revenue; // to be clarified and added
      customerDetailsJSON['buyerPortfolio'] = customer.buyerPortfolio;

      customerAllocDetails['CustomerDetails'] = customerDetailsJSON;
      customerAllocation[customerName] = customerAllocDetails;
    });
    console.log("Built Customer allocation successfully");
    callback(null,customerAllocation);
  } catch (err) {
    console.log("Error in build location" + err);
    callback(err);
  }

}
