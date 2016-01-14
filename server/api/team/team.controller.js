'use strict';

var Team = require('./team.model');
var Projects = require('../projects/projects.model');
var Departments = require('../departments/departments.model');
var Round = require('../round/round.model.js');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var _ = require('lodash');
var fs =require('fs');

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
  console.log(req.user);
  console.log('oldPass '+oldPass); 
  console.log('newPass '+newPass);
  console.log('teamId '+teamId);
  console.log('email '+ email);
  
  Team.findOne({ 'members._id' :  userId },{'members.$': 1}, function (err, team) {    
    if(team.authenticate(oldPass)) {
      oldEncryptPassword =team.encryptPassword(oldPass,0);
      console.log('oldEncryptPassword '+oldEncryptPassword);
      console.log('oldEncryptPassword from db '+team.members[0].hashedPassword);
      newEncryptPassword =team.encryptPassword(newPass,0);
      console.log('newEncryptPassword '+newEncryptPassword);
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
	  console.log("Logged project id - " + projectId);
	  console.log("Company screen - " + state);
//	  console.log("params -- " + req.params);
	  Round.findOne({"currentRoundFlag":true}, function (err, round){
		  var currentRoundNumber = round.round;
		  var currentRoundLevelInformationIndex = currentRoundNumber - 1;
		  console.log('currentRoundLevelInformationIndex --- ' + round);
			  Team.findById(teamId, function (err, team) {
				  Projects.findById(projectId, function(err, project){
					  console.log("team projects length --x " + team.roundLevelInformation[currentRoundLevelInformationIndex].project.length);
					  console.log("Project in server api - > " + project);
					  var projectArray = team.roundLevelInformation[currentRoundLevelInformationIndex].project;
					  if (state == 'true') {
						  console.log('About to push the project from team');
						  projectArray.push(projectId);
					  } else {
						  console.log('About to pull the project from team');
						  projectArray.pull(projectId);
					  }
					  team.roundLevelInformation[currentRoundLevelInformationIndex].project = projectArray;
					  var teamCapital = team.capital;
					  if(state == 'true'){
						  team.roundLevelInformation[currentRoundLevelInformationIndex].capital = teamCapital - project.amount;
					  } else {
						  team.roundLevelInformation[currentRoundLevelInformationIndex].capital = teamCapital + project.amount;
					  }
					  
					  team.capital = team.roundLevelInformation[currentRoundLevelInformationIndex].capital;
					  team.save(function(err){
						  if (err) return validationError(res, err);
					      res.json(team);
					  });  
				  });
		  
		  
			  });
	  
	  });
	};
	
exports.teamDepartment = function(req, res, next){
	var teamId = req.user._id;
	var departmentId = req.params.id;
	console.log('logged in team ya - ' + teamId);
	console.log('Department size -- ya - ' + departmentId);
	Round.findOne({"currentRoundFlag":true}, function (err, round){
		 var currentRoundNumber = round.round;
		 var currentRoundLevelInformationIndex = currentRoundNumber - 1;
		Team.findById(teamId, function (err, team) {
			Departments.findOne({'size._id' : departmentId}, {'size.$' : 1}, function(err, sizeUnit){
				Departments.findById(sizeUnit._id, function(err, depart){
					console.log("depart -- " + depart.name);
					console.log("sizeUnit -- " + sizeUnit.size[0].unit);
					console.log("sizeCost -- " + sizeUnit.size[0].cost);
					var departments = team.roundLevelInformation[currentRoundLevelInformationIndex].department;
					for(var i=0; i<departments.length ; i++){
						var department = departments[i];
						if (department.name == depart.name){
							departments.pull(department);
							break;
						}
					}
					team.roundLevelInformation[currentRoundLevelInformationIndex].department.push({name: depart.name, sizeUnit: sizeUnit.size[0].unit, cost: sizeUnit.size[0].cost});
					team.save(function(err){
						  if (err) return validationError(res, err);
					      res.json(team);
					  });  
				});		
			
			 }); 	
		});
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
	console.log('Reached team controller!!! - strategyName ' + strategyName);
	console.log('Reached team controller!!! - round ' + round);
	console.log('Reached team controller!!! - buyerCountry ' + buyerCountry);
	console.log('Reached team controller!!! - buyerIndustry ' + buyerIndustry);
	console.log('Reached team controller!!! - strategyRatingBand1 ' + strategyRatingBand1);
	console.log('Reached team controller!!! - strategyRatingBand2 ' + strategyRatingBand2);
	console.log('Reached team controller!!! - strategyRatingBand3 ' + strategyRatingBand3);
	console.log('Reached team controller!!! - strategyRatingBand4 ' + strategyRatingBand4);
	console.log('Reached team controller!!! - strategyRatingBand5 ' + strategyRatingBand5);
	console.log('Reached team controller!!! - teamId ' + teamId);
	
	Team.findById(teamId, function (err, team) {
		var strategyId;
		var foundStrategyName = false;
		for (var i = 0; i < team.riskStrategy.length; i++) {
			var existingRiskStrategy = team.riskStrategy[i];
			if (existingRiskStrategy.strategyName == strategyName) {
				strategyId = existingRiskStrategy.strategyId;
				console.log('Found an existing strategy Id -- ' + strategyId);
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
			console.log('Assigning new strategy Id -- ' + strategyId);
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
		team.save(function(err){
			  if (err) return validationError(res, err);
		      return res.send(200, team.riskStrategy);
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
	var teamId = req.user._id;
	Team.findById(teamId, function (err, team) {
		var riskStrategies = team.riskStrategy;
		riskStrategies.pull(riskStrategyId);
		team.save(function(err){
			  if (err) return validationError(res, err);
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
				console.log('Found an existing strategy Id -- ' + strategyId);
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
			console.log('Assigning new strategy Id -- ' + strategyId);
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

exports.addOffer = function(req, res, next) {
	var teamId = req.user._id;
	var marketBusinessName = req.params.marketBusinessName;
	var round = req.params.round;
	var price = req.params.price;
	var cld = req.params.cld;
	console.log('Reached team controller addOffer !!! - marketBusinessName ' + marketBusinessName);
	console.log('Reached team controller addOffer !!! - round ' + round);
	console.log('Reached team controller addOffer !!! - price ' + price);
	console.log('Reached team controller addOffer !!! - cld ' + cld);
	console.log('Reached team controller addOffer !!! - teamId ' + teamId);
	
	Team.findById(teamId, function (err, team) {
		team.offer.push({
			round: round,
		    marketBusinessName: marketBusinessName,
		    price: price,
		    cld:cld		    
		});
		team.save(function(err){
			  if (err) return validationError(res, err);
		      res.send(200,team);
		});  
	});
	
};

exports.modifyOffer = function(req, res, next) {
	var teamId = req.user._id;
	var offerId =req.params.id;
	var marketBusinessName = req.params.marketBusinessName;
	var round = req.params.round;
	var price = req.params.price;
	var cld = req.params.cld;
	console.log('Reached team controller modifyOffer !!! - marketBusinessName ' + marketBusinessName);
	console.log('Reached team controller modifyOffer !!! - round ' + round);
	console.log('Reached team controller modifyOffer !!! - price ' + price);
	console.log('Reached team controller addOffer !!! - cld ' + cld);
	console.log('Reached team controller modifyOffer !!! - offerId ' + offerId);
	console.log('Reached team controller addOffer !!! - teamId ' + teamId);

	Team.update(
		{ _id: teamId, "offer._id": offerId },
		{ $set: { "offer.$.price" : price,"offer.$.cld" : cld  } },function(err,result){
			console.log('Inside modifyOffer :'+result);
			if (err) return validationError(res, err);

			Team.findById(teamId,function(err,team){ 
				if (err) return validationError(res, err);
				res.send(200,team);
			}
			);
		}			
		);

};


exports.deleteOffer = function(req, res, next) {
	var offerId = req.params.id;
	var teamId = req.user._id;
	console.log('Reached team controller deleteOffer !!! - teamId ' + teamId);
	console.log('Reached team controller deleteOffer !!! - offerId ' + offerId);

	Team.findById(teamId, function (err, team) {
		var offers = team.offer;
		offers.pull(offerId);
		team.save(function(err){
			  if (err) return validationError(res, err);
			  return res.json(200, team);
		});
	});	
	
};

exports.roundLevelInformation = function(req, res, next) {
	var roundId = req.params.id;
	var teamId = req.user._id;
	console.log('Reached team controller roundLevelInformation !!! - teamId ' + teamId);
	console.log('Reached team controller roundLevelInformation !!! - roundId ' + roundId);
	Team.findOne({'_id' : teamId, 'roundLevelInformation.round' :  roundId },{'roundLevelInformation.$': 1}, function(err, result) {
        if (err) return done(err); 
        console.log('result:'+JSON.stringify(result));
        return res.json(200, result);
      });
	
	
};

exports.getAllTeamRankings = function(req, res, next) {
	var previousRoundNumber = req.params.previousRoundNumber;
	var index;
	
	if(previousRoundNumber == 0){
		index = 0;
	} else {
		index = previousRoundNumber - 1;
	}
	
	Team.find(function (err, teams) {
	   if(err) return res.send(500, err);
	   var allTeams = {};
	   
	   allTeams.map = function() {
		   emit(this, {_id: this._id, teamName: this.name, teamCountry: this.teamCountry, roundLevelInformation: this.roundLevelInformation});
	   }
	   
	   Team.mapReduce(allTeams, function(err, data){
		   var rankingTeams = new Array(data.length);
		   for (var i = 0; i < data.length; i ++) {
			   rankingTeams[i]= {
				   _id: data[i].value._id,
				   teamName: data[i].value.teamName,
				   teamCountry: data[i].value.teamCountry,
				   capital: data[i].value.roundLevelInformation.length > index ? data[i].value.roundLevelInformation[index].capital : null,
				   rankingPosition: data[i].value.roundLevelInformation.length > index ? data[i].value.roundLevelInformation[index].rankingPosition : null,
				   experienceScore: data[i].value.roundLevelInformation.length > index ? data[i].value.roundLevelInformation[index].experienceScore : null,
				   experienceScoreRankingPosition: data[i].value.roundLevelInformation.length > index ? data[i].value.roundLevelInformation[index].experienceScoreRankingPosition : null,
				   countryLevelRankingPosition: data[i].value.roundLevelInformation.length > index ? data[i].value.roundLevelInformation[index].countryLevelRankingPosition : null,
				   CountryLevelExperienceScoreRankingPosition: data[i].value.roundLevelInformation.length > index ? data[i].value.roundLevelInformation[index].CountryLevelExperienceScoreRankingPosition : null		   
				   
			   };
		   }
		   return res.json(rankingTeams);
	   });
	   
	});	
	
};

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
 	console.log('Reached team controller miniDashboardInfo !!! - teamId ' + teamId);	
 	
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
 				console.log('INFO '+ info);
 				roundLevelInfo = info.roundLevelInformation[0];
 				console.log ('CURRENT ROUND IS || : '+ round.round); 
 				console.log('roundLevelInfo'+roundLevelInfo.rankingPosition+ info.roundLevelInformation[0].rankingPosition) ;
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
      	claimsIconColor=iconArrayColor[1];
      }
      else if (currentRoundLevelInfo.claims< previousRoundLevelInfo.claims){
      	claimsIcon=iconArray[2];
      	claimsIconColor=iconArrayColor[2];
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
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
