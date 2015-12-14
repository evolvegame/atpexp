'use strict';

angular.module('atpexpApp')
  .controller('TeamsCtrl', function ($scope, $http, Auth, Team) {

    // Use the Team $resource to fetch all teams
    $scope.teams = Team.query();

    $scope.delete = function (team) {
      console.log(team._id);
      Team.remove({id: team._id});
      angular.forEach($scope.teams, function (u, i) {
        if (u === team) {
          $scope.teams.splice(i, 1);
        }
      });
    };
    
  });
