'use strict';

angular.module('atpexpApp')

  .controller('RankingCtrl', function ($scope, $rootScope, $http, Auth, Ranking, Round) {
    
	Round.currentRound(function(round){
		$rootScope.previousRound = round.round - 1;
		$rootScope.getCurrentTeam = Auth.getCurrentTeam;      
		$rootScope.loggedInTeam =  $rootScope.getCurrentTeam().teamCountry;
		$rootScope.loggedInTeamName =  $rootScope.getCurrentTeam().name;
		$rootScope.loggedInTeamRankForPreviousRound = $rootScope.getCurrentTeam().roundLevelInformation[$rootScope.previousRound].rankingPosition;
		$rootScope.loggedInTeamExpScoreRankForPreviousRound = $rootScope.getCurrentTeam().roundLevelInformation[$rootScope.previousRound].experienceScoreRankingPosition; 
		$rootScope.countryLevelTeamRankForPreviousRound = $rootScope.getCurrentTeam().roundLevelInformation[$rootScope.previousRound].rankingPosition;
		$rootScope.countryLevelTeamExpScoreRankForPreviousRound = $rootScope.getCurrentTeam().roundLevelInformation[$rootScope.previousRound].experienceScoreRankingPosition;
		Ranking.getAllTeamRankings({previousRoundNumber: $rootScope.previousRound}).$promise.then(function(rankingTeamsData){
			$rootScope.rankingTeams = rankingTeamsData;
		});
		
	});
    
    $scope.fontStyle = function(teamName) {
    	var color = "";
    	if (teamName == $scope.getCurrentTeam().name) {
    		color = "red";
    	}
    	return color;
    };
    
  })
