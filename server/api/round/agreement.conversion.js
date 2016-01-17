'use strict';
var Round = require('./round.model');
var Teams = require('../team/team.model');
var Customers = require('../customer/customer.model');
var async = require('async');

var _expScorePoint = 1000;
var _selfInsured = "_SelfInsured";

// to check whether a value is null or undefined
function checkVariables(input) {
  if (input != null && input != 'undefined') return true;
  else return false;
}

function findActiveTeam(key) {
  var query = Teams.findOne({
    role: 'user',
    customer: {
      $elemMatch: {
        'businessName': key,
        'agreement.status': 'Active'
      }
    }
  });
  return query;
}

function findActiveCustomerTeams(key) {
  var query = Teams.find({
    role: 'user',
    customer: {
      $elemMatch: {
        'businessName': key,
        'agreement.status': 'Active'
      }
    }
  });
  return query;
}


function initializeAgreement(newPremium, newPremiumPct) {

  var agreement = {};
  agreement['premium'] = newPremium;
  agreement['premiumPercentage'] = newPremiumPct;
  agreement['riskStrategyId'] = 1;
  agreement['status'] = "Active";
  return agreement;
}

exports.agreementConversion = function(input, callback) {
  // Declare function variables;
  var customerAllocation = input['customerAllocation'];
  var toBeCalculatedRound = input['toBeCalculatedRound'];
  var allCustomerKeys = [];


  console.log("Welcome to convert offers to agreements--");
  // Get all the teams which has offer allocation including self insured.
  try {
    for (var key in customerAllocation) {
      if (customerAllocation.hasOwnProperty(key)) {
        allCustomerKeys.push(key);
      }
    }
  } catch (err) {
    console.log("Error occured in retrieving customer allocation details for agreements-->" + err);
    return callback(err);
  }

  console.log("Convert the won offers having each team");

  async.forEachSeries(allCustomerKeys,
    function(customerKey, callback) {

      try {
        var _customerValues = customerAllocation[customerKey];
        var teamName = _customerValues.allocatedTo;
        console.log('Team allocated for customer - ' + customerKey + ' is ---' + teamName);
        var _customerDetails = _customerValues.CustomerDetails;
        var previousWonTeam;
        var activeAgrementTeam;
        var newData = false;

        async.waterfall([

          function(callback) {
            var query = findActiveCustomerTeams(customerKey);
            query.exec(function(err, team) {
              if (err) return callback(err);
              if (checkVariables(team) && team.length > 1) return callback(new Error("Customer: " + customerKey + " is active in more than 1 team"));
              callback(null);
            });
          },
          function(callback) {
            console.log("Fetching Active Teams for the customer -->" + customerKey);
            var query = findActiveTeam(customerKey);
            query.exec(function(err, team) {
              if (err) return callback(err);
              callback(null, team);
            });
          },
          function(team, callback) {
            if (checkVariables(team)) {
              console.log("Team is -- " + team.name);
              var customers = team.customer;
              console.log(customers.length);
              async.forEachSeries(customers,
                function(customer, callback) {
                  var customerId;
                  console.log(customer.businessName);
                  console.log(customer.agreement.status);
                  if (checkVariables(customer.businessName) && customer.businessName == customerKey &&
                    checkVariables(customer.agreement.status) && customer.agreement.status == 'Active') {
                    console.log("customerId in step 1=="+customer._id);
                    customerId = customer._id;
                  }

                  if (team.name == teamName) {
                    console.log("customerId=="+customerId);
                    if (checkVariables(customerId)) {
                      console.log("Updating existing customer--" + customerKey + " for the team--" + team.name);
                      Teams.update({
                        "customer._id": customerId
                      }, {
                        $set: {
                          "customer.$.calculatedRound": toBeCalculatedRound
                        }
                      }, function(err) {
                        if (err) return callback(err)
                        callback(null);
                      });
                    } else callback(null);
                  } else {
                    if (checkVariables(customerId)) {
                      console.log('Converting active customer--' + customerKey + ' to closed for team --' + team.name);
                      Teams.update({
                        "customer._id": customerId
                      }, {
                        $set: {
                          "customer.$.lostTo": teamName,
                          "customer.$.lostIn": toBeCalculatedRound,
                          "customer.$.calculatedRound": toBeCalculatedRound,
                          "customer.$.agreement.status": "Closed"
                        }
                      }, function(err) {
                        if (err) return callback(err);
                        callback(null);
                      });
                    } else {
                      console.log("Not this active customer");
                      callback(null)
                    }
                  }
                },
                function(err) {
                  if (err) return new callback(err);
                  else {
                    if (team.name == teamName) {
                      console.log("Update agreement details for customer " + customerKey + " for team -->" + team.name);
                      callback(null, team, 1);
                    } else {
                      console.log("Changed Active to closed for existing agreements for team -->" + team.name);
                      callback(null, team, 2);
                    }
                  }
                });
            } else {
              console.log("Its a fresh team that has won the customer");
              callback(null, null, 3);
            }
          },
          function(team, stage, callback) {
            console.log("Came to next stage-->" + stage);
            if (stage > 1 && teamName != _selfInsured) {
              console.log("New team has won. Assigning new customers for team -->" + teamName);
              async.waterfall([
                function(callback) {
                  Teams.findOne({
                    role: 'user',
                    name: teamName
                  }, function(err, teamDetails) {
                    if (err) return callback(err);
                    else if (!(checkVariables(teamDetails))) return callback(new Error(" Team Details not found for customer allocation"));
                    callback(null, teamDetails);
                  });
                },
                function(newTeam, callback) {
                  try {
                    var newPremium = 0;
                    var newPremiumPct = 0;
                    var count = 0;
                    var wonFrom = "";
                    if (stage == 2) {
                      wonFrom = team.name;
                    }
                    var teamOffers = newTeam.offer;
                    teamOffers.forEach(function(offerDetails) {
                      if (checkVariables(offerDetails.round) && checkVariables(offerDetails.marketBusinessName) &&
                        offerDetails.round == toBeCalculatedRound && offerDetails.marketBusinessName == customerKey && count < 1) {
                        newPremium = offerDetails.premium;
                        newPremiumPct = offerDetails.premiumPercentage;
                      }

                    });
                    var agreementDetails = initializeAgreement(newPremium, newPremiumPct);
                    var newCustomer ={};
                    newCustomer['businessName']= customerKey,
                    newCustomer['businessRevenue']= customerAllocation[customerKey].CustomerDetails.businessRevenue,
                    newCustomer['businessCountry']= customerAllocation[customerKey].CustomerDetails.businessCountry,
                    newCustomer['businessrisk']= customerAllocation[customerKey].CustomerDetails.businessrisk,
                    newCustomer['experiencescoreneeded']= customerAllocation[customerKey].CustomerDetails.experiencescoreneeded,
                    newCustomer['buyerPortfolio']= customerAllocation[customerKey].CustomerDetails.buyerPortfolio,
                    newCustomer['wonRound']= toBeCalculatedRound,
                    newCustomer['wonFrom']= wonFrom,
                    newCustomer['lostTo']= "",
                    newCustomer['lostIn']= 0,
                    newCustomer['calculatedRound']= toBeCalculatedRound,
                    newCustomer['agreement']= agreementDetails
                    newTeam.customer.push(newCustomer);
                    newTeam.save(function(err) {
                      if (err) return callback(err);
                      callback(null, 'Saved successfully');
                    });
                  } catch (err) {
                    console.log("Error while adding customer to new team");
                    return callback(err);
                  }
                }

              ], function(err, result) {
                if (err) return callback(err);
                console.log("Added customer to new team");
                callback(null, "Added customer to new team");
              });

            } else callback(null, "Existing customer updated");
          }

        ], function(err, result) {
          if (err) return callback(err);
          console.log("Successfully agreement made for customer --" + customerKey + "for team -- " + teamName);
          callback(null, "Successfully agreement made for customer")
        });

      } catch (err) {
        console.log("Error occurred in making agreements at stage 1-->" + err);
      }



    },
    function(err) {
      if (err) return callback(err);
      callback(null, "Successfully converted all offers to agreements");
    });
}
