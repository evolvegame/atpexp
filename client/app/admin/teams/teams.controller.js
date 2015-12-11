'use strict';

angular.module('atpexpApp')
  .controller('TeamsCtrl', function ($scope, $http, Auth, Team) {

    // Use the Team $resource to fetch all teams
    $scope.teams = Team.query();

    $scope.delete = function (team) {
      Team.remove({id: team._id});
      angular.forEach($scope.teams, function (u, i) {
        if (u === team) {
          $scope.teams.splice(i, 1);
        }
      });
    };

    $http.get('/api/team').success(function (teams) {
      $scope.teamList = teams
    })


  });
