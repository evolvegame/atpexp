'use strict';

var _this = this;
var _ = require('lodash');
var Round = require('./round.model');
var Teams = require('../team/team.model');
var Customers=require('../customer/customer.model');
var async = require('async');
var Promise=require('bluebird');
var _expScorePoint=1000;
var _selfInsured = "_SelfInsured";

// Get list of rounds
exports.index = function (req, res) {
  Round.find(function (err, rounds) {
    if(err) { return handleError(res, err); }
    return res.json(200, rounds);
  });
};

exports.addRound=function(req,res){
  var newRound = new Round(req.body);
  newRound.save(function(err, round) {
    if (err) return validationError(res, err);
    return res.json(201, round);
  });
};


// Get current round
exports.currentRound = function (req, res) {
  console.log('Getting current round');
  Round.findOne({"currentRoundFlag":true},function (err, round){
    if (err) {
      return handleError(res, err);
    }
    if (!round) {
        return res.json(401);
    };
    console.log("Current round is -- "+round.currentRoundFlag);
    return res.json(round);
  });
};

//update currentRoundFlag and End Date for Curr Round
exports.endCurrRound = function (req,res){
  console.log("Ending the Current Round before creating new one");
  var currRoundId = req.params.entryId;
  // Find the current round and merge with the new values
  Round.findOne({"round":currRoundId}, function (err, round) {
    if (err) {
      console.error("Cannot find the current round to end"+err);
      return handleError(res, err);
    }
    if(!round) {
      console.error("Current round is not valid to end");
      return res.send(404);
    }
    var updated = _.merge(round, req.body);
    updated.save(function (err) {
      if (err) {
        console.error(
          "Current round cannot be ended due to technical issues"+err);
        return handleError(res, err);
      }
      return res.json(200, round);
    });
  });

  console.log("Ended Current Round successfully");
};

