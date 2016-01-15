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
          try{
            customers.forEach(function(customer) {
              if (customer!=null && customer.calculateRound != null && !(customer.calculateRound === undefined)
                          && customer.calculatedRound == currentRound) {
                console.log("Removing customer - " + customer.businessName + " from team - " + team.name);
                customers.pull(customer._id);
                console.log("Succesfully removed customer - " + customer.businessName + " from team - " + team.name);
              }
            });
          }catch(err){
            console.log("Failure in loop for customers"+err);
            return callback(err);
          }
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
    if (!(checkVariables(teams))) return callback(new Error("No Teams are present for current round"));
    console.log("Successfully retrieved teams");
    callback(null, teams);
  });
}

exports.findAllCustomers = function(callback) {
  Customers.find().exec(function(err, customers) {
    if (err) return callback(err);
    if (!(checkVariables(customers))) return callback(new Error("No Customers are present for current round"));
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
    return callback(err);
  }

}

exports.calculateExpScorePoints = function (input, callback){
  var allTeams = input["allTeams"];
  var currentRound = input["currentRound"];
  var expScores=[];
  var teamCalcJSON={};
  var returnJSON={};
  async.forEach(allTeams,
    function(team, callback) {
      var points = 0;
      var _1_teamName = team.name;
      var roundInformation_Id;
      try{
        console.log("Starting experience score calculcation for "+_1_teamName);
        var expScoreAmtJSON={};
        var roundInformation = team.roundLevelInformation;
        if(checkVariables(roundInformation)){
          roundInformation.forEach(function(currRoundInfo){
            var count = 0;
            if (checkVariables(currRoundInfo) && currRoundInfo.round == currentRound && count<1){
              roundInformation_Id = currRoundInfo._id;
              if(checkVariables(currRoundInfo.experienceScoreAmount)){
                count++;
                points=currRoundInfo.experienceScoreAmount/(_expScorePoint);
                expScores.push(points);
                expScoreAmtJSON['Points']=points;
                teamCalcJSON[_1_teamName]=expScoreAmtJSON;
                console.log("Points calculated in if loop for team  "+_1_teamName +" is = "+points);
              }else{
                count++
                points=0;
                expScores.push(points);
                expScoreAmtJSON['Points']=0;
                teamCalcJSON[_1_teamName]=expScoreAmtJSON;
                console.log("Points calculated in else loop for team  "+_1_teamName +" is = "+points);
              }
            }
          });
        }
      }catch(err){
        console.log("Error in experience score point calculation");
        return callback(err);
      }
      if(checkVariables(roundInformation_Id)){
        Teams.update({"roundLevelInformation._id":roundInformation_Id},
                      {$set: {"roundLevelInformation.$.experienceScore": points}},function(err){
                        if(err != null) return callback(err)
                        console.log("Saving experience score for team -->" +_1_teamName +" value= "+points);
                        callback(null,"Saved experience score");
                      });

      }else{
        console.log("No experience score to be saved for "+_1_teamName +" since no round information available");
        callback(null,"Nothing to save");
      }
    },
    function(err) {
      if (err) return callback(err);
      returnJSON['value1']=expScores;
      returnJSON['value2']=teamCalcJSON;
      console.log("Successfully calculated experience score for teams");
      callback(null, returnJSON);
    });
}
