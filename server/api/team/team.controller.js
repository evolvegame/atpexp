'use strict';

var Team = require('./team.model');
var Projects = require('../projects/projects.model');
var Country = require('../country/country.model');
var Departments = require('../departments/departments.model');
var Round = require('../round/round.model.js');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var _ = require('lodash');
var fs =require('fs');
var async = require('async');
var mongoose = require('mongoose');
//var ObjectId = require('mongodb').ObjectId; 

var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of teams
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  Team.find({}, '-salt -hashedPassword', function (err, teams) {
    if(err) return res.send(500, err);
    res.json(200, teams);
  });
};


/**
 * Creates a new team
 */
exports.create = function (req, res, next) {
  var newTeam = new Team(req.body);
  newTeam.provider = 'local';
  newTeam.role = 'user';
  newTeam.save(function(err, team) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: team._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

/**
 * Get a single team
 */
exports.show = function (req, res, next) {
  var teamId = req.params.id;

  Team.findById(teamId, function (err, team) {
    if (err) return next(err);
    if (!team) return res.send(401);
    res.json(team.profile);
  });
};

/**
 * Deletes a team
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  Team.findByIdAndRemove(req.params.id, function(err, team) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};


/**
 * Change a users password
 */

exports.changePassword = function(req, res, next) {
  var teamId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);
  var userId = req.user.members[0]._id;
  var email = req.user.members[0].email;  
  var oldEncryptPassword={};
  var newEncryptPassword={};
  
  Team.findOne({ 'members._id' :  userId },{'members.$': 1}, function (err, team) {    
    if(team.authenticate(oldPass)) {
      oldEncryptPassword =team.encryptPassword(oldPass,0);
      //console.log('oldEncryptPassword '+oldEncryptPassword);
      //console.log('oldEncryptPassword from db '+team.members[0].hashedPassword);
      newEncryptPassword =team.encryptPassword(newPass,0);
      //console.log('newEncryptPassword '+newEncryptPassword);
      Team.update({"members._id":userId,"members.hashedPassword" :oldEncryptPassword },{$set:{"members.$.hashedPassword" : newEncryptPassword}},function(err){
      if (err) return validationError(res, err);
        res.send(200);
      });  

    } else {
      res.send(403);
    }
  });
};

/**
 * Change teamSettings
 */
exports.teamSettings = function(req, res, next) {
  var teamId = req.user._id;
  var newSlogan = String(req.body.slogan);
  Team.findById(teamId, function (err, team) {
    team.slogan = newSlogan
     team.save(function(err) {
      if (err) return validationError(res, err);
      res.send(200);
    });
    
  });
};

exports.teamCompany = function(req, res, next) {
	  var teamId = req.user._id;
	  var projectId = req.params.id;
	  var state = req.params.switchStatus;
	  Round.findOne({"currentRoundFlag":true}, function (err, round){
		  var currentRoundNumber = round.round;
		  var currentRoundLevelInformationIndex = currentRoundNumber - 1;
			  Team.findById(teamId, function (err, team) {
				  Projects.findById(projectId, function(err, project){
					  //console.log('pROJECT ----  ' + JSON.stringify(project));
					  for (var i = 0; i < team.roundLevelInformation.length; i++) {
						  if (team.roundLevelInformation[i].round == currentRoundNumber) {
							  var projectArray = team.roundLevelInformation[i].project;
							  if (state == 'true') {
								  projectArray.push(projectId);
							  } else {
								  projectArray.pull(projectId);
							  }
							  team.roundLevelInformation[i].project = projectArray;
							  //TODO: Summation of experienceScore of project should be persisted to experienceScore of roundLevelInformation
							  break;
						  }
					  }
					  
					  
					  for(var i = 0 ; i < team.notification.length ; i++) {
						  if(team.notification[i].round == currentRoundNumber) {
							  for(var j= 0 ; j < team.notification[i].contents.length; j++) {
									if (team.notification[i].contents[j].notificationHeader == 'Company') {
										team.notification[i].contents[j].status = 'true';
										team.notification[i].contents[j].displayType = 'icheckbox_minimal-grey checked';
									}
								}
							  break;
						  }
					  }
					  
					  team.save(function(err){
						  if (err) return validationError(res, err);
                            var action = "Update Projects/Investments";
                            var actionDetails = JSON.stringify(projectArray);
                            writeAudit(team,req,action,actionDetails);                          
                          
					      res.json(team.roundLevelInformation);
					  });  
				  });
		  
		  
			  });
	  
	  });
	};
	
exports.teamDepartment = function(req, res, next){
	var teamId = req.user._id;
	var departmentId = req.params.id;
//	console.log('logged in team ya - ' + teamId);
//	console.log('Department size -- ya - ' + departmentId);
	Round.findOne({"currentRoundFlag":true}, function (err, round){
		var currentRoundNumber = round.round;
		
		Team.findById(teamId, function (err, team) {
			var currentRoundLevelInfo;
			for (var i = 0; i < team.roundLevelInformation.length; i++) {
				if (team.roundLevelInformation[i].round == currentRoundNumber) {
					currentRoundLevelInfo = team.roundLevelInformation[i];
					break;
				}
			}
			
			var projects = currentRoundLevelInfo.project;
			var offers = team.offer;
			var risks = team.riskStrategy;
			
			
			Departments.findOne({'size._id' : departmentId, }, {'size.$' : 1}, function(err, sizeUnit){
				Departments.findById(sizeUnit._id, function(err, depart){
					/*console.log("depart -- " + depart.name);
					console.log("sizeUnit -- " + sizeUnit.size[0].unit);
					console.log("sizeCost -- " + sizeUnit.size[0].cost);*/
					if (depart.name == 'IT') {
						Projects.find({'type':'IT'}, function(err, projectsOfTypeIT){
							var numOfITProjects = 0;
							for (var i = 0 ; i < projects.length; i++){
								var project = projects[i];
								for (var j = 0 ; j < projectsOfTypeIT.length; j++) {
									//console.log('projectsOfTypeIT[j]._id = ' + projectsOfTypeIT[j]._id + '&& project._id = ' + JSON.stringify(project)); 
									if (projectsOfTypeIT[j]._id+"" == project) {
										numOfITProjects = numOfITProjects + 1;
									}
								}
							}
							//console.log(' Number of IT projects -- ' + numOfITProjects);
							//console.log(' sizeUnit.numberOfBenefits -- ' + JSON.stringify(sizeUnit));
							if (sizeUnit.size[0].numberOfBenefits < numOfITProjects) {
								return res.send(500, "You already have more IT projects");
							}
							
							saveDepartment(req,team, currentRoundNumber, depart, sizeUnit, res);
						});
					} else if (depart.name == 'Compliance') {
						Projects.find({'type':'Compliance'}, function(err, projectsOfTypeCompliance){
							var numOfComplianceProjects = 0;
							for (var i = 0 ; i < projects.length; i++){
								var project = projects[i];
								for (var j = 0 ; j < projectsOfTypeCompliance.length; j++) {
									if (projectsOfTypeCompliance[j]._id+"" == project) {
										numOfComplianceProjects = numOfComplianceProjects + 1;
									}
								}
							}
							if (sizeUnit.size[0].numberOfBenefits < numOfComplianceProjects) {
								return res.send(500, "You already have more Compliance projects");
							}
							
							saveDepartment(req,team, currentRoundNumber, depart, sizeUnit, res);
						});
					} else if (depart.name == 'Marketing') {
						Projects.find({'type':'Marketing'}, function(err, projectsOfTypeMarketing){
							var numOfMarketingProjects = 0;
							for (var i = 0 ; i < projects.length; i++){
								var project = projects[i];
								for (var j = 0 ; j < projectsOfTypeMarketing.length; j++) {
									if (projectsOfTypeMarketing[j]._id+"" == project) {
										numOfMarketingProjects = numOfMarketingProjects + 1;
									}
								}
							}
							if (sizeUnit.size[0].numberOfBenefits < numOfMarketingProjects) {
								return res.send(500, "You already have more Marketing projects");
							}
							
							saveDepartment(req,team, currentRoundNumber, depart, sizeUnit, res);
						});
					} else if (depart.name == 'Strategy') {
						Projects.find({'type':'Strategy'}, function(err, projectsOfTypeStrategy){
							var numOfStrategyProjects = 0;
							for (var i = 0 ; i < projects.length; i++){
								var project = projects[i];
								for (var j = 0 ; j < projectsOfTypeStrategy.length; j++) {
									if (projectsOfTypeStrategy[j]._id+"" == project) {
										numOfStrategyProjects = numOfStrategyProjects + 1;
									}
								}
							}
							if (sizeUnit.size[0].numberOfBenefits < numOfStrategyProjects) {
								return res.send(500, "You already have more Strategy projects");
							}
							
							saveDepartment(req,team, currentRoundNumber, depart, sizeUnit, res);
						});
					} else if (depart.name == 'Local Sales') {
						var numberOfLocalOffers = 0;
						for (var i = 0 ; i < offers.length; i++) {
							if (offers[i].marketType == 'Local Market Portfolio') {
								if (offers[i].numberOfResources != 'undefined'){
									numberOfLocalOffers = numberOfLocalOffers + offers[i].numberOfResources;									
								}
							}
						}
						
						if (numberOfLocalOffers > sizeUnit.size[0].numberOfBenefits) {
							return res.send(500, "You already planned usage of more local resources");
						}
						saveDepartment(req,team, currentRoundNumber, depart, sizeUnit, res);
					} else if (depart.name == 'Global Sales') {
						var numberOfGlobalOffers = 0;
						for (var i = 0 ; i < offers.length; i++) {
							if ((offers[i].marketType != 'Local Market Portfolio') && (offers[i].offerType !='Renewal') && (offers[i].round ==currentRoundNumber)) {
								numberOfGlobalOffers = numberOfGlobalOffers + 1;	
							}
						}
						
						console.log('numberOfGlobalOffers::' + numberOfGlobalOffers);
						console.log('sizeUnit.size[0].numberOfBenefits:::' + sizeUnit.size[0].numberOfBenefits);
						if (numberOfGlobalOffers > sizeUnit.size[0].numberOfBenefits) {
							return res.send(500, "You already have made more Global offers");
						}
						saveDepartment(req,team, currentRoundNumber, depart, sizeUnit, res);
					} else if (depart.name == 'Risk') {
						var numberOfRisks = 0;
						for (var i = 0 ; i < risks.length; i++) {
							if (risks[i].round == currentRoundNumber) {
								numberOfRisks = numberOfRisks + 1;	
							}
						}
						
						if (numberOfRisks > sizeUnit.size[0].numberOfBenefits) {
							return res.send(500, "You already have more Risk Strategies");
						}
						saveDepartment(req, team, currentRoundNumber, depart, sizeUnit, res);
					}
					 
				});		
			
			 }); 	
		});
	});	
}

function saveDepartment(req,team, currentRoundNumber, depart, sizeUnit, res) {
	
	for(var depIndex = 0; depIndex < team.roundLevelInformation.length; depIndex++) {
		if(team.roundLevelInformation[depIndex].round == currentRoundNumber){
			var departments = team.roundLevelInformation[depIndex].department;
			for(var i=0; i<departments.length ; i++){
				var department = departments[i];
				if (department.name == depart.name){
					departments.pull(department);
					break;
				}
			}
			team.roundLevelInformation[depIndex].department.push({name: depart.name, sizeUnit: sizeUnit.size[0].unit, cost: sizeUnit.size[0].cost, numberOfBenefits: sizeUnit.size[0].numberOfBenefits});
			break;
		}							
	}
	
	team.save(function(err){
		  if (err) return validationError(res, err);
           var action = "Update Department";
           var actionDetails = '{name:' + depart.name + ', sizeUnit: ' + sizeUnit.size[0].unit + ', cost: ' + sizeUnit.size[0].cost + ', numberOfBenefits: '+ sizeUnit.size[0].numberOfBenefits + '}' ;
           writeAudit(team,req,action,actionDetails);
	      res.json(team);
	  }); 
}

exports.addRisk = function(req, res, next) {
	var teamId = req.user._id;
	var strategyName = req.params.strategyName;
	var round = req.params.round;
	var buyerCountry = req.params.buyerCountry.split(",");
	var buyerIndustry = req.params.buyerIndustry.split(",");
	var strategyRatingBand1 = req.params.strategyRatingBand1;
	var strategyRatingBand2 = req.params.strategyRatingBand2;
	var strategyRatingBand3 = req.params.strategyRatingBand3;
	var strategyRatingBand4 = req.params.strategyRatingBand4;
	var strategyRatingBand5 = req.params.strategyRatingBand5;
	/*console.log('Reached team controller!!! - strategyName ' + strategyName);
	console.log('Reached team controller!!! - round ' + round);
	console.log('Reached team controller!!! - buyerCountry ' + buyerCountry);
	console.log('Reached team controller!!! - buyerIndustry ' + buyerIndustry);
	console.log('Reached team controller!!! - strategyRatingBand1 ' + strategyRatingBand1);
	console.log('Reached team controller!!! - strategyRatingBand2 ' + strategyRatingBand2);
	console.log('Reached team controller!!! - strategyRatingBand3 ' + strategyRatingBand3);
	console.log('Reached team controller!!! - strategyRatingBand4 ' + strategyRatingBand4);
	console.log('Reached team controller!!! - strategyRatingBand5 ' + strategyRatingBand5);
	console.log('Reached team controller!!! - teamId ' + teamId);
	*/
	Team.findById(teamId, function (err, team) {
		var strategyId;
		var foundStrategyName = false;
		for (var i = 0; i < team.riskStrategy.length; i++) {
			var existingRiskStrategy = team.riskStrategy[i];
			if (existingRiskStrategy.strategyName == strategyName) {
				strategyId = existingRiskStrategy.strategyId;
				//console.log('Found an existing strategy Id -- ' + strategyId);
				foundStrategyName = true;
				break;
			}
		}
		
		if (!foundStrategyName) {
			team.riskStrategy.sort(compare);
			if(team.riskStrategy.length > 0){
				strategyId = team.riskStrategy[team.riskStrategy.length - 1].strategyId + 1;	
			} else {
				strategyId = 1;
			}			
			//console.log('Assigning new strategy Id -- ' + strategyId);
		}
		
		team.riskStrategy.push({
			round: round,
			strategyId: strategyId,
		    strategyName: strategyName,
		    buyerCountry: buyerCountry,
		    buyerIndustry: buyerIndustry,
		    strategyRatingBand1: strategyRatingBand1,
		    strategyRatingBand2: strategyRatingBand2,
		    strategyRatingBand3: strategyRatingBand3,
		    strategyRatingBand4: strategyRatingBand4,
		    strategyRatingBand5: strategyRatingBand5
		});
		
		var notificationCurrentRound;
		for (var i = 0 ; i < team.notification.length; i++) {
			if (team.notification[i].round == round) {
				for(var j= 0 ; j < team.notification[i].contents.length; j++) {
					if (team.notification[i].contents[j].notificationHeader == 'Risk') {
						team.notification[i].contents[j].status = 'true';
						team.notification[i].contents[j].displayType = 'icheckbox_minimal-grey checked';
					}
				}
				break;
			}
		}
		
		
		team.save(function(err){
			  if (err) return validationError(res, err);
              var action = "Add new Risk Strategy";
              var actionDetails = JSON.stringify(team.riskStrategy);
              writeAudit(team,req,action,actionDetails);
		      return res.json(200, team.riskStrategy);
		});  
	});
	
};

function compare(a, b) {
	if (a.strategyId > b.strategyId) {
		return 1;
	} else if (a.strategyId < b.strategyId) {
		return -1;
	} else {
		return 0;
	}
}

exports.deleteRisk = function(req, res, next) {
	var riskStrategyId = req.params.id;
    var strategyName = req.params.strategyName;
	var teamId = req.user._id;
	Team.findById(teamId, function (err, team) {
		var riskStrategies = team.riskStrategy;
		riskStrategies.pull(riskStrategyId);
		team.save(function(err){
			  if (err) return validationError(res, err);
              var action = "Delete Risk Strategy";
              var actionDetails = "Strategy Id; "+riskStrategyId;
              writeAudit(team,req,action,actionDetails);
			  return res.json(200, riskStrategies);
		});
	});
	
	
};

exports.modifyRisk = function(req, res, next) {
	var teamId = req.user._id;
	var strategy_Id = req.params.id;
	var strategyName = req.params.strategyName;
	var round = req.params.round;
	var buyerCountry = req.params.buyerCountry.split(",");
	var buyerIndustry = req.params.buyerIndustry.split(",");
	var strategyRatingBand1 = req.params.strategyRatingBand1;
	var strategyRatingBand2 = req.params.strategyRatingBand2;
	var strategyRatingBand3 = req.params.strategyRatingBand3;
	var strategyRatingBand4 = req.params.strategyRatingBand4;
	var strategyRatingBand5 = req.params.strategyRatingBand5;

	
	
	
	Team.findById(teamId, function (err, team) {
	    var strategies = team.riskStrategy;
	    var strategyId;
	    var foundStrategyName = false;
		for (var i = 0; i < team.riskStrategy.length; i++) {
			var existingRiskStrategy = team.riskStrategy[i];
			if (existingRiskStrategy.strategyName == strategyName) {
				strategyId = existingRiskStrategy.strategyId;
				//console.log('Found an existing strategy Id -- ' + strategyId);
				foundStrategyName = true;
				break;
			}
		}
		
		if (!foundStrategyName) {
			team.riskStrategy.sort(compare);
			if(team.riskStrategy.length > 0){
				strategyId = team.riskStrategy[team.riskStrategy.length - 1].strategyId + 1;	
			} else {
				strategyId = 1;
			}			
			//console.log('Assigning new strategy Id -- ' + strategyId);
		}
	    
	    for (var i=0; i < team.riskStrategy.length; i++) {
	    	if (team.riskStrategy[i]._id == strategy_Id) {
	    		team.riskStrategy[i].strategyId = strategyId;
	    		team.riskStrategy[i].strategyName = strategyName;
	    		team.riskStrategy[i].buyerCountry = buyerCountry;
	    		team.riskStrategy[i].buyerIndustry = buyerIndustry
	    		team.riskStrategy[i].strategyRatingBand1 = strategyRatingBand1;
	    		team.riskStrategy[i].strategyRatingBand2 = strategyRatingBand2;
	    		team.riskStrategy[i].strategyRatingBand3 = strategyRatingBand3;
	    		team.riskStrategy[i].strategyRatingBand4 = strategyRatingBand4;
	    		team.riskStrategy[i].strategyRatingBand5 = strategyRatingBand5;
	    		break;
	    	}
	    }
	    
	    team.save(function(err){
			  if (err) return validationError(res, err);
              var action = "Modify Risk Strategy "+strategyName;
              var actionDetails = JSON.stringify(team.riskStrategy[i]);
              writeAudit(team,req,action,actionDetails);
		      return res.send(200, strategies);
		});
	    
	  });	
};

/**
 * Change teamAvatar
 */
 exports.changeAvatar = function(req, res, next) {
  var teamId = req.user._id;
  var file = req.files.file;
  var tmp_path=file.path;
  var newPicture =teamId+'_'+file.name;
  var target_path = '.'+config.targetUploadDir +'/'+ newPicture;  
  fs.rename(tmp_path, target_path, function(err) {
    if (err) throw err;
        // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
        fs.unlink(tmp_path, function() {
          if (err) throw err;
          Team.findById(teamId, function (err, team) {
            team.picture = newPicture
            team.save(function(err) {
              if (err) return validationError(res, err);
              res.send(200);
            });

          });
        });
      });
  
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user.members[0]._id;
//  console.log('exports.me userId '+userId);
  Team.findOne({
    "members._id": userId
  }, '-salt -hashedPassword', function(err, team) { // don't ever give out the password or salt
//     console.log('exports.me team '+JSON.stringify(team));
    if (err) return next(err);
    if (!team) return res.json(401);
    res.json(team);
  });
};


exports.globalOfferHistory = function(req, res, next) {
	var teamId = req.user._id;
	var marketBusinessName = req.params.marketBusinessName;
	var round = req.params.round;
	console.log('Reached team controller for fetching global offer history!!');

	Team.findById(teamId, function (err, team) {
		var offers = team.offer;
		var customers = team.customer;
		var pastOfferHistoryArray = [];
		var teamHasPastOffers = false;
		var teamRoundLevelInformations = team.roundLevelInformation;
		
		
		
		async.forEachSeries(offers, function(offer, callback){
			var elligibleForMoreDetails = false;
			var departments = [];
			var departmentSize;
			
			//Fetch global sales department size for offer's that round.
			teamRoundLevelInformations.forEach(function(roundLevelInfo){
				  if (roundLevelInfo.round == (offer.round)) {
					  departments = roundLevelInfo.department; 
				  }
			});
			  
			for (var i = 0; i < departments.length; i++) {
				if (departments[i].name == 'Global Sales') {
					departmentSize = departments[i].sizeUnit;
					break;
				 }
			}
			  
			if (departmentSize == 'Huge') {
				elligibleForMoreDetails = true;
			}
			
			var offerHistory = {
					elligibleForMoreDetails: elligibleForMoreDetails
			};
			
			if (offer.round != round && offer.marketBusinessName == marketBusinessName) {
				//console.log('match found for this offer in past!!');
				teamHasPastOffers = true;
				offerHistory.round = offer.round;
				offerHistory.price = offer.price;
				var offerBuyers = offer.buyerPortfolio;
				
				var offerCLD = 0;
				offerBuyers.forEach(function(buyer){
					offerCLD = offerCLD + buyer.cld;
				});
				offerHistory.cld = offerCLD;
				
				var queryAgreement = offerAgreement(marketBusinessName, offer.round);
				
				queryAgreement.exec(function(err, resultSet){
					if (err) return callback(err);
					console.log(' All teams who made offers ' + JSON.stringify(resultSet));
					if (resultSet.length == 0) {
						offerHistory.team = "Customer did not like the offer";
					}
					resultSet.forEach(function(result){
						if (result.name == team.name) {
							offerHistory.team = "You had the best offer";
							offerHistory.claimAmount = result.customer.agreement.history.claims.claimAmount;
						} else {
							if (elligibleForMoreDetails) {
								offerHistory.team = result.name;
								offerHistory.wonTeamPremium = result.customer.agreement.history.premium;
								var roundLevelInformations = result.roundLevelInformation;
								roundLevelInformations.forEach(function(roundLevelInfo){
									if (offer.round == roundLevelInfo.round) {
										offerHistory.experienceScore = roundLevelInfo.experienceScore;
									}
								});
								offerHistory.claimAmount = result.customer.agreement.history.claims.claimAmount;	
							} else {
								offerHistory.team = "Information not available";
								
								if (result.customer.agreement.history.premium > offerHistory.price) {
									offerHistory.wonTeamPremium = "Higher";
								} else if (result.customer.agreement.history.premium < offerHistory.price) {
									offerHistory.wonTeamPremium = "Lower";
								} else {
									offerHistory.wonTeamPremium = "Same";
								}
								//console.log('offerHistory.wonTeamPremium ' + offerHistory.wonTeamPremium);
								var roundLevelInformations = result.roundLevelInformation;
								roundLevelInformations.forEach(function(roundLevelInfo){
									if (offer.round == roundLevelInfo.round) {
										offerHistory.experienceScore = roundLevelInfo.experienceScore;
									}
								});
								
								var yourTeamRoundExperience = 0;
								teamRoundLevelInformations.forEach(function(roundLevelInfo){
									  if (roundLevelInfo.round == offer.round) {
										  yourTeamRoundExperience = roundLevelInfo.experienceScore; 
									  }
								});
								if (offerHistory.experienceScore > yourTeamRoundExperience){
									offerHistory.experienceScore = "Higher";
								} else if (offerHistory.experienceScore < yourTeamRoundExperience) {
									offerHistory.experienceScore = "Lower";
								} else {
									offerHistory.experienceScore = "Same";
								}
								offerHistory.claimAmount = result.customer.agreement.history.claims.claimAmount;	
							}	
						}
											 
					});
					pastOfferHistoryArray.push(offerHistory);
//					console.log(' Pushing offerHistory -- ' + JSON.stringify(pastOfferHistoryArray));
					callback(null);
				});
				
				
				
			} else {
				callback(null);
			}
			
		}, function(err) {
	         if (err) {
	        	 console.log("Error while getting global history = " + JSON.stringify(err))
	        	 return res.json(500);
	         }
//	         console.log(" Returning with list from global offers history 1 == " + JSON.stringify(pastOfferHistoryArray));
	         if (!teamHasPastOffers){
	        	 	//console.log('There are no past offers, so just checking if some one else had won this customer in the past!!')
	        	    var queryAgreement = offerAgreement(marketBusinessName, null);
	        	    var offerHistoryArray = [];
					queryAgreement.exec(function(err, resultSet){
						if (err) return callback(err);
						var offerHistory = {
			 					
			 			};
						resultSet.forEach(function(result){
							offerHistory.round = result.customer.agreement.history.round;
							offerHistory.team = result.name;
							offerHistory.wonTeamPremium = "NA";
							var roundLevelInformations = result.roundLevelInformation;
							roundLevelInformations.forEach(function(roundLevelInfo){
								if (round == roundLevelInfo.round) {
									offerHistory.experienceScore = "NA";
								}
							});
							offerHistory.claimAmount = result.customer.agreement.history.claims.claimAmount; 
							offerHistoryArray.push(offerHistory);
						});
						//console.log(" Returning with list from global offers history 2 == " + JSON.stringify(offerHistoryArray));
						return res.json(200, offerHistoryArray);
					});
					
	         } else {
	        	 return res.json(200, pastOfferHistoryArray);	 
	         }
	         
	    });
	});
	
	
	
};


function offerAgreement(marketBusinessName, roundNumber) {    
    if (roundNumber == null) {
    	var query = Team.aggregate(
        		{
        			$unwind:"$customer"
        		},{
        			$match: {"customer.businessName":marketBusinessName}
        				
        		}, {
        			$unwind:"$customer.agreement.history"
        		}
        	
        );	
    } else {
    	var query = Team.aggregate(
        		{
        			$unwind:"$customer"
        		},{
        			$match: {"customer.businessName":marketBusinessName}
        				
        		}, {
        			$unwind:"$customer.agreement.history"
        		}, {
        			$match: {
        				"customer.agreement.history.round":roundNumber
       				}
       			}
        	
        );
    }
	
    
    return query;

}

exports.makeOffer = function(req, res, next) {
	var teamId = req.user._id;
	var marketBusinessName = req.params.marketBusinessName;
	var round = req.params.round;
	var price = req.params.price;
	var cld = req.params.cld;
	var offerType = req.params.offerType;

	var buyer1Country=req.params.buyer1Country;
    var buyer1Industry=req.params.buyer1Industry;
    var buyer1Rating=req.params.buyer1Rating;
    var buyer1Cla=req.params.buyer1Cla;
    var buyer1RiskAcceptance=req.params.buyer1RiskAcceptance;

    var buyer2Country=req.params.buyer2Country;
    var buyer2Industry=req.params.buyer2Industry;
    var buyer2Rating=req.params.buyer2Rating;
    var buyer2Cla=req.params.buyer2Cla;
    var buyer2RiskAcceptance=req.params.buyer2RiskAcceptance;

    var buyer3Country=req.params.buyer3Country;
    var buyer3Industry=req.params.buyer3Industry;
    var buyer3Rating=req.params.buyer3Rating;
    var buyer3Cla=req.params.buyer3Cla;
    var buyer3RiskAcceptance=req.params.buyer3RiskAcceptance;




/*	console.log('Reached team controller makeOffer !!! - marketBusinessName ' + marketBusinessName);
	console.log('Reached team controller makeOffer !!! - round ' + round);
	console.log('Reached team controller makeOffer !!! - price ' + price);
	console.log('Reached team controller makeOffer !!! - cld ' + cld);
	console.log('Reached team controller makeOffer !!! - teamId ' + teamId);
	console.log('Reached team controller makeOffer !!! - req.params ' + JSON.stringify(req.params));
	*/
	Team.findById(teamId, function (err, team) {
		var offers = team.offer;
		var duplicateOfferFound = false;
		offers.forEach(function(existingOffer){
			if (existingOffer.round == round && existingOffer.marketBusinessName == marketBusinessName) {
				console.log('Duplicate offer found');
				duplicateOfferFound = true;
			}
		});
		if (!duplicateOfferFound) {
			
		
		team.offer.push({
			round: round,
			marketBusinessName: marketBusinessName,
			price: price,
			cld:cld,
			offerType: offerType,
			buyerPortfolio: [{
				country:buyer1Country,
				industry:buyer1Industry,
				buyerRating:buyer1Rating,
				cla:buyer1Cla,
				riskAcceptance:buyer1RiskAcceptance
			},			
			{
				country:buyer2Country,
				industry:buyer2Industry,
				buyerRating:buyer2Rating,
				cla:buyer2Cla,
				riskAcceptance:buyer2RiskAcceptance
			},
			{
				country:buyer3Country,
				industry:buyer3Industry,
				buyerRating:buyer3Rating,
				cla:buyer3Cla,
				riskAcceptance:buyer3RiskAcceptance
			}]		    
		});
		
		for(var i = 0 ; i < team.notification.length ; i++) {
			  if(team.notification[i].round == round) {
				  for(var j= 0 ; j < team.notification[i].contents.length; j++) {
						if (team.notification[i].contents[j].notificationHeader == 'Offer') {
							team.notification[i].contents[j].status = 'true';
							team.notification[i].contents[j].displayType = 'icheckbox_minimal-grey checked';
						}
					}
				  break;
			  }
		  }
		
		
		var offers = [];
		team.save(function(err){
			  if (err) return validationError(res, err);
              var action = "Make Global Offer";
              var actionDetails = '';
              writeAudit(team,req,action,actionDetails);
              
              offers = team.offer;
		      res.send(200,offers);
		});  
		
		} else {
			res.send(500,"Duplicate error");
		}
	});
	
};

exports.modifyOffer = function(req, res, next) {
	var teamId = req.user._id;
	var offerId =req.params.id;
	var marketBusinessName = req.params.marketBusinessName;
	var round = req.params.round;
	var price = req.params.price;
	var cld = req.params.cld;
	var offerType = req.params.offerType;
	
	var buyer1Country=req.params.buyer1Country;
    var buyer1Industry=req.params.buyer1Industry;
    var buyer1Rating=req.params.buyer1Rating;
    var buyer1Cla=req.params.buyer1Cla;
    var buyer1RiskAcceptance=req.params.buyer1RiskAcceptance;

    var buyer2Country=req.params.buyer2Country;
    var buyer2Industry=req.params.buyer2Industry;
    var buyer2Rating=req.params.buyer2Rating;
    var buyer2Cla=req.params.buyer2Cla;
    var buyer2RiskAcceptance=req.params.buyer2RiskAcceptance;

    var buyer3Country=req.params.buyer3Country;
    var buyer3Industry=req.params.buyer3Industry;
    var buyer3Rating=req.params.buyer3Rating;
    var buyer3Cla=req.params.buyer3Cla;
    var buyer3RiskAcceptance=req.params.buyer3RiskAcceptance;

	/*console.log('Reached team controller modifyOffer !!! - marketBusinessName ' + marketBusinessName);
	console.log('Reached team controller modifyOffer !!! - round ' + round);
	console.log('Reached team controller modifyOffer !!! - price ' + price);
	console.log('Reached team controller modifyOffer !!! - cld ' + cld);
	console.log('Reached team controller modifyOffer !!! - offerType ' + offerType);
	console.log('Reached team controller modifyOffer !!! - offerId ' + offerId);
	console.log('Reached team controller modifyOffer !!! - teamId ' + teamId);
	console.log('Reached team controller makeOffer !!! - req.params ' + JSON.stringify(req.params));*/

	Team.findById(teamId, function (err, team) {
		var offers = team.offer;
		offers.pull(offerId);
		offers.push({
			round: round,
			marketBusinessName: marketBusinessName,
			price: price,
			cld:cld,
			offerType: offerType,
			buyerPortfolio: [{
				country:buyer1Country,
				industry:buyer1Industry,
				buyerRating:buyer1Rating,
				cla:buyer1Cla,
				riskAcceptance:buyer1RiskAcceptance
			},			
			{
				country:buyer2Country,
				industry:buyer2Industry,
				buyerRating:buyer2Rating,
				cla:buyer2Cla,
				riskAcceptance:buyer2RiskAcceptance
			},
			{
				country:buyer3Country,
				industry:buyer3Industry,
				buyerRating:buyer3Rating,
				cla:buyer3Cla,
				riskAcceptance:buyer3RiskAcceptance
			}]		    
		});
		team.save(function(err){
			  if (err) return validationError(res, err);
              var action = "Modify Global Offer";
              var actionDetails = 'Offer id modified: '+offerId;
              writeAudit(team,req,action,actionDetails);
			  return res.json(200, team);
		});
	});	

	/*Team.update(
		{ _id: teamId, "offer._id": offerId },
		{ $set: { "offer.$.price" : price,"offer.$.cld" : cld ,

		buyerPortfolio: [{
				country:buyer1Country,
				industry:buyer1Industry,
				buyerRating:buyer1Rating,
				cla:buyer1Cla,
				riskAcceptance:buyer1RiskAcceptance
			},			
			{
				country:buyer2Country,
				industry:buyer2Industry,
				buyerRating:buyer2Rating,
				cla:buyer2Cla,
				riskAcceptance:buyer2RiskAcceptance
			},
			{
				country:buyer3Country,
				industry:buyer3Industry,
				buyerRating:buyer3Rating,
				cla:buyer3Cla,
				riskAcceptance:buyer3RiskAcceptance
			}]	


		 } },function(err,result){
			console.log('Inside modifyOffer :'+result);
			if (err) return validationError(res, err);

			Team.findById(teamId,function(err,team){ 
				if (err) return validationError(res, err);
				res.send(200,team);
			}
			);
		}			
		);*/

};

exports.saveOffer = function(req, res, next) {
	var teamId = req.body._id;
	var offerObj = req.body;	
//	console.log('Reached team controller saveOffer !!! - offerObj ' + JSON.stringify(offerObj));
//	console.log('Reached team controller addOffer !!! - teamId ' + teamId);

	var obj=JSON.stringify(offerObj);
	
	Team.findById(teamId, function (err, team) {
		//console.log('-->'+JSON.stringify(team));
		if (err) return validationError(res, err);
		team.offer.push(obj);
		team.save(function(err){
			  if (err) return validationError(res, err);
              var action = "Save Global Offer";
              var actionDetails = obj;
              writeAudit(team,req,action,actionDetails);
		      res.send(200,team);
		});  
	});
	
};


exports.deleteOffer = function(req, res, next) {
	var offerId = req.params.id;
	var teamId = req.user._id;
	//console.log('Reached team controller deleteOffer !!! - teamId ' + teamId);
	//console.log('Reached team controller deleteOffer !!! - offerId ' + offerId);

	//TODO needs logic to decrement offerCount of customer by 1 each time when an offer is pulled.
	Round.findOne({"currentRoundFlag":true}, function (err, round){
		var currentRoundNumber = round.round;
		Team.findById(teamId, function (err, team) {
			var offers = team.offer;
			offers.pull(offerId);
			team.save(function(err){
				  if (err) return validationError(res, err);
	              var action = "Delete Global Offer";
	              var actionDetails = 'OfferId: '+offerId;
	              writeAudit(team,req,action,actionDetails);
	              
	              var updatedOffers = team.offer;
	              var currentRoundNewGlobalOfferCount = 0;
	              for (var i = 0; i < updatedOffers.length ; i++) {
	            	  if (currentRoundNumber == updatedOffers[i].round && updatedOffers[i].marketType != 'Local Market Portfolio' && updatedOffers[i].offerType == 'New') {
	            		  currentRoundNewGlobalOfferCount = currentRoundNewGlobalOfferCount + 1;
	            	  }
	              }
				  return res.json(200, {currentRoundNewGlobalOfferCount:currentRoundNewGlobalOfferCount});
			});
		});	
	});
	
};

exports.roundLevelInformation = function(req, res, next) {
	//console.log('Getting round info for team -- ' + req.user._id);
	var roundId = req.params.id;
	var teamId = req.user._id;
	Team.findOne({'_id' : teamId, 'roundLevelInformation.round' :  roundId },{'roundLevelInformation.$': 1}, function(err, result) {
        if (err) return done(err); 
        return res.json(200, result);
      });
};

exports.allRoundLevelInformation = function(req, res, next) {
	var teamId = req.user._id;
	
	var query = Team.aggregate([
	                            { 
	                            	$match : {_id : mongoose.Types.ObjectId(teamId)}
		                         },
		                         {   
		                        	 $project : { 'roundLevelInformation' : 1}
		                         }
	            ]);
	  
	query.exec(function(err,teamRoundLevelInformation){
		  res.json(teamRoundLevelInformation);
	  });
};

exports.getAllWonCustomers = function(req, res, next) {
	var teamId = req.user._id;
	var activeCustomers = [];
	Team.find({'_id' : teamId}, function(err, result) {
        if (err) return done(err); 
        var allActiceCustomers = result[0].customer;
        for (var i = 0 ; i < allActiceCustomers.length ; i++){
        	if (allActiceCustomers[i].agreement.status == 'Active') {
        		activeCustomers.push(allActiceCustomers[i]);
        	}
        }
        return res.json(200, activeCustomers);
      });
};

exports.getAllOffersMade = function(req, res, next) {
	var roundId = req.params.id;
	var teamId = req.user._id;
	var offers = [];
	Team.find({'_id' : teamId}, function(err, result) {
        if (err) return done(err); 
        var allOffers = result[0].offer;
        for (var i = 0 ; i < allOffers.length ; i++){
        	if (allOffers[i].round == roundId) {
        		offers.push(allOffers[i]);
        	}
        }
        return res.json(200, offers);
      });
};

exports.getAllTeamRankings = function(req, res, next) {
	var previousRoundNumber = req.params.previousRoundNumber == 0 ? 1 : req.params.previousRoundNumber;

	//console.log('previousRoundNumber -- ' + previousRoundNumber);
	
	Team.find(function (err, teams) {
	   if(err) return res.send(500, err);
	   var allTeams = {};
	   
	   allTeams.map = function() {
		   emit(this, {_id: this._id, teamName: this.name, slogan:this.slogan, teamCountry: this.teamCountry, teamPicture: this.picture, roundLevelInformation: this.roundLevelInformation, members: this.members ,role: this.role});
	   }

	   
	   Team.mapReduce(allTeams, function(err, data){
		   var rankingTeams = new Array(data.length);
		   for (var i = 0; i < data.length; i ++) {
			   var roundLevelInformation;
			   for(var j = 0; j < data[i].value.roundLevelInformation.length; j++) {
				   if (data[i].value.roundLevelInformation[j].round == previousRoundNumber) {
					   roundLevelInformation = data[i].value.roundLevelInformation[j];
					   break;
				   }
			   }
			   
			   var members ='';
			   for(var j = 0; j < data[i].value.members.length; j++) {
				   if(j == 0){
					   members = members+(data[i].value.members[j].name);
				   }else{
					   members = members+','+(data[i].value.members[j].name);
				   }
			   }
			   
			   rankingTeams[i]= {
				   _id: data[i].value._id,
				   teamName: data[i].value.teamName,
				   teamCountry: data[i].value.teamCountry,
				   slogan: data[i].value.slogan,
				   teamPicture: data[i].value.teamPicture,
				   teamMembers: members,
				   capital: typeof(roundLevelInformation) == 'undefined' ? null : roundLevelInformation.capital,
				   rankingPosition: typeof(roundLevelInformation) == 'undefined' ? null : roundLevelInformation.rankingPosition,
				   experienceScore: typeof(roundLevelInformation) == 'undefined' ? null : roundLevelInformation.experienceScore,
				   experienceScoreRankingPosition: typeof(roundLevelInformation) == 'undefined' ? null : roundLevelInformation.experienceScoreRankingPosition,
				   countryLevelRankingPosition: typeof(roundLevelInformation) == 'undefined' ? null : roundLevelInformation.countryLevelRankingPosition,
				   CountryLevelExperienceScoreRankingPosition: typeof(roundLevelInformation) == 'undefined' ? null : roundLevelInformation.CountryLevelExperienceScoreRankingPosition,		   
				   role: data[i].value.role,
				   profit: typeof(roundLevelInformation) == 'undefined' ? null : roundLevelInformation.profit,
				   numberOfCustomers: typeof(roundLevelInformation) == 'undefined' ? null : roundLevelInformation.customers,
				   claims: typeof(roundLevelInformation) == 'undefined' ? null : roundLevelInformation.claims,
			   };
		   }
		   
		   return res.json(rankingTeams);
	   });
	   
	});	
	
};


exports.notificationInformation = function (req, res, next) {
	var teamId = req.user._id;
	var currentRoundNumber;
	
	Round.findOne({"currentRoundFlag":true}, function (err, round){
		currentRoundNumber = round.round;
		var currentRoundNotification;
		Team.findById(teamId, function (err, team) {
			
			for (var i = 0 ; i < team.notification.length; i++) {
				if(team.notification[i].round == currentRoundNumber) {
					currentRoundNotification = team.notification[i];
				}
			}
			
			//console.log('notificaion information --- ' + JSON.stringify(currentRoundNotification));
			res.json(currentRoundNotification);
			
		});		
		
	});
	
	
}


/**
 * Get MINIDASHBOARD INFO 
 */
 exports.miniDashboardInfo = function(req, res, next) {
 	var currentRoundNumber;
 	var capitalIcon;
 	var claimsIcon;
 	var acceptanceRateIcon; 
 	var customersIcon;
 	var experienceScoreIcon; 
 	var rankingIcon ;
 	var premiumIcon;
 	var capitalIconColor;
 	var claimsIconColor;
 	var acceptanceRateIconColor; 
 	var customersIconColor;
 	var experienceScoreIconColor; 
 	var rankingIconColor;
 	var premiumIconColor;
 	var miniDashBoardInfo;
 	var rankingPosition;
 	var experienceScore;
 	var	claims;
 	var capital;
 	var customers;
 	var premium;
 	var roundLevelInfo=[];
 	var iconArray =["fa-arrow-circle-right","fa-arrow-circle-up","fa-arrow-circle-down"];
 	var iconArrayColor =["informer-warning","informer-success","informer-danger"];
 	var teamId = req.user._id;
 	var roundNr;
 	//console.log('Reached team controller miniDashboardInfo !!! - teamId ' + teamId);	
 	
 	Round.findOne({"currentRoundFlag":true},function (err, round){
 		if (err) {
 			return handleError(res, err);
 		}
 		if (!round) {
 			return res.json(401);
 		};

 		console.log ('CURRENT ROUND IS : '+ round.round);

 		if (round.round===1 || round.round===2 ){
 		roundNr=1;
 		
 		Team.findOne({'_id' : teamId, 'roundLevelInformation.round' :  roundNr },{'roundLevelInformation.$': 1}, function(err, info) {
 				if (err) return done(err);
 				if (!info) {
 				return res.json(401);
 				};
 				//console.log('INFO '+ info);
 				roundLevelInfo = info.roundLevelInformation[0];
 				//console.log ('CURRENT ROUND IS || : '+ round.round); 
 				//console.log('roundLevelInfo'+roundLevelInfo.rankingPosition+ info.roundLevelInformation[0].rankingPosition) ;
 				//Icon Image
 				capitalIcon = iconArray[0];
 				claimsIcon = iconArray[0];
 				acceptanceRateIcon = iconArray[0];
 				customersIcon = iconArray[0];
 				experienceScoreIcon = iconArray[0]; 
 				rankingIcon =iconArray[0];
 				premiumIcon =iconArray[0];

 				//Icon color
 				capitalIconColor = iconArrayColor[0];
 				claimsIconColor = iconArrayColor[0];
 				acceptanceRateIconColor = iconArrayColor[0];
 				customersIconColor = iconArrayColor[0];
 				experienceScoreIconColor = iconArrayColor[0]; 
 				rankingIconColor =iconArrayColor[0];
 				premiumIconColor =iconArrayColor[0];

 				rankingPosition = roundLevelInfo.rankingPosition;
 				experienceScore = roundLevelInfo.experienceScore;
 				claims = roundLevelInfo.claims;
 				capital = roundLevelInfo.capital;
 				customers = roundLevelInfo.customers;
 				premium = roundLevelInfo.premium;

 				miniDashBoardInfo={
 					capitalIcon:capitalIcon,
 					claimsIcon:claimsIcon,
 					acceptanceRateIcon:acceptanceRateIcon,
 					customersIcon:customersIcon,
 					experienceScoreIcon:experienceScoreIcon,
 					rankingIcon:rankingIcon,
 					premiumIcon:premiumIcon,
 					capitalIconColor:capitalIconColor,
 					claimsIconColor:claimsIconColor,
 					acceptanceRateIconColor:acceptanceRateIconColor,
 					customersIconColor:customersIconColor,
 					experienceScoreIconColor:experienceScoreIconColor,
 					rankingIconColor:rankingIconColor,
 					premiumIconColor:premiumIconColor,
 					rankingPosition :rankingPosition,
 					experienceScore:experienceScore,
 					claims:claims,
 					capital:capital,
 					customers:customers,
 					premium:premium
 				};

 				return res.json(miniDashBoardInfo);
 			});


	}else if (round.round>2){
	Team.findOne({'_id' : teamId, 'roundLevelInformation.round' :  round.round-1 },{'roundLevelInformation.$': 1}, function(err, currentRoundLevelInfo) {
		if (err) return done(err);
		if (!currentRoundLevelInfo) {
 			return res.json(401);
 		};

		Team.findOne({'_id' : teamId, 'roundLevelInformation.round' :  round.round-2 },{'roundLevelInformation.$': 1}, function(err, previousRoundLevelInfo) {
			if (err) return done(err);
			if (!previousRoundLevelInfo) {
 				return res.json(401);
 				};
			currentRoundLevelInfo = currentRoundLevelInfo.roundLevelInformation[0];
			previousRoundLevelInfo = previousRoundLevelInfo.roundLevelInformation[0];
			
			
 	 //logic capitalIcon
 	 if (currentRoundLevelInfo.capital> previousRoundLevelInfo.capital){
 	 	capitalIcon=iconArray[1];
 	 	capitalIconColor=iconArrayColor[1];
 	 }
 	 else if (currentRoundLevelInfo.capital< previousRoundLevelInfo.capital) {
 	 	capitalIcon=iconArray[2];
 	 	capitalIconColor=iconArrayColor[2];
 	 } else{
 	 	capitalIcon=iconArray[0];
 	 	capitalIconColor=iconArrayColor[0];
 	 }

      //logic claimsIcon
      if (currentRoundLevelInfo.claims> previousRoundLevelInfo.claims){
      	claimsIcon=iconArray[1];
      	claimsIconColor=iconArrayColor[2];
      }
      else if (currentRoundLevelInfo.claims< previousRoundLevelInfo.claims){
      	claimsIcon=iconArray[2];
      	claimsIconColor=iconArrayColor[1];
      }
      else{
      	claimsIcon=iconArray[0];
      	claimsIconColor=iconArrayColor[0];
      }

      //logic premiumIcon
      if (currentRoundLevelInfo.premium> previousRoundLevelInfo.premium){
      	premiumIcon=iconArray[1];
      	premiumIconColor=iconArrayColor[1];      	
      }
      else if (currentRoundLevelInfo.premium< previousRoundLevelInfo.premium){
      	premiumIcon=iconArray[2];
      	premiumIconColor=iconArrayColor[2];    
      }
      else{
      	premiumIcon=iconArray[0];
      	premiumIconColor=iconArrayColor[0];    
      }

      //logic customersIcon
      if (currentRoundLevelInfo.customers> previousRoundLevelInfo.customers){
      	customersIcon=iconArray[1];
      	customersIconColor=iconArrayColor[1];
      }
      else if (currentRoundLevelInfo.customers< previousRoundLevelInfo.customers){
      	customersIcon=iconArray[2];
      	customersIconColor=iconArrayColor[2];
      }
      else{
      	customersIcon=iconArray[0];
      	customersIconColor=iconArrayColor[0];
      }

       //logic experienceScoreIcon
       if (currentRoundLevelInfo.experienceScore> previousRoundLevelInfo.experienceScore){
       	experienceScoreIcon=iconArray[1];
       	experienceScoreIconColor=iconArrayColor[1];
       }
       else  if (currentRoundLevelInfo.experienceScore< previousRoundLevelInfo.experienceScore){
       	experienceScoreIcon=iconArray[2];
       	experienceScoreIconColor=iconArrayColor[2];
       }
       else{
       	experienceScoreIcon=iconArray[0];
       	experienceScoreIconColor=iconArrayColor[0];
       }

      //logic rankingPosition
      if (currentRoundLevelInfo.rankingPosition> previousRoundLevelInfo.rankingPosition){
      	rankingIcon=iconArray[2];
      	rankingIconColor=iconArrayColor[2];
      }
      else  if (currentRoundLevelInfo.rankingPosition< previousRoundLevelInfo.rankingPosition){
      	rankingIcon=iconArray[1];
      	rankingIconColor=iconArrayColor[1];
      }
      else{
      	rankingIcon=iconArray[0];
      	rankingIconColor=iconArrayColor[0];
      }	

      rankingPosition = currentRoundLevelInfo.rankingPosition;
      experienceScore = currentRoundLevelInfo.experienceScore;
      claims = currentRoundLevelInfo.claims;
      capital = currentRoundLevelInfo.capital;
      customers = currentRoundLevelInfo.customers;
      premium = currentRoundLevelInfo.premium;

      miniDashBoardInfo={
      	capitalIcon:capitalIcon,
      	claimsIcon:claimsIcon,
      	acceptanceRateIcon:acceptanceRateIcon,
      	customersIcon:customersIcon,
      	experienceScoreIcon:experienceScoreIcon,
      	rankingIcon:rankingIcon,
      	premiumIcon:premiumIcon,
      	capitalIconColor:capitalIconColor,
      	claimsIconColor:claimsIconColor,
      	acceptanceRateIconColor:acceptanceRateIconColor,
      	customersIconColor:customersIconColor,
      	experienceScoreIconColor:experienceScoreIconColor,
      	rankingIconColor:rankingIconColor,
      	premiumIconColor:premiumIconColor,
      	rankingPosition :rankingPosition,
      	experienceScore:experienceScore,
      	claims:claims,
      	capital:capital,
      	customers:customers,
      	premium:premium
      };

      return res.json(miniDashBoardInfo);		
  });		

});

}

});  


};

/**
 * Change a users password
 */

exports.resetPassword = function(req, res, next) {

	var teamId =req.params.id;
	var memberId = req.params.memberId;
	var password = req.params.password;
	var newEncryptPassword={};
	
	
  Team.findOne({ 'members._id' :  memberId },{'members.$': 1}, function (err, team) {   
     if (err) return validationError(res, err);
     newEncryptPassword =team.encryptPassword(password,0);
      //console.log('newEncryptPassword '+newEncryptPassword);
      Team.update({"members._id":memberId },{$set:{"members.$.hashedPassword" : newEncryptPassword}},function(err){
      if (err) return validationError(res, err);
        res.send(200);
      });  

  
  });
};




/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};

