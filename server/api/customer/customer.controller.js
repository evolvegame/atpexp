'use strict';

var _ = require('lodash');
var Customer = require('./customer.model');
var Country = require('../country/country.model');
var async = require('async');
var mongoose = require('mongoose');
var Round = require('../round/round.model.js');
var Team = require('../team/team.model.js');
var teamController = require('../team/team.controller.js');
// Get list of customers
exports.index = function(req, res) {
  Customer.find(function (err, customers) {
    if(err) { return handleError(res, err); }
    return res.json(200, customers);
  });
};

exports.getGlobalCustomers = function(req, res) {
	var teamId = req.user.id;
	//console.log('Reached getGlobalCustomers!!!');
	Round.findOne({"currentRoundFlag":true}, function (err, currentRound){
	Team.findById(req.user.id, function(err,team){
		var strategies = team.riskStrategy;
		var newCustomerArray = [];
		Customer.find({marketType: 'Individual'}, function (err, customers) {
		    if(err) { return handleError(res, err); }
		    var newCustomer;
		    async.forEachSeries(customers, function(customer, callback){
		    	var buyerPortfolios = customer.buyerPortfolio;
		    	var totalRiskAcceptance = 0;
		    	var totalCLA = 0;
		    	var newCustomer = {
		    			  _id: customer._id,
		    			  name:customer.name,
		    			  revenue:customer.revenue,
		    			  region:customer.region,
		    			  regionCode:customer.regionCode,
		    			  country:customer.country,
		    			  countryCode:customer.countryCode,
		    			  customerISOCountryCode:customer.customerISOCountryCode,
		    			  businessRisk :customer.businessRisk, 
		    			  industry:customer.industry,
		    			  industryCode:customer.industryCode,
		    			  experienceScoreNeeded:customer.experienceScoreNeeded,
		    			  minOfferScore:customer.minOfferScore,
		    			  offerCount:customer.offerCount,
		    			  numberOfCustomers: customer.numberOfCustomers,
		    			  groupCustomerName: customer.groupCustomerName,
		    			  marketType: customer.marketType
		    	}
//		    	console.log('looping through at customer - ' + customer.name);
		    	var newyBuyerArray = [];
		    	async.forEachSeries(buyerPortfolios, function(buyer, callback){
		    		var newBuyer = {
    						region:buyer.region,
    					    regionCode:buyer.regionCode,
    					    country:buyer.country,
    					    countryCode:buyer.countryCode,
    					    buyerISOCountryCode:buyer.buyerISOCountryCode,
    					    industry:buyer.industry,
    					    industryCode:buyer.industryCode,
    					    tpe:buyer.tpe,
    					    rating:buyer.rating,
    					    cla:buyer.cla,
    					    numberOfOrganisation: buyer.numberOfOrganisation,
    					    riskAcceptance: null,
    					    weatherSymbolRating: null,
    					    weatherClass: null
    				}
		    		async.parallel([
		    			function(callback) {
		    				
		    				var query = avgIndustryWeatherQueryUsingCountry(buyer.country, buyer.industry);
							query.limit(1).exec(function(err, countryWeatherSymbol){
								if (err) {
									console.log('Error encountered while querying weather symbole' + err);
									callback(err);
								}
								if(checkVariables(countryWeatherSymbol[0]) && checkVariables(countryWeatherSymbol[0].termData) && checkVariables(countryWeatherSymbol[0].termData.weatherSymbolRating)){
//									console.log('countryWeatherSymbol[0].termData.weatherSymbolRating == ' + countryWeatherSymbol[0].termData.weatherSymbolRating);
									newBuyer.weatherSymbolRating = countryWeatherSymbol[0].termData.weatherSymbolRating;
									if (newBuyer.weatherSymbolRating == 1) {
										newBuyer.weatherClass = 'wi wi-day-sunny';
						    		} else if (newBuyer.weatherSymbolRating == 2) {
						    			newBuyer.weatherClass = 'wi wi-day-cloudy';
						    		} else if (newBuyer.weatherSymbolRating == 3) {
						    			newBuyer.weatherClass = 'wi wi-cloud';
						    		} else if (newBuyer.weatherSymbolRating == 4) {
						    			newBuyer.weatherClass = 'wi wi-cloudy';
						    		} else if (newBuyer.weatherSymbolRating == 5) {
						    			newBuyer.weatherClass = 'wi wi-storm-showers';
						    		} 
								} else {
									newBuyer.weatherSymbolRating = -1;
								}	
								
//								console.log('Getting weathher info for ' + buyer.country + ' -- ' + buyer.industry + ' --- ' + buyer['weatherSymbolRating'] + ' ===  ' + buyer['weatherClass']);
								callback(null, newBuyer);
							});
		    			},
		    			
		    			function(callback){
//		    				console.log('Getting risk acceptance for ' + buyer.country + ' -- ' + buyer.industry);
		    				var riskFound = false;
		    				for (var i= 0; i < strategies.length; i++) {
//		    					console.log(' strategies[i].round ' + JSON.stringify(strategies[i].round));
		    					if (strategies[i].round == currentRound.round && strategies[i].buyerCountry.indexOf(buyer.country)>-1 && strategies[i].buyerIndustry.indexOf(buyer.industry)>-1 ){
		    					      if (newBuyer.rating.between(1,30)){
		    					    	  newBuyer.riskAcceptance = strategies[i].strategyRatingBand1;
		    					        } else if (newBuyer.rating.between(31,40)){
		    					        	newBuyer.riskAcceptance = strategies[i].strategyRatingBand2;
		    					        } else if (newBuyer.rating.between(41,50)){
		    					        	newBuyer.riskAcceptance = strategies[i].strategyRatingBand3;
		    					        } else if (newBuyer.rating.between(51,60)){
		    					        	newBuyer.riskAcceptance = strategies[i].strategyRatingBand4;
		    					        } else {
		    					        	newBuyer.riskAcceptance = strategies[i].strategyRatingBand5;
		    					        } 
		    					        riskFound = true;
		    					        break;
		    					 } 
		    				}
		    				if (riskFound) {
		    					newBuyer.riskFlag = true;
		    				} else {
		    					newBuyer.riskFlag = false;
		    				}
		    				totalRiskAcceptance = totalRiskAcceptance + (buyer.cla * newBuyer.riskAcceptance);
		    				totalCLA = totalCLA +  buyer.cla;
//		    				console.log(' buyer---^^^ ' + JSON.stringify(newBuyer));
		    				callback(null, newBuyer);
		    			}
		    		], function(err, results){
		    			if(err) { 
		    				console.log('Error occured while getting global customer details');
		    			}
//		    			console.log('Results -- ' + JSON.stringify(results));
		    			newyBuyerArray.push(results[0]);
		    			callback(null, newyBuyerArray);
		    		});
		    		
					
					
		    	}, function(err){
		    		newCustomer.totalRiskAcceptance = Math.round(totalRiskAcceptance / totalCLA);
		    		newCustomer.buyerPortfolio = newyBuyerArray;
		    		newCustomerArray.push(newCustomer);
//		    		console.log(' customer.buyerPortfolio ----  ' + JSON.stringify(newyBuyerArray));
		    		callback(null);
		    	});
		    }, function(err){
		    	 console.log('finished iterating through all customers@@@!!!!');
				 return res.json(200, newCustomerArray);
		    });
		   
		  });
		});
	});
};