// Update current round document to set 'calculated' to 'true'
exports.calculateRound = function(req, res) {

  var toBeCalculatedRound = req.params.roundId;
  var teamAdmin=req.body;
  var error= new Error('User is not authorized for this function');
  console.log("Starting calculation for round ="+toBeCalculatedRound+" initiated by - "+teamAdmin.name );

  if(teamAdmin.role!='admin'){
    console.error('User is not authorized for this function');
    return handleErrors(res,error,403);
  };

  var allTeams;
  var allCustomers;
  var customerAllocation={};
  async.series([
   // validate first befor calculcation
   function(callback){
    validateRound(toBeCalculatedRound,function(err,round){
      if(err){
        return handleErrors(res,error,412);
      }
      var flag=round.currentRoundFlag;
      if(!flag){
        return handleErrors(res,error,412);
      }
      callback();
    });
    },
   // get Independent data
   function(callback){
        async.parallel([
          // Get All Customers
          function(callback){
            Customers.find().exec(function(err,customers){
              if(err){
                //have to do something
                console.log("In error"+err);
                callback(err);
              }
              else {
                callback(null,customers);
              }

            });
          },
          // Get all Teams
          function(callback){
            Teams.find({role: 'user',roundLevelInformation: {$elemMatch:{round:toBeCalculatedRound}}}).exec(function(err,teams){
            if(err){
                  console.log("Calculation: Error in finding teams");
                  callback(err);
            }else{
                  callback(null,teams);
            }
          });
        },

        function(callback){
          Teams.find({role: 'user',customer: {$elemMatch:{calculatedRound:toBeCalculatedRound}}}).exec(function(err,teams){
            console.log(err);
            if(err){
                  callback(null,"None to delete");
                  console.log("No values to delete");
            }else{
                  console.log("i am here 2");
                  if(teams!=null && !(teams===undefined) && teams.length>0){
                    console.log("i am here 3");
                    for(var i=0; i<teams.length; i++){
                      var teamId = teams[i]._id;
                      Teams.findById(teamId,function(err,team){
                        if(err){
                          callback(err);
                        }
                        var customers = team.customer;
                        if(customers!=null && !(customers===undefined) && customers.length>0){
                          for(var j=0; j<customers.length;j++){
                            var customer = customers[j];
                            var customerId = customer._id;
                            if(customer.calculatedRound!=null &&
                                  !(customer.calculatedRound===undefined) &&
                                      customer.calculatedRound == toBeCalculatedRound){
                                customers.pull(customerId);
                                team.save(function(err){
                                  if(err){
                                    callback(err);
                                  }else{
                                    callback(null,"Success");
                                  }
                                });
                            }
                          }
                        }


                      });
                    }
                  }
                  callback(null,"None to delete");
            }
         });
        }
      ],
        function(err,results){
          if(err){
            console.log("Error in parrallel processing");
          }else{
               allCustomers = results[0];
               for(var i=0;i<allCustomers.length;i++){
                 var customer = allCustomers[i];
                 var customerName = customer.name;
                 console.log(customerName);
                 var minOfferScore = customer.minOfferScore;
                 var customerAllocDetails={};

                 customerAllocDetails['allocatedTo']=_selfInsured;
                 customerAllocDetails['winningScore']= minOfferScore;

                 var customerDetailsJSON={};
                 customerDetailsJSON['businessRevenue']=customer.revenue;
                 customerDetailsJSON['businessCountry']=customer.country;
                 customerDetailsJSON['businessrisk']=customer.businessRisk;
                 customerDetailsJSON['experiencescoreneeded']=customer.experienceScoreNeeded;
                 //customerAllocDetail['totalPremium']=customer.revenue; // to be clarified and added
                 //customerAllocDetail['totalClaims']=customer.revenue; // to be clarified and added
                 customerDetailsJSON['buyerPortfolio']=customer.buyerPortfolio;

                 customerAllocDetails['CustomerDetails']=customerDetailsJSON;
                 customerAllocation[customerName]=customerAllocDetails;
               }
               allTeams =results[1];
          }
          callback();
        });
      },
      function(callback){

            var expScores=[];
            var teamCalcJSON={};

            async.forEach(allTeams,function(team,callback){
              var _1_teamName = team.name;
              var expScoreAmtJSON={};
              var roundInformation = team.roundLevelInformation;
              var roundInformation_Id;
              var points = 0;
              if(roundInformation!=null && !(roundInformation===undefined)){
                for(var k=0; k<roundInformation.length;k++){
                  var currRoundInfo= roundInformation[k];
                  if(currRoundInfo!=null &&
                      !(currRoundInfo===undefined)&&
                        currRoundInfo.round==toBeCalculatedRound){
                          roundInformation_Id = currRoundInfo._id;
                          if(currRoundInfo.experienceScoreAmount!=null
                                  && !(currRoundInfo.experienceScoreAmount===undefined)){
                                    points=currRoundInfo.experienceScoreAmount/(_expScorePoint);
                                    expScores.push(points);
                                    expScoreAmtJSON['Points']=points;
                                    break;
                                  }
                          else{
                            points=0;
                            expScores.push(points);
                            expScoreAmtJSON['Points']=0;
                            break;
                          }
                        }
                }
                Teams.update({"roundLevelInformation._id":roundInformation_Id},
                    {$set: {"roundLevelInformation.$.experienceScore": points}},function(err){
                      if(err){
                        console.log("In error 2"+err);
                      }
                    });

              }
              teamCalcJSON[_1_teamName]=expScoreAmtJSON;
            });

            console.log(teamCalcJSON);

            var rankJSON = expScoreRanking(expScores);
            console.log(rankJSON);
            var scorePoint = expScorePointCalculation(rankJSON);

            var offerGroupJSON={};

            async.forEach(allTeams,function(team,callback){
                var _2_teamName = team.name;
                var teamId = team._id;
                var teamPoints = teamCalcJSON[_2_teamName].Points;
                //console.log(teamPoints);
                var expScorePoint = scorePoint[teamPoints];
                console.log("expScorePoint for "+_2_teamName+" is ="+expScorePoint)
                var offerArr = team.offer;
                var roundInformation = team.roundLevelInformation;
                var roundPremium=0;
                var roundCld=0;
                var businessName;
                var intermediateJSON={};
                if(offerArr!=null && !(offerArr===undefined)){
                  for(var j=0;j<offerArr.length;j++){
                    var currOffer = offerArr[j];
                    var currOfferId=currOffer._id;
                    //console.log('currentOfferId='+currOfferId);
                    if(currOffer!=null &&
                        !(currOffer===undefined) &&
                          currOffer.round==toBeCalculatedRound){
                      if(currOffer.premium!=null &&
                            !(currOffer.premium===undefined)
                              && currOffer.premium>0){
                        roundPremium=currOffer.premium;
                      }
                      if(currOffer.cld!=null &&
                            !(currOffer.cld===undefined)
                              && currOffer.cld>0){
                        roundCld=currOffer.cld;
                      }
                      if(currOffer.marketBusinessName!=null &&
                            !(currOffer.marketBusinessName===undefined)){
                        businessName=currOffer.marketBusinessName;
                        console.log(businessName);
                      }
                      var offerScore=0;
                      if(roundPremium>0){
                        offerScore=(roundCld/roundPremium)*expScorePoint;
                        console.log(_2_teamName+" -- "+businessName+" -- "+offerScore)
                      }

                      Teams.update({"offer._id":currOfferId},
                          {$set: {"offer.$.offerScore": offerScore}},function(err){
                            if(err){
                              console.log("In error 2"+err);
                            }
                          });

                      if(customerAllocation!=null && !(customerAllocation===undefined)){
                         if(customerAllocation[businessName]!=null &&
                           !(customerAllocation[businessName]===undefined)){
                             if(customerAllocation[businessName].winningScore<offerScore){
                               customerAllocation[businessName].allocatedTo=_2_teamName;
                               customerAllocation[businessName].winningScore=offerScore;
                             }
                         }
                      }
                    }
                  }
                }
             });

            //  async.forEach(customerAllocation,function(customerToAlloc,callback){
            //    console.log("I am here")
            //    if(customerToAlloc!=null &&
            //         !(customerToAlloc===undfined &&
            //             !(customerToAlloc.allocatedTo==_selfInsured))){
            //               console.log("values are"+customerToAlloc.allocatedTo);
            //         }
            //  });

             callback();
          },

          function(callback){
            var allKeys=[];
            for(var key in customerAllocation){
              if (customerAllocation.hasOwnProperty(key)) {
                allKeys.push(key);
              }
            }
              async.forEach(allKeys,function(key,callback){
                  var _customerValues = customerAllocation[key];
                  var teamName = _customerValues.allocatedTo;
                  var _customerDetails = _customerValues.CustomerDetails;
                  var previousWonTeam;

                  Teams.findOne({role: 'user',customer: {$elemMatch:{'businessName':key,'agreement.status':'Active'}}}).exec(function(err,team){
                    if(err){
                      console.log("error in update");
                    }else if(team!=null && !(team===undefined)){
                      var customers = team.customer;
                      var customerId;

                      for(var i=0; i<customers.length;i++){
                          if(customers[i].businessName == key &&
                                        customers[i].agreement.status=='Active'){
                                          customerId = customers[i]._id;
                                          break;
                                        }
                      }
                      if(team.name == teamName){
                        if(customerId!=null && !(customerId===undefined)){
                          Teams.update({"customer._id":customerId},
                              {$set: {"customer.$.calculatedRound": toBeCalculatedRound}},function(err){
                                if(err){
                                  console.log("In error 2"+err);
                                }
                              });
                        }
                      }else {
                        previousWonTeam=team.name;
                        Teams.update({"customer._id":customerId},
                            {$set: {"customer.$.lostTo": teamName, "customer.$.lostIn": toBeCalculatedRound,
                                            "customer.$.agreement.status": "Closed"}},function(err){
                              if(err){
                                console.log("In error 2"+err);
                              }
                            });
                        Teams.findOne({role: 'user',name:teamName},function(err,newTeam){
                          if(err){
                            console.log("In error "+err);
                          }else if(newTeam!=null && !(newTeam===undefined)){
                            var newCustomer;
                            var newCustomerId;
                            var newOffer;
                            if(newTeam.customer!=null &&!(newTeam.customer===undefined)){
                            var newCustomer = newTeam.customer;
                            }
                            if(newTeam.offer!=null &&!(newTeam.offer===undefined)){
                            var newOffer = newTeam.offer;
                            }
                            for(var i=0; i<newCustomer.length;i++){
                                if(newCustomer[i].businessName == key &&
                                              newCustomer[i].agreement.status=='Closed'){
                                                newCustomerId = newCustomer[i]._id;
                                                break;
                                              }
                            }
                            var newPremium = 0;
                            var newPremiumPct =0;
                            for(var j=0; j<newOffer.length;j++){
                              if(newOffer[j].round!=null && !(newOffer[j].round === undefined)
                                        && newOffer[j].marketBusinessName != null &&  !(newOffer[j].marketBusinessName  === undefined)){
                                          if(newOffer[j].round == toBeCalculatedRound &&  newOffer[j].marketBusinessName == key){
                                            newPremium = newOffer[j].premium;
                                            newPremiumPct = newOffer[j].premiumPercentage;
                                          }
                                        }
                            }
                            if(newCustomerId!=null && !(newCustomerId===undefined)){
                              Teams.update({"customer._id":newCustomerId},
                                  {$set: {"customer.$.wonFrom": teamName, "customer.$.wonRound": toBeCalculatedRound,
                                                  "customer.$.lostTo": "",
                                                  "customer.$.lostIn": 0,
                                                  "customer.agreement.$.status": "Active"}},function(err){
                                    if(err){
                                      console.log("In error 2"+err);
                                    }
                                  });

                            }else{
                              var agreementDetails=initializeAgreement(newPremium,newPremiumPct);
                              newTeam.customer.push({
                                  businessName: key,
                                  businessRevenue: customerAllocation[key].CustomerDetails.businessRevenue,
                                  businessCountry: customerAllocation[key].CustomerDetails.businessCountry,
                                  businessrisk: customerAllocation[key].CustomerDetails.businessrisk,
                                  experiencescoreneeded: customerAllocation[key].CustomerDetails.experiencescoreneeded,
                                  buyerPortfolio:customerAllocation[key].CustomerDetails.buyerPortfolio,
                                  wonRound: toBeCalculatedRound,
                                  wonFrom: previousWonTeam,
                                  lostTo:"",
                                  lostIn:0,
                                  calculatedRound:toBeCalculatedRound,
                                  agreement:agreementDetails
                                });

                                newTeam.save(function(err){
                                  if(err){
                                    console.log("Error in saving"+err);
                                  }
                                });
                            }

                          }

                        });
                      }
                      return team;
                    }else{
                      Teams.findOne({role: 'user',name:teamName},function(err,newTeam){
                        if(err){
                          console.log("In error "+err);
                        }else if(newTeam!=null && !(newTeam===undefined)){
                            var newCustomer;
                            var newOffer;

                            if(newTeam.offer!=null &&!(newTeam.offer===undefined)){
                            var newOffer = newTeam.offer;
                            }

                            var newPremium = 0;
                            var newPremiumPct =0;
                            for(var j=0; j<newOffer.length;j++){
                              if(newOffer[j].round!=null && !(newOffer[j].round === undefined)
                                        && newOffer[j].marketBusinessName != null &&  !(newOffer[j].marketBusinessName  === undefined)){
                                          if(newOffer[j].round == toBeCalculatedRound &&  newOffer[j].marketBusinessName == key){
                                            newPremium = newOffer[j].premium;
                                            newPremiumPct = newOffer[j].premiumPercentage;
                                          }
                                        }
                            }

                            // claims to be done
                            var agreementDetails=initializeAgreement(newPremium,newPremiumPct);
                            newTeam.customer.push({
                                businessName: key,
                                businessRevenue: customerAllocation[key].CustomerDetails.businessRevenue,
                                businessCountry: customerAllocation[key].CustomerDetails.businessCountry,
                                businessrisk: customerAllocation[key].CustomerDetails.businessrisk,
                                experiencescoreneeded: customerAllocation[key].CustomerDetails.experiencescoreneeded,
                                buyerPortfolio:customerAllocation[key].CustomerDetails.buyerPortfolio,
                                wonRound: toBeCalculatedRound,
                                wonFrom: previousWonTeam,
                                lostTo:"",
                                lostIn:0,
                                calculatedRound:toBeCalculatedRound,
                                agreement:agreementDetails
                              });
                              newTeam.save(function(err){
                                if(err){
                                  console.log("Error in saving 2"+err);
                                }
                              });
                        }
                      });
                    }


                  });
              });

            callback();
          }
      ],
      function(err,results){
        console.log("Calculation completed successfully");
      });
  // if(req.body._id) { delete req.body._id; }
  // Round.findById(req.params.id, function (err, round) {
  //   if (err) { return handleError(res, err); }
  //   if(!round) { return res.send(404); }
  //   var updated = _.merge(round, req.body);
  //   updated.save(function (err) {
  //     if (err) { return handleError(res, err); }
  //     // run your function upon 'calculated' update
  //     calculateCurrentRound(res, round); // todo: setup callback function
  //
  //     return res.json(200, round);
  //   });
  // });
};

