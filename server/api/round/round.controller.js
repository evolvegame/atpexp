'use strict';

var _this = this;
var _ = require('lodash');
var Round = require('./round.model');
var Teams = require('../team/team.model');
var async = require('async');
var Promise=require('bluebird');
var expScorePoint=1000;

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
  async.series([
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
   function(callback){
    Teams.find({role: 'user',roundLevelInformation: {$elemMatch:{roundNumber:toBeCalculatedRound}}}).exec(function(err,teams){
        if(err){
          console.log("Calculation: Error in finding teams");
        }

        allTeams = teams;
        var expScores=[];
        var teamCalcJSON={};

        async.forEach(allTeams,function(team,callback){
          var _1_teamName = team.name;
          var expScoreAmtJSON={};
          var roundInformation = team.roundLevelInformation;
          if(roundInformation!=null && !(roundInformation===undefined)){
            for(var k=0; k<roundInformation.length;k++){
              var currRoundInfo= roundInformation[k];
              if(currRoundInfo!=null &&
                  !(currRoundInfo===undefined)&&
                    currRoundInfo.roundNumber==toBeCalculatedRound){
                      if(currRoundInfo.experienceScoreAmount!=null
                              && !(currRoundInfo.experienceScoreAmount===undefined)){
                                var points=currRoundInfo.experienceScoreAmount/expScorePoint;
                                expScores.push(points);
                                expScoreAmtJSON['Points']=points;
                                break;
                              }
                      else{
                        expScores.push(0);
                        expScoreAmtJSON['Points']=0;
                        break;
                      }
                    }
            }
          }
          teamCalcJSON[_1_teamName]=expScoreAmtJSON;
        });

        //console.log(teamCalcJSON);

        var rankJSON = expScoreRanking(expScores);
        //console.log(rankJSON);
        var scorePoint = expScorePointCalculation(rankJSON);

        async.forEach(allTeams,function(team,callback){
            var _2_teamName = team.name;
            var teamPoints = teamCalcJSON[_2_teamName].Points;
            //console.log(teamPoints);
            var expScorePoint = scorePoint[teamPoints];
            console.log("expScorePoint for "+_2_teamName+" is ="+expScorePoint)
            var offerArr = team.offer;
            var roundInformation = team.roundLevelInformation;
            var roundPremium=0;
            var roundCld=0;
            var intermediateJSON={};
            if(offerArr!=null && !(offerArr===undefined)){
              for(var j=0;j<offerArr.length;j++){
                var currOffer = offerArr[j];
                if(currOffer!=null &&
                    !(currOffer===undefined)&&
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
                  if(roundPremium>0){
                    var offerScore=(roundCld/roundPremium)*expScorePoint;
                  }

                }
              }
            }

            intermediateJSON['Premium']=roundPremium;
            intermediateJSON['CLD']=roundCld;


            teamCalcJSON[_1_teamName]=intermediateJSON;
            //console.log("Premium value for the round = "+teamCalcJSON);
            //console.log("cld value for the round= "+roundCld)

            //console.log("Intermediate Value = "+intermediateVal);

         });

        callback();
    });
  }
]);
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
    console.log("expScores"+expScores)
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
    for(key in returnJSON){
      console.log("Iamhere for "+key+" = "+returnJSON[key]);
    }
    // //console.log("Iamhere"+returnJSON);

    return returnJSON;
}
