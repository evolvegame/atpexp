'use strict';

var _this = this;
var Round = require('./round.model');
var Teams = require('../team/team.model');
var Customers = require('../customer/customer.model');
var Projects = require('../projects/projects.model');
var Departments = require('../departments/departments.model');
var async = require('async');

function queryAllTeams() {
  var query = Teams.find({
    role: 'user',
  });
  return query;
}

function checkVariables(input) {
  if (input != null && input != 'undefined') return true;
  else return false;
}

exports.populateValues = function(currentRound, callback) {
  try{
    var query = queryAllTeams();
    var allProjects;
    var allTeams;
    async.waterfall([

      function(callback){
        async.parallel([
          function(callback){
            try{
              Projects.find().exec(function(err,projects){
                if(err) return callback(err);
                callback(null,projects);
              });
            }
            catch(err){
              if(err) return callback(err);
            }
          },

          function(callback){
            query.exec(function(err,teams){
              if(err) return callback(err)
              callback(null,teams);
            });
          },
        ],
        function(err,results){
          if(err) return callback(err);
          allProjects=results[0];
          allTeams=results[1];
          console.log(allProjects);
          callback(null,results[1]);
        }
        )
      },

      function(teams,callback){
        async.forEachSeries(teams,
          function(team,callback){

            var capital= team.capital;
            var premium=0;
            var claims=0;
            var claimsRatio=0;
            var profit=0;
            var grossIncome=0;
            var investment=0;
            var experienceScore=0;
            var salesforceSize=0;
            var underwriterDepartmentSize=0;
            var iTMaintenance=0;
            var marketingBudget=0;
            var facilities=0;
            var totalExpense=0;

            async.parallel([
              function(callback){
                try{
                  var customers = team.customer;
                  console.log("Extracting premiums from agreements for team -->" +team.name);
                  customers.forEach(function(customer){
                    if(checkVariables(customer.agreement.premium) &&
                          checkVariables(customer.agreement.status) &&
                              customer.agreement.status == 'Active'){
                      var agreementPremium = customer.agreement.premium;
                      premium = premium + agreementPremium;
                    }
                  });
                  console.log("Completed extraction of premiums for "+team.name+". Premium value -->"+premium);
                  callback(null);
                }catch(err){
                  if(err) return callback(err);
                }
              }
              // claims to be done here
              , function(callback){
                    console.log("I am here");
                    var allRoundInfo = team.roundLevelInformation;
                    async.forEachSeries(allRoundInfo,
                      function(roundInfo, callback){
                        console.log("I am here 1");
                        if(checkVariables(roundInfo) && checkVariables(roundInfo.round)
                              && roundInfo.round == currentRound){
                                console.log("I am here 2");
                                 if(checkVariables(roundInfo.project)){
                                   console.log("I am here 3");
                                   var projects = roundInfo.project;
                                   projects.forEach(function(project){
                                     projectId = project._id;
                                     console.log(projectId);
                                   });
                                   callback(null);
                                 }else {
                                   console.log("I am here 4");
                                   callback(null)};
                              }
                          else {
                            console.log("I am here 5");
                            callback(null)
                          };
                      },
                      function(err){
                        if(err) return callback(err);
                        console.log("Returning");
                        callback(null);
                      });
                  }
            ],function(err,results){
              if(err) return callback(err);
              callback(null);
            }
            );
          },
          function(err){
            if(err) return callback(err);
            callback(null,teams);
          })
      }

    ],
    function(err){
      if(err) return callback(err);
      callback(null);
    });
  }catch(err){
    if(err)return callback(err);
  }
}