function handleError (res, err) {
  return res.send(500, err);
}

/**
 * ENGINE STARTS HERE
 */

function handleNextRound (round) {
  var startMsg = 'Initiating round ' + round.currentRound;
  console.log(startMsg); // look in the terminal where you ran grunt serve
}

function calculateCurrentRound (res, round) {
  Round.findById(round._id, function (err, round) {
    if (err) { return handleError(res, err)}
    if (!round) {return res.send(404)}
    round.calculated = true;
    round.save(function (err) {
      if (err) {return handleError(res, err); }
      return true; // callback value
    });
  });
}

function validateRound(currentRound,callback){
      Round.findOne({"round":currentRound}).exec(function (err, round){
        if(err){
          callback(err);
        }else{
          if(!round){
            console.log("I am here 1");
            callback(new Error("error"));
          }else{
             console.log("I am here skdfakjsfh"+round);
             callback(null,round);
          }
        }
      });
  }

function handleErrors(res, err,errorCode) {
  if(errorCode==403){
    return res.send(403, err);
  }
  if(errorCode==412){
    return res.send(412, err);
  }

}


function expScoreRanking(expScores) {
  var rankJSON={};
  var sorted = expScores.slice().sort(function(a,b){return b-a});
  var ranks = expScores.slice().map(function(v){
         var rankIndex = sorted.indexOf(v)+1;
         if(rankJSON!=null && !(rankJSON===undefined)){
           if(rankJSON.rankIndex == null || rankJSON.rankIndex===undefined){
             rankJSON[rankIndex]=v;
           }
         }
         return rankIndex;
  });
  return rankJSON;
}

