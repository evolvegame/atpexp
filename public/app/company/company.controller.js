'use strict';

angular.module('atpexpApp')

  .controller('CompanyCtrl', function ($scope, $http, Auth,Team, $rootScope, Project, Round, toastr) {
    
	  $scope.showGraphView = true;
	  $scope.showTabularView = false;
	  $scope.graphIconColor = 'red';
	  $scope.tableIconColor = '';
	  
	  Round.currentRound(function(round){
			$scope.isFirstRound = round.round == 1 ? true : false;
			$scope.currentRound = round.round;
			$rootScope.previousRound = round.round - 1;
//			$rootScope.getCurrentTeam = Auth.getCurrentTeam;      
			$rootScope.loggedInTeam =  Auth.getCurrentTeam().teamCountry;
			$rootScope.loggedInTeamName =  Auth.getCurrentTeam().name;
			console.log('loading company ..... ');
			Team.roundLevelInformation({id: $scope.currentRound}).$promise.then(function(currentRoundLevelInformatiom){
				$http.get('/api/departments').success(function(departments){
			    	$scope.referentialListOfDepartments = departments;
			    	for (var i = 0; i < departments.length ; i++) {
			    		var obj = departments[i];
			    		var departmentFound = false;
			    			for (var j = 0; j < currentRoundLevelInformatiom.roundLevelInformation[0].department.length; j++) {
			        			var depart = currentRoundLevelInformatiom.roundLevelInformation[0].department[j];
			        			
			        			if (depart.name == obj.name) {
			        				departmentFound = true;
			        				for (var k=0; k < obj.size.length; k++) {
			        					var sizeUnit = obj.size[k];
			        					
			        					if (sizeUnit.unit == depart.sizeUnit) {
			        						sizeUnit.switchStatus = true;
			        						obj.selectedCost = sizeUnit.cost;
			        						obj.selectedNumOfBenefits = sizeUnit.numberOfBenefits;
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
			    						obj.selectedNumOfBenefits = sizeUnit.numberOfBenefits;
			    						break;		
			    					}
			    					
			    				}
			    			}
			    		
			    		
			    	}
			    	
			    	$rootScope.departments = departments;
			    });
				
				$http.get('/api/projects').success(function (projects) {
					  $scope.referentialListOfProjects = projects;
				      
				      var currentRoundLevelInformationIndex = $scope.currentRound - 1;
				      
				      for (var i = 0; i<projects.length;i++) {
				         var obj = projects[i];
				         for(var j = 0; j < currentRoundLevelInformatiom.roundLevelInformation[0].project.length; j++) {
				        	 var proj = currentRoundLevelInformatiom.roundLevelInformation[0].project[j];
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
                      getTotal();    
			    });
			});
			
		});
	  
	  $scope.showChart = function() {
		  $scope.showGraphView = true;
		  $scope.showTabularView = false;
		  $scope.graphIconColor = 'red';
		  $scope.tableIconColor = '';
		  console.log('showing graph view');
	  };
	  
	  $scope.showTabularData = function() {
		  $scope.showGraphView = false;
		  $scope.showTabularView = true;
		  $scope.graphIconColor = '';
		  $scope.tableIconColor = 'red';
		  console.log('showing tabular view');
	  };
	  
	  $scope.toggleView = function() {
		  if ($rootScope.showGraphView) {
			  $rootScope.showGraphView = false;
			  $rootScope.showTabularView = true;
			  $rootScope.graphIconColor = '';
			  $rootScope.tableIconColor = 'red';
			  console.log('showing tabular view');
		  } else {
			  $rootScope.showGraphView = true;
			  $rootScope.showTabularView = false;
			  $rootScope.graphIconColor = 'red';
			  $rootScope.tableIconColor = '';
			  console.log('showing graph view');
		  }
	  };
	  
	  /*$http.get('/api/rounds/currentRound').success(function(round){  
    	  $scope.currentRound = round.round;
      });*/
      
	  Team.allRoundLevelInformation().$promise.then(function (teamAllRoundLevelInformation) {     
			//$rootScope.team = team;     
			$rootScope.roundLevelInformation = teamAllRoundLevelInformation[0].roundLevelInformation;
            var roundInfo = teamAllRoundLevelInformation[0].roundLevelInformation;
            var dataArray=[];
            var premiumArray=[];
			var bonusArray=[];
            var claimsArray=[];
            var operatingExp=[];
            var projectInv=[];
            var taxesArr=[];
            var profitArr=[];
            roundInfo.forEach(function(round) {
                var premium ={};
                premium.y=round.premium;
                premiumArray.push(premium);
                
				var bonus ={};
                bonus.y=round.bonus;
                bonusArray.push(bonus);
				
                var claims ={};
                claims.y=round.claims * (-1);
                claimsArray.push(claims);
                
                var opeExp ={};
                opeExp.y=round.totalExpense * (-1);
                operatingExp.push(opeExp);
                
                var projInv ={};
                projInv.y=round.investment * (-1);
                projectInv.push(projInv);
                
                var taxes={};
                var profitJSON={};
                var grossIncome = round.grossIncome;
                
                var profit = round.profit;
                profitJSON['profit']=profit;
                profitArr.push(profitJSON);
                
                taxes.y=(grossIncome-profit) * (-1);
                taxesArr.push(taxes);
                
            });
/*            dataArray.push(premiumArray);
			dataArray.push(bonusArray);
            dataArray.push(claimsArray);
            dataArray.push(operatingExp);
            dataArray.push(projectInv);
            dataArray.push(taxesArr);*/
            //dataArray.push(profitArr);
            dataArray[0] = premiumArray;
  			dataArray[1] = bonusArray;
            dataArray[2] = claimsArray;
            dataArray[3] = operatingExp;
            dataArray[4] = projectInv;
            dataArray[5] = taxesArr;
						
            $scope.chartdata = dataArray;
            
	  });
	  
	  /*$http.get('/api/projects').success(function (projects) {
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
    		console.log('$scope.currentRound ---- ' + $scope.currentRound);
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
    });*/
    
    $scope.addProject = function(project) {    		
    	var projects;	
    	var projectType = project.type;
    	var projectName = project.name;
    	var departments = $rootScope.departments;
    	var departmentNumOfBenefits = 0;
    	var projectsSelected = 0;
    	var departmentSizeUnit;
    	for (var i = 0; i < departments.length ; i++) {
    		if(projectType == departments[i].name) {
    			for (var j = 0 ; j < departments[i].size.length ; j++) {
    				if(departments[i].size[j].switchStatus) {
    					departmentNumOfBenefits = departments[i].size[j].numberOfBenefits;
    					departmentSizeUnit = departments[i].size[j].unit;
    					break;
    				}
    			}
    			break;
    		}
    	}
    	
       for(var i=0; i<$rootScope.objects.length; i++) {
    		if($rootScope.objects[i].type == projectType && $rootScope.objects[i].switchStatus && $rootScope.objects[i]._id != project._id) {
    			projectsSelected = projectsSelected + 1;
    		}
    	}
    	
    	if (projectsSelected >= departmentNumOfBenefits) {
    		var roundLevelInformation;
    		
    		for (var teamIndex = 0; teamIndex < $rootScope.roundLevelInformation.length; teamIndex++){
	    		if ($rootScope.roundLevelInformation[teamIndex].round == $scope.currentRound) {
	    			roundLevelInformation = $rootScope.roundLevelInformation[teamIndex];
	    			break;
	    		}
	    	}	
    		
    		projects = $scope.referentialListOfProjects;
	    	for (var i = 0; i<projects.length;i++) {
	        	var obj = projects[i];
	        	obj.switchStatus = false;
	        	for(var j = 0; j < roundLevelInformation.project.length; j++) {
	        		var proj = roundLevelInformation.project[j];
	        		if (proj == obj._id) {
	        	    	obj.switchStatus = true;
	        	        break;
	        	    }   	 
	        	}
	        }    	
	    	console.log('Projects >>>> ' + JSON.stringify(projects));
        	$rootScope.objects = projects;
        	toastr.error('Cannot add projects more than ' + departmentNumOfBenefits + ' for ' + project.type + ' as per corresponding department size - ' + departmentSizeUnit,'Error Adding projects');
        	return;
    	}
    	
    	Project.teamCompany(project).$promise.then(function(allRoundLevelInformation){

    		var roundLevelInformation;
    		console.log('allRoundLevelInformation'+JSON.stringify(allRoundLevelInformation));
    		for (var teamIndex = 0; teamIndex < allRoundLevelInformation.length; teamIndex++){
	    		if (allRoundLevelInformation[teamIndex].round == $scope.currentRound) {
	    			roundLevelInformation = allRoundLevelInformation[teamIndex];
	    			break;
	    		}
	    	}	
    		
    		projects = $scope.referentialListOfProjects;
	    	for (var i = 0; i<projects.length;i++) {
	        	var obj = projects[i];
	        	for(var j = 0; j < roundLevelInformation.project.length; j++) {
	        		var proj = roundLevelInformation.project[j];
	        	    if (proj == obj._id) {
	        	    	obj.switchStatus = true;
	        	        break;
	        	    }   	 
	        	}
	        }    	
	    	$rootScope.roundLevelInformation = allRoundLevelInformation;		
        	$rootScope.objects = projects;
//        	$rootScope.team = team;
        		
        	updateNotifications();
    		
    	});
        
        getTotal();
    };
    
    function updateNotifications () {
		Round.currentRound(function(round){
			$rootScope.roundNumber = round.round;
			$rootScope.pendingTasks = 0;
//			$rootScope.getCurrentTeam = Auth.getCurrentTeam;
				Team.notificationInformation({id:0}).$promise.then(function(notificationObject){$rootScope.notifications = notificationObject.contents;
				if(typeof(notificationObject) != 'undefined' && typeof(notificationObject.contents) != 'undefined'){
					for (var i = 0 ; i < notificationObject.contents.length; i++) {
						if(notificationObject.contents[i].status == 'false') {
							$rootScope.pendingTasks = $rootScope.pendingTasks + 1;
						}
					}
				}
			});
		});
	}
    
    $scope.addDepartment = function(department, size) {
    	
    	console.log(JSON.stringify(department.name) + ' && ' + JSON.stringify(size.unit) + ' && ' + JSON.stringify(size.numberOfBenefits));
    	   	
    	Team.teamDepartment(department, size).$promise.then(function(team){
    		$rootScope.team = team;
    		var currentRoundDepartments = [];
    		for (var i = 0; i < team.roundLevelInformation.length; i++) {
    			if (team.roundLevelInformation[i].round == $scope.currentRound) {
    				currentRoundDepartments = team.roundLevelInformation[i].department;
    				break;
    			}
    		}
    		var departments = $scope.referentialListOfDepartments
    		for (var i = 0; i < departments.length ; i++) {
	    		var obj = departments[i];
	    		var departmentFound = false;
	    		var currentRoundLevelInformationIndex = $scope.currentRound - 1;
	    			for (var j = 0; j < currentRoundDepartments.length; j++) {
	        			var depart = currentRoundDepartments[j];
	        			
	        			if (depart.name == obj.name) {
	        				departmentFound = true;
	        				for (var k=0; k < obj.size.length; k++) {
	        					var sizeUnit = obj.size[k];
	        					
	        					if (sizeUnit.unit == depart.sizeUnit) {
	        						sizeUnit.switchStatus = true;
	        						obj.selectedCost = sizeUnit.cost;
	        						obj.selectedNumOfBenefits = sizeUnit.numberOfBenefits;
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
	    						obj.selectedNumOfBenefits = sizeUnit.numberOfBenefits;
	    						break;		
	    					}
	    					
	    				}
	    			}    		
    	}
    	
    	$rootScope.departments = departments;
    	}, function(error){
    		refreshDepartments($rootScope.team);
        	console.log('Error == ' +  JSON.stringify(error.data));
        	toastr.error(error.data);
        	return;
        });
    };
    
    function refreshDepartments(team) {

		$rootScope.team = team;
		var currentRoundDepartments = [];
		for (var i = 0; i < team.roundLevelInformation.length; i++) {
			if (team.roundLevelInformation[i].round == $scope.currentRound) {
				currentRoundDepartments = team.roundLevelInformation[i].department;
				break;
			}
		}
		var departments = $scope.referentialListOfDepartments
		for (var i = 0; i < departments.length ; i++) {
    		var obj = departments[i];
    		var departmentFound = false;
    		var currentRoundLevelInformationIndex = $scope.currentRound - 1;
    			for (var j = 0; j < currentRoundDepartments.length; j++) {
        			var depart = currentRoundDepartments[j];
        			
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
	
	$rootScope.departments = departments;
	
    }
    //[[{y:0},{y:3},{y:0},{y:0}]]
//      $scope.chartdata = [
// 	[ {y:3} ],
// 	[ {y:4}],
// 	[ {y:10}  ]
// ]

function getTotal(){
    var complianceTotal=0;
    var itTotal=0;
    var strategyTotal=0;
    var marketingTotal=0;
    for(var i=0; i<$rootScope.objects.length; i++) {
    		if($rootScope.objects[i].type == 'Compliance' && $rootScope.objects[i].switchStatus) {
    			complianceTotal=complianceTotal+$rootScope.objects[i].amount;
    		}
            if($rootScope.objects[i].type == 'Marketing' && $rootScope.objects[i].switchStatus) {
    			marketingTotal=marketingTotal+$rootScope.objects[i].amount;
    		}
            if($rootScope.objects[i].type == 'IT' && $rootScope.objects[i].switchStatus) {
    			itTotal=itTotal+$rootScope.objects[i].amount;
    		}
            if($rootScope.objects[i].type == 'Strategy' && $rootScope.objects[i].switchStatus) {
    			strategyTotal=strategyTotal+$rootScope.objects[i].amount;
    		}
        }
        $rootScope.total=complianceTotal+marketingTotal+itTotal+strategyTotal;
        $rootScope.compliance=complianceTotal;
        $rootScope.marketing=marketingTotal;
        $rootScope.it=itTotal;
        $rootScope.strategy=strategyTotal;
    }

  Team.allRoundLevelInformation().$promise.then(function (teamAllRoundLevelInformation) {    
      //  console.log('I am here'); 
//			$rootScope.team = team;     
			$rootScope.roundLevelInformation = teamAllRoundLevelInformation[0].roundLevelInformation;
            var roundInfo = teamAllRoundLevelInformation[0].roundLevelInformation;
            var dataArray=[];
            var premiumArray=[];
			var bonusArray=[];
            var claimsArray=[];
            var operatingExp=[];
            var projectInv=[];
            var taxesArr=[];
            var profitArr=[];
            roundInfo.forEach(function(round) {
                var premium ={};
                premium.y=round.premium;
                premiumArray.push(premium);
                
                var bonus ={};
                bonus.y=round.bonus;
                bonusArray.push(bonus);
								
                var claims ={};
                claims.y=round.claims * (-1);
                claimsArray.push(claims);
                
                var opeExp ={};
                opeExp.y=round.totalExpense * (-1);
                operatingExp.push(opeExp);
                
                var projInv ={};
                projInv.y=round.investment * (-1);
                projectInv.push(projInv);
                
                var taxes={};
                var profitJSON={};
                var grossIncome = round.grossIncome;
                
                var profit = round.profit;
                profitJSON['profit']=profit;
                profitArr.push(profitJSON);
                
                taxes.y=(grossIncome-profit) * (-1);
                taxesArr.push(taxes);
                
            });
/*            dataArray.push(premiumArray);
  			dataArray.push(bonusArray);
            dataArray.push(claimsArray);
            dataArray.push(operatingExp);
            dataArray.push(projectInv);
            dataArray.push(taxesArr);*/

            dataArray[0] = premiumArray;
  			dataArray[1] = bonusArray;
            dataArray[2] = claimsArray;
            dataArray[3] = operatingExp;
            dataArray[4] = projectInv;
            dataArray[5] = taxesArr;
						
            //dataArray.push(profitArr);
            $scope.chartdata = dataArray;
            
	  });
	  
	$http.get('/api/team/getTeamMembers').success(function(members){   
         $rootScope.members = members;
    });
       
  })

.directive('angulard3StackbarChart', function () { // Angular Directive
          return {
             restrict: 'A',
          scope: {
             datajson: '=',
             xaxisName: '=',
             xaxisPos: '=',
             yaxisName: '=',
             yaxisPos: '=',
             d3Format: '='
             // All the Angular Directive Vaiables used as d3.js parameters
                              },
          link: function (scope, elem, attrs) {
              scope.$watch('datajson', function(newValue,oldValue) {
                 if(newValue !== oldValue){
                  console.log("Scope value is -->"+JSON.stringify(scope.datajson));
                  new StackbarChart(scope.datajson,scope.yaxisName,scope.yaxisPos,'#'+elem[0].id);   
                 }
            }, true);
         } 
     }
});  

  
// .directive('angulard3StackbarChart', function () { // Angular Directive
//           return {
//              restrict: 'A',
//           scope: {
//              datajson: '=',
//              xaxisName: '=',
//              xaxisPos: '=',
//              yaxisName: '=',
//              yaxisPos: '=',
//              d3Format: '='
//              // All the Angular Directive Vaiables used as d3.js parameters
//                               },
//           link: function (scope, elem, attrs) {
//               scope.$watch('datajson', function(newValue,oldValue) {
//                  if(newValue !== oldValue){
//                   console.log("Scope value is -->"+JSON.stringify(scope.datajson));
//                   new StackbarChart(scope.datajson,scope.yaxisName,scope.yaxisPos,'#'+elem[0].id);   
//                  }
//             }, true);
//          } 
//      }
// });
