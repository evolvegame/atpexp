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

function findTeamsWithAcceptedOffers() {
	  var query = Teams.find({
	    role: 'user',
	    offer: {
	      $elemMatch: {
	        'status': 'Accepted'
	      }
	    }
	  });
	  return query;
}

function initializeAgreement(newPremium, newPremiumPct, toBeCalculatedRound, cla, cld, allocatedNumOfCustomers) {
//  console.log('newPremium, newPremiumPct ' + newPremium + ' && ' + newPremiumPct);
  var agreement = {};
  agreement['premium'] = newPremium;
  agreement['premiumPercentage'] = newPremiumPct;
  agreement['riskStrategyId'] = 1;
  agreement['status'] = "Active";
  agreement['allocatedNumOfCustomers'] = allocatedNumOfCustomers;

  var agreementHistory = [];
  var roundHistory = {
		  round: toBeCalculatedRound,
		  premium: agreement.premium,
	      premiumPercentage: agreement.premiumPercentage,
	      riskStrategyId: agreement.riskStrategyId, // TODO: needs to be deleted
	      claims: 0,
	      cla: cla,
	      cld: cld,
	      allocatedNumOfCustomers: allocatedNumOfCustomers
  }
  agreementHistory.push(roundHistory);
  agreement['history'] =  agreementHistory;
//  console.log('New agreement initializesd -- ' + JSON.stringify(agreement));
  return agreement;
}