function expScorePointCalculation(expScores){
    var returnJSON={};
    var arrVal=[];
    for(key in expScores){
      arrVal.push(expScores[key]);
    }
    var keys=Object.keys(expScores);
    var len=keys.length;
    arrVal.sort(function(a,b){return b-a});
    if(len==1){
      var key=arrVal[0];
      returnJSON[key]=1;
    }
    else {
      var medianPoint=5;

      if(len<11){
        medianPoint= Math.round(len / 2);
      }

      var score= (medianPoint * 0.01)+1.01;
      var i=0;
      for(i;i<=medianPoint;i++){
        var keyVal=arrVal[i];
        score = score - 0.01;
        returnJSON[keyVal]=score;
      }

      var j = i;
      if(medianPoint<5){
        j=0;
        for(j;j>=(len-medianPoint);j++){
          var keyVal=arrVal[j];
          score=1;
          returnJSON[keyVal]=score;
        }
      }else{
        for(j;j<(len-medianPoint);j++){
          var keyVal=arrVal[j];
          score=1;
          returnJSON[keyVal]=score;
        }
      }
      var k = j;
      if(medianPoint<5){
        k=j+i;
      }
      for(k;k<len;k++){
        var keyVal=arrVal[k];
        score = score - 0.01;
        returnJSON[keyVal]=score;
      }
    }
    // debug purposes enable the code below
    // for(key in returnJSON){
    //   console.log("Iamhere for "+key+" = "+returnJSON[key]);
    // }
    // //console.log("Iamhere"+returnJSON);

    return returnJSON;
}