exports.getGlobalCustomersUsingMapReduceAndJoin = function(req, res) {/*
	
	var globalCustomers = {};
	
	globalCustomers.query = {
		marketType = 'Individual'	
	}; 
	
	globalCustomers.map = function() {
		var valuePartOfEmit = {
				name: this.name, 
				country: this.country, 
				industry: this.industry, 
				offerCount: this.offerCount, 
				revenue: this.revenue,
				buyerPortfolio: this.buyerPortfolio
		}
		emit(this, );
	};
	
*/}; 

Number.prototype.between = function(first,last){
    return (first < last ? this >= first && this <= last : this >= last && this <= first);
  }

// Get a single customer
exports.show = function(req, res) {
  Customer.findById(req.params.id, function (err, customer) {
    if(err) { return handleError(res, err); }
    if(!customer) { return res.send(404); }
    return res.json(customer);
  });
};

// Creates a new customer in the DB.
exports.create = function(req, res) {
  Customer.create(req.body, function(err, customer) {
    if(err) { return handleError(res, err); }
    return res.json(201, customer);
  });
};

// Updates an existing customer in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Customer.findById(req.params.id, function (err, customer) {
    if (err) { return handleError(res, err); }
    if(!customer) { return res.send(404); }
    var updated = _.merge(customer, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, customer);
    });
  });
};