var writeAudit=exports.writeAudit= function(team,req,action,actionDetails){
var userId = req.user.members[0].name;
var userEmailId = req.user.members[0].email;
var currentRoundNumber=0;
var time= new Date();

//console.log(userId + ' action ' + action);

Round.findOne({"currentRoundFlag":true}, function (err, round){
		   currentRoundNumber= round.round;
           team.audit.push({userId : userId,
                 userEmailId : userEmailId,
                 action : action,
                 actionDetails : actionDetails,
                 round : currentRoundNumber,
                 time : time});
           team.save(function(err,team) {
           if (err) console.log('Error while auditing '+action);
           });
     if (err) console.log('Error while auditing '+action);
});
};

exports.loggedInFlag=function(req, res, next){
  var teamId = req.user._id;
  var userId = req.user.members[0]._id;
  var logInOrOut = req.params.flag;
  console.log('UserId'+userId);
  console.log('teamId'+teamId);
  Team.update({"members._id": userId},{$set:{"members.$.isLoggedIn" : logInOrOut}},function(err){
  if (err) console.log('Error in updating isLoggedin');
  console.log('Done Updating');
  res.json(userId);
  });
}

exports.getTeamActions = function(req, res, next) {
  var teamId = req.user._id;
  
  // get the current round 
  Round.findOne({"currentRoundFlag":true}, function (err, round){
          var currentRoundNumber = round.round;
        
        //for the current round, get the actions list
        var query = Team.aggregate([
                        { 
                            $match : {_id : teamId}
                        
                        },
                        {   $project : { audit : 1}
                        },
                        {   $unwind : '$audit'
                        },
                        {   $match : {'audit.round' : Number(currentRoundNumber)}
                        },
                        {   $sort : {'audit.time' : -1}
                        }                
                    ]);
        query.exec(function (err, auditLog) {
            if (err) {
                res.send(200);
            } else {
                res.send(auditLog);
				
            }            
        });    
          
  });
};