exports.agreementConversion = function(input, callback) {
  // Declare function variables;
  var customerAllocation = input['customerAllocation'];
  var toBeCalculatedRound = input['toBeCalculatedRound'];
  var allCustomerKeys = [];


//  console.log("Welcome to convert offers to agreements--");
  // Get all the teams which has offer allocation including self insured.
  try {
    for (var key in customerAllocation) {
      if (customerAllocation.hasOwnProperty(key) && customerAllocation[key].CustomerDetails.marketType == 'Individual') {
        allCustomerKeys.push(key);
      }
    }
  } catch (err) {
//    console.log("Error occured in retrieving customer allocation details for agreements-->" + err);
    return callback(err);
  }

//  console.log("Convert the won offers having each team");

  async.forEachSeries(allCustomerKeys,
    function(customerKey, callback) {

      try {
        var _customerValues = customerAllocation[customerKey];
        var teamName = _customerValues.allocatedTo;
//        console.log('Team allocated for customer - ' + customerKey + ' is ---' + teamName);
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
//            console.log("Fetching Active Teams for the customer -->" + customerKey);
            var query = findActiveTeam(customerKey);
            query.exec(function(err, team) {
              if (err) return callback(err);
              callback(null, team);
            });
          },
          function(team, callback) {
            if (checkVariables(team)) {
//              console.log("Team is -- " + team.name);
              var customers = team.customer;
              async.forEachSeries(customers,
                function(customer, callback) {
                  var customerId;
                  var premium;
                  var cld;
                  var cla;
                  if (checkVariables(customer.businessName) && customer.businessName == customerKey &&
                    checkVariables(customer.agreement.status) && customer.agreement.status == 'Active') {
//                    console.log("customerId in step 1=="+customer._id);
                    customerId = customer._id;
                    var teamOffers = team.offer;
                    teamOffers.forEach(function(offer){
                    	if(offer.marketBusinessName == customer.businessName && offer.round == toBeCalculatedRound) {
                    		premium = offer.price;
                    		cla = offer.cla;
                    		cld = offer.cld;
                    	}
                    });
                  }

                  if (team.name == teamName) {
//                    console.log("customerId=="+customerId);
                    if (checkVariables(customerId)) {
//                      console.log("Updating existing customer--" + customerKey + " for the team--" + team.name);
                      var agreementHistory = customer.agreement.history;
                      var history = {
                    		  round: toBeCalculatedRound,
            			      premium: customer.agreement.premium,
            			      status: customer.agreement.status,
            			      cla: cla,
            			      cld: cld
                      }
                      agreementHistory.push(history);
                      Teams.update({
                        "customer._id": customerId
                      }, {
                        $set: {
                          "customer.$.calculatedRound": toBeCalculatedRound,
                          "customer.$.agreement.premium" : premium,
                          "customer.$.agreement.history" : agreementHistory
                        }
                      }, function(err) {
                        if (err) return callback(err)
                        callback(null);
                      });
                    } else callback(null);
                  } else {
                    if (checkVariables(customerId)) {
//                      console.log('Converting active customer--' + customerKey + ' to closed for team --' + team.name);
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
//                      console.log("Not this active customer");
                      callback(null)
                    }
                  }
                },
                function(err) {
                  if (err) return new callback(err);
                  else {
                    if (team.name == teamName) {
//                      console.log("Update agreement details for customer " + customerKey + " for team -->" + team.name);
                      callback(null, team, 1);
                    } else {
//                      console.log("Changed Active to closed for existing agreements for team -->" + team.name);
                      callback(null, team, 2);
                    }
                  }
                });
            } else {
//              console.log("Its a fresh team that has won the customer");
              callback(null, null, 3);
            }
          },
          function(team, stage, callback) {
//            console.log("Came to next stage-->" + stage);
            if (stage > 1 && teamName != _selfInsured) {
//              console.log("New team has won. Assigning new customers for team -->" + teamName);
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
                    var buyerPortfolio;
                    var cla;
                    var cld;
                    var wonFrom = "";
                    if (stage == 2) {
                      wonFrom = team.name;
                    }
                    var teamOffers = newTeam.offer;
                    teamOffers.forEach(function(offerDetails) {
                      if (checkVariables(offerDetails.round) && checkVariables(offerDetails.marketBusinessName) &&
                        offerDetails.round == toBeCalculatedRound && offerDetails.marketBusinessName == customerKey && count < 1) {
                        newPremium = offerDetails.price;
                        cla = offerDetails.cla;
                        cld = offerDetails.cld;
                        if(checkVariables(offerDetails.buyerPortfolio)){
                            buyerPortfolio = offerDetails.buyerPortfolio;
                        }
                      }
                      
                      if (checkVariables(offerDetails.round) && checkVariables(offerDetails.buyerPortfolio) &&
                        offerDetails.round == toBeCalculatedRound && offerDetails.marketBusinessName == customerKey && count < 1) {
                        newPremium = offerDetails.price;
                      }

                    });
                    var agreementDetails = initializeAgreement(newPremium, newPremiumPct, toBeCalculatedRound, cla, cld,1);
                    var newCustomer ={};
                    newCustomer['businessName']= customerKey,
                    newCustomer['businessRevenue']= customerAllocation[customerKey].CustomerDetails.businessRevenue,
                    newCustomer['businessCountry']= customerAllocation[customerKey].CustomerDetails.businessCountry,
                    newCustomer['businessrisk']= customerAllocation[customerKey].CustomerDetails.businessrisk,
                    newCustomer['experiencescoreneeded']= customerAllocation[customerKey].CustomerDetails.experiencescoreneeded,
                    newCustomer['buyerPortfolio']= buyerPortfolio,
                    newCustomer['wonRound']= toBeCalculatedRound,
                    newCustomer['wonFrom']= wonFrom,
                    newCustomer['marketType']= 'Individual',
                    newCustomer['lostTo']= "",
                    newCustomer['lostIn']= 0,
                    newCustomer['calculatedRound']= toBeCalculatedRound,
                    newCustomer['agreement']= agreementDetails
                    newTeam.customer.push(newCustomer)
//                    console.log('About to save new team ' +  JSON.stringify(newTeam.customer));
                    newTeam.save(function(err) {
                      if (err) return callback(err);
                      callback(null, 'Saved successfully');
                    });
                  } catch (err) {
//                    console.log("Error while adding customer to new team");
                    return callback(err);
                  }
                }

              ], function(err, result) {
                if (err) return callback(err);
//                console.log("Added customer to new team");
                callback(null, "Added customer to new team");
              });

            } else callback(null, "Existing customer updated");
          }

        ], function(err, result) {
          if (err) return callback(err);
//          console.log("Successfully agreement made for customer --" + customerKey + "for team -- " + teamName);
          callback(null, "Successfully agreement made for customer")
        });

      } catch (err) {
//        console.log("Error occurred in making agreements at stage 1-->" + err);
      }



    },
    function(err) {
      if (err) return callback(err);
      callback(null, "Successfully converted all offers to agreements");
    });
}

