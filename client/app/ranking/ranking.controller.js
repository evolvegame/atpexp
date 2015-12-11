'use strict';

angular.module('atpexpApp')

  .controller('RankingCtrl', function ($scope, $http) {
    
    $http.get('/api/team').success(function (teams) {
      console.log(teams)
      $scope.objects = teams
      $scope.totalItems = $scope.objects.length;
      $scope.currentPage = 1;
      $scope.numPerPage = 5;
      $scope.loggedInTeam = {
    		  country: "NL"
      };
      
      $scope.paginate = function(value) {
        var begin, end, index;
        begin = ($scope.currentPage - 1) * $scope.numPerPage;
        end = begin + $scope.numPerPage;
        index = $scope.objects.indexOf(value);
        return (begin <= index && index < end);
      };
    })

  })
