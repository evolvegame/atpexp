'use strict';

angular.module('atpexpApp')
  .controller('MiniDashCtrl', function ($scope,$http,$rootScope) {
    
    $scope.exampleData = [
       {
           "key": "Capital",
           "values": [['Round 1',1],['Round 2',2],['Round 3',3],['Round 4',4],['Round 5',5],['Round 6',6],['Round 7',7],['Round 8',8]]
       }
    ];

    $scope.xAxisTickFormatFunction = function(){
        return function(d){
            return d3.time.format('%b')(new Date(d));
        }
    }

    $scope.chartColor = ['#5cb85c','#5cb85c','#5cb85c','#5cb85c','#5cb85c','#5cb85c','#5cb85c','#5cb85c']
    $scope.colorFunction = function() {
      return function(d, i) {
          return $scope.chartColor[i];
      };

    }

    //Code added to handle mini dashboard icons right, up and down arrow
    
    $scope.getRoundLevelInfo= function (round){
      for ( var i = 0 ; i<$rootScope.team.roundLevelInformation.length; i++){
        if ($rootScope.team.roundLevelInformation[i].round===round){
          return $rootScope.team.roundLevelInformation[i];
            }
          }
    }

    
    $http.get('/api/rounds/currentRound').success(function(round){      
    $scope.round = round;
    var iconArray =["fa fa-arrow-circle-right","fa fa-arrow-circle-up","fa fa-arrow-circle-down"];
    if (round.round===1){
    $scope.capitalIcon=iconArray[0];
    $scope.claimsIcon =iconArray[0];
    $scope.acceptanceRateIcon=iconArray[0]; 
    $scope.customersIcon=iconArray[0];
    $scope.experienceScoreIcon=iconArray[0]; 
    $scope.rankingIcon = iconArray[0];   
     
    }
    else{
      var currentRoundLevelInfo = $scope.getRoundLevelInfo(round.round);
      var previousRoundLevelInfo=$scope.getRoundLevelInfo(round.round -1);
      //logic capitalIcon
      if (currentRoundLevelInfo.capital> previousRoundLevelInfo.capital){
        $scope.capitalIcon=iconArray[1];
      }
      else if (currentRoundLevelInfo.capital< previousRoundLevelInfo.capital) {
        $scope.capitalIcon=iconArray[2];
      } else{
        $scope.capitalIcon=iconArray[0];
      }

      //logic claimsIcon
      if (currentRoundLevelInfo.claims> previousRoundLevelInfo.claims){
        $scope.claimsIcon=iconArray[1];
      }
      else if (currentRoundLevelInfo.claims< previousRoundLevelInfo.claims){
        $scope.claimsIcon=iconArray[2];
      }
      else{
        $scope.claimsIcon=iconArray[0];
      }

      //logic acceptanceRateIcon
      if (currentRoundLevelInfo.acceptanceRate> previousRoundLevelInfo.acceptanceRateIcon){
        $scope.acceptanceRateIcon=iconArray[1];
      }
      else if (currentRoundLevelInfo.acceptanceRate< previousRoundLevelInfo.acceptanceRateIcon){
        $scope.acceptanceRateIcon=iconArray[2];
      }
      else{
        $scope.acceptanceRateIcon=iconArray[0];
      }

      //logic customersIcon
      if (currentRoundLevelInfo.customers> previousRoundLevelInfo.customers){
        $scope.customersIcon=iconArray[1];
      }
      else if (currentRoundLevelInfo.customers< previousRoundLevelInfo.customers){
        $scope.customersIcon=iconArray[2];
      }
      else{
        $scope.customersIcon=iconArray[0];
      }

       //logic experienceScoreIcon
      if (currentRoundLevelInfo.experienceScore> previousRoundLevelInfo.experienceScore){
        $scope.experienceScoreIcon=iconArray[1];
      }
      else  if (currentRoundLevelInfo.experienceScore< previousRoundLevelInfo.experienceScore){
        $scope.experienceScoreIcon=iconArray[2];
      }
      else{
        $scope.experienceScoreIcon=iconArray[0];
      }

    }
   
    })    
    
  });