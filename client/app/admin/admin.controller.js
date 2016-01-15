'use strict';

angular.module('atpexpApp')
  .controller('AdminCtrl', function ($rootScope,$scope,Team,Round,$http, toastr) {
  Round.currentRound(function (currRound) {
              var currRoundRecord = currRound;
              if(currRoundRecord!=null && currRoundRecord.round>0){
                $scope.currRound =currRoundRecord;
                if(currRoundRecord.calculationFlag){
                  $scope.colorCalculated = 'success';
                }else{
                  $scope.colorCalculated = 'danger';
                }
              }else{
                console.log("Error loading current round ");
                toastr.error("Error: Currently no details are available for current round. Request to initiate.");
              }

    });

  Team.get(function(teamAdmin){
    $scope.disableCalculation = function(e){
        if(teamAdmin.role!='admin'){
         return true;
        }
        var currRoundVal = $scope.currRound;
        if(currRoundVal!=null){
          if(!currRoundVal.round>0){
            return true;
          }else if (currRoundVal.calculationFlag) {
            return true;
          }else{
            return false;
          }
        }else{
          return true;
        }
    }

    $scope.disableNextRound = function(e){
      if(teamAdmin.role!='admin'){
         console.log("I am here");
         return true;
      }
      var currRoundVal = $scope.currRound;
      if(currRoundVal!=null){
        if(currRoundVal.round>0 && currRoundVal.calculationFlag){
          console.log("I am here 1");
          return false;
        }else if (currRoundVal.round>0 && !currRoundVal.calculationFlag) {
          console.log("I am here 2");
          return true;
        }else{
          console.log("I am here 3");
          return false;
        }
      }else{
        console.log("I am here 4");
          return false;
      }
    }

    $scope.nextRound = function (rounds) {
      if(teamAdmin.role!='admin'){
         return ('You are not authorized for this function. Please contact admin');;
      }
      var existingRound = new Round($scope.currRound);
      existingRound.roundEndDate = new Date();
      if(existingRound.currentRoundFlag===true ){
        existingRound.currentRoundFlag = false;
      }
      existingRound.$update({ roundId: $scope.currRound.round });
      var currDate = new Date();
      var endDate = new Date();
      endDate.setDate(endDate.getDate()+15);

      var currRoundNum = 0;
      if(rounds!=null && rounds.round>0){
        var currRoundNum = rounds.round;
      }
      var nextRoundNum = currRoundNum + 1;
      var nextRoundName = "Round "+ nextRoundNum;
      var roundObj = {
        round: nextRoundNum,
        roundName: nextRoundName,
        roundStartDate: currDate,
        roundEndDate: endDate,
        currentRoundFlag:true,
        calculationFlag: false
      };
      //Round.save(roundObj);
      var newRound = new Round(roundObj);
      newRound.$save(function (newRoundObj) {
        $scope.currRound = newRoundObj;
      });
      $scope.colorCalculated = 'danger'


      toastr.info('New round, new chances.', 'Round ' + roundObj.round + '!');
      $scope.disabled = true;
    }

    $scope.calculateRound = function (round) {
      if(teamAdmin.role!='admin'){
         return ('You are not authorized for this function. Please contact admin');;
      }

    Round.calculateRound({"roundId":round.round},teamAdmin,function(calculation){
        if(calculation)toastr.success('Calculation completed successfully!!!');
        console.log("Successfully calculated"+calculation);
      },function(error){
          toastr.error(error.data.message);
      });
    };

  });
});
