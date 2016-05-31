'use strict';

var _ = require('lodash');
var Country = require('./country.model');
var Customer = require('../customer/customer.model');
var Team = require('../team/team.model.js');
var async = require('async');
var mongoose = require('mongoose');

function checkVariables(input) {
    if (input != null && input != 'undefined') return true;
    else return false;
}

function getCountriesforMapQuery(){
    var query = Country.aggregate(
        {   $unwind : '$termData'
            },
            {       $group : { '_id': 
                    { 'isoCode': '$isoNumericalCode', 
                    'termId' : {$max: '$termData.termId'}
                },
                'avgVal' : {$avg: '$termData.weatherSymbolRating'}
                    }
            }           
    );
    return query;
}

function getCountryName(countryName){
    var query = Country.aggregate (
                {       $match:{"isoNumericalCode": countryName}
                },
                {       $project : { country : 1}
                }
    );
    return query;
}

function industryAggrCountries(countryIso) {    
    var query = Customer.aggregate(
                {
                    $unwind:"$buyerPortfolio"
                },{
                    $match:{"buyerPortfolio.buyerISOCountryCode":countryIso}
                },{
                    $group:{"_id":"$buyerPortfolio.industry" , "cla":{$sum:"$buyerPortfolio.cla"}}
                }
    );
    return query;
}

function getRiskStrategy(currentRound,country,industry,teamId) {
    var query = Team.aggregate (
                {
                    $match:{_id: mongoose.Types.ObjectId(teamId)}
                },
                {       
                    $project : { riskStrategy : 1}
                },
                {
                    $unwind:"$riskStrategy"
                },{
                    $match:{"riskStrategy.round":currentRound,"riskStrategy.buyerCountry":country,"riskStrategy.buyerIndustry":industry}
                }
    );
    return query;
}

function getBuyerCountries(countryISOCode){
    var query = Customer.aggregate(
                {
                    $unwind:"$buyerPortfolio"
                },{
                    $match:{"buyerPortfolio.buyerISOCountryCode":countryISOCode}
                },{
                    $group:{"_id":"$buyerPortfolio.industry"}
                }
    );
    return query;
}

function maxTermAllCountries() {    
    var query = Country.aggregate(
                {
                    $unwind:"$termData"
                },{
                    $group:{"_id": "$isoNumericalCode" , "maxTermId":{$max:"$termData.termId"}}
                }
    );
    return query;
}

function industryAllCountries(industry) {    
    var query = Country.aggregate(
                {
                    $unwind:"$termData"
                },{
                    $match:{"termData.industryName":industry}
                },{
                    $group:{"_id":"$isoNumericalCode" , "maxTermId":{$max:"$termData.termId"}}
                }
    );
    return query;
}

function industryForCountry(industry,countryName) {    
    var query = Country.aggregate(
                {
                    $match:{"country":countryName}
                },
                {
                    $unwind:"$termData"
                },{
                    $match:{"termData.industryName":industry}
                },{
                    $project:{"_id":0 ,"term": "$termData.termId", "meanEL":{ $multiply: [ "$termData.meanEL", 10000 ] }}
                }
    );
    return query;
}

function avgWeatherIndQuery(isoCode, termId,industryArr) {    
    var query = Country.aggregate(
                {
                    $match:{"isoNumericalCode":isoCode}
                },{
                    $unwind:"$termData"
                },{
                    $match:{"termData.termId":termId, "termData.industryName":{$in: industryArr}}
                },{
                    $group:{
                        "_id":"$isoNumericalCode",
                        "avgVal":{$avg:"$termData.weatherSymbolRating"}
                    }
                }
    );
    
    return query;
}

