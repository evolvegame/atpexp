'use strict';

angular.module('atpexpApp')

  .controller('CompanyCtrl', function ($scope, $http, Auth,Team) {
    
    $http.get('/api/projects').success(function (projects) {
      console.log(projects)
      $scope.objects = projects
      $scope.totalItems = $scope.objects.length;
      $scope.currentPage = 1;
      $scope.numPerPage = 5;
      $scope.getCurrentTeam = Auth.getCurrentTeam;      
      $scope.loggedInTeam =  $scope.getCurrentTeam().teamCountry;
      /*{
    		  country: "USA"
      };*/
      
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
