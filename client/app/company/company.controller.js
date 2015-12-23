'use strict';

angular.module('atpexpApp')

  .controller('CompanyCtrl', function ($scope, $http, Auth,Team) {
    
    $http.get('/api/projects').success(function (projects) {
      console.log(projects)
      $scope.getCurrentTeam = Auth.getCurrentTeam;
      
      for (var i = 0; i<projects.length;i++) {
         var obj = projects[i];
         for(var j = 0; j < $scope.getCurrentTeam().roundLevelInformation.project.length; j++) {
        	 var proj = $scope.getCurrentTeam().roundLevelInformation.project[j];
        	 if (proj == obj._id) {
        		 obj.switchStatus = true;
        		 console.log("project id - " + obj._id);
        		 break;
        	 }   	 
         }
      }
      $scope.objects = projects;
      $scope.totalItems = $scope.objects.length;
      $scope.currentPage = 1;
      $scope.numPerPage = 5;      
    });
    
    
    $scope.bgcolorEnter = function(project) {
    	project.background = "#FACC2E";
    };

    $scope.bgcolorLeave = function(project) {
    	console.log($scope.projectClicked);
    	if(project.lockedFromFurtherClicks) {
    		return;
    	}
    	if(!$scope.projectClicked) {
    		project.background = "#BDBDBD";
    	} else {
    		project.background = "#FACC2E";
    	}
    	$scope.projectClicked = false;
    };
    
    $scope.addProject= function(project) {
//    	console.log('event ' + event);
    	console.log('state ' + project.switchStatus);
//    	console.log('Selected project name -- ' + dom.name);
    	console.log("Hi i am here " + project.name);
    	console.log("Hi i am here " + project.amount);
    	Team.teamCompany(project);
    };
    
  })