exports.agreementConversionLocalMarket = function(input, callback) {
	  // Declare function variables;
	  var customerAllocation = input['customerAllocation'];
	  var toBeCalculatedRound = input['toBeCalculatedRound'];
//	  console.log('About to start conversion of local market accepted offers in agreements!');
	  
	  async.series({
		  step1: function(callback) {
			  var query = findLocalOfferedTeams(toBeCalculatedRound); 
			  query.exec(function (err, localOfferTeams) {
				  
				  async.forEachSeries(localOfferTeams, function(localOfferTeam, callback) {
					  var offers = localOfferTeam.offer;
					  console.log('	Executing STEP1 of agreement conversion for local market -- ' + localOfferTeam.name);
					  async.forEachSeries(offers, function(offer, callback) {
						  
						  for (var i = 0 ; i < offer.buyerPortfolio.length; i++) {
		                	  offer.buyerPortfolio[i].buyerRating = offer.buyerPortfolio[i].rating; 
		                  }
//						  console.log(' -- To be calculated round ---- ' + toBeCalculatedRound);
						  if (offer.marketType == 'Local Market Portfolio' && offer.round == toBeCalculatedRound) {
		                      
//		                      console.log ('offer.marketBusinessName ::: ' + offer.marketBusinessName + ' offer.status ::: ' + offer.status);
		                      
							  if (offer.status == 'Accepted') {
								  var businessName = offer.marketBusinessName;
								  var customers = localOfferTeam.customer;
								  var customerAlreadyPresent = false;
//								  console.log('Custromers for team ' + JSON.stringify(customers));
								  async.forEachSeries(customers, function(customer, callback2){
//		                              console.log('customer.businessName  ::: ' + customer.businessName + ' == businessName ::: ' + businessName);
									  if (customer.businessName == businessName) {
										  //console.log('Customer already present!!');
										  customerAlreadyPresent = true;
										  var newPremium = 0;
										  if (checkVariables(offer.price)) {
											  newPremium = offer.price;
										  }
										  var agreementHistory = customer.agreement.history;
										  var roundHistory = {
												  round: toBeCalculatedRound,
												  premium: newPremium,
											      premiumPercentage: customer.agreement.premiumPercentage,
											      riskStrategyId: customer.agreement.riskStrategyId, // TODO: needs to be deleted
											      claims: customer.agreement.claims,
											      cla: offer.cla,
											      cld: offer.cld,
											      allocatedNumOfCustomers: offer.allocatedNumOfCustomers
										  }
										  for(var i = 0 ; i < agreementHistory.length; i++) {
											  if (agreementHistory[i].round == toBeCalculatedRound) {
												  var _id = agreementHistory[i]._id; 
												  agreementHistory.pull(_id);
												  break;
											  }
										  }
										  agreementHistory.push(roundHistory);
		                                  console.log('		customer._id ::: ' + customer._id);
		                                  console.log('		customer.businessName ::: ' + customer.businessName);
		                                  //console.log( 'agreementHistory ::: ' + JSON.stringify(agreementHistory));
										  Teams.update({
						                        "customer._id": customer._id
						                      }, {
						                        $set: {
						                          "customer.$.calculatedRound": toBeCalculatedRound,
						                          "customer.$.agreement.premium" : newPremium,
		                                          "customer.$.agreement.status" : 'Active' ,
						                          "customer.$.agreement.history" : agreementHistory,
						                          "customer.$.agreement.allocatedNumOfCustomers" : offer.allocatedNumOfCustomers,
						                          "customer.$.buyerPortfolio" : offer.buyerPortfolio
						                        }
						                      }, function(err) {
						                        if (err) return callback2(err)
						                        callback2(null);
						                      });
									  } else {
										  callback2(null);
									  }
								  },function(err) {
									  if (err) {
										  return callback(err);
									  }
									  if (!customerAlreadyPresent) {
										  var newPremium = 0;
										  console.log('Customer not present already present --- ' + businessName);
										  if(checkVariables(offer.price)) {
											  newPremium = offer.price;
										  }
										  var agreementDetails = initializeAgreement(newPremium, offer.premiumPercentage, toBeCalculatedRound, offer.cla, offer.cld, offer.allocatedNumOfCustomers);
										  for (var i = 0 ; i < offer.buyerPortfolio.length; i++) {
						                	  offer.buyerPortfolio[i].buyerRating = offer.buyerPortfolio[i].rating; 
						                  }
										  var newCustomer ={};
						                  newCustomer['businessName']= businessName,
						                  newCustomer['businessRevenue']= customerAllocation[businessName].CustomerDetails.businessRevenue,
						                  newCustomer['businessCountry']= customerAllocation[businessName].CustomerDetails.businessCountry,
						                  newCustomer['businessrisk']= customerAllocation[businessName].CustomerDetails.businessrisk,
						                  newCustomer['experiencescoreneeded']= customerAllocation[businessName].CustomerDetails.experiencescoreneeded,
						                  newCustomer['buyerPortfolio']= offer.buyerPortfolio,
						                  newCustomer['wonRound']= toBeCalculatedRound,
						                  newCustomer['marketType']= 'Local Market Portfolio',
						                  newCustomer['wonFrom']= '',
						                  newCustomer['lostTo']= "",
						                  newCustomer['lostIn']= 0,
						                  newCustomer['calculatedRound']= toBeCalculatedRound,
						                  newCustomer['agreement']= agreementDetails
						                  localOfferTeam.customer.push(newCustomer)
						                  localOfferTeam.save(function(err) {
						                      if (err) return callback(err);
						                      callback(null, 'Saved successfully');
						                  });
									  } else {
										  callback(null);
									  }
								  });
								  
								  
							  } else {
		                          
		                          //console.log('::: going to close ::: ' + offer.marketBusinessName + ' with offer status of ' + offer.status);
		                          
								  // This means offer is not accepted. 
								  // Then we need to see if there is already an active customer. 
								  //If there is active customer, close the agreement, else do nothing.
								  var businessName = offer.marketBusinessName;
								  var customers = localOfferTeam.customer;
								  async.forEachSeries(customers, function(customer, callback3) {
									  if (customer.businessName == businessName) {
										  Teams.update({
						                        "customer._id": customer._id
						                      }, {
						                        $set: {
						                          "customer.$.agreement.status" : 'Closed'
						                        }
						                      }, function(err) {
						                        if (err) return callback(err)
						                        callback3(null);
						                      });
									  } else {
										  callback3(null);
									  }
								  },function(err) {
									  if (err) {
										  return callback(err);
									  }
									  callback(null);
								  });
							  }
						  } else {
		                      //console.log('in callback.............');
		                      callback(null);}
		                  /*{
							  var businessName = offer.marketBusinessName;
							  var customers = localOfferTeam.customer;
							  async.forEachSeries(customers, function(customer, callback) {
								  if (customer.businessName == businessName) {
									  Teams.update({
					                        "customer._id": customer._id
					                      }, {
					                        $set: {
					                          "customer.$.agreement.status" : 'Closed'
					                        }
					                      }, function(err) {
					                        if (err) return callback(err)
					                        callback(null);
					                      });
								  } else {
									  callback(null);
								  }
							  },function(err) {
								  if (err) {
									  return callback(err);
								  }
								  callback(null);
							  });
						  }*/
		                  
					  },function(err) {
						  if (err) {
							  return callback(err);
						  }
						  callback(null);
					  });
					  
				  },function(err) {
					  if (err) {
						  return callback(err);
					  }
					  callback(null,"Successfully converted all Local market offers to agreements");
				  });
		          
		          //TODO:loop through all the customer agreements and whichever is not having an offer accepted and update the agreement status to 'Closed'-- DONE
		          
		          
				  
			  });
		  },
		  
		  step2: function(callback) {
			  console.log('	Executing STEP2 of agreement conversion for local market -- ');
			  var queryActiveCustomers = getQueryActiveLocalCustomers(toBeCalculatedRound);
			  queryActiveCustomers.exec(function(err,teams){
				  async.forEachSeries(teams, function(team, callback){
					 var customerBusinessName = team.customer.businessName;
					 var customerID = team.customer._id;
					 var offers = team.offer;
					 var equivalentOfferFound = false;
					 for (var i = 0 ; i < offers.length; i++) {
						 if (offers[i].round == toBeCalculatedRound && offers[i].marketBusinessName == customerBusinessName ) {
							 equivalentOfferFound = true;
						 }
					 }
					 
					 if (!equivalentOfferFound) {
						 Teams.update({
		                        "customer._id": customerID
		                      }, {
		                        $set: {
                                  "customer.$.agreement.status" : 'Closed'
		                        }
		                      }, function(err) {
		                        if (err) return callback(err)
		                        console.log('No equivalent offer found for ' + customerBusinessName + ' for team = ' + team.name + ' ... Hence closed the agreement!!!');
		                        callback(null);
		                      });
					 } else {
						 callback(null);
					 }
				  }, function(err) {
					  if (err) {
						  return callback(err);
					  }
					  callback(null,"Finishing and exiting agreement conversion of local market");
				  });
			  });
		  }
	  }, function(err, res){
		  if (err != undefined && err != null) {
			  Error.captureStackTrace(err);
			  console.log('Error while performing agreement conversion == ' + err.stack);
	      }
	      else {
	    	  callback(null);
	      }
	  });
	  
	  
}