exports.getTeamMembers = function(req, res, next) {
  var teamId = req.user._id;
  var query = Team.aggregate([
            { 
                $match : {_id : teamId}
            
            },
            {   $project : { 'members.name' : 1,'members.email' :1,'members.isLoggedIn' :1}
            },
            {   $unwind : '$members'
            }
        ]
        );
  query.exec(function (err, memberList) {
     res.send(memberList);
  });
  
};  
  
  
exports.getTeamMessages = function(req, res, next) {
  var teamId = req.user._id;
  
  Team.find([{_id : ObjectId(teamId) }, { message : 1 }], function(err, team ){
  var message = team.message ;
      res.send(message);  
  });
};

exports.getCurrentRoundStrategyBand = function(req, res, next) {
	  var teamId = req.user._id;
	  var round = req.body.round;
/*	  var industry = req.body.industry;
	  var country = req.body.country;*/

	  var query = Team.aggregate([
	                              { 
	                                  $match : {_id : mongoose.Types.ObjectId(teamId)}
	                              },
	                              {   $project : { 'riskStrategy' : 1}
	                              },
	                              {   $unwind : '$riskStrategy'
	                              },
	                              {   $match : {'riskStrategy.round' : round}
	                              },
	                              {    $project : { 
	                                              'riskStrategy.strategyId' : 1,
	                                              'riskStrategy.strategyName' : 1,
	                                              'riskStrategy.buyerIndustry' : 1,
	                                              'riskStrategy.buyerCountry' : 1,
	                                              'riskStrategy.strategyRatingBand1' : 1,
	                                              'riskStrategy.strategyRatingBand2' : 1,
	                                              'riskStrategy.strategyRatingBand3' : 1,
	                                              'riskStrategy.strategyRatingBand4' : 1,
	                                              'riskStrategy.strategyRatingBand5' : 1,
	                                  }                        
	                              }]);
	  
	  query.exec(function(err,strategies){
		  res.json(strategies);
	  });
};


