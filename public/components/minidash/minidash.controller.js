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

   //Code added to getRoundLevelInfo     
   $scope.getRoundLevelInfo= function (round){
      //$scope.roundLevelInformation;
      var roundId = {id:round};
      Team.roundLevelInformation(roundId).$promise.then ( function(info){
        return $scope.roundLevelInformation =  info.roundLevelInformation[0];
      });   

   }

   $http.get('/api/gamecontrol').success(function(messages){
						$scope.singleplayermode = messages[0].singleplayermode;
          });

  });