'use strict';

var Round = require('./round.model');
var Teams = require('../team/team.model');
var Customers = require('../customer/customer.model');
var async = require('async');

var _expScorePoint = 1000;
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
    }/*,
    function(teams, callback) {
      async.forEachSeries(teams,
        function(team, callback) {
          var customers = team.customer;
          if (checkVariables(customers)) {
            try {
              console.log(' COunt of customersss --- > ' + customers.length);
              customers.forEach(function(customer) {
            	console.log('Customer about to be pulled ++++++ ' + customer.businessName + ' ^^^^ calculated round ^^^^ ' + customer.calculatedRound);
                if (customer != null && checkVariables(customer.calculatedRound) && customer.calculatedRound == currentRound) {
                  console.log("Removing customer - " + customer.businessName + " from team - " + team.name);
                  customers.pull(customer._id);
//                  console.log("Succesfully removed customer - " + customer.businessName + " from team - " + team.name);
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
    }*/,
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
                premium: 0,
                claims: 0,
                claimsRatio: 0,
                grossIncome: 0,
                profit: 0,
                investment: 0,
//                experienceScore: 0,
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
              //console.log("Reset values for team for Round 1 --> " + team.name);
              callback(null, "Reset completed for Round 1");
            });

          } else {
            var previousRound = currentRound-1;
            var roundInfos = team.roundLevelInformation;
            var teamId = team._id;
            if (checkVariables(roundInfos)) {
              //console.log(team.name)
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
                      //console.log("Reset values for team for current round for team--> " + team.name);
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
    //console.log("Successfully retrieved teams");
    callback(null, teams);
  });
}

exports.findAllCustomers = function(callback) {
  Customers.find().exec(function(err, customers) {
    if (err) return callback(err);
    if (!(checkVariables(customers))) return callback(new Error("No Customers are present for current round"));
    //console.log("Successfully retrieved customers");
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
      customerAllocDetails['localSalesAllocations'] = [];
      customerAllocDetails['allocatedTo'] = _selfInsured;
      customerAllocDetails['winningScore'] = minOfferScore;

      var customerDetailsJSON = {};
      customerDetailsJSON['businessRevenue'] = customer.revenue;
      customerDetailsJSON['businessCountry'] = customer.country;
      customerDetailsJSON['businessrisk'] = customer.businessRisk;
      customerDetailsJSON['experiencescoreneeded'] = customer.experienceScoreNeeded;
      customerDetailsJSON['numberOfCustomers'] = customer.numberOfCustomers;
      customerDetailsJSON['marketType'] = customer.marketType;
      customerDetailsJSON['minOfferScore'] = minOfferScore;
      //customerAllocDetail['totalPremium']=customer.revenue; // to be clarified and added
      //customerAllocDetail['totalClaims']=customer.revenue; // to be clarified and added
      customerDetailsJSON['buyerPortfolio'] = customer.buyerPortfolio;
      customerAllocDetails['CustomerDetails'] = customerDetailsJSON;
      customerAllocation[customerName] = customerAllocDetails;
    });
    //console.log("Built Customer allocation successfully");
    callback(null, customerAllocation);
  } catch (err) {
    console.log("Error in build location" + err);
    return callback(err);
  }

}

