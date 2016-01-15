'use strict';

angular.module('atpexpApp')

  .controller('RankingCtrl', function ($scope, $rootScope, $http, Auth, Ranking, Round, Team, $window) {
    
	Round.currentRound(function(round){
		$rootScope.previousRound = round.round - 1;
		$rootScope.getCurrentTeam = Auth.getCurrentTeam;      
		$rootScope.loggedInTeam =  $rootScope.getCurrentTeam().teamCountry;
		$rootScope.loggedInTeamName =  $rootScope.getCurrentTeam().name;
		Team.roundLevelInformation({id: ($rootScope.previousRound == 0 ? 1 : $rootScope.previousRound)}).$promise.then(function(previousRoundLevelInformatiom){
			$rootScope.loggedInTeamRankForPreviousRound = previousRoundLevelInformatiom.roundLevelInformation[0].rankingPosition;
			$rootScope.loggedInTeamExpScoreRankForPreviousRound = previousRoundLevelInformatiom.roundLevelInformation[0].experienceScoreRankingPosition; 
			$rootScope.countryLevelTeamRankForPreviousRound = previousRoundLevelInformatiom.roundLevelInformation[0].countryLevelRankingPosition;
			$rootScope.countryLevelTeamExpScoreRankForPreviousRound = previousRoundLevelInformatiom.roundLevelInformation[0].CountryLevelExperienceScoreRankingPosition;
			Ranking.getAllTeamRankings({previousRoundNumber: $rootScope.previousRound}).$promise.then(function(rankingTeamsData){
				$rootScope.rankingTeams = rankingTeamsData;
			});
		});
		
	});
    
    $scope.fontStyle = function(teamName) {
    	var color = "";
    	if (teamName == $scope.getCurrentTeam().name) {
    		color = "red";
    	}
    	return color;
    };
    
    $scope.clickTeamRow = function (teamName) {
    	if (teamName == $scope.getCurrentTeam().name) {
    		$window.location.href = "/";
    	}
    };
    
  })