function avgIndustryWeatherQuery(isoCode, termId, industry) {    
    var query = Country.aggregate(
                {
                    $match:{"isoNumericalCode":isoCode}
                },{
                    $unwind:"$termData"
                },{
                    $match:{"termData.termId":termId, "termData.industryName":industry}
                },{
                    $group:{
                        "_id":"$isoNumericalCode",
                        "avgVal":{$avg:"$termData.weatherSymbolRating"}
                    }
                }
    );
    return query;
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

function avgIndustryWeatherQueryUsingCountryISO(country, industry) {    
    var query = Country.aggregate (
                {
                    $match:{"isoNumericalCode":country}
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

exports.getWeatherSymbol = function (req, res) {
	var country = req.params.countryName;
	var industry = req.params.industryName;
	var query = avgIndustryWeatherQueryUsingCountry(country, industry);
	query.limit(1).exec(function(err, countryWeatherSymbol){
		if (err) return res.send(500, err);
		return res.json(200, countryWeatherSymbol);
	});
}

exports.avgAllCountries = function (req, res) {
try{
    var query = maxTermAllCountries();
    async.waterfall([
    function (callback) {
        try {
             query.exec(function (err, listOfCountries) {
                if (err) return callback(err);
                callback(null, listOfCountries);
              });
        } catch (err) {
              if (err) return callback(err);
        }
    },
    
    function(listOfCountries,callback){
        var resultList=[];
        async.forEachSeries(listOfCountries,
            function (country, callback){
                var isoCode = country._id;
                var filterQuery = getBuyerCountries(isoCode);
                filterQuery.exec(function(err,results){
                    if (err) return callback(err);
                    if(checkVariables(results)&& results.length>0){
                        var finalList={};
                        finalList["isoCode"] = isoCode;
                        finalList["termId"] = country.maxTermId;
                        finalList["industries"]=[];
                        for(var i=0;i<results.length;i++){
                            finalList["industries"].push(results[i]._id);
                        }
                        resultList.push(finalList);
                    }
                    return callback(null);
                })
            }, function(err){
                if (err) return callback (err);
                callback(null,resultList);
            })
            },
    
    function (listOfCountries,callback){
//        console.log("listOfCountries-->"+JSON.stringify(listOfCountries))
        var finalList={}
        async.forEachSeries(listOfCountries,
            function (country, callback){
                var avgQuery = avgWeatherIndQuery(country.isoCode,country.termId,country.industries);
                avgQuery.exec(function (err, results) {
                   if (err) return callback(err);
                   if(checkVariables(results)){
                        if(checkVariables(results[0]._id)&&checkVariables(results[0].avgVal)){
                            finalList[results[0]._id] = (results[0].avgVal.toFixed(2))/1;
                        }
                   }
                   callback(null);
                });
            },
            
            function (err) {
                if (err) return callback(err);
                console.log("Returning from list of countries");
                callback(null, finalList);
            });
        
    }
    ],
    function (err,results) {
                if (err) res.send(500, err);
                console.log("Returning the country list ");
                return res.json(200, results);
   });    
    
}  catch (err) {
        if (err){
            console.log("Error in fetching data");
            return res.send(500, err);
        }
    } 
    
}

exports.getCountriesforMap = function (req, res) {
try{
    var query = getCountriesforMapQuery();
    query.exec(function (err, listOfCountries) {
             
                if (err){ 
                    console.log('Error in getCOuntriesForMap'+JSON.stringify(err));
                    return callback(err);
                }
                
               // console.log('listOfCountries'+JSON.stringify(listOfCountries));
                var finalList={};
                
                for (var i = 0; i< listOfCountries.length; i++){
                    //console.log('listOfCountries[i]._id.isoCode'+listOfCountries[i]._id.isoCode);
                    //console.log('(listOfCountries[i].avgVal.toFixed(2))/1'+(listOfCountries[i].avgVal.toFixed(2))/1);
                    finalList[listOfCountries[i]._id.isoCode] = (listOfCountries[i].avgVal.toFixed(2))/1;
                }
 
              //console.log('Final List'+JSON.stringify(finalList));
                return res.json(200, finalList);
            }, function(err){
                if (err) return callback (err);
                callback(null,finalList);
            })
}  catch (err) {
        if (err){
            console.log("Error in fetching data in getCountriesforMap " + JSON.stringify(err));
            return res.send(500, err);
        }
    } 
    
}

exports.avgIndustries = function (req, res) {
  var industryName;
  var errorMsg;
  if (!checkVariables(req) || !checkVariables(req.params.industryName)) {
    errorMsg = new Error('Invalid industry name');
    console.error(errorMsg.message);
    return res.send(500, errorMsg);;
  }

  // Get the inputs to the function and store it local variables for later use
  industryName = req.params.industryName;
try{
    var query = industryAllCountries(industryName);
    async.waterfall([
    function (callback) {
        try {
             query.exec(function (err, listOfCountries) {
                if (err) return callback(err);
                callback(null, listOfCountries);
              });
        } catch (err) {
              if (err) return callback(err);
        }
    },
    
    function (listOfCountries,callback){
        var finalList={}
        async.forEachSeries(listOfCountries,
            function (country, callback){
                var avgQuery = avgIndustryWeatherQuery(country._id,country.maxTermId,industryName);
                avgQuery.exec(function (err, results) {
                   if (err) return callback(err);
                   if(checkVariables(results)){
                        if(checkVariables(results[0]._id)&&checkVariables(results[0].avgVal)){
                            finalList[results[0]._id] = (results[0].avgVal.toFixed(2))/1;
                        }
                   }
                   callback(null);
                });
            },
            
            function (err) {
                if (err) return callback(err);
                console.log("Returning from list of countries");
                callback(null, finalList);
            });
        
    }
    ],
    function (err,results) {
                if (err) res.send(500, err);
                console.log("Returning the country list ");
                return res.json(200, results);
   });    
    
}  catch (err) {
        if (err){ 
        console.log("Error in fetching data");
        return res.send(500, err);
        }
    } 
    
}



exports.industryCountryEL = function (req, res) {
  console.log('I am here to fetch data');
  var industryName;
  var countryName;
  var errorMsg;
  if (!checkVariables(req) || !checkVariables(req.params.industryName)|| !checkVariables(req.params.countryName)) {
    errorMsg = new Error('Invalid input data');
    console.error(errorMsg.message);
    return res.send(500, errorMsg);
  }

  // Get the inputs to the function and store it local variables for later use
  industryName = req.params.industryName;
  countryName  = req.params.countryName;
  console.log('Industry:'+industryName);
  console.log('Country:'+countryName);
  try{
    var query = industryForCountry(industryName,countryName);
    
    query.exec(function (err, listOfValues) {
                if (err) return res.send(500, err);
                if(checkVariables(listOfValues)&&listOfValues.length>0){
                    for(var i=0;i<listOfValues.length;i++){
                        listOfValues[i].meanEL = listOfValues[i].meanEL.toFixed(2)/1;
                        console.log(listOfValues[i].meanEL);
                    }
                }
                console.log(JSON.stringify(listOfValues));
                return res.json(200, listOfValues);
              });
  }
  catch (err) {
        if (err){ 
        console.log("Error in fetching data");
        return res.send(500, err);
        }
    } 
}

exports.getBuyerAggrCLA = function(req,res){ 
  var returnArr=[];
  var countryName;
  var country;
  var currentRound=0;
  var errorMsg;
  var strategyName='No';
  var teamId;
  if (!checkVariables(req) || !checkVariables(req.params.countryName)) {
    errorMsg = new Error('Invalid country name');
    console.error(errorMsg.message);
    return res.send(500, errorMsg);;
  }
 
countryName = req.params.countryName;
currentRound = parseInt(req.params.currentRound);
teamId = req.user.id;
console.log('TeamId'+teamId);
console.log('Inside getbuyerAggrCLA'+currentRound);
try{
    var queryCountryName = getCountryName(countryName);
    
    queryCountryName.exec(function(err,countryData){
        country = typeof(countryData[0]) == 'undefined' ? null : countryData[0].country;
        console.log('country'+country);

    var query = industryAggrCountries(countryName);
    
    query.exec(function (err, listOfValues) {
                if (err) return res.send(500, err);
                if(checkVariables(listOfValues)&&listOfValues.length>0){
                console.log("List Of Vals"+JSON.stringify(listOfValues));
                var count = 1;
                async.forEachSeries(listOfValues,
                    function(value, callback) {
                        var returnJSON={};
                        var queryWeather = avgIndustryWeatherQueryUsingCountryISO(countryName, value._id);
                        console.log('Country name: '+country+' Industry: '+value._id+' currentRound: '+currentRound);
                        var querygetRiskStrategy = getRiskStrategy(currentRound,country,value._id,teamId);
                        querygetRiskStrategy.exec(function (err,team) {
                             if(team[0] != null){   
                                console.log('Strategy >>>>'+JSON.stringify(team[0].riskStrategy.strategyName));
                                strategyName = team[0].riskStrategy.strategyName;
                             }else{
                                console.log('Strategy not present>>>>');
                                strategyName = 'No';
                             }
                             if (err) return callback(err);
                             
                             queryWeather.limit(1).exec(function(err,resultSet){
                             if (err) return callback(err);
                             returnJSON["id"] = count;
                             returnJSON["industry"] = value._id;
                             returnJSON["cla"] = value.cla;
                             if(checkVariables(resultSet[0]) && checkVariables(resultSet[0].termData) && 
                                        checkVariables(resultSet[0].termData.weatherSymbolRating)){
                             returnJSON["weather"] = resultSet[0].termData.weatherSymbolRating;
                             returnJSON["strategyName"] = strategyName;
                             }
                             returnArr.push(returnJSON);
                             count = count + 1;
                             callback(null);
                        });
                      });
                  },
                  function(err) {
                  if (err) return res.send(500, err);
                  return res.send(200,returnArr);
                  });
              }else{
                  return res.send(200,returnArr);
              }
    });
  });
}catch (err) {
        if (err){ 
        console.log("Error in fetching data");
        return res.send(500, err);
        }
    } 
}