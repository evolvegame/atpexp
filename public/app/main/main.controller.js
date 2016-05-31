'use strict';



angular.module('atpexpApp')
  .controller('MainCtrl', function ($scope, $rootScope, $http, Customer, Auth, Ranking, Round, Team, $window, DTOptionsBuilder) {
    

	Round.currentRound(function(round){
		$scope.isFirstRound = round.round == 1 ? true : false;
      
		$scope.previousRound = round.round - 1;
		$scope.getCurrentTeam = Auth.getCurrentTeam;  
		$scope.loggedInTeam =  $scope.getCurrentTeam().teamCountry;
		$scope.loggedInTeamName =  $scope.getCurrentTeam().name;
		Team.roundLevelInformation({id: ($scope.previousRound == 0 ? 1 : $scope.previousRound)}).$promise.then(function(previousRoundLevelInformatiom){
			$scope.loggedInTeamRankForPreviousRound = previousRoundLevelInformatiom.roundLevelInformation[0].rankingPosition;
			$scope.loggedInTeamExpScoreRankForPreviousRound = previousRoundLevelInformatiom.roundLevelInformation[0].experienceScoreRankingPosition; 
			$scope.countryLevelTeamRankForPreviousRound = previousRoundLevelInformatiom.roundLevelInformation[0].countryLevelRankingPosition;
			$scope.countryLevelTeamExpScoreRankForPreviousRound = previousRoundLevelInformatiom.roundLevelInformation[0].CountryLevelExperienceScoreRankingPosition;
			Ranking.getAllTeamRankings({previousRoundNumber: $scope.previousRound}).$promise.then(function(rankingTeamsData){
				$scope.rankingTeams = rankingTeamsData;
			}); 
		});
		
    $http.get('/api/team/getTeamActions').success(function(audit){
            $scope.audits=audit;
          });
          
    $http.get('/api/team/getTeamMembers').success(function(members){   
            $rootScope.members = members;
          }); 
          
    $http.get('/api/gamecontrol').success(function(messages){  
            $scope.messages = messages[0].messages;
						$scope.singleplayermode = messages[0].singleplayermode;
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
    
    
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.tweet = '';
    $scope.twCounter = 140;

    $scope.$watch('tweet', function (tweet) {
      $scope.twCounter = (140 - tweet.length)
    });

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };
      
    $rootScope.dtOptions = DTOptionsBuilder.newOptions().withOption('stateSave', true);
    
  })