// Deletes a customer from the DB.
exports.destroy = function(req, res) {
  Customer.findById(req.params.id, function (err, customer) {
    if(err) { return handleError(res, err); }
    if(!customer) { return res.send(404); }
    customer.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};


function getTeamOffersQuery(teamId, round) {
	var teamOffersQuery = Team.aggregate (
			{
            	$match:{"_id":mongoose.Types.ObjectId(teamId)}
            },{
            	$unwind:"$offer"
            },{
            	$match: {$and:[{"offer.round": Number(round)},{"offer.marketType":'Local Market Portfolio'}]}
            },{
            	$unwind:"$offer.buyerPortfolio"
            },{
            	$project:{
            		"_id":0,
            		"offer.buyerPortfolio.country":1
            	}
            },{
            	$group:{"_id":"$offer.buyerPortfolio.country"}
            }
 		);
	
	return teamOffersQuery;
}

exports.getLocalCustomerForFilter = function(req, res) {
	console.log('Arrived at get local customer details!');
	
	var responseObject = {};
	var teamOffersQuery = getTeamOffersQuery(req.user.id,req.params.round);
	
	teamOffersQuery.exec(function(err,offerCountries){
		var currentRoundNumber = req.params.round;
		var revenueStr = req.params.revenueStr;
		var weatherStr = req.params.weatherStr;
		
		var uniqueCountryOffers = [];
		
		offerCountries.forEach(function(offerCountry){
			uniqueCountryOffers.push(offerCountry._id);
		});
		var revenueArray = revenueStr.split(',');
		var weatherArray = [];
		
		var queryRevenue = [];
		var isQueryRevenue = false;
		for (var i = 0; i < revenueArray.length; i++) {
			var qryRev = {};
			if (i == 0) {
				if (revenueArray[i] > 0) {
					qryRev.revenue = {
							$gt: revenueArray[i] * 1000000
					}
					queryRevenue.push(qryRev);
					isQueryRevenue = true;
				}			
			}
			
			if (i == 1) {
				if (revenueArray[i] > 0) {
					qryRev.revenue = {
							$lt: revenueArray[i] * 1000000
					}
					queryRevenue.push(qryRev);
					isQueryRevenue = true;
				}	
			}
		}
		
		
		var queryWeather = [];
		if (weatherStr != 'NoSelection') {
			var weatherStrArray = weatherStr.split(',');
			weatherStrArray.forEach(function(weatherValue){
				weatherArray.push(Number(weatherValue));
			});
		}
		
		
		
		Customer.find(function(err, customers){
			if(err) return res.send(500, err);
			
			async.series({
				step1: function(callback){
					console.log('Step 1'); // Distinct countries for selected weather
					var query = testCountryQuery(weatherArray);
					query.exec(function(err, uniqueCountriesForWeather){
						var distinctCountryArray = [];
						
						uniqueCountriesForWeather.forEach(function(country){
							distinctCountryArray.push(country._id);
						}); 
						
						responseObject.distinctCountryArray = distinctCountryArray;
						console.log('>>>>>>>>>>>>>>> ' + JSON.stringify(distinctCountryArray.length));
						callback(null);
					});
					
				},
				step2: function(callback) {
					console.log('Step 2'); //Distinct weathers available for eligible countries

					var query = getDistinctWeatherForCountries(weatherArray);
					query.exec(function(err, uniqueWeather){
						var distinctWeatherArray = [];
						
						uniqueWeather.forEach(function(weather){
							distinctWeatherArray.push(weather._id);
						}); 
						
						var totalWeatherRatingSymbols = [1,2,3,4,5];
		                var availDistinctWeatherSymbolRatings = distinctWeatherArray;
		                var distinctWeatherSymbolRatings = [];
		                for (var i = 0; i < totalWeatherRatingSymbols.length ; i++) {
		                	var weatherRating = {
		                			rating: totalWeatherRatingSymbols[i],
		                			ratingPresent: false
		                	}
		                	if (availDistinctWeatherSymbolRatings.indexOf(totalWeatherRatingSymbols[i]) > -1) {
		                		weatherRating.ratingPresent = true;
		                	}
		                	distinctWeatherSymbolRatings.push(weatherRating);
		                }
		      
						
						responseObject.distinctWeatherArray = distinctWeatherSymbolRatings;
						console.log('>>>>>>>>>>>>>>> step 2 >>' + JSON.stringify(distinctWeatherArray));
						callback(null);
					});
				},
				
				step3: function(callback) {
					console.log('Step 3'); //final list of countries with revenue details per country
					var allCustomers = {};
					allCustomers.map = function () {
						emit(this.country, {country: this.country, isoCountryCode: this.customerISOCountryCode, revenue: this.revenue, minRevenue: this.revenue, maxRevenue: this.revenue});
					}
					
					allCustomers.query = {
			            marketType: 'Local Market Portfolio',
						$and: [{country: {$in: responseObject.distinctCountryArray}}]
					}
					
					if (queryRevenue.length > 0) {
						allCustomers.query['$and'] = queryRevenue;
					}
					
					allCustomers.reduce = function(key, values) {
						var maxRevenue = 0;
						var minRevenue = 0;
						var totalRevenue = 0;
						var isoCountryCode;
						var returnValue = {};
						var country = '';
						values.forEach(function(value){
							isoCountryCode = value.isoCountryCode;
							country = value.country;
							
							if(value.revenue > maxRevenue) {
								maxRevenue = value.revenue;
							} 
							
							if (minRevenue == 0 && value.revenue > 0) {
								minRevenue = value.revenue;
							}
							
							if (minRevenue > value.revenue) {
								minRevenue = value.revenue;
							}
							
							totalRevenue = totalRevenue + value.revenue;
						});
						returnValue['isoCountryCode'] = isoCountryCode;
						returnValue['revenue'] = totalRevenue;
						returnValue['minRevenue'] = minRevenue;
						returnValue['maxRevenue'] = maxRevenue;
						returnValue['country'] = country;
						return returnValue;
					}

					var maxRevenue = 0;
					var minRevenue = 0;
					var distinctCountries = [];
					var countryDetails = {};
					
					Customer.mapReduce(allCustomers, function(err, customers){
						var filterCustomers = new Array();
//						console.log('customers +++++ ' + JSON.stringify(customers.value));
						customers.forEach(function(customerdata){
//							console.log('customers +++++  ' + JSON.stringify(customerdata));
							if (customerdata.value.maxRevenue > maxRevenue) {
								maxRevenue = customerdata.value.maxRevenue; 
							}
							
							//A one time thing to set a min value.
							if (minRevenue == 0 && customerdata.value.minRevenue > 0) {
								minRevenue = customerdata.value.minRevenue;
							}
							
							if (customerdata.value.minRevenue < minRevenue) {
								minRevenue = customerdata.value.minRevenue;
							}
							customerdata.value.offerExists = uniqueCountryOffers.indexOf(customerdata.value.country) > -1 ? true : false;
//							console.log('Customer data value -- ' + JSON.stringify(customerdata.value));
							distinctCountries.push(customerdata.value);
							countryDetails[customerdata._id] = customerdata.value;
						});
						console.log('-- Max Revenue -- ' + maxRevenue);
						console.log('-- Min Revenue -- ' + minRevenue);
						console.log('distinctCountries === ' + JSON.stringify(distinctCountries.length));
						
						responseObject.minRevenue = minRevenue;
						responseObject.maxRevenue = maxRevenue;
						responseObject.distinctCountries = distinctCountries;
						responseObject.countryDetails = countryDetails;
						
						
						return res.json(responseObject);
						callback(null);	
					});
					
				}
			},function(err){
				if (err) {
					console.log('Error occurred while getting local customers -- ' + JSON.stringify(err));
				}
	//			console.log('Grand Exit!!!!!!!!!!!!!');
			});
			
			
			
			
			//-----------------All customers---------------------------//
			
			
			//-----------------END All customers---------------------------//
			
		});
	
	});
};

exports.totalNumOfResources = function(req, res) {
	Round.findOne({"currentRoundFlag":true}, function (err, currentRound){
		var currentRoundNumber = currentRound.round;
		var numOfResources = 0;
		Team.findById(req.user.id, function(err,team){
			var offers = team.offer;
			offers.forEach(function(offer){
				if (offer.marketType == 'Local Market Portfolio' && offer.round == currentRoundNumber) {
					var offerNumberOfResources = offer.numberOfResources;
					if (offerNumberOfResources == 'undefined'){
						offerNumberOfResources = 0;
					}
					numOfResources = offerNumberOfResources + numOfResources;
				}
			});
			
			res.json(200, numOfResources);
		});
	});
};

exports.getLocalCustomers = function(req, res) {
	//console.log('Reached getLocalCustomers -- ' + req.user.id);
	// In parallel run - 
	// a) query to get list of customers for this country
	// b) query to get the country data for weather symbols
	// c) query team to get the local team offers and agreement for current country, 
	// d) query team to current round department size.
	// Collate after all the above to single array of customers
	Round.findOne({"currentRoundFlag":true}, function (err, currentRound){
		var currentRoundNumber = currentRound.round;
		console.log('Current round number while retrieving local customers -- ' + currentRoundNumber);
		Customer.find(function(err, customers){
			if(err) return res.send(500, err);
			
			var allCustomers = {};
			
			allCustomers.map = function () {
				emit(this, {_id: this._id, name: this.name, country: this.country, revenue: this.revenue, industry: this.industry, groupCustomerName: this.groupCustomerName, buyerPortfolio: this.buyerPortfolio, marketType: this.marketType});
			}
			
			allCustomers.query = {
				country: req.params.country,
				marketType: 'Local Market Portfolio'
			}
			
			Customer.mapReduce(allCustomers, function(err, customers){
				var localCustomers = new Array();
				//console.log('Entered map reduce!!!');
				async.forEachSeries(customers, function(customerData, callback){
					var customer = customerData.value;
					var customerBuyerPortfolios = customer.buyerPortfolio;
					var numberOfOrganisation = 0;
					customerBuyerPortfolios.forEach(function(buyerPortfolio){
						numberOfOrganisation = numberOfOrganisation + buyerPortfolio.numberOfOrganisation;
					});
					var localCustomer = {
							name: customer.name,
							revenue: customer.revenue / 1000000,
							industry: customer.industry,
							groupCustomerName: customer.groupCustomerName,
							rating: customer.rating,
							country: customer.country,
							selection: false,
							pastOffers:[],
							riskstrategy:[],
							premiumPercentage: 0,
							expectedPremium: 0,
							buyerRatingFrom:0,
							buyerRatingTo:0,
							currentRoundOfferSelection: false,
							showPastOffers: false,
							numberOfOrganisation: numberOfOrganisation,
							localSalesDepartment: 0,
							mdNumOfResources: 0
					}
					var query = avgIndustryWeatherQueryUsingCountry(customer.country, customer.industry);
					query.limit(1).exec(function(err, countryWeatherSymbol){
						if (err) {
							localCustomer.weatherSymbolRating = null;
							console.log('Error encountered while querying weather symbole' + err);
							callback(err);
						}
						if(checkVariables(countryWeatherSymbol[0]) && checkVariables(countryWeatherSymbol[0].termData) && checkVariables(countryWeatherSymbol[0].termData.weatherSymbolRating)){
							localCustomer.weatherSymbolRating = countryWeatherSymbol[0].termData.weatherSymbolRating;
							if (localCustomer.weatherSymbolRating == 1) {
								localCustomer.weatherClass = 'wi wi-day-sunny';
				    		} else if (localCustomer.weatherSymbolRating == 2) {
				    			localCustomer.weatherClass = 'wi wi-day-cloudy';
				    		} else if (localCustomer.weatherSymbolRating == 3) {
				    			localCustomer.weatherClass = 'wi wi-cloud';
				    		} else if (localCustomer.weatherSymbolRating == 4) {
				    			localCustomer.weatherClass = 'wi wi-cloudy';
				    		} else if (localCustomer.weatherSymbolRating == 5) {
				    			localCustomer.weatherClass = 'wi wi-storm-showers';
				    		} 
						} else {
							localCustomer.weatherSymbolRating = -1;
						}				
	//					callback(null);
	//					localCustomers.push(localCustomer);
					});
					
					var pastLocalOffers = [];
					var currentRoundLocalOffers = [];
					
					Team.findById(req.user.id, function(err,team){
						var localSalesDepartment = 0;
						var roundLevelInfo = team.roundLevelInformation;
						for (var roundIndex = 0 ; roundIndex < roundLevelInfo.length; roundIndex++) {
							if (roundLevelInfo[roundIndex].round == currentRoundNumber) {
								var departments = roundLevelInfo[roundIndex].department;
								for (var i = 0; i < departments.length; i++) {
									var depart = departments[i];
									if (depart.name == 'Local Sales') {
										localSalesDepartment = depart.numberOfBenefits;
										localCustomer.localSalesDepartment = localSalesDepartment;
										break;
									}
								}
								break;
							}
						}
						
						
						var offers = team.offer;
						var teamCustomers = team.customer;
						var strategies = team.riskStrategy;
						var currRoundStrategies = [];
						for (var i = 0 ; i < strategies.length; i++) {
							if (strategies[i].round == currentRoundNumber && strategies[i].buyerCountry.indexOf(customer.country) > -1 && strategies[i].buyerIndustry.indexOf(customer.industry) > -1) {
								var riskBand = {
										strategyRatingBand1: strategies[i].strategyRatingBand1,
									    strategyRatingBand2: strategies[i].strategyRatingBand2,
									    strategyRatingBand3: strategies[i].strategyRatingBand3,
									    strategyRatingBand4: strategies[i].strategyRatingBand4,
									    strategyRatingBand5: strategies[i].strategyRatingBand5
								}
								currRoundStrategies.push(riskBand);
								break;
							}
						}
						localCustomer.riskstrategy = currRoundStrategies;
						
						offers.forEach(function(offer){
							//console.log('Customer name --- ' + customer.name + ' && offer.marketBusinessName == ' + offer.marketBusinessName);
							if (offer.marketType == 'Local Market Portfolio' && offer.marketBusinessName == customer.name) {
								var buyers = offer.buyerPortfolio;
								var cla = 0;
								buyers.forEach(function(pastOfferBuyer){
									if (pastOfferBuyer.industry == customer.industry) {
										cla = cla + pastOfferBuyer.cla;
									}
								});
								
								var agreedCLA = 0;
								var claimsAmount = 0;
								var CLD = 0;
								var riskAcceptance = 0;
								var agreementPremium = 0;
                                var marketShare = 0;
								if (offer.status == 'Accepted') {
									teamCustomers.forEach(function(teamCustomer){
										if (teamCustomer.businessName == offer.marketBusinessName) {
											var custBuyers = teamCustomer.buyerPortfolio;
											var historyOfAgreements = teamCustomer.agreement.history;
											for (var i = 0; i < historyOfAgreements.length; i++) {
												if (offer.round == historyOfAgreements[i].round) {
													claimsAmount = historyOfAgreements[i].claims.claimAmount;
													agreementPremium = historyOfAgreements[i].premium;
													CLD = historyOfAgreements[i].cld;
													agreedCLA = historyOfAgreements[i].cla;
												}
											}
											/*custBuyers.forEach(function(custBuyer){
												if(custBuyer.country == req.params.country && custBuyer.industry == customer.industry) {
													agreedCLA = agreedCLA + custBuyer.cla;	
													CLD = CLD + custBuyer.cld;
													console.log('CLD --> ' + CLD);
													console.log('agreedCLA --> ' + agreedCLA);
												}
											});*/
											
											riskAcceptance = 100*(CLD / agreedCLA);
											//console.log('riskAcceptance --> ' + riskAcceptance);
                                            marketShare = 100* (agreedCLA/customer.revenue) ;
//                                            console.log('Round ::: ' + offer.round + ' marketShare ::: ' + marketShare);
										}
									});
								}
								
								if (numberOfOrganisation == 0) {
									numberOfOrganisation = 1;
								}
								
								var pastOffer = {
										round:offer.round,
										cla: cla,
										premiumPercentage: offer.premiumPercentage,
										buyerRatingFrom: offer.buyerRatingFrom,
										buyerRatingTo: offer.buyerRatingTo,
										agreedCLA:agreedCLA,
										claimAmount:claimsAmount,
										expectedMarketShare: (100 * offer.numberOfResources / numberOfOrganisation),
										riskAcceptance: riskAcceptance,
										agreementPremium: agreementPremium,
										marketShare: marketShare,
										numResources: offer.numberOfResources,
										allocatedNumOfCustomers: offer.allocatedNumOfCustomers,
										totalOfferCount: offer.totalOfferCount
								}
								
								if (pastOffer.round == currentRoundNumber) {
									localCustomer.numResources = offer.numberOfResources;
									localCustomer.mdNumOfResources = offer.numberOfResources;
									localCustomer.allocatedNumOfCustomers = offer.allocatedNumOfCustomers;
									localCustomer.expectedPremium = (100 * localCustomer.numResources) / localCustomer.numberOfOrganisation;
									localCustomer.premiumPercentage = offer.premiumPercentage;
									localCustomer.buyerRatingFrom = offer.buyerRatingFrom;
									localCustomer.buyerRatingTo = offer.buyerRatingTo;
									localCustomer.currentRoundOfferSelection = true;
								} else {
									pastLocalOffers.push(pastOffer);	
								}								
							}
						});
						
						localCustomer.pastOffers = pastLocalOffers;
						if (pastLocalOffers.length > 0) {
							localCustomer.showPastOffers = true;	
						}
						localCustomers.push(localCustomer);
						callback(null);
					});
					
					
					
					
				},function(err, callback) {
	                if (err) callback(err);
	                //console.log('EXITING map reduce!!! -->' + JSON.stringify(localCustomers.length));
	                return res.json(localCustomers);
	            });
			});
			
		});
	
	});
};

exports.updateLocalOffers = function(req, res) {
	//console.log('Starting to update local offers for team -- ' + req.user.id);
	var teamId = req.user.id;
	var customerName = req.body.name;
	//console.log('customerName -- ' + JSON.stringify(req.body));
	var industry = req.body.industry;
	var groupCustomerName = req.body.groupCustomerName;
	var country = req.body.country;
	var premiumPercentage = req.body.premiumPercentage;
	var expectedPremium = req.body.expectedPremium;
	var buyerRatingFrom = req.body.buyerRatingFrom;
	var buyerRatingTo = req.body.buyerRatingTo;
	var currentRoundOfferSelection = req.body.currentRoundOfferSelection;
	var offerEdited = req.body.offerEdited;
	var numberOfResources = req.body.numResources;
	var mdNumOfResources = req.body.mdNumOfResources;
	var allocatedNumOfCustomers = req.body.allocatedNumOfCustomers;
	
	if (!currentRoundOfferSelection) {
		Team.findById(teamId, function(err, team){
			Round.findOne({"currentRoundFlag":true}, function (err, round){
				var currentRoundNumber = round.round;
				var offers = team.offer;
				var offerId;
				async.forEachSeries(offers, function(offer, callback){
					if (offer.marketBusinessName == customerName && offer.round == currentRoundNumber) {
						offerId = offer._id;
						//console.log('Offer found !');
						callback(null);
					} else {
						callback(null);
					}
					
				},function(err, callback) {
	                if (err) callback(err);
	                if (checkVariables(offerId)) {
	                	offers.pull(offerId);
	                	team.save(function(err){
	          			  if (err) {
	          				  console.log('Error occured while saving offers - ' + JSON.stringify(err));
	          				  return res.json(500, err);
	          			  }
	          			  //console.log('Saved team by removing offer for -- ' + industry);
	          			  return res.json(200, null);
	                	});
	                }
	            });
				
			});
		});	
	} else {
		Round.findOne({"currentRoundFlag":true}, function (err, round){
			var currentRoundNumber = round.round;
			
			var offer = {
					round: currentRoundNumber,
					marketBusinessName: customerName,
					premiumPercentage: premiumPercentage,
					offerType: 'New',
					price: expectedPremium,
					marketType: 'Local Market Portfolio',
					buyerRatingFrom: buyerRatingFrom,
					buyerRatingTo: buyerRatingTo,
					numberOfResources: numberOfResources,
					mdNumOfResources: mdNumOfResources,
					cla: 0,
					cld: 0,
					diffNumberOfResources: 0,
					buyerPortfolio: [],
					allocatedNumOfCustomers: allocatedNumOfCustomers
			}
			
			var buyer = [];
			
			Team.findById(teamId, function(err, team){
				var offers = team.offer;
				var totalNumberOfResources = 0;
				var diffNumOfResource = 0;
				diffNumOfResource = offer.mdNumOfResources;
				for (var i = 0 ; i < offers.length; i++) {
					if (offers[i].round == currentRoundNumber && offers[i].marketBusinessName == offer.marketBusinessName) {
						offer.offerType = offers[i].offerType;
						if (offer.offerType == 'Renewal') {
							offer.diffNumberOfResources = offer.mdNumOfResources - offers[i].allocatedNumOfCustomers;
						}
						offers.pull(offers[i]._id);
					}
				}
				
				// find out local sales department size
				var roundLevelInfos = team.roundLevelInformation;
				var localSalesSize = 0;
				for (var i = 0 ; i < roundLevelInfos.length ; i ++) {
					if(roundLevelInfos[i].round === currentRoundNumber) {
						var departments = roundLevelInfos[i].department;
						for (var j = 0; j < departments.length ; j++) {
							if (departments[j].name == 'Local Sales') {
								localSalesSize = departments[j].numberOfBenefits;
								break;
							}
						}
					}
				}
				
				//find out totalNumberOfResources
				
				if (typeof(diffNumOfResource) != 'undefined') {
					console.log('About to update local offer -- diffNumOfResource ' + diffNumOfResource);
					totalNumberOfResources = diffNumOfResource;
				}
				offer.numberOfResources = offer.mdNumOfResources;
				for (var i = 0; i < offers.length; i++) {
					if (offers[i].round == currentRoundNumber && offers[i].marketType == 'Local Market Portfolio' && offers[i].offerType == 'New') {
						if (typeof(offers[i].numberOfResources) != 'undefined') {
							totalNumberOfResources = totalNumberOfResources + offers[i].allocatedNumOfCustomers;							
						}
					}
				}
				
				var localCustomers = 	team.customer;
				/*for (var i = 0; i < localCustomers.length; i++) {
					if(localCustomers[i].marketType == 'Local Market Portfolio' && localCustomers[i].agreement.status == 'Active') {
						totalNumberOfResources = totalNumberOfResources + localCustomers[i].agreement.allocatedNumOfCustomers;
					}
				}*/
				console.log('totalNumberOfResources -- ' + totalNumberOfResources + ' &&& localSalesSize == ' + localSalesSize);
				if (totalNumberOfResources > localSalesSize) {
					return res.json(500, "Total number of resources - " + totalNumberOfResources + " has exceeded local sales department size = " + localSalesSize + " !");
				}
                
                //check for existence of risk strategy
                Team.findOne({'riskStrategy.buyerIndustry' : industry , 
                                            'riskStrategy.round' : currentRoundNumber,
                                            'riskStrategy.buyerCountry' : country},function(err,strategyTeamObj){
                var error1 ='';
                if(strategyTeamObj==null){
                    console.log('team is null');
                    error1='No risk strategy defined!!!!';
                    return res.json(500, error1);
                }else{
                    console.log('team is not null -- ' + JSON.stringify(team));
                       //console.log('Finding customer with name = ' + customerName + ', country = ' + country + 'industry = ' + industry);
                       Customer.findOne({"name": customerName, "country": country, "industry": industry}, function(err, customer){
					   if (err) {
						  console.log('Error occured while retrieving customer for buyerportfolio!' + err);
						  return res.json(500, err);
					   }
					   //console.log('Cusstomer -- ' + JSON.stringify(customer));
					   offer.buyerPortfolio = customer.buyerPortfolio;
					   offers.push(offer);
					   team.save(function(err){
	        			    if (err) {
	        				   console.log('Error occured while saving team for offer - ' + JSON.stringify(offer.marketBusinessName) + ' error -- ' + err);
                                return res.json(500, err);
	        			    }
	        			    console.log('Saved team with new offer for -- ' + JSON.stringify(offer) + ' --- ' + industry);
	        			    var action = "Add/Modify Local Offer";
                            var actionDetails = JSON.stringify(offer);
                            teamController.writeAudit(team,req,action,actionDetails);
                            return res.json(200, null);
	              	    });	
				    });
                }
                if(err){
                    console.log('Error while finding team details!!!!' + err);
				    return res.json(500, err);
                }
            });
		 });
	  });
	}	
};


//to check whether a value is null or undefined
function checkVariables(input) {
  if (input != null && input != 'undefined') return true;
  else return false;
}


function getDistinctValues (arrayObj, field){
	var lookup = {};
	var distinctWeatherSymbolRatings = [];
//	var distinctIndustries = [];
	var distinctCountries = [];
	
	//console.log('Called disctint function');
	
	arrayObj.forEach(function(item){
		var weatherSymbolRating = item['weatherSymbolRating'];
//		var industry = item['industry'];
		var country = item['country'];
		var isoCountryCode = item['isoCountryCode'];
		var countryRevenue = item['revenue'];
		
		if (!(weatherSymbolRating in lookup)) {
			lookup[weatherSymbolRating] = 1;
			distinctWeatherSymbolRatings.push(weatherSymbolRating);
		}
		
		/*if (!(industry in lookup)) {
			lookup[industry] = 1;
			distinctIndustries.push(industry);
		}*/
		
		if (!(country in lookup)) {
			lookup[country] = 1;
			distinctCountries.push({country:country, isoCountryCode:isoCountryCode, countryRevenue:countryRevenue, offerExists: false});
		}
	});
	
	var distinctCollection = {
			distinctWeathers: distinctWeatherSymbolRatings.sort(function(a,b){
				return a - b
			}),
			
			distinctCountries: distinctCountries.sort(function(a, b){
				
			})/*,
			
			distinctIndustries: distinctIndustries*/
	}
	
	return distinctCollection;
}

function avgIndustryWeatherQueryUsingCountry(country, industry) {    
		var query = Country.aggregate (
	                {
	                    $match:{"country":country}
	                },{
	                    $unwind:"$termData"
	                },{
	                    $match:{"termData.industryName":industry}
	                },{
	                	$sort:{"termData.termId": -1}
	                }
         		);
	
    return query;
}

function testCountryQuery(weatherArray) {    
	if (weatherArray.length > 0) {
		var query = Country.aggregate (
				{
                    $unwind:"$termData"
                }, {
                	$match:{"termData.weatherSymbolRating":{$in:weatherArray}}
                }, {
                	$project: {
                		"_id":0,
                		"country": 1
                	}
                }, {
                	$group: {"_id": "$country"}
                }
     		);

		return query;	
	} else {
		var query = Country.aggregate (
				{
                    $unwind:"$termData"
                }, {
                	$project: {
                		"_id":0,
                		"country": 1
                	}
                }, {
                	$group: {"_id": "$country"}
                }
     		);

		return query;
	}
	
}

function getDistinctWeatherForCountries(weatherArray) {    
	if (weatherArray.length > 0) {
		var query = Country.aggregate (
				{
                    $unwind:"$termData"
                }, {
                	$match:{"termData.weatherSymbolRating":{$in:weatherArray}}
                }, {
                	$project: {
                		"_id":0,
                		"termData.weatherSymbolRating": 1
                	}
                }, {
                	$group: {"_id": "$termData.weatherSymbolRating"}
                }
     		);

		return query;	
	} else {
		var query = Country.aggregate (
				{
                    $unwind:"$termData"
                }, {
                	$project: {
                		"_id":0,
                		"termData.weatherSymbolRating": 1
                	}
                }, {
                	$group: {"_id": "$termData.weatherSymbolRating"}
                }
     		);

		return query;
	}
	
}

//// Update customer offer count in DB.
exports.updateOfferCount = function(req, res, next) {

  var customerId =req.params.id;
  var count = Number(req.params.count);
  //console.log('Reached customer controller updateCount !!! - customerId ' + customerId);
  //console.log('Reached customer controller updateCount !!! - count ' + count);
  Customer.findById(customerId,function(err,customer){ 
    if(err) { return handleError(res, err); }
    //console.log('count before :'+customer.offerCount);
    count = count + Number(customer.offerCount);
   //console.log('count after :'+count);
   Customer.update(
    { _id: customerId },
    { offerCount:count },function(err,result){       
      if (err) return validationError(res, err);
      //console.log ( 'Affected records '+ result);
      Customer.findById(customerId,function(err,resultAfter){ 
        if (err) return validationError(res, err);
        return res.json(200, resultAfter);

      });

    });

 });


};

exports.getOfferAnalysis = function(req, res, next) {
	  var teamId =req.user.id;
	  var offerAnalysis = [];
	  
	  //console.log('Reached customer controller getOfferAnalysis !!! - Team id  ' + teamId);
	  
	  Round.findOne({"currentRoundFlag":true}, function (err, round){
		  var previousRoundNumber = round.round - 1;
		  if (previousRoundNumber == 0) {
			  return res.json(offerAnalysis);
		  }
		  Team.findById(teamId, function(err, team){
			  var offers = team.offer;
			  var roundLevelInformations = team.roundLevelInformation;
			  var departments = [];
			  var departmentSize;
			  var elligibleForMoreDetails = false;
			  roundLevelInformations.forEach(function(roundLevelInfo){
				  if (roundLevelInfo.round == previousRoundNumber) {
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
			  
			  
			  async.forEachSeries(offers, function(offer, callback){
				 if (offer.round == previousRoundNumber) {
					 var insights = '';
					 var offerCld = 0;
                     var offerPremium = offer.price;
					 for (var i=0; i < offer.buyerPortfolio.length; i++) {
						 var buyerPortfolio = offer.buyerPortfolio[i];
						 offerCld = offerCld + buyerPortfolio.cld; 
					 }
					 //console.log('About to execute query');
					// Team.findOne( {'customer.businessName':offer.marketBusinessName, 'customer.agreement.status':'Active'},{'customer.$':1}, function (err, customerTeam){
                         
					 Team.findOne( {
                         'customer' : {
                             '$elemMatch':{
                                 'businessName':offer.marketBusinessName, 
                                 'agreement.status':'Active'}}
                                 },
                                 {'customer.$':1}, function (err, customerTeam){                         
						 if (customerTeam != null) {                             
							 Team.findById(customerTeam._id, function(err, wonTeam){
								 if (err) return callback(err);
//								 if (wonTeam != null && wonTeam != 'undefined') {
									 var wonTeamCustomers = wonTeam.customer;
									 var wonTeamName = wonTeam.name;
                                     var wonTeamExperienceScore="";
                                     var wonTeamPremium=0;
                                     var wonTeamCLD=0;
                                    
									 if (wonTeam.name == team.name) {
                                         
                                        var toBePushedOffer = {
                                                _id: offer._id,
                                                round:offer.round,
                                                marketBusinessName: offer.marketBusinessName,
                                                wonTeam: "You had the best offer",
                                                offerCld: offerCld,
                                                price: offer.price,
                                                insights: insights,
                                                offerType:offer.offerType,
                                                elligibleForMoreDetails:true
                                        }
                                        
                                        offerAnalysis.push(toBePushedOffer);
                                        callback(null);                                     
                                                                              
									 } else {
                                         
                                        // get the experience score of the team for prvious round
                                        
                                        for (var i = 0; i < wonTeam.roundLevelInformation.length; i ++) {
                                            if (wonTeam.roundLevelInformation[i].round == previousRoundNumber) {
                                                wonTeamExperienceScore = wonTeam.roundLevelInformation[i].experienceScore;
                                                break;
                                            }
                                        }
                                        
                                        // get the premium and CLD
                                        var wonTeamOffers = wonTeam.offer;
                                        var wonTeamOffer;
                                        for (var i = 0; i < wonTeamOffers.length; i++) {
                                            if (wonTeamOffers[i].round == previousRoundNumber && wonTeamOffers[i].marketBusinessName == offer.marketBusinessName) {
                                                wonTeamOffer = wonTeamOffers[i]; 
                                                wonTeamPremium=wonTeamOffer.price
                                                break;
                                            }
                                        }
                                        var wonTeamCLD = 0;
                                        for (var i=0; i < wonTeamOffer.buyerPortfolio.length; i++) {
                                            var buyerPortfolio = wonTeamOffer.buyerPortfolio[i];
                                            wonTeamCLD = wonTeamCLD + buyerPortfolio.cld; 
                                        }
                                        
                                        var wonAnalysisReturnTeamPremium = wonTeamPremium;
                                        var wonAnalysisReturnTeamCLD = wonTeamCLD;
                                        var wonAnalysisReturnTeamExp = wonTeamExperienceScore
                                        var wonAnalysisReturnTeamName = wonTeamName;
                                                                                
                                        //if not eligible for details
                                        if (!elligibleForMoreDetails){
                                            
                                            //check for premium
                                            wonAnalysisReturnTeamPremium="Same";
                                            if (wonTeamPremium > offerPremium) {
                                                wonAnalysisReturnTeamPremium = "Higher";
                                                 //console.log ('Higher wonAnalysisReturnTeamPremium ' + wonAnalysisReturnTeamPremium);
                                            } else {
                                                if (wonTeamPremium < offerPremium){
                                                    wonAnalysisReturnTeamPremium = "Lower";
                                                     //console.log (':ower wonAnalysisReturnTeamPremium ' + wonAnalysisReturnTeamPremium);
                                                }
                                            }
                                            
                                            // check for CLd
                                            wonAnalysisReturnTeamCLD = "Same";
                                            if (wonTeamCLD > offerCld){
                                                wonAnalysisReturnTeamCLD = "Higher";
                                            } else {
                                                if (wonTeamCLD < offerCld){
                                                    wonAnalysisReturnTeamCLD = "Lower";
                                                }
                                            }
                                            // check for experience score
                                            wonAnalysisReturnTeamExp = "Same";
                                            if(wonTeamExperienceScore > team.experienceScore) {
                                                wonAnalysisReturnTeamExp = "Higher";
                                            }else {
                                                if (wonTeamExperienceScore < team.experienceScore){
                                                    wonAnalysisReturnTeamExp = "Lower";
                                                }
                                            }                         
                                            
                                            //won team name
                                            wonAnalysisReturnTeamName = "Information not available";                                                   
                                        }
                                   
                                    var toBePushedOffer = {
                                            _id: offer._id,
                                            round:offer.round,
                                            marketBusinessName: offer.marketBusinessName,
                                            price: offer.price,
                                            insights: insights,
                                            offerType:offer.offerType,
                                            agreementPremium: wonAnalysisReturnTeamPremium,
                                            experienceScore: wonAnalysisReturnTeamExp,
                                            cld: wonAnalysisReturnTeamCLD,
                                            wonTeam: wonAnalysisReturnTeamName,
                                            offerCld: offerCld,
                                            elligibleForMoreDetails:elligibleForMoreDetails
                                            
                                    }
                                    offerAnalysis.push(toBePushedOffer);
                                    callback(null);                                       

							 }
                           });
						 } else {
							 
							 var toBePushedOffer = {
									 _id: offer._id,
									 round:offer.round,
									 marketBusinessName: offer.marketBusinessName,
                                     wonTeam: "Customer did not like the offer",
                                     offerCld: offerCld,
									 price: offer.price,
									 insights: insights,
									 offerType:offer.offerType,
                                     elligibleForMoreDetails:true
							 }
							 offerAnalysis.push(toBePushedOffer);
							 callback(null);
						 }
					 });
					 
				 } else {
					 callback(null);
				 }
			  },function(err) {
		          if (err) return callback(err);
		          return res.json(offerAnalysis);
		      });
		  }); 
		 
	  });
	    
	  

};

function getWonTeamForOffer(offer){
	//console.log('Query parameters - ' + offer.marketBusinessName);
	var query = Team.find({
		"customer.$.businessName": offer.marketBusinessName,
		"customer.$.agreement.status": 'Active'
	});
	return query;
}

function handleError(res, err) {
  return res.send(500, err);
}