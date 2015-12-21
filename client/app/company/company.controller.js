'use strict';

angular.module('atpexpApp')

  .controller('CompanyCtrl', function ($scope, $http, Auth,Team) {
    
    $http.get('/api/projects').success(function (projects) {
      console.log(projects)
      for (var i = 0; i<projects.length;i++)
      {
         var obj = projects[i];
         obj.background = "#BDBDBD"; 
      }
      $scope.objects = projects;
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
    
    $scope.bgcolorEnter = function(project) {
    	project.background = "#FACC2E";
    };

    $scope.bgcolorLeave = function(project) {
    	project.background = "#BDBDBD";
    };
  })
