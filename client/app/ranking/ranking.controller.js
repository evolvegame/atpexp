'use strict';

angular.module('atpexpApp')

  .controller('RankingCtrl', function ($scope, $rootScope, $http, Auth,Team) {
    
	$http.get('/api/rounds/currentRound').success(function(round){  
		$scope.currentRound = round.round;
		$rootScope.previousRound = $scope.currentRound - 1; 
    });
	  
    $http.get('/api/team').success(function (teams) {
      console.log(teams)
      $scope.objects = teams
      $scope.totalItems = $scope.objects.length;
      $scope.currentPage = 1;
      $scope.numPerPage = 5;
      $scope.getCurrentTeam = Auth.getCurrentTeam;      
      $scope.loggedInTeam =  $scope.getCurrentTeam().teamCountry;
      $scope.loggedInTeamName =  $scope.getCurrentTeam().name;
      $scope.loggedInTeamRankForPreviousRound = $scope.getCurrentTeam().roundLevelInformation[$rootScope.previousRound].rankingPosition;
      $scope.loggedInTeamExpScoreRankForPreviousRound = $scope.getCurrentTeam().roundLevelInformation[$rootScope.previousRound].experienceScoreRankingPosition;
      

      
      $scope.paginate = function(value) {
        var begin, end, index;
        begin = ($scope.currentPage - 1) * $scope.numPerPage;
        end = begin + $scope.numPerPage;
        index = $scope.objects.indexOf(value);
        return (begin <= index && index < end);
      };
    });
    
    $scope.fontStyle = function(teamName) {
    	var color = "";
    	if (teamName == $scope.getCurrentTeam().name) {
    		color = "red";
    	}
    	return color;
    };

  })
