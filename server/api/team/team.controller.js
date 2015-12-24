'use strict';

var Team = require('./team.model');
var Projects = require('../projects/projects.model');
var Departments = require('../departments/departments.model');
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
	  console.log("Logged in Team id - " + teamId);
	  console.log("Company screen - " + projectId);
	  Team.findById(teamId, function (err, team) {
		  Projects.findById(projectId, function(err, project){
			  console.log("team projects length --x " + team.roundLevelInformation.project.length);
			  var projectArray = team.roundLevelInformation.project;
			  projectArray.push(projectId);
			  team.roundLevelInformation.project = projectArray;
			  var teamCapital = team.capital;
			  team.roundLevelInformation.capital = teamCapital - project.amount;
			  team.capital = team.roundLevelInformation.capital;
			  team.save(function(err){
				  if (err) return validationError(res, err);
			      res.send(200);
			  });  
		  });
		  
		  
	  });
	};
	
exports.teamDepartment = function(req, res, next){
	var teamId = req.user._id;
	var departmentId = req.params.id;
	console.log('logged in team ya - ' + teamId);
	console.log('Department size -- ya - ' + departmentId);
	Team.findById(teamId, function (err, team) {
		Departments.findOne({'size._id' : departmentId}, {'size.$' : 1}, function(err, sizeUnit){
			Departments.findById(sizeUnit._id, function(err, depart){
				console.log("depart -- " + depart.name);
				console.log("sizeUnit -- " + sizeUnit.size[0].unit);
				console.log("sizeCost -- " + sizeUnit.size[0].cost);
				team.roundLevelInformation.department.push({name: depart.name, sizeUnit: sizeUnit.size[0].unit, cost: sizeUnit.size[0].cost});
				team.save(function(err){
					  if (err) return validationError(res, err);
				      res.send(200);
				  });  
			});		
		
		 }); 		
	});
	
	/*teamId = req.user._id;
	var departmentId = req.params.id;
	Team.findById(teamId, function (err, team1) {
		Departments.findOne({'size._id' : departmentId}, {'size.$' : 1}, function(err, depart){
//			console.log('departments array -- ' + team.roundLevelInformation.department);
			var departmentsArray = team1.roundLevelInformation.department;
			console.log('teamId --- ' + teamId);
			console.log('team.roundLevelInformation.department --- ' + team1.roundLevelInformation.department);
			console.log('departmentsArray --- ' + departmentsArray);
			for (var i=0; i < departmentsArray.length ; i++) {
				var obj = departmentsArray[i];
				console.log('obj 00 0000 000 --- ' + obj);
				if (obj) {
					
				}
			}
			console.log('Queried department unit -- ' + depart);
		});
	});*/
	
	
}

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
  console.log('exports.me userId '+userId);
  Team.findOne({
    "members._id": userId
  }, '-salt -hashedPassword', function(err, team) { // don't ever give out the password or salt
     console.log('exports.me team '+JSON.stringify(team));
    if (err) return next(err);
    if (!team) return res.json(401);
    res.json(team);
  });
};


/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
