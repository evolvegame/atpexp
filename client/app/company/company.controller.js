'use strict';

angular.module('atpexpApp')

  .controller('CompanyCtrl', function ($scope, $http, Auth,Team, $rootScope, Project) {
    
    $http.get('/api/projects').success(function (projects) {
//      console.log(projects)
      $scope.getCurrentTeam = Auth.getCurrentTeam;
      
      for (var i = 0; i<projects.length;i++) {
         var obj = projects[i];
         for(var j = 0; j < $scope.getCurrentTeam().roundLevelInformation.project.length; j++) {
        	 var proj = $scope.getCurrentTeam().roundLevelInformation.project[j];
        	 if (proj == obj._id) {
        		 obj.switchStatus = true;
//        		 console.log("project id - " + obj._id);
        		 break;
        	 }   	 
         }
      }
      $scope.objects = projects;
      $scope.totalItems = $scope.objects.length;
      $scope.currentPage = 1;
      $scope.numPerPage = 5;      
    });
    
    $http.get('/api/departments').success(function(departments){
//    	console.log('Department - ' + departments)
    	for (var i = 0; i < departments.length ; i++) {
    		var obj = departments[i];
    		var departmentFound = false;
    		
    			for (var j = 0; j < $scope.getCurrentTeam().roundLevelInformation.department.length; j++) {
        			var depart = $scope.getCurrentTeam().roundLevelInformation.department[j];
        			
        			if (depart.name == obj.name) {
        				departmentFound = true;
        				for (var k=0; k < obj.size.length; k++) {
        					var sizeUnit = obj.size[k];
        					
        					if (sizeUnit.unit == depart.sizeUnit) {
        						sizeUnit.switchStatus = true;
        						obj.selectedCost = sizeUnit.cost;
        					/*	console.log("Depart Name --> " + depart.name);
        						console.log("SizeUnit --> " + sizeUnit.unit);
        						console.log("SizeUnit --> " + sizeUnit.switchStatus);*/
        						break;		
        					}
        					
        				}
        				
        			}
        		}
    			
    			if (!departmentFound) {
    				for (var k=0; k < obj.size.length; k++) {
    					var sizeUnit = obj.size[k];
    					
    					if (sizeUnit.unit == 'Small') {
    						sizeUnit.switchStatus = true;
    						obj.selectedCost = sizeUnit.cost;
    					/*	console.log("Depart Name --> " + depart.name);
    						console.log("SizeUnit --> " + sizeUnit.unit);
    						console.log("SizeUnit --> " + sizeUnit.switchStatus);*/
    						break;		
    					}
    					
    				}
    			}
    		
    		
    	}
    	
    	
    	$scope.departments = departments;
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
    	Project.teamCompany(project);
        refresh();
    };
    
    $scope.addDepartment = function(department, size) {
    	console.log('department ' + department.name);
    	console.log('size ' + JSON.stringify(size));
//    	console.log('Selected project name -- ' + dom.name);
//    	console.log("Hi i am here " + project.name);
//    	console.log("Hi i am here " + project.amount);
    	Team.teamDepartment(department, size);
    	refresh();
    };
    
    //temporary Solution to refresh model object
    function reloadPage(){ $window.location.reload(); }

    function refresh(){
        $http.get('/api/team/me').success( function (team){
        $rootScope.team = team;
        });
    }
    
  })
