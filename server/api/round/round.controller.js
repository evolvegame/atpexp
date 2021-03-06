'use strict';

var _this = this;
var Round = require('./round.model');
var Teams = require('../team/team.model');
var Customers = require('../customer/customer.model');
var Projects = require('../projects/projects.model');
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
          	renewOffersForTeams(currRoundId + 1, function(err){
          		if (err) return res.send(500);
      			console.log('Finished renewing offers for all teams');
      			return res.json(200, round);
      		});
          console.log('Finished New round level info for all teams');
          
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
        Projects.find(function(err, projects){
        	input["projects"] = projects;
        	CalcController.calculateExpScorePoints(input, function(err, resultJSON) {
	          if (err) return callback(err);
	          expScores = resultJSON['value1'];
	          teamCalcJSON = resultJSON['value2'];
	          console.log("Step 6 completed.Proceed to Step 7");
	          callback(null, resultJSON);
	        });
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
            CalcController.expScoreRanking(input, function(err, result) {
              if (err) return callback(err);
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
        input["toBeCalculatedRound"] = toBeCalculatedRound;
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
          console.log("Step 11: Customer Allocation for Local Market");
          var input = {};
          input["customerAllocation"] = customerAllocation;
          input["toBeCalculatedRound"] = toBeCalculatedRound;
          agreementConverter.agreementConversionLocalMarket(input, function(err, result) {
            if (err) return callback(err);
            console.log("Step 11 completed.Proceed to Step 12");
            callback(null, result);
          });
        }
      ,
      step12: function(callback) {
        console.log("Step 11: Populate round level values");
        calcResults.populateValues(toBeCalculatedRound, function(err, result) {
          if (err) return callback(err);
          console.log("Step 11 completed. Proceed to Step 12");
          callback(null);
        });
      }

      ,
      step13: function(callback) {
        console.log("Step 12: Populate capital ranking");
        calcResults.capitalRanking(toBeCalculatedRound, function(err, result) {
          if (err) return callback(err);
          console.log("Step 12 completed. Proceed to Step 13");
          callback(null);
        });
      }

      ,
      step14: function(callback) {
        console.log("Step 13: Populate country level ranking");
        calcResults.countryCapitalRanking(toBeCalculatedRound,function(err, result) {
          if (err) return callback(err);
          console.log("Step 13 completed. Proceed to Step 14");
          callback(null);
        });
      }

      ,
      step15: function(callback) {
        console.log("Step 14. Update Calculation Flag to true for the round");
        Round.findOneAndUpdate(
          {
            "round": toBeCalculatedRound
          }, {
            $set: {
              "calculationFlag": true
            }
          }
         , function(err) {
          if (err != null) return callback(err)
          console.log("Step 14 completed. Proceed to Step 15");
          callback(null);
        });
      },
      step16: function(callback) {
          console.log("Final step. Reset offer count for all customers to zero");
          Customers.update({},{
        		  offerCount : 0
          },
          {
        	  multi: true
          },
          function (err) {
              if (err) return callback(err)
              console.log("Great Job... Calculation completed successfully. Hurray...");
              callback(null);
          });
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

function initializeNewRoundNotifications(nextRoundNum, notificationArray){
	var newRoundNotification = {};
	for (var i = 0; i < notificationArray.length; i++) {
		var notification = notificationArray[i];
		if (notification.round == (nextRoundNum - 1)) {
			newRoundNotification['round'] = nextRoundNum;
			var newRoundContents = [];
			for (var j = 0 ; j < notification.contents.length; j++) {
				var contents = {};
				contents['notificationHeader'] = notification.contents[j].notificationHeader;
				contents['notificationText'] = notification.contents[j].notificationText;
				contents['status'] = 'false';
				contents['displayType'] = 'icheckbox_minimal-grey';
				newRoundContents.push(contents);
			}
			newRoundNotification['contents'] = newRoundContents;
			break;
		}
	}
	
	return newRoundNotification;
}

function copyOverRiskStrategyFromPreviousRound(newRound, allPreviousRoundRiskStrategies){
	var currentRoundRiskStrategies = [];
	
	
	allPreviousRoundRiskStrategies.forEach(function(previousRoundRiskStrategy){
		if(checkVariables(previousRoundRiskStrategy) && previousRoundRiskStrategy.round == (newRound - 1)) {
			var currentRoundRiskStrategy = {};
			currentRoundRiskStrategy['round'] = newRound;
			currentRoundRiskStrategy['strategyId'] = previousRoundRiskStrategy.strategyId;
			currentRoundRiskStrategy['strategyName'] = previousRoundRiskStrategy.strategyName;
			currentRoundRiskStrategy['buyerCountry'] = previousRoundRiskStrategy.buyerCountry;
			currentRoundRiskStrategy['buyerIndustry'] = previousRoundRiskStrategy.buyerIndustry;
			currentRoundRiskStrategy['strategyRatingBand1'] = previousRoundRiskStrategy.strategyRatingBand1;
			currentRoundRiskStrategy['strategyRatingBand2'] = previousRoundRiskStrategy.strategyRatingBand2;
			currentRoundRiskStrategy['strategyRatingBand3'] = previousRoundRiskStrategy.strategyRatingBand3;
			currentRoundRiskStrategy['strategyRatingBand4'] = previousRoundRiskStrategy.strategyRatingBand4;
			currentRoundRiskStrategy['strategyRatingBand5'] = previousRoundRiskStrategy.strategyRatingBand5;
			currentRoundRiskStrategies.push(currentRoundRiskStrategy);
		}
	});
	return currentRoundRiskStrategies;
	
}

function initializeRoundLevelInfo(newRound, allPreviousRoundLevelInformation) {
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
  var currentRoundDepartments = [];
  allPreviousRoundLevelInformation.forEach(function(prevRoundLevelInformation){
	  if(checkVariables(prevRoundLevelInformation) && prevRoundLevelInformation.round == (newRound - 1)){
		  var prevRoundDepartment = prevRoundLevelInformation.department;
		  if(checkVariables(prevRoundDepartment)) {
			  prevRoundDepartment.forEach(function(previousDepartment){
				  var department = {
						  name: previousDepartment.name,
						  sizeUnit: previousDepartment.sizeUnit,
						  cost: previousDepartment.cost,
						  numberOfBenefits: previousDepartment.numberOfBenefits
				  }
				  currentRoundDepartments.push(department);
			  });
		  }
	  }
  });
  roundLevelInformation['department'] = currentRoundDepartments;
  return roundLevelInformation;
}

function renewOffersForTeams(nextRoundNum, callback) {
	console.log('About to renew offers -- !!!');
	async.waterfall([
	   function(callback) {
        Teams.find().exec(function(err, teams) {
            if (err) return callback(err);
            callback(null, teams);
          });
        },
        function(teams, callback) {
        	async.forEachSeries(teams, function(team, callback){
        		//console.log('working on offer renewals for team -- ' + team.name);
        		var existingOffers = team.offer;
        		var customers = team.customer;
        		async.forEachSeries(existingOffers, function (existingOffer, callback){
        			if (existingOffer.round == nextRoundNum - 1){
        				if(!checkVariables(existingOffer.marketType) || existingOffer.marketType != 'Local Market Portfolio'){
	        				for (var i = 0 ; i < customers.length; i ++) {
	        					if( customers[i].businessName == existingOffer.marketBusinessName && customers[i].agreement.status == 'Active') {
	        						var renewedOffer = {
	        							    round: nextRoundNum,
	        							    marketBusinessName: existingOffer.marketBusinessName,
	        							    price:existingOffer.price,
	        							    premiumPercentage: existingOffer.premiumPercentage,
	        							    cld:existingOffer.cld,
	        							    offerType: 'Renewal',
	        							    offerScore: existingOffer.offerScore
	        						};
	        						
	        						var buyerPortfolio = new Array(existingOffer.buyerPortfolio.length);
	        						for (var j= 0; j<existingOffer.buyerPortfolio.length; j++) {
	        							var portfolio = {
	        								      country:existingOffer.buyerPortfolio[j].country,
	        								      industry:existingOffer.buyerPortfolio[j].industry,
	        								      buyerRating:existingOffer.buyerPortfolio[j].buyerRating,
	        								      cla:existingOffer.buyerPortfolio[j].cla,
	        								      riskAcceptance:existingOffer.buyerPortfolio[j].riskAcceptance
	        							}
	        							buyerPortfolio[j] = portfolio;
	        						}
	        						
	        						renewedOffer.buyerPortfolio = buyerPortfolio;
	        						
	        						team.offer.push(renewedOffer);
	        						team.save(function(err) {
	                                    if (err != null){
	                                    	console.log('Saving team -- ' + JSON.stringify(renewedOffer) + ' for team -- ' + team.name);
	                                    	console.log(JSON.stringify('Something went wrong while saving renewed Offer-- ' + err));
	                                    	return callback(err);
	                                    }
	//                                    callback(null);
	                                });
	        						break;
	        					}
	        				}
	        				callback(null);
        				} else {
        					var renewedOffer = {
    							    round: nextRoundNum,
    							    marketBusinessName: existingOffer.marketBusinessName,
    							    price:existingOffer.price,
    							    premiumPercentage: existingOffer.premiumPercentage,
    							    cld:existingOffer.cld,
    							    offerType: 'Renewal',
    							    offerScore: existingOffer.offerScore,
    							    marketType: 'Local Market Portfolio',
    							    buyerRatingFrom: existingOffer.buyerRatingFrom,
    							    buyerRatingTo: existingOffer.buyerRatingTo,
    							    numberOfResources: existingOffer.numberOfResources,
    							    diffNumberOfResources: 0,
    							    allocatedNumOfCustomers: existingOffer.allocatedNumOfCustomers
    						};
    						
    						renewedOffer.buyerPortfolio = existingOffer.buyerPortfolio;
    						//console.log('Renewing offer for local market ---> ' + JSON.stringify(renewedOffer));
    						team.offer.push(renewedOffer);
    						team.save(function(err) {
    							//console.log('Saving team -- ' + JSON.stringify(renewedOffer) + ' for team -- ' + team.name);
    							if (err){
                                	console.log(JSON.stringify('Something went wrong while saving renewed Offer-- ' + err));
                                	callback(err);
                                }
                                callback(null);
                            });
        				}
        			} else {
        				//console.log('About to call back in else');
        				callback(null);
        			}
        		}, function(err){
        			if (err) return callback(err);
                    callback(null);
        		});
        	}, function(err) {
                if (err) return callback(err);
                callback(null);
              });
        }]
        , function(err) {
	      if (err) return callback(err);
	      callback(null);
	    });
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
                    //console.log("Deleting duplicate round info -->" + team.name);
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
            var newRoundInfo = initializeRoundLevelInfo(nextRoundNum, team.roundLevelInformation);
            team.roundLevelInformation.push(newRoundInfo);
            
            var newRoundNotifications = initializeNewRoundNotifications(nextRoundNum, team.notification);
            team.notification.push(newRoundNotifications);
            
            var newRoundRiskStrategies = copyOverRiskStrategyFromPreviousRound(nextRoundNum, team.riskStrategy);
            if(checkVariables(newRoundRiskStrategies)){
            	newRoundRiskStrategies.forEach(function(newRoundRiskStrategy) {
            		team.riskStrategy.push(newRoundRiskStrategy);
            	});
            	
            }
            team.save(function(err) {
              if (err != null) return callback(err);
              //console.log("Saving team with new round info-->" + team.name);
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