exports.getCurrentRoundGlobalSalesDepartmentInfo = function(req, res, next) {
	 var teamId = req.user._id;
	 var round = req.body.round;
	 console.log('Arrived to fetch global sale department info ' + teamId + ' && ' + round);
	 var query = Team.aggregate([
	                         { 
	                             $match : {_id : mongoose.Types.ObjectId(teamId)}
	                         },
	                         {   $project : { 'roundLevelInformation' : 1}
	                         },
	                         {   $unwind : '$roundLevelInformation'
	                         },
	                         {   $match : {'roundLevelInformation.round' : round}
	                         },
	                         {   $project : {'roundLevelInformation.department' : 1}
	                         },
	                         {    $unwind : '$roundLevelInformation.department'
	                         },
	                         {    $match : {'roundLevelInformation.department.name' : 'Global Sales' }
	                         }   
	 ]);
	 
	 query.exec(function(err,departments){
		  res.json(departments);
	 });
};

exports.getCurrentRoundNewGlobalOffers = function(req, res, next) {
	var teamId = req.user._id;
	var round = req.body.round;
	
	 console.log('Arrived to fetch global sale department info ' + teamId + ' && ' + round);
	 var query = Team.aggregate([
	                         { 
	                             $match : {_id : mongoose.Types.ObjectId(teamId)}
	                         },
	                         {   
	                        	 $project : { 'offer' : 1}
	                         },
	                         {   
	                        	 $unwind : '$offer'
	                         },
	                         {   
	                        	 $match : {$and:[{'offer.round' : Number(round)},{'offer.marketType':{$ne:'Local Market Portfolio'}},{'offer.offerType':'New'}]}
	                         },
	                         {   
	                        	 $group : {"_id" : null, "count":{"$sum":1}}
	                         }
	 ]);
	 
	 query.exec(function(err,offerCount){
		 console.log('Offers count??// ' + JSON.stringify(offerCount)); 
		 res.json(offerCount);
	 });
};


