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
	console.log('Reached team controller addOffer !!! - marketBusinessName ' + marketBusinessName);
	console.log('Reached team controller addOffer !!! - round ' + round);
	console.log('Reached team controller addOffer !!! - price ' + price);
	console.log('Reached team controller addOffer !!! - teamId ' + teamId);
	
	Team.findById(teamId, function (err, team) {
		team.offer.push({
			round: round,
		    marketBusinessName: marketBusinessName,
		    price: price		    
		});
		team.save(function(err){
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