exports.calculateExpScorePoints = function(input, callback) {
  var allTeams = input["allTeams"];
  var currentRound = input["currentRound"];
  var projects = input["projects"];
  var expScores = [];
  var teamCalcJSON = {};
  var returnJSON = {};
  async.forEach(allTeams,
    function(team, callback) {
      var points = 0;
      var _1_teamName = team.name;
      var roundInformation_Id;
      var accumulatedExpScore = 0;
      var expScoreAmountProjects = 0;
      try {
    	//console.log("Starting experience score calculcation for " + _1_teamName);
    	//console.log("Starting experience score calculcation for " + team.experienceScore);
    	if(checkVariables(team.experienceScore)) accumulatedExpScore = team.experienceScore;
        var expScoreAmtJSON = {};
        var roundInformation = team.roundLevelInformation;
        if (checkVariables(roundInformation)) {
          roundInformation.forEach(function(currRoundInfo) {
            var count = 0;
            if (checkVariables(currRoundInfo) && currRoundInfo.round == currentRound && count < 1) {
              var selectedProjects = currRoundInfo.project;
              //console.log('selectedProjects -- ' + JSON.stringify(selectedProjects));
              if(checkVariables(selectedProjects)) {
            	  selectedProjects.forEach(function(selProject){
            		  for(var i = 0; i < projects.length; i++){
            			  //console.log('About to Match -- ' + projects[i]._id + ' && ' + selProject);
            			  if(projects[i]._id.equals(selProject)) {
            				  //console.log('Match found -- ' + JSON.stringify(projects[i]) + ' && ' + selProject);
            				  expScoreAmountProjects = expScoreAmountProjects + projects[i].experienceScore;
            			  }
            		  }
            	  });
              }
              roundInformation_Id = currRoundInfo._id;
              currRoundInfo.experienceScoreAmount = expScoreAmountProjects;
              if (checkVariables(currRoundInfo.experienceScoreAmount)) {
                count++;
                points = currRoundInfo.experienceScoreAmount;
                points = points + accumulatedExpScore;
                expScores.push(points);
                expScoreAmtJSON['Points'] = points;
                teamCalcJSON[_1_teamName] = expScoreAmtJSON;
                //console.log("Points calculated in if loop for team  " + _1_teamName + " is = " + points);
              } else {
                count++
                points = 0;
                expScores.push(points);
                expScoreAmtJSON['Points'] = 0;
                teamCalcJSON[_1_teamName] = expScoreAmtJSON;
                //console.log("Points calculated in else loop for team  " + _1_teamName + " is = " + points);
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
          //console.log("Saving experience score for team -->" + _1_teamName + " value= " + points);
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
    //console.log("Starting the sort and assign ranking");
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
                //console.log("Saving experience score ranking for team -->" + team.name + " rank= " + rank);
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

function getRiskAcceptanceRate(buyerCountry, buyerIndustry, buyerRating, riskStrategies, currentRound) {
    var strategies = riskStrategies;
    var riskAcceptance = 0;  

    
    for (var i =0; i<strategies.length; i++) {
	   if (strategies[i].round == currentRound && strategies[i].buyerCountry.indexOf(buyerCountry)>-1 && strategies[i].buyerIndustry.indexOf(buyerIndustry)>-1 ){
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
  async.series({
	  //deal with calculation of offer score and customer allocation for all individual type market customers
	  step1: function (callback){
		  async.forEachSeries(allTeams,
				    function(team, callback) {
				      var _2_teamName = team.name;
				      var teamId = team._id;
				      var teamPoints = teamCalcJSON[_2_teamName].Points;
				      var expScorePoint = expScoreFactor[teamPoints];
				      //console.log("expScorePoint for " + _2_teamName + " is =" + expScorePoint)
				      var offerArr = team.offer;
				      var roundInformation = team.roundLevelInformation;
				      var riskStrategies = team.riskStrategy;
				      var roundPremium = 0;
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
				            		  var roundCLA = 0;
				            		  var roundCld = 0;
				            		  var updatedBuyerPortfolio = currOffer.buyerPortfolio;
				            		  if (checkVariables(riskStrategies) && riskStrategies.length > 0) {
				            			  if (checkVariables(currOffer.marketBusinessName)) businessName = currOffer.marketBusinessName;
				            			  if (checkVariables(customerAllocation) && checkVariables(customerAllocation[businessName])) {
				            				  var buyerPortfolio = customerAllocation[businessName].CustomerDetails.buyerPortfolio;
				            				  for (var i=0; i<buyerPortfolio.length; i++) {
				            					  var riskAcceptance = getRiskAcceptanceRate(buyerPortfolio[i].country, buyerPortfolio[i].industry, buyerPortfolio[i].rating, riskStrategies, toBeCalculatedRound);
				            					  var cla = buyerPortfolio[i].cla;
				            					  roundCLA = roundCLA + cla;
				            					  var buyerPortfolioLeveCLD = cla * (riskAcceptance/100);
				            					  for (var j=0; j<updatedBuyerPortfolio.length; j++) {
				            						  if (updatedBuyerPortfolio[j].country == buyerPortfolio[i].country && updatedBuyerPortfolio[j].industry == buyerPortfolio[i].industry) {
				            							  updatedBuyerPortfolio[j].cld = buyerPortfolioLeveCLD;
				            						  }
				            					  }
				            					  roundCld = roundCld + buyerPortfolioLeveCLD;
				            				  }
//				            				  console.log('Calculated cld for team - ' + _2_teamName + ' is ---> ' + roundCld);
				            			  }
				            		  }
				            		  
				            		  if(checkVariables(customerAllocation) && checkVariables(customerAllocation[businessName]) && customerAllocation[businessName].CustomerDetails.marketType == 'Individual'){
				            		  
					                      if (checkVariables(currOffer.price) && currOffer.price > 0) roundPremium = currOffer.price;
					//                      if (checkVariables(currOffer.cld) && currOffer.cld > 0) roundCld = currOffer.cld;
					                      if (checkVariables(currOffer.marketBusinessName)) businessName = currOffer.marketBusinessName;
					                      if (roundPremium > 0) offerScore = (roundCld / roundPremium) * expScorePoint;
					                      currOffer.offerScore = offerScore;
//					                      console.log(_2_teamName + " has an offerScore of " + offerScore + " for customer ->" + businessName);
					
					                      if (checkVariables(customerAllocation)) {
					                        if (checkVariables(customerAllocation[businessName])) {
					                          if (checkVariables(customerAllocation[businessName].winningScore) && customerAllocation[businessName].winningScore < offerScore) {
					                            customerAllocation[businessName].allocatedTo = _2_teamName;
					                            customerAllocation[businessName].winningScore = offerScore;
					                          }
					                        }
					                      }
				            		  } else {
				            		  
					                      if (checkVariables(currOffer.premiumPercentage) && currOffer.premiumPercentage > 0) roundPremium = currOffer.premiumPercentage / 100;
					//                      if (checkVariables(currOffer.cld) && currOffer.cld > 0) roundCld = currOffer.cld;
					                      if (checkVariables(currOffer.marketBusinessName)) businessName = currOffer.marketBusinessName;
					                      if (roundPremium > 0) offerScore = (roundCld / roundPremium) * expScorePoint;
					                      /*console.log('Round CLA for customer - ' + businessName + ' is --- ' + roundCLA);
					                      console.log('roundCld for customer - ' + businessName + ' is --- ' + roundCld);
					                      console.log('roundPremium for customer - ' + businessName + ' is --- ' + roundPremium);
					                      console.log('expScorePoint for customer - ' + businessName + ' is --- ' + expScorePoint);*/
					                      if (roundCLA > 0){
					                    	  offerScore = offerScore / roundCLA;
					                      } else {
					                    	  offerScore = 0;
					                      }
					                      currOffer.offerScore = offerScore;
//					                      console.log(_2_teamName + " has an offerScore of " + offerScore + " for customer ->" + businessName);
					
					                     /* if (checkVariables(customerAllocation)) {
					                        if (checkVariables(customerAllocation[businessName])) {
					                          if (checkVariables(customerAllocation[businessName].winningScore) && customerAllocation[businessName].winningScore < offerScore) {
					                            customerAllocation[businessName].allocatedTo = _2_teamName;
					                            customerAllocation[businessName].winningScore = offerScore;
					                          }
					                        }
					                      }*/
				            		  }
				            	  }
				                
				              } catch (err) {
				                console.log("Error in offer score calculation-->" + err);
				                return callback(err);
				              }
				              //console.log("Saving offer score for team -->" + _2_teamName + " for customer --> " + businessName + " the value -->" + offerScore);
/*				              if (_2_teamName == 'Team 1') { //TODO: To be removed after testing
				            	  console.log('Offer Buyer portfolios===>>>  ' + updatedBuyerPortfolio);
				              }*/
				              Teams.update({
				                "offer._id": currOfferId
				              }, {
				                $set: {
				                  "offer.$.offerScore": offerScore,
				                  "offer.$.cla" : 1,
				                  "offer.$.cld" : 1,
				                  "offer.$.buyerPortfolio": updatedBuyerPortfolio
				                }
				              }, function(err) {
				                if (err != null) return callback(err)
				                //console.log("Saved offer score for team " + _2_teamName + " for customer --> " + businessName);
				                callback(null, "Saved offer score");
				              });

				            },
				            function(err) {
				              if (err) return callback(err);
				              //console.log("Offer scores for each offer calculated for team-->" + _2_teamName);
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
	  }/*,
	  
	//Loop through customers/market(filtered for local market) = 
		// find all the offers for this buyer across team and order them by offer score. Keep a variable to store number of customers available	
	  		//for each buyer portfolio in offer , 
	  		
	  				// for team read the department's local sales size 
	  					//allocate customer to team by limiting to department's local sales size.
	  					// calculate premium as (allowable customers * cld)/total number of customers
	  step2: function (callback) {
		  console.log('');
		  console.log('');
		  var allCustomerKeys = [];
		  try {
			    for (var key in customerAllocation) {
			      if (customerAllocation.hasOwnProperty(key)) {
			        allCustomerKeys.push(key);
			      }
			    }
		  
			  console.log('allCustomerKeys -- ' + JSON.stringify(allCustomerKeys));
		  	  async.forEachSeries(allCustomerKeys, function(customerName, callback) {
		  		 var customerDetails = customerAllocation[customerName];
		  		 console.log('Customer Name -- ' + customerName);
//		  		 if(customerDetails.marketType == 'Local Market Portfolio'){
		  			 var buyerPortfolios = customerDetails.CustomerDetails.buyerPortfolio;
		  			 async.forEachSeries(buyerPortfolios, function(buyerPortfolio, callback){
		  				 var numberOfOrganisation = buyerPortfolio.numberOfOrganisation;
		  				 if(customerDetails.marketType != 'Local Market Portfolio') {
		  					numberOfOrganisation = 1;
		  				 }
		  				 var query = findOfferedTeams(customerName, toBeCalculatedRound);
						 query.sort({'offerScore': -1});
						 query.exec(function (err, offerredTeams) {
							  if (err) return callback(err);
							  offerredTeams.forEach(function(offerredTeam){
								  console.log('Team - ' + offerredTeam.name + ' has offered for ' + customerName);
								  var currentRoundDepartment = [];
								  var numberOfBenefits = 0;
								  if (checkVariables(offerredTeam) && checkVariables(offerredTeam.roundLevelInformation)) {
									  
									  for(var i = 0; i < offerredTeam.roundLevelInformation.length; i ++) {
										  if (offerredTeam.roundLevelInformation[i].round == toBeCalculatedRound) {
											  currentRoundDepartment = offerredTeam.roundLevelInformation[i].department;
											  break;
										  }
									  }  
									  
									  if (checkVariables(currentRoundDepartment)) {
										  for (var i = 0 ; i < currentRoundDepartment.length ; i++) {
											  if (currentRoundDepartment[i].name == 'Local Sales') {
												  numberOfBenefits = currentRoundDepartment[i].numberOfBenefits;
												  break;
											  }
										  }
									  }
								  }							  
								  
								  if(checkVariables(offerredTeam) && checkVariables(offerredTeam.offer)) {
									  var offers = offerredTeam.offer;
									  offers.forEach(function(offer){
										  if(checkVariables(offer.buyerPortfolio)){
											  var offerBuyerPortfolio = offer.buyerPortfolio;
											  for(var i = 0; i < offerBuyerPortfolio.length; i++){
												  if(offerBuyerPortfolio[i].country == buyerPortfolio.country && offerBuyerPortfolio[i].industry == buyerPortfolio.industry){
													  if(numberOfOrganisation > 0 && numberOfBenefits > 0) {
														  offerBuyerPortfolio[i].status = 'Accepted';
														  offer.status = 'Accepted';
														  var allocatedNumOfCustomers = 0;
														  if (numberOfBenefits >= numberOfOrganisation) {
															  allocatedNumOfCustomers =  numberOfOrganisation;
														  } else {
															  numberOfOrganisation = numberOfOrganisation - numberOfBenefits;
															  allocatedNumOfCustomers = numberOfBenefits;
														  }
														  offerBuyerPortfolio[i].cla = (allocatedNumOfCustomers * buyerPortfolio.cla) / buyerPortfolio.numberOfOrganisation;
														  offerBuyerPortfolio[i].cld = (allocatedNumOfCustomers * buyerPortfolio.cld) / buyerPortfolio.numberOfOrganisation;
														  if(!checkVariables(offer.price)) {
															  offer.price = 0;
														  }
														  offer.price = offer.price + offerBuyerPortfolio[i].cld;
														  customerDetails.localSalesAllocations.push(offerredTeam.name);
														  console.log('customer - ' + customerName + ' Allocated for team - ' + offerredTeam.name);
													  } else {
														  numberOfOrganisation = 0;
													  }
												  }
											  }
										  }
									  });
								  }
							  });
							  callback(null);
						 });	
		  			 }, function(err) {
						  if (err) return callback(err);
						  callback(null);
					  
		  			 });					 
				 } else {
					 callback(null);
				 }
				  
			  }, function(err){
				  if (err) return callback(err);
				  console.log('Finished allocation of teams to customers for local sales ');
				  callback(null, customerAllocation);
			  });
		  } catch (err) {
			  console.log("Error occured in retrieving customer allocation details for agreements-->" + err);
			  return callback(err);
		  }
	  }*/
  
	  ,
	  step2: function (callback) {
		    
          // all offer scores are calculated by now. need to loop through the offers in the descending order
            var marketType = 'Local Market Portfolio';
            var query = findOfferedTeams(marketType, toBeCalculatedRound);
            
            query.exec(function (err, offerredTeams) {
                console.log('About to iterate through offeredTeams!');
                //go through each of the offers 
                async.forEachSeries(offerredTeams, function(offerredTeam, callback) {
                    try{
                              
                    			var offerCount = 0;
                    			if (typeof(offerredTeam.offer.allocatedNumOfCustomers) == 'undefined'){
                    				offerredTeam.offer.allocatedNumOfCustomers = 0;
                    			}
                    			
                    			if (typeof(offerredTeam.offer.numberOfResources) == 'undefined'){
                    				offerredTeam.offer.numberOfResources = 0;
                    			}
                   				offerCount = offerredTeam.offer.numberOfResources + offerredTeam.offer.allocatedNumOfCustomers;
                   				console.log('Offer count -- ' + offerCount + ' &&& allocated customers -- ' + offerredTeam.offer.allocatedNumOfCustomers);
                   				console.log('Number of resources --- ' + offerredTeam.offer.numberOfResources);
                   				
					        	//clear the offer details
					            var offerBuyerPortfolio = offerredTeam.offer.buyerPortfolio;
					            offerredTeam.offer.price=0;
					            offerredTeam.offer.cld=0;
					            offerredTeam.offer.cla=0;
					            offerredTeam.offer.allocatedNumOfCustomers = 0;
					            offerredTeam.offer.status = '';
					 
					            for (var iBuyerPortfolio = 0; iBuyerPortfolio <  offerBuyerPortfolio.length; iBuyerPortfolio++){
					                offerBuyerPortfolio[iBuyerPortfolio].cld=0;
					                offerBuyerPortfolio[iBuyerPortfolio].cla=0;
					                offerBuyerPortfolio[iBuyerPortfolio].numberOfOrganisation=0;
					                offerBuyerPortfolio[iBuyerPortfolio].allocatedNumOfCustomers=0;
					            } // for (var iBuyerPortfolio; iBuyerPortfolio <  offerBuyerPortfolio.length; iBuyerPortfolio++){
                              
                              // get the market name
                              var businessName = offerredTeam.offer.marketBusinessName;
                             /* console.log('offerredTeam.offer.offerScore --> ' + offerredTeam.offer.offerScore);
                              console.log ('businessName ::: ' + businessName + ' offerredTeam.name ' +offerredTeam.name ) ;
                              console.log('customerAllocation[businessName].CustomerDetails.minOfferScore ::::: ' + customerAllocation[businessName].CustomerDetails.minOfferScore);*/
                              // check for the customer's minimum offer score. exit if less
                              if (offerredTeam.offer.offerScore > customerAllocation[businessName].CustomerDetails.minOfferScore ) {
                                 
                                    //get the market/ Customer buyer portfolio. this is for getting the market available organizations
                                    var marketBuyerPortfolio = customerAllocation[businessName].CustomerDetails.buyerPortfolio;
                                    
                                    //store the buyer rating from and to in local variables
                                    var offerRatingFrom = offerredTeam.offer.buyerRatingFrom ;
                                    var offerRatingTo= offerredTeam.offer.buyerRatingTo ;
                                    
//                                    console.log('offercount -- ' + offerCount);
                                    //for each of the resouces to be allocated run a loop
                                    for (var iResourceCounter = 0; iResourceCounter < offerCount; iResourceCounter++){
                                    	console.log('iResourceCounter -- ' + iResourceCounter);
                                        // find the buyer rating using random allocation within the offers buyer rating band
                                        var offerBuyerRating = getOfferRating( offerRatingFrom , offerRatingTo);
                                        //console.log('marketBuyerPortfolio PPPPPPPPP' + JSON.stringify(marketBuyerPortfolio));
                                        // loop through the customer buyer portfolios and find the mathing buyer portfolio
                                        for (var iBuyerPortfolio = 0; iBuyerPortfolio <  marketBuyerPortfolio.length; iBuyerPortfolio++){
                                        	//console.log('offerBuyerRating ==? ' + offerBuyerRating + ' marketBuyerPortfolio[iBuyerPortfolio].rating >>> ' + marketBuyerPortfolio[iBuyerPortfolio].rating);    
                                            if (Number(offerBuyerRating) === Number(marketBuyerPortfolio[iBuyerPortfolio].rating) ) {
                                                //console.log('--Matched-');
                                                //see if there is enough to allocate
                                               
                                               if (!marketBuyerPortfolio[iBuyerPortfolio].hasOwnProperty("allocatedNumberOfOrganisation")) {
                                                   marketBuyerPortfolio[iBuyerPortfolio]['allocatedNumberOfOrganisation']=0;
                                               } //if (marketBuyerPortfolio[iBuyerPortfolio].hasOwnProperty("allocatedNumberOfOrganisation")) {
                                               //console.log("Buyer rating ::: " + offerBuyerRating );
                                               //console.log("marketBuyerPortfolio[iBuyerPortfolio].numberOfOrganisation " + marketBuyerPortfolio[iBuyerPortfolio].numberOfOrganisation);
                                               //console.log("marketBuyerPortfolio[iBuyerPortfolio]['allocatedNumberOfOrganisation'] " + marketBuyerPortfolio[iBuyerPortfolio]['allocatedNumberOfOrganisation']);
                                               if ((marketBuyerPortfolio[iBuyerPortfolio].numberOfOrganisation - marketBuyerPortfolio[iBuyerPortfolio]['allocatedNumberOfOrganisation']) >= 1){
                                                   
                                                   
                                                   //get the offer buyer portfolio
                                                   for (var iOfferBuyerIndex = 0; iOfferBuyerIndex <  offerBuyerPortfolio.length; iOfferBuyerIndex++){
                                                       if ( marketBuyerPortfolio[iBuyerPortfolio].rating === offerBuyerPortfolio[iOfferBuyerIndex].rating) {
                                                    	   //console.log('Acceped this customer - Changing the status');
                                                            offerredTeam.offer.status = 'Accepted';
                                                            
                                                            // update market/ customer with the allocation
                                                            marketBuyerPortfolio[iBuyerPortfolio]['allocatedNumberOfOrganisation'] = marketBuyerPortfolio[iBuyerPortfolio]['allocatedNumberOfOrganisation'] + 1;
                                                            
                                                            // get risk acceptance
                                                            var riskAcceptance = getRiskAcceptanceRate(marketBuyerPortfolio[iBuyerPortfolio].country, marketBuyerPortfolio[iBuyerPortfolio].industry, offerBuyerRating, offerredTeam.riskStrategy, toBeCalculatedRound)/100;
                                                            //console.log ('risk acceptnace ::: ' + riskAcceptance);
                                                            //console.log('offerBuyerPortfolio[iOfferBuyerIndex].cla ::: ' + offerBuyerPortfolio[iOfferBuyerIndex].cla );
                                                                                                               
                                                            offerBuyerPortfolio[iOfferBuyerIndex].cla = offerBuyerPortfolio[iOfferBuyerIndex].cla + (marketBuyerPortfolio[iBuyerPortfolio].cla/ marketBuyerPortfolio[iBuyerPortfolio].numberOfOrganisation);
                                                            offerBuyerPortfolio[iOfferBuyerIndex].cld = offerBuyerPortfolio[iOfferBuyerIndex].cld +  marketBuyerPortfolio[iBuyerPortfolio].cla * riskAcceptance / marketBuyerPortfolio[iBuyerPortfolio].numberOfOrganisation;
                                                            
                                                            offerredTeam.offer.price = offerredTeam.offer.price + (marketBuyerPortfolio[iBuyerPortfolio].cla/ marketBuyerPortfolio[iBuyerPortfolio].numberOfOrganisation);;
                                                            offerredTeam.offer.cla = offerredTeam.offer.cla + (marketBuyerPortfolio[iBuyerPortfolio].cla/ marketBuyerPortfolio[iBuyerPortfolio].numberOfOrganisation);;
                                                            offerredTeam.offer.cld = offerredTeam.offer.cld +  marketBuyerPortfolio[iBuyerPortfolio].cla * riskAcceptance / marketBuyerPortfolio[iBuyerPortfolio].numberOfOrganisation;
                                                            
                                                            offerredTeam.offer.allocatedNumOfCustomers = offerredTeam.offer.allocatedNumOfCustomers + 1; 
                                                            // adjust the number of organizations in the offer file
                                                            offerBuyerPortfolio[iOfferBuyerIndex].numberOfOrganisation = offerBuyerPortfolio[iOfferBuyerIndex].numberOfOrganisation + 1 ;
                                                            offerBuyerPortfolio[iOfferBuyerIndex].allocatedNumOfCustomers = offerBuyerPortfolio[iOfferBuyerIndex].allocatedNumOfCustomers + 1 ;
                                                            
                                                            //console.log(marketBuyerPortfolio[iBuyerPortfolio].cla + " / " + marketBuyerPortfolio[iBuyerPortfolio].numberOfOrganisation + ' = ' + offerBuyerPortfolio[iOfferBuyerIndex].cla);
                                                            //console.log ('offerredTeam.offer.cla :::' + offerredTeam.offer.cla);
                                                            //console.log ('offerredTeam.offer.cld :::' + offerredTeam.offer.cld);
                                                            
                                                       } //if ( marketBuyerPortfolio[iBuyerPortfolio].rating == offerBuyerPortfolio[iOfferBuyerIndex].rating) {
                                                   } //for (var iOfferBuyerIndex; iOfferBuyerIndex <  offerBuyerPortfolio.length; iOfferBuyerIndex++){
                                                   
                                               } //if (marketBuyerPortfolio[iBuyerPortfolio].numberOfOrganisation - marketBuyerPortfolio[iBuyerPortfolio]['allocatedNumberOfOrganisation'] >= 1){                       
                                                
                                            } //if (offerBuyerRating == marketBuyerPortfolio[iBuyerPortfolio].rating ) {
                                            
                                        } //for (var iBuyerPortfolio; iBuyerPortfolio <  marketBuyerPortfolio.length; iBuyerPortfolio++){
                                        
                                    } //for (var iResourceCounter = 0; iResourceCounter < offerredTeam.offer.numberOfResources; iResourceCounter++){

                              } //} else {//if (offerredTeam.offer.offerScore > customerAllocation[businessName].minOfferScore ) {
                                  
                              // persist the offer details
                              
                              //console.log('offerredTeam._id === ' + offerredTeam.offer._id);
                              offerredTeam.offer.price = offerredTeam.offer.price * offerredTeam.offer.premiumPercentage / 100 ;
                              
                                Teams.update({
                                    "offer._id": offerredTeam.offer._id
                                    }, {
                                    $set: {
                                        "offer.$.status": offerredTeam.offer.status,
                                        "offer.$.price": offerredTeam.offer.price,
                                        "offer.$.cla" : offerredTeam.offer.cla,
						                "offer.$.cld" : offerredTeam.offer.cld,
						                "offer.$.allocatedNumOfCustomers" : offerredTeam.offer.allocatedNumOfCustomers,
                                        "offer.$.buyerPortfolio": offerBuyerPortfolio,
                                        "offer.$.totalOfferCount": offerCount
                                    }
                                    }, function(err) {
                                    if (err != null) return callback(err)
                                    console.log ('offer saved for team ' + offerredTeam.name + ' with status of ' + offerredTeam.offer.status + ' and price ' + offerredTeam.offer.price );
                                    callback(null, "Saved offerBuyerPortfolios");
                                });                               
                              
                          } //try{
                          catch (err) {
              console.log("Error while iterating through offers for teams --> " + err)
              callback(err);
        } //catch (err) {
                     } , function(err) { //function(team, callback) {
                        if (err) {
                            return callback(err);
                        }
                        callback(null);
                    }
                ); //async.forEachSeries(offerredTeams,
            });   //query.exec(function (err, offerredTeams) {
//            callback(null);
	  }

	  /*step2: function (callback) {
		  
		  var allCustomerKeys = [];

		  try {
		    for (var key in customerAllocation) {
		      if (customerAllocation.hasOwnProperty(key) && customerAllocation[key].CustomerDetails.marketType != 'Individual') {
		    	allCustomerKeys.push(key);
		      }
		    }
		  } catch (err) {
		    console.log("Error occured in retrieving customer allocation details for agreements-->" + err);
		    return callback(err);
		  }
		  
//		  var query = findAllTeamsWithAcceptedOffer();
		  // get all the offers across customers and sort by offer score
		  // team details for offer, 
		  // organisation detail for offer

		  async.forEachSeries(allCustomerKeys, function(customerName, callback) {
		  		 var customerDetails = customerAllocation[customerName];
		  		 console.log('Customer Name -- ' + customerName);
		  		 var query = findOfferedTeams(customerName, toBeCalculatedRound);
//				 query.sort({'offer.offerScore': -1});
				 query.exec(function (err, offerredTeams) {
					  console.log(' RESULTSET ----  ' + JSON.stringify(offerredTeams));
					 async.forEachSeries(offerredTeams,
							    function(team, callback) {
						  try{
							  var offerArr = team.offer;
							  async.forEachSeries(offerArr, function(offer, callback){
								  //for each offer, find out min and max buyer rating and team's local sales size
								  //iterate for 'local sales size' number of times and do the allocation per iteration
								  // for each iteration, run random funtion with min and max buyer rating and get the resultant buyer rating and use the same to find the
								  // buyer portfolio to allocate from.
								  // If =Resultant buyer rating is between 0 to 10, then buyerportfolio 1,
								  // 11-20, then buyerpotfolio 2,
								  // if buyerportfolio of customer is not found in offer, then go to next iteration 
								  
								  if(offer.round == toBeCalculatedRound && offer.marketBusinessName == customerName){
											  var currOfferId = offer._id;
											  console.log('Offer score for offer --> ' + offer.marketBusinessName + ' - is - ' + offer.offerScore);
											  var roundLevelInformations = team.roundLevelInformation;
											  var numberOfBenefits = 1; 
											  var buyerRatingFrom = offer.buyerRatingFrom;
											  var buyerRatingTo = offer.buyerRatingTo;
											  var businessName = offer.marketBusinessName;
											  var riskStrategies = team.riskStrategy;
											  offer.price = 0;
											  for(var i = 0; i < roundLevelInformations.length; i ++) {
													 if(roundLevelInformations[i].round == toBeCalculatedRound){
														 var departments = roundLevelInformations[i].department;
														 for (var j = 0; j < departments.length; j++) {
															 if (departments[j].name == 'Local Sales') {
																 numberOfBenefits = departments[j].numberOfBenefits;
																 break;
															 }
														 }
														 break;
													 }
											  }
											  
											  var offerBuyerPortfoliosToBePersisted = offer.buyerPortfolio;
											  for (var i = 0 ; i < offerBuyerPortfoliosToBePersisted.length; i++){
												  offerBuyerPortfoliosToBePersisted[i].allocatedNumOfCustomers = 0;
												  offerBuyerPortfoliosToBePersisted[i].cla = 0;
												  offerBuyerPortfoliosToBePersisted[i].cld = 0;
												  offerBuyerPortfoliosToBePersisted[i].numberOfOrganisation = 0;
											  }
											  var needsUpdate = false;
//											  console.log(' offer.numberOfResources = ' + offer.numberOfResources);
												
											  for (var resourceIndex = 0; resourceIndex < offer.numberOfResources; resourceIndex++){
												
												  var resultantBuyerRating = buyerRatingFrom + (buyerRatingTo - buyerRatingFrom) * Math.random();
												  var buyerRatingBandToBeConsidered = 0;
												  if (resultantBuyerRating >= 0 && resultantBuyerRating <=10 ) {
														buyerRatingBandToBeConsidered = 5;
													} else if (resultantBuyerRating > 10 && resultantBuyerRating <=20 ) {
														buyerRatingBandToBeConsidered = 15;
													} else if (resultantBuyerRating > 20 && resultantBuyerRating <=30 ) {
														buyerRatingBandToBeConsidered = 25;
													} else if (resultantBuyerRating > 30 && resultantBuyerRating <=40 ) {
														buyerRatingBandToBeConsidered = 35;
													} else if (resultantBuyerRating > 40 && resultantBuyerRating <=50 ) {
														buyerRatingBandToBeConsidered = 45;
													} else if (resultantBuyerRating > 50 && resultantBuyerRating <=60 ) {
														buyerRatingBandToBeConsidered = 55;
													} else if (resultantBuyerRating > 60 && resultantBuyerRating <=70 ) {
														buyerRatingBandToBeConsidered = 65;
													} else if (resultantBuyerRating > 70 && resultantBuyerRating <=80 ) {
														buyerRatingBandToBeConsidered = 75;
													} else if (resultantBuyerRating > 80 && resultantBuyerRating <=90 ) {
														buyerRatingBandToBeConsidered = 85;
													} else if (resultantBuyerRating > 90 && resultantBuyerRating <=100 ) {
														buyerRatingBandToBeConsidered = 95;
													}  
											  
											  if (checkVariables(offer.buyerPortfolio)) {
												  
												  var offerBuyerPortfolios = offer.buyerPortfolio;
											 
                                                  for (var i = 0 ; i < offerBuyerPortfolios.length; i++){
                                                        offerBuyerPortfolios[i].allocatedNumOfCustomers = 0;
                                                        offerBuyerPortfolios[i].cla = 0;
                                                        offerBuyerPortfolios[i].cld = 0;
                                                        offerBuyerPortfolios[i].numberOfOrganisation = 0;
                                                    }                                                  
												  var winningScore = 0;
												  if (checkVariables(customerAllocation[businessName].CustomerDetails.winningScore)) {
													  winningScore = customerAllocation[businessName].CustomerDetails.winningScore;
												  }
												  if (offer.offerScore > winningScore) {
													  for(var offerBuyerPortFolioIndex = 0 ; offerBuyerPortFolioIndex < offerBuyerPortfolios.length; offerBuyerPortFolioIndex++){
//														  console.log(' buyerRatingBandToBeConsidered -- && offerBuyerPortfolios[offerBuyerPortFolioIndex].rating -- ' + buyerRatingBandToBeConsidered + ' && ' + JSON.stringify(offerBuyerPortfolios[offerBuyerPortFolioIndex]));
														  if (checkVariables(customerAllocation) && checkVariables(customerAllocation[businessName]) && offerBuyerPortfolios[offerBuyerPortFolioIndex].rating === buyerRatingBandToBeConsidered) {
								            				  var custBuyerPortfolio = customerAllocation[businessName].CustomerDetails.buyerPortfolio;
								            				  var customerDetails = customerAllocation[businessName];
								            				  for (var i = 0 ; i < custBuyerPortfolio.length; i ++) {
								            					  if (custBuyerPortfolio[i].country == offerBuyerPortfolios[offerBuyerPortFolioIndex].country && custBuyerPortfolio[i].industry == offerBuyerPortfolios[offerBuyerPortFolioIndex].industry && custBuyerPortfolio[i].rating === buyerRatingBandToBeConsidered) {
								            						  if (!custBuyerPortfolio[i].hasOwnProperty("allocatedNumberOfOrganisation")) {
								            							  custBuyerPortfolio[i]['allocatedNumberOfOrganisation'] = 0;
								            						  } 
								            						  var numberOfOrganisation = custBuyerPortfolio[i].numberOfOrganisation - custBuyerPortfolio[i].allocatedNumberOfOrganisation;
								            			  			  if(customerDetails.CustomerDetails.marketType != 'Local Market Portfolio') {
								            			  				  numberOfOrganisation = 1;
								            			  			  }
//								            			  			  console.log('numberOfOrganisation = ' + numberOfOrganisation + ' && numberOfBenefits = ' + numberOfBenefits);
								            						  if(numberOfOrganisation > 0 && numberOfBenefits > 0) {
								            							  needsUpdate = true;
								            							  offerBuyerPortfolios[offerBuyerPortFolioIndex].offerStatus = 'Accepted';
																		  offer.status = 'Accepted';
																		  var allocatedNumOfCustomers = 0;
																		  if (numberOfBenefits >= numberOfOrganisation) {
																			  allocatedNumOfCustomers =  numberOfOrganisation;
																		  } else {
																			  numberOfOrganisation = numberOfOrganisation - numberOfBenefits;
																			  allocatedNumOfCustomers = numberOfBenefits;
																		  }
																		  custBuyerPortfolio[i].allocatedNumberOfOrganisation = custBuyerPortfolio[i].allocatedNumberOfOrganisation + allocatedNumOfCustomers;
																		  console.log('custBuyerPortfolio[i].cla ' + custBuyerPortfolio[i].cla);
																		  console.log('custBuyerPortfolio[i].cld ' + custBuyerPortfolio[i].cld);
																		  console.log('allocatedNumOfCustomers ' + allocatedNumOfCustomers);
																		  console.log('custBuyerPortfolio[i].numberOfOrganisation ' + custBuyerPortfolio[i].numberOfOrganisation);
																		  var riskAcceptance = getRiskAcceptanceRate(offerBuyerPortfolios[offerBuyerPortFolioIndex].country, offerBuyerPortfolios[offerBuyerPortFolioIndex].industry, offerBuyerPortfolios[offerBuyerPortFolioIndex].rating, riskStrategies, toBeCalculatedRound);
																		  offerBuyerPortfolios[offerBuyerPortFolioIndex].cla = offerBuyerPortfolios[offerBuyerPortFolioIndex].cla + (allocatedNumOfCustomers * custBuyerPortfolio[i].cla) / custBuyerPortfolio[i].numberOfOrganisation;
																		  offerBuyerPortfolios[offerBuyerPortFolioIndex].cld = offerBuyerPortfolios[offerBuyerPortFolioIndex].cld + (allocatedNumOfCustomers * custBuyerPortfolio[i].cla * (riskAcceptance/100)) / custBuyerPortfolio[i].numberOfOrganisation;
																		  offerBuyerPortfolios[offerBuyerPortFolioIndex].numberOfOrganisation = offerBuyerPortfolios[offerBuyerPortFolioIndex].numberOfOrganisation + custBuyerPortfolio[i].numberOfOrganisation;
																		  offerBuyerPortfolios[offerBuyerPortFolioIndex].allocatedNumOfCustomers = offerBuyerPortfolios[offerBuyerPortFolioIndex].allocatedNumOfCustomers + allocatedNumOfCustomers;
//																		  console.log('Allocated number of cusstomers = ' + allocatedNumOfCustomers);
																		  if(!checkVariables(offer.price)) {
																			  offer.price = 0;
																		  }
																		  offer.price = (offerBuyerPortfolios[offerBuyerPortFolioIndex].cla * offer.premiumPercentage/100);
//																		  offerBuyerPortfoliosToBePersisted.push(offerBuyerPortfolios[offerBuyerPortFolioIndex]);
																		  console.log('customer - ' + businessName + ' Allocated for team - ' + team.name);
																	  } else {
																		  numberOfOrganisation = 0;
																	  }
								            					  }
								            				  }
								            				  
														  }								  
													  }
												  }
												  
												  
											  }
										  }
//										  console.log('offerBuyerPortfoliosToBePersisted -- ' + JSON.stringify(offerBuyerPortfoliosToBePersisted));
										  if(needsUpdate){
											  Teams.update({
									                "offer._id": currOfferId
									              }, {
									                $set: {
									                  "offer.$.status": 'Accepted',
									                  "offer.$.price": offer.price,
									                  "offer.$.cla" : 1,
									                  "offer.$.cld" : 1,
									                  "offer.$.buyerPortfolio": offerBuyerPortfolios
									                }
									              }, function(err) {
									                if (err != null) return callback(err)
									                console.log("Saved offerBuyerPortfolios for team " + team.name + " for customer --> " + businessName);
									                callback(null, "Saved offerBuyerPortfolios");
									          });								  
										  } else {
											  callback(null);								  
										  }
										  
								  } else {
									  callback(null);
								  }
								  
			
							  }, function(err) {
								  if (err) {
									  return callback(err);
								  }
								  callback(null);
				  			 });
						  } catch (err) {
						        console.log("Error while iterating through offers for teams --> " + err)
						        callback(err);
						  }
					  }, function(err) {
						  if (err) {
							  return callback(err);
						  }
						  callback(null);
					  
					});
				 });
		  }, function(err) {
			  if (err) {
				  return callback(err);
			  }
			  callback(null);
		  
		  });
	  }*/
  },
  //End of async series, handle results
  function(err, res) {
	  if (err != undefined && err != null) {
		  Error.captureStackTrace(err);
		  console.log('Error while calculating offer score == ' + err.stack);
      }
      else {
    	  callback(null, customerAllocation);
      }
    }
  ); // End of async
  
	  
}

function getOfferRating(From, To) {
    var adjRating = 95
    
    var rating = From + (To - From ) * Math.random();
    
    if (rating >= 0 && rating <=10 ) {
        adjRating = 5;
    } else if (rating > 10 && rating <=20 ) {
        adjRating = 15;
    } else if (rating > 20 && rating <=30 ) {
        adjRating = 25;
    } else if (rating > 30 && rating <=40 ) {
        adjRating = 35;
    } else if (rating > 40 && rating <=50 ) {
        adjRating = 45;
    } else if (rating > 50 && rating <=60 ) {
        adjRating = 55;
    } else if (rating > 60 && rating <=70 ) {
        adjRating = 65;
    } else if (rating > 70 && rating <=80 ) {
        adjRating = 75;
    } else if (rating > 80 && rating <=90 ) {
        adjRating = 85;
    } else if (rating > 90 && rating <=100 ) {
        adjRating = 95;
    }      
    
    return adjRating;
}

function handleError(res, err) {
	  return res.send(500, err);
}

function findOfferedTeams(businessName, round) {
	  var query = Teams.aggregate([{
	        $project: {
	        	name: 1,
	            riskStrategy : 1,
	            offer: 1
	        }
	    }, 
	        {$unwind: '$offer'
	    },{
	        $match: {"offer.round":Number(round), "offer.marketType":'Local Market Portfolio'}
	    },
	    {$sort : {'offer.offerScore' :-1}
	    }]);
	  return query;
}