exports.getCurrentRoundRiskStrategies = function(req, res, next) {
	var teamId = req.user.id;
	var round = req.body.round;
	var query = Team.aggregate([
	                            { 
	                            	$match : {_id : mongoose.Types.ObjectId(teamId)}
		                         },
		                         {   
		                        	 $project : { 'riskStrategy' : 1}
		                         },
		                         {   
		                        	 $unwind : '$riskStrategy'
		                         },{
		                        	 $match :{'riskStrategy.round' : round}
		                         }
 
	                            ]);
	 query.exec(function(err,riskStrategies){
//		 console.log('riskStrategies >>  ' + JSON.stringify(riskStrategies)); 
		 res.json(riskStrategies);
	 });
}

exports.addToRiskStrategy = function (req, res, next) {
	var teamId = req.user.id;
	var round = req.body.round;
	var strategyId = req.body.strategyId;
	var countryISOCode = req.body.countryISOCode;
	var industry = req.body.industry;
	console.log('Reached addToRiskStrategy' + JSON.stringify(req.body));
	var country;
	var countryNameQuery = Country.aggregate ([
							            {       $match:{isoNumericalCode: countryISOCode}
							            },
							            {       $project : { country : 1}
							            }
							]);
	countryNameQuery.exec(function(err, countryResult){
		if (err) {
			console.log(' error ' + JSON.stringify(err));
		}
		console.log(' error country' + JSON.stringify(countryResult));
		country = countryResult[0].country;
		var checkForCountryAndIndustry = Team.aggregate ([
	            {       
	            	$match:{_id: mongoose.Types.ObjectId(teamId) }
	            },
	            {       
	            	$project : { riskStrategy : 1}
	            },
	            {
	                $unwind:"$riskStrategy"
	            },{
	                $match:{"riskStrategy.round":Number(round),
	                    "riskStrategy.buyerCountry":country,
	                    "riskStrategy.buyerIndustry":industry
	                }
	            }
			]);

			checkForCountryAndIndustry.exec(function(err, existingStrategies){
			console.log(' existingStrategies.length == ' + JSON.stringify(existingStrategies));
			if (typeof(existingStrategies) != 'undefined' && existingStrategies.length > 0) {
				return res.json(500, "Strategy already exists, please refresh screen.");
			}
			
			var addToStrategyQuery = Team.update(
				    { "riskStrategy._id" :  mongoose.Types.ObjectId(strategyId)},
				    { $addToSet : {  'riskStrategy.$.buyerCountry':country,
				         "riskStrategy.$.buyerIndustry":industry} 
				    }
				);
			addToStrategyQuery.exec(function(err, result){
			console.log('err & result :::: ' + JSON.stringify(err) + ' && ' + JSON.stringify(result));
				if(err) {
				res.json(500, "Error while adding to strategy!");
			}else {
				res.json(result);	
			}
			
			});
			
			});
	});
//	console.log('What is tcountyu ' + JSON.stringify(country));
	
	
	
};