function findLocalOfferedTeams(round) {
	  var query = Teams.find({
	    role: 'user',
	    offer: {
	      $elemMatch: {
//	        'marketType': 'Local Market Portfolio',
	        'round' : round
	      }
	    }
	  });
	  return query;
}

function getQueryActiveLocalCustomers(round) {
	  /*var query = Teams.find({
	    role: 'user',
	    customer: {
	      $elemMatch: {
	        'marketType': 'Local Market Portfolio',
	        'agreement.status' : 'Active'
	      }
	    }
	  });*/
	  
	 var query = Teams.aggregate([{
		 $project: {
	        	name: 1,
	            customer : 1,
	            offer: 1
	        }
	 },{
		 $unwind: '$customer'
	 },{
		 $match: {"customer.marketType":'Local Market Portfolio', "customer.agreement.status":'Active'}
	 }]);
	  
	  return query;
}
//loop through all the offers that are accepted
//And find the customer and team for the offer
//if round is more than 1, then 

/*exports.agreementConversion = function(input, callback) {
	// Declare function variables;
	  var customerAllocation = input['customerAllocation'];
	  var toBeCalculatedRound = input['toBeCalculatedRound'];
	  var query = findTeamsWithAcceptedOffers();
	  

	  console.log("Welcome to convert offers to agreements--");
	  try {
		  query.exec(function(err, team) {
			  var offers = team.offer;
			  for(var offerIndex = 0; offerIndex < offers.length ; offerIndex++){
				  var offer = offers[offerIndex];
				  if(offer.round == toBeCalculatedRound && toBeCalculatedRound > 1) {
					  var customersInTeam = team.customer;
					  var offerBuyerPortfolios = offer.buyerPortfolio;
					  for (var customerIndex = 0 ; customerIndex < customersInTeam.length; customerIndex++) {
						  var customer = customersInTeam[customerIndex];
						  if(customer.businessName == offer.marketBusinessName) {
							  //find out an agreement with all offer-buyerportfolio and agreement-portfolio matching
							  var agreements = customer.agreement;
							  if(checkVariables(agreements) && agreements.length > 0) {
								  for (var agreementsIndex = 0 ; agreementsIndex < agreements.length ; agreementsIndex++) {
									  var agreement = agreements[agreementsIndex];
									  var agreementBuyerPortfolios = agreement.buyerPortfolio;
									  for () {
										  
									  }
								  }
							  }
						  }
					  }
				  }
			  }
		  });
	  } catch (err) {
	    console.log("Error occured in agreements conversion -->" + err);
	    return callback(err);
	  }
	  
}

function compareBuyerPortofolios() {
	
}*/