'use strict';

angular.module('atpexpApp')
  .controller('MiniDashCtrl', function ($scope,$http,$rootScope,Team,Round) {
    
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

    $http.get('/api/team/0/miniDashboardInfo').success( function (miniDashboardInfo){
            $rootScope.miniDashboardInfo=miniDashboardInfo;                          
           
          });

    //code to get Current Round
    Round.currentRound(function (currentRound) {
      var currentRoundRecord = currentRound;
      if(currentRoundRecord!=null && currentRoundRecord.round>0){
        $scope.currentRoundNumber =currentRoundRecord.round;
      }else{
        console.log("Error loading current round ");
        toastr.error("Error: Currently no details are available for current round. Request to initiate.");
      }
    });

   //Code added to handle mini dashboard icons right, up and down arrow     
    $scope.getRoundLevelInfo= function (round){
      //$scope.roundLevelInformation;
      var roundId = {id:round};
      Team.roundLevelInformation(roundId).$promise.then ( function(info){
      return $scope.roundLevelInformation =  info.roundLevelInformation[0];
       console.log('roundlevelInformation :' +JSON.stringify($scope.roundLevelInformation)); 
            
     });          
     
     /* for ( var i = 0 ; i<$rootScope.team.roundLevelInformation.length; i++){
        console.log('...'+$rootScope.team.roundLevelInformation[i].round);
        if ($rootScope.team.roundLevelInformation[i].round===round){
          return $rootScope.team.roundLevelInformation[i];
        }
      }*/
     
    }

    
    /*$http.get('/api/rounds/currentRound').success(function(round){      
      $scope.round = round;
      console.log ('CURRENT ROUND IS : '+ round.round);
      var iconArray =["fa fa-arrow-circle-right","fa fa-arrow-circle-up","fa fa-arrow-circle-down"];
      if (round.round===1){
        $scope.capitalIcon='';
        $scope.claimsIcon ='';
        $scope.acceptanceRateIcon=''; 
        $scope.customersIcon='';
        $scope.experienceScoreIcon=''; 
        $scope.rankingIcon = '';
        var roundLevelInfo = $scope.getRoundLevelInfo(round.round);
        $scope.rankingPosition = roundLevelInfo.rankingPosition;
        $scope.experienceScore = roundLevelInfo.experienceScore;
        $scope.claims = roundLevelInfo.claims;
        $scope.capital = roundLevelInfo.capital;
        $scope.customers = roundLevelInfo.customers;
        $scope.premium = roundLevelInfo.premium;
        console.log ('CURRENT ROUND IS || : '+ round.round);    
      }else if (round.round===2){
        $scope.capitalIcon='';
        $scope.claimsIcon ='';
        $scope.acceptanceRateIcon=''; 
        $scope.customersIcon='';
        $scope.experienceScoreIcon=''; 
        $scope.rankingIcon = '';
        var roundLevelInfo = $scope.getRoundLevelInfo(round.round);
        $scope.rankingPosition = roundLevelInfo.rankingPosition;
        $scope.experienceScore = roundLevelInfo.experienceScore;
        $scope.claims = roundLevelInfo.claims;
        $scope.capital = roundLevelInfo.capital;
        $scope.customers = roundLevelInfo.customers;
        $scope.premium = roundLevelInfo.premium;
        console.log ('CURRENT ROUND IS || : '+ round.round);    
      }else if(round.round>2){
        console.log ('CURRENT ROUND IS :>2 '+ round.round);
        var currentRoundLevelInfo = $scope.getRoundLevelInfo(round.round);
        var previousRoundLevelInfo=$scope.getRoundLevelInfo(round.round -1);
        $scope.rankingPosition = previousRoundLevelInfo.rankingPosition;
        $scope.experienceScore = previousRoundLevelInfo.experienceScore;
        $scope.claims = previousRoundLevelInfo.claims;
        $scope.capital = previousRoundLevelInfo.capital;
        $scope.customers = previousRoundLevelInfo.customers;
        $scope.premium = previousRoundLevelInfo.premium;
        console.log ('currentRoundLevelInfo : '+ JSON.stringify(currentRoundLevelInfo));
        console.log ('previousRoundLevelInfo : '+ JSON.stringify(previousRoundLevelInfo));

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

      //logic rankingPosition
       if (currentRoundLevelInfo.rankingPosition> previousRoundLevelInfo.rankingPosition){
        $scope.rankingIcon=iconArray[2];
      }
      else  if (currentRoundLevelInfo.rankingPosition< previousRoundLevelInfo.rankingPosition){
        $scope.rankingIcon=iconArray[1];
      }
      else{
        $scope.rankingIcon=iconArray[0];
      }

    } //

  })   */

});