function deleteCurrRoundCustomers(toBeCalculatedRound){
  //console.log("I am in deleteCurrRoundCustomers");
  var result = Teams.find({role: 'user',customer: {$elemMatch:{calculatedRound:toBeCalculatedRound}}}).exec(function(err,teams){
    if(err){
          return 0;
    }else{
          if(teams!=null && !(teams===undefined) && teams.length>0){
            for(var i=0; i<teams.length; i++){
              var teamId = teams[i]._id;
              Teams.findById(teamId,function(err,team){
                var customers = team.customer;
                if(customers!=null && !(customers===undefined) && customers.length>0){
                  for(var j=0; j<customers.length;j++){
                    var customer = customers[j];
                    var customerId = customer._id;
                    if(customer.calculatedRound!=null &&
                          !(customer.calculatedRound===undefined) &&
                              customer.calculatedRound == toBeCalculatedRound){
                        customers.pull(customerId);
                        team.save(function(err){
                          if(err){
                            return 0;
                          }else{
                            return 1;
                          }
                        });
                    }
                  }
                }
              });
            }
          }

    }
 });
  //console.log("--Completed Delete Functionality--"+result);
  return result;
}

function initializeAgreement(newPremium,newPremiumPct){

  var agreement={};
  agreement['premium']=newPremium;
  agreement['premiumPercentage']=newPremiumPct;
  agreement['riskStrategyId']=1;
  agreement['status']="Active";
  return agreement;
}
