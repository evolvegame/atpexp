'use strict';

var Round = require('./round.model');
var Teams = require('../team/team.model');
var Customers = require('../customer/customer.model');
var async = require('async');

var _expScorePoint = 1000;
var _selfInsured = "_SelfInsured";
var _initialCapital = 5000000;

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
          if (checkVariables(customers)) {
            try {
              customers.forEach(function(customer) {
                if (customer != null && checkVariables(customer.calculatedRound) && customer.calculatedRound == currentRound) {
                  console.log("Removing customer - " + customer.businessName + " from team - " + team.name);
                  customers.pull(customer._id);
                  console.log("Succesfully removed customer - " + customer.businessName + " from team - " + team.name);
                }
              });
            } catch (err) {
              console.log("Failure in loop for customers" + err);
              return callback(err);
            }
            team.save(function(err) {
              if (err != null) return callback(err);
              console.log("Saving team -->" + team.name);
              callback(null, "Deletion for team completed");
            });
          } else callback(null, "Nothing to delete");
        },
        function(err) {
          if (err) return callback(err);
          callback(null, 'All customers from all teams deleted');
        });
    },
    function(msg, callback) {
      Teams.find().exec(function(err, teams) {
        if (err) return callback(err);
        callback(null, teams);
      });
    },

    function(teams, callback) {
      async.forEachSeries(teams,
        function(team, callback) {
          if (currentRound == 1) {
            var teamId = team._id;
            Teams.update({
              _id: teamId
            }, {
              $set: {
                capital: _initialCapital,
                premium: 0,
                claims: 0,
                claimsRatio: 0,
                grossIncome: 0,
                profit: 0,
                investment: 0,
                experienceScore: 0,
                salesForceSize: 0,
                underwriterDepartmentSize: 0,
                iTMaintenance: 0,
                marketingBudget: 0,
                facilities: 0,
                totalExpense: 0,
                rankingPosition: 0
              }
            }, function(err) {
              if (err != null) return callback(err)
              console.log("Reset values for team for Round 1 --> " + team.name);
              callback(null, "Reset completed for Round 1");
            });

          } else {
            var previousRound = currentRound-1;
            var roundInfos = team.roundLevelInformation;
            var teamId = team._id;
            if (checkVariables(roundInfos)) {
              console.log(team.name)
              async.forEach(roundInfos,
                function(roundInfo, callback) {
                  if (checkVariables(roundInfos) && checkVariables(roundInfo.round) && roundInfo.round == previousRound) {
                    Teams.update({
                      _id: teamId
                    }, {
                      $set: {
                        capital: roundInfo.capital,
                        premium: roundInfo.premium,
                        claims: roundInfo.claims,
                        claimsRatio: roundInfo.claimsRatio,
                        grossIncome: roundInfo.grossIncome,
                        profit: roundInfo.profit,
                        investment: roundInfo.investment,
                        experienceScore: roundInfo.experienceScore,
                        salesForceSize: roundInfo.salesforceSize,
                        underwriterDepartmentSize: roundInfo.underwriterDepartmentSize,
                        iTMaintenance: roundInfo.iTMaintenance,
                        marketingBudget: roundInfo.marketingBudget,
                        facilities: roundInfo.facilities,
                        totalExpense: roundInfo.totalExpense,
                        rankingPosition: roundInfo.rankingPosition
                      }
                    }, function(err) {
                      if (err != null) return callback(err);
                      console.log("Reset values for team for current round for team--> " + team.name);
                      callback(null, "Reset completed for current round");
                    });

                  } else callback(null,"Loop over");
                },
                function(err) {
                  if (err) return callback(err);
                  return callback(null,"Reset done for team --> " + team.name);
                });
            } else callback(null,"No round Info");
          }
        },
        function(err) {
          if (err) return callback(err);
          return callback(null, "Reset of values for all teams completed")
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
    allCustomers.forEach(function(customer) {
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
    callback(null, customerAllocation);
  } catch (err) {
    console.log("Error in build location" + err);
    return callback(err);
  }

}

exports.calculateExpScorePoints = function(input, callback) {
  var allTeams = input["allTeams"];
  var currentRound = input["currentRound"];
  var expScores = [];
  var teamCalcJSON = {};
  var returnJSON = {};
  async.forEach(allTeams,
    function(team, callback) {
      var points = 0;
      var _1_teamName = team.name;
      var roundInformation_Id;
      var accumulatedExpScore = 0;
      try {
    	console.log("Starting experience score calculcation for " + _1_teamName);
    	if(checkVariables(team.experienceScore)) accumulatedExpScore = team.experienceScore;
        var expScoreAmtJSON = {};
        var roundInformation = team.roundLevelInformation;
        if (checkVariables(roundInformation)) {
          roundInformation.forEach(function(currRoundInfo) {
            var count = 0;
            if (checkVariables(currRoundInfo) && currRoundInfo.round == currentRound && count < 1) {
              roundInformation_Id = currRoundInfo._id;
              if (checkVariables(currRoundInfo.experienceScoreAmount)) {
                count++;
                points = currRoundInfo.experienceScoreAmount / (_expScorePoint);
                points = points + accumulatedExpScore;
                expScores.push(points);
                expScoreAmtJSON['Points'] = points;
                teamCalcJSON[_1_teamName] = expScoreAmtJSON;
                console.log("Points calculated in if loop for team  " + _1_teamName + " is = " + points);
              } else {
                count++
                points = 0;
                expScores.push(points);
                expScoreAmtJSON['Points'] = 0;
                teamCalcJSON[_1_teamName] = expScoreAmtJSON;
                console.log("Points calculated in else loop for team  " + _1_teamName + " is = " + points);
              }
            }
          });
        }
      } catch (err) {
        console.log("Error in experience score point calculation");
        return callback(err);
      }
      if (checkVariables(roundInformation_Id)) {
        Teams.update({
          "roundLevelInformation._id": roundInformation_Id
        }, {
          $set: {
            "roundLevelInformation.$.experienceScore": points
          }
        }, function(err) {
          if (err != null) return callback(err)
          console.log("Saving experience score for team -->" + _1_teamName + " value= " + points);
          callback(null, "Saved experience score");
        });

      } else {
        console.log("No experience score to be saved for " + _1_teamName + " since no round information available");
        callback(null, "Nothing to save");
      }
    },
    function(err) {
      if (err) return callback(err);
      returnJSON['value1'] = expScores;
      returnJSON['value2'] = teamCalcJSON;
      console.log("Successfully calculated experience score for teams");
      callback(null, returnJSON);
    });
}

exports.expScoreSorting = function(expScores, callback) {
  try {
    console.log("Starting the sort and assign ranking");
    var sortedJSON = {};
    var sorted = expScores.slice().sort(function(a, b) {
      return b - a
    });
    var ranks = expScores.slice().map(function(v) {
      var rankIndex = sorted.indexOf(v) + 1;
      if (sortedJSON != null && !(sortedJSON === undefined)) {
        if (sortedJSON.rankIndex == null || sortedJSON.rankIndex === undefined) {
          sortedJSON[rankIndex] = v;
        }
      }
      return rankIndex;
    });
    console.log("Successfully sorted and ranked -->" + JSON.stringify(sortedJSON));
    callback(null, sortedJSON);
  } catch (err) {
    console.log("Error in experience score sorting-->" + err);
  }
}

function swapJsonKeyValues(input) {
  var one, output = {};
  for (one in input) {
    if (input.hasOwnProperty(one)) {
      output[input[one]] = one;
    }
  }
  return output;
}

exports.expScoreRanking = function(input, callback) {

  var allTeams = input["allTeams"];
  var sortedJSON = input["sortedJSON"];
  var swappedJSON = swapJsonKeyValues(sortedJSON);
  var currRound = input["currRound"];
  async.forEach(allTeams,
    function(team, callback) {
      var roundInfo = team.roundLevelInformation;
      if (checkVariables(roundInfo)) {
        async.forEach(roundInfo,
          function(currRoundInfo, callback) {
            if (checkVariables(currRoundInfo) && checkVariables(currRoundInfo._id) && checkVariables(currRoundInfo.round) && currRoundInfo.round == currRound) {
              var roundId = currRoundInfo._id;
              var expScore = currRoundInfo.experienceScore;
              var rank = swappedJSON[expScore];
              Teams.update({
                "roundLevelInformation._id": roundId
              }, {
                $set: {
                  "roundLevelInformation.$.experienceScoreRankingPosition": rank
                }
              }, function(err) {
                if (err != null) return callback(err)
                console.log("Saving experience score ranking for team -->" + team.name + " rank= " + rank);
                callback(null, "Saved experience score ranking");
              });
            } else callback(null)
          },
          function(err) {
            if (err) return callback(err);
            callback(null);
          });
      } else callback(null);
    },
    function(err) {
      if (err) return callback(err);
      callback(null, "Successfully ranking applied for experience score");
    });
}

exports.expScoreFactor = function(expScores, callback) {
  try {
    console.log("Starting Experience Score Factor calculation");
    var returnJSON = {};
    var arrVal = [];
    for (key in expScores) arrVal.push(expScores[key]);
    var keys = Object.keys(expScores);
    var len = keys.length;
    // sort the values
    arrVal.sort(function(a, b) {
      return b - a
    });
    if (len == 1) {
      var key = arrVal[0];
      returnJSON[key] = 1;
    } else {
      var medianPoint = 5;
      if (len < 11) medianPoint = Math.round(len / 2);
      // assigning from 1.05 to 1.01
      var score = (medianPoint * 0.01) + 1.01;
      var i = 0;
      for (i; i <= medianPoint; i++) {
        var keyVal = arrVal[i];
        score = score - 0.01;
        returnJSON[keyVal] = score;
      }
      // assigning team with points 1
      var j = i;
      if (medianPoint < 5) {
        j = 0;
        for (j; j >= (len - medianPoint); j++) {
          var keyVal = arrVal[j];
          score = 1;
          returnJSON[keyVal] = score;
        }
      } else {
        for (j; j < (len - medianPoint); j++) {
          var keyVal = arrVal[j];
          score = 1;
          returnJSON[keyVal] = score;
        }
      }
      // assigning 0.99 to 0.95
      var k = j;
      if (medianPoint < 5) {
        k = j + i;
      }
      for (k; k < len; k++) {
        var keyVal = arrVal[k];
        score = score - 0.01;
        returnJSON[keyVal] = score;
      }
    }
    console.log("Experience score factor calculated");
    callback(null, returnJSON);
  } catch (err) {
    console.log("Error in experience score factor calculation-->" + err);
  }
}

function getRiskAcceptanceRate(buyerCountry, buyerIndustry, buyerRating, riskStrategies) {
    var strategies = riskStrategies;
    var riskAcceptance = 0;  

    
    for (var i =0; i<strategies.length; i++) {
	   if (strategies[i].buyerCountry.indexOf(buyerCountry)>-1 && strategies[i].buyerIndustry.indexOf(buyerIndustry)>-1 ){
	    if (buyerRating.between(1,30)){
	      riskAcceptance =strategies[i].strategyRatingBand1;
	      } else if (buyerRating.between(31,40)){
	        riskAcceptance =strategies[i].strategyRatingBand2;
	      } else if (buyerRating.between(41,50)){
	        riskAcceptance =strategies[i].strategyRatingBand3;
	      } else if (buyerRating.between(51,60)){
	        riskAcceptance =strategies[i].strategyRatingBand4;
	      } else {
	        riskAcceptance =strategies[i].strategyRatingBand5;
	      }        
    }    
  } 
  
  return riskAcceptance; 

}

Number.prototype.between = function(first,last){
  return (first < last ? this >= first && this <= last : this >= last && this <= first);
}

exports.calcOfferScore = function(input, callback) {
  var customerAllocation = input['customerAllocation'];
  var allTeams = input['allTeams'];
  var teamCalcJSON = input['teamCalcJSON'];
  var expScoreFactor = input['expScoreFactor'];
  var toBeCalculatedRound = input['toBeCalculatedRound'];
  async.forEachSeries(allTeams,
    function(team, callback) {
      var _2_teamName = team.name;
      var teamId = team._id;
      var teamPoints = teamCalcJSON[_2_teamName].Points;
      var expScorePoint = expScoreFactor[teamPoints];
      console.log("expScorePoint for " + _2_teamName + " is =" + expScorePoint)
      var offerArr = team.offer;
      var roundInformation = team.roundLevelInformation;
      var riskStrategies = team.riskStrategy;
      var roundPremium = 0;
      var roundCld = 0;
      var businessName;
      var offerScore = 0;
      var intermediateJSON = {};
      try {
        if (checkVariables(offerArr)) {
          async.forEachSeries(offerArr,
            function(currOffer, callback) {
              try {
            	  
            	  if (checkVariables(currOffer.round) && currOffer.round == toBeCalculatedRound) {
            		  var currOfferId = currOffer._id;
            		  
            		  if (checkVariables(riskStrategies) && riskStrategies.length > 0) {
            			  if (checkVariables(currOffer.marketBusinessName)) businessName = currOffer.marketBusinessName;
            			  if (checkVariables(customerAllocation) && checkVariables(customerAllocation[businessName])) {
            				  var buyerPortfolio = customerAllocation[businessName].CustomerDetails.buyerPortfolio;
            				  for (var i=0; i<buyerPortfolio.length; i++) {
            					  var riskAcceptance = getRiskAcceptanceRate(buyerPortfolio[i].country, buyerPortfolio[i].industry, buyerPortfolio[i].rating, riskStrategies);
            					  var cla = buyerPortfolio[i].cla;
            					  roundCld = roundCld + (cla * (riskAcceptance/100));
            				  }
            				  console.log('Calculated cld for team - ' + _2_teamName + ' is ---> ' + roundCld);
            			  }
            		  }
            		  
                      if (checkVariables(currOffer.price) && currOffer.price > 0) roundPremium = currOffer.price;
//                      if (checkVariables(currOffer.cld) && currOffer.cld > 0) roundCld = currOffer.cld;
                      if (checkVariables(currOffer.marketBusinessName)) businessName = currOffer.marketBusinessName;
                      if (roundPremium > 0) offerScore = (roundCld / roundPremium) * expScorePoint;
                      console.log(_2_teamName + " has an offerScore of " + offerScore + " for customer ->" + businessName);

                      if (checkVariables(customerAllocation)) {
                        if (checkVariables(customerAllocation[businessName])) {
                          if (checkVariables(customerAllocation[businessName].winningScore) && customerAllocation[businessName].winningScore < offerScore) {
                            customerAllocation[businessName].allocatedTo = _2_teamName;
                            customerAllocation[businessName].winningScore = offerScore;
                          }
                        }
                      }
            	  }
                
              } catch (err) {
                console.log("Error in offer score calculation-->" + err);
                return callback(err);
              }
              console.log("Saving offer score for team -->" + _2_teamName + " for customer --> " + businessName + " the value -->" + offerScore);
              Teams.update({
                "offer._id": currOfferId
              }, {
                $set: {
                  "offer.$.offerScore": offerScore
                }
              }, function(err) {
                if (err != null) return callback(err)
                console.log("Saved offer score for team " + _2_teamName + " for customer --> " + businessName);
                callback(null, "Saved offer score");
              });

            },
            function(err) {
              if (err) return callback(err);
              console.log("Offer scores for each offer calculated for team-->" + _2_teamName);
              callback(null, "Saved all offers for Team");
            });
        } else callback(null, "No offers");
      } catch (err) {
        console.log("Error in iterating offers for teams-->" + err)
        callback(err);
      }
    },
    function(err) {
      if (err) return callback(err);
      console.log("Offer scores for each offer calculated for all teams");
      callback(null, customerAllocation);
    });
}
