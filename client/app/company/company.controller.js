'use strict';

angular.module('atpexpApp')

  .controller('CompanyCtrl', function ($scope, $http, Auth,Team, $rootScope, Project, Round) {
    
	  
	  $http.get('/api/rounds/currentRound').success(function(round){  
    	  $scope.currentRound = round.round;
      });
	  
	  $http.get('/api/team/me').success(function (team) {     
			$rootScope.team = team;     
			$rootScope.roundLevelInformation = $rootScope.team.roundLevelInformation;
	  });
	  
	  $http.get('/api/projects').success(function (projects) {
		  $scope.referentialListOfProjects = projects;
	      
	      var currentRoundLevelInformationIndex = $scope.currentRound - 1;
	      
	      for (var i = 0; i<projects.length;i++) {
	         var obj = projects[i];
	         for(var j = 0; j < $rootScope.team.roundLevelInformation[currentRoundLevelInformationIndex].project.length; j++) {
	        	 var proj = $rootScope.team.roundLevelInformation[currentRoundLevelInformationIndex].project[j];
	        	 if (proj == obj._id) {
	        		 obj.switchStatus = true;
	        		 break;
	        	 }   	 
	         }
	      }
	      
	      $rootScope.objects = projects;
	      $scope.totalItems = $scope.objects.length;
	      $scope.currentPage = 1;
	      $scope.numPerPage = 5;    
    });
    
    $http.get('/api/departments').success(function(departments){
    	$scope.referentialListOfDepartments = departments;
    	for (var i = 0; i < departments.length ; i++) {
    		var obj = departments[i];
    		var departmentFound = false;
    		var currentRoundLevelInformationIndex = $scope.currentRound - 1;
    			for (var j = 0; j < $rootScope.team.roundLevelInformation[currentRoundLevelInformationIndex].department.length; j++) {
        			var depart = $rootScope.team.roundLevelInformation[currentRoundLevelInformationIndex].department[j];
        			
        			if (depart.name == obj.name) {
        				departmentFound = true;
        				for (var k=0; k < obj.size.length; k++) {
        					var sizeUnit = obj.size[k];
        					
        					if (sizeUnit.unit == depart.sizeUnit) {
        						sizeUnit.switchStatus = true;
        						obj.selectedCost = sizeUnit.cost;
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
    						break;		
    					}
    					
    				}
    			}
    		
    		
    	}
    	
    	$rootScope.departments = departments;
    });
    
    $scope.addProject= function(project) {    		
    	var projects;	
    	Project.teamCompany(project).$promise.then(function(team){
    		Team.roundLevelInformation({id: $scope.currentRound}).$promise.then(function(roundLevelInformatiom){
	    		console.log('Called roundlvelinformation------ ');	
	    		projects = $scope.referentialListOfProjects;
	        		for (var i = 0; i<projects.length;i++) {
	        	         var obj = projects[i];
	        	         for(var j = 0; j < roundLevelInformatiom.project.length; j++) {
	        	        	 var proj = roundLevelInformatiom.project[j];
	        	        	 if (proj == obj._id) {
	        	        		 obj.switchStatus = true;
	        	        		 break;
	        	        	 }   	 
	        	         }
	        	      }    	
	        		
        		$rootScope.objects = projects;
        		
        		updateNotifications();
    		});
    		
    	});
    	      
    		

    };
    
    function updateNotifications () {
		console.log('About to update notifications');
		Round.currentRound(function(round){
			$rootScope.roundNumber = round.round;
			
			$rootScope.makeOfferClass = 'icheckbox_minimal-grey';
			$rootScope.manageRiskClass = 'icheckbox_minimal-grey';
			$rootScope.companyInvestmentClass = 'icheckbox_minimal-grey';
			$rootScope.pendingTasks = 3;
			
			$rootScope.getCurrentTeam = Auth.getCurrentTeam;
			Team.notificationInformation({id:0}).$promise.then(function(notificationObject){
				console.log('Notification received from db -- ' + JSON.stringify(notificationObject));
				$rootScope.makeOfferClass = notificationObject.numberOffers == 0 ?  'icheckbox_minimal-grey' : 'icheckbox_minimal-grey checked';
				$rootScope.manageRiskClass = notificationObject.numOfRiskStrategies == 0 ? 'icheckbox_minimal-grey' : 'icheckbox_minimal-grey checked';
				$rootScope.companyInvestmentClass = notificationObject.numOfProjects == 0 ? 'icheckbox_minimal-grey' : 'icheckbox_minimal-grey checked';
				$rootScope.pendingTasks = notificationObject.numberOffers == 0 ? $rootScope.pendingTasks : $rootScope.pendingTasks - 1;
				$rootScope.pendingTasks = notificationObject.numOfRiskStrategies == 0 ? $rootScope.pendingTasks : $rootScope.pendingTasks - 1;
				$rootScope.pendingTasks = notificationObject.numOfProjects == 0 ? $rootScope.pendingTasks : $rootScope.pendingTasks - 1;
			});
		});
	}
    
    $scope.addDepartment = function(department, size) {
    	Team.teamDepartment(department, size).$promise.then(function(team){
    		$rootScope.team = team;
    		var departments = $scope.referentialListOfDepartments
    		for (var i = 0; i < departments.length ; i++) {
	    		var obj = departments[i];
	    		var departmentFound = false;
	    		var currentRoundLevelInformationIndex = $scope.currentRound - 1;
	    			for (var j = 0; j < $rootScope.team.roundLevelInformation[currentRoundLevelInformationIndex].department.length; j++) {
	        			var depart = $rootScope.team.roundLevelInformation[currentRoundLevelInformationIndex].department[j];
	        			
	        			if (depart.name == obj.name) {
	        				departmentFound = true;
	        				for (var k=0; k < obj.size.length; k++) {
	        					var sizeUnit = obj.size[k];
	        					
	        					if (sizeUnit.unit == depart.sizeUnit) {
	        						sizeUnit.switchStatus = true;
	        						obj.selectedCost = sizeUnit.cost;
	        					} else {
	        						sizeUnit.switchStatus = false;
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
	    						break;		
	    					}
	    					
	    				}
	    			}    		
    	}
    	
    	console.log(JSON.stringify(departments));
    	$rootScope.departments = departments;
    	});
    };
       
  })