exports.removeFromRiskStrategy = function (req, res, next) {
	var teamId = req.user.id;
	var round = req.body.round;
	var strategyId = req.body.strategyId;
	var countryISOCode = req.body.countryISOCode;
	var industry = req.body.industry;
	console.log('Reached addToRiskStrategy' + JSON.stringify(req.body));
	var country;
	var countryNameQuery = Country.aggregate ([
							            {       $match:{isoNumericalCode: countryISOCode}
							            },
							            {       $project : { country : 1}
							            }
							]);
	countryNameQuery.exec(function(err, countryResult){
		if (err) {
			console.log(' error ' + JSON.stringify(err));
		}
		console.log(' error country' + JSON.stringify(countryResult));
		country = countryResult[0].country;
/*		var checkForCountryAndIndustry = Team.aggregate ([
	            {       
	            	$match:{_id: mongoose.Types.ObjectId(teamId) }
	            },
	            {       
	            	$project : { riskStrategy : 1}
	            },
	            {
	                $unwind:"$riskStrategy"
	            },{
	                $match:{"riskStrategy.round":Number(round),
	                    "riskStrategy.buyerCountry":country,
	                    "riskStrategy.buyerIndustry":industry
	                }
	            }
			]);*/

//			checkForCountryAndIndustry.exec(function(err, existingStrategies){
			/*console.log(' existingStrategies.length == ' + JSON.stringify(existingStrategies));
			if (typeof(existingStrategies) != 'undefined' && existingStrategies.length > 0) {
				return res.json(500, "Strategy already exists, please refresh screen.");
			}*/
			
			var removeFromStrategyQuery = Team.update(
				    { "riskStrategy._id" :  mongoose.Types.ObjectId(strategyId)},
				    { $pull : {  'riskStrategy.$.buyerCountry':country,
				         "riskStrategy.$.buyerIndustry":industry} 
				    }
				);
			removeFromStrategyQuery.exec(function(err, result){
			console.log('err & result :::: ' + JSON.stringify(err) + ' && ' + JSON.stringify(result));
				if(err) {
				res.json(500, "Error while removing from strategy!");
			}else {
				res.json(result);	
			}
			
			});
			
//			});
	});
//	console.log('What is tcountyu ' + JSON.stringify(country));
	
	
	
};