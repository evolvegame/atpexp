'use strict';
angular.module('atpexpApp')
.controller('riskCtrl', function ($scope, $http, Auth, Team , $translate, Risk, Countries,$rootScope, $modal, Round, toastr) {

	
		Round.currentRound(function(round){
			$rootScope.currentRoundNumber = round.round;
			Team.getCurrentRoundRiskStrategies({round : round.round}).$promise.then(function(teamRiskStrategies){
				console.log('strategies from new call' + JSON.stringify(teamRiskStrategies));
				var currentRoundStrategies = [];
				for (var i = 0 ; i < teamRiskStrategies.length; i++) {
					currentRoundStrategies.push(teamRiskStrategies[i].riskStrategy);
				}
				$rootScope.strategies = currentRoundStrategies;
			});
		});
	
	/*$http.get('/api/team/getTeamMembers').success(function(members){   
         $rootScope.members = members;
    });*/

    
    
    //$scope.chartdata = {'100': 3.14};
    // Countries.mapData()
    // console.log("Country list -->"+JSON.stringify(Countries.mapData(function())));
    // $scope.chartdata = Countries.mapData();

    //Countries.mapData();

	$rootScope.graphs = [];
	console.log('After clearing bubbles!!!');

    $scope.selectedIndustries=[];
    $scope.industriesColl= [];
    $scope.scrollsettings = {
        scrollableHeight: '300px',
        scrollable: true,
        enableSearch: true
    };
    $scope.multiSelectText = {buttonDefaultText: 'Select Industries'}

	//get industry
	$http.get('/api/industry').success(function (industries) {
        if(industries!= null && industries!= 'undefined'){
            for(var i=0; i< industries.length;i++){
                var id = industries[i].sno;
                var value = industries[i].industry;
                var coll={};
                coll['id']=id;
                coll['label']=value;
                $scope.industriesColl.push(coll);
            }
        }
		$scope.ind = industries;
	});

	//get country
	$http.get('/api/country').success(function (countries) {
		$scope.cou = countries;
	});

	//following code is to reset modal window
	$scope.master = {strategyName: "Enter Strategy Name", strategyRatingBand1: 0,  strategyRatingBand2: 0,  strategyRatingBand3: 0,  strategyRatingBand4: 0,  strategyRatingBand5: 0};

	//reset is called on click of 'add strategy'
	$scope.reset = function() {
		$scope.strategy = angular.copy($scope.master);
	};

	$scope.reset();


	//add strategy
	$scope.saveStrategy = function(strategyName, country, industries)
	{
//		var test = strate;
//		alert(test);
		var riskStrategy = {
				round: 1,
				strategyName: strategyName,
				buyerCountry: country,
				buyerIndustry: industries,
				strategyRatingBand1: 23,
				strategyRatingBand2: 33,
				strategyRatingBand3: 45,
				strategyRatingBand4: 67,
				strategyRatingBand5: 45
		};
		Risk.addRisk(riskStrategy).$promise.then(function(strategies){
			$rootScope.strategies = strategies;
		});
//		refresh();
	};


	$scope.openModifyRiskStrategy = function () {
		// open modal and load tpl
		var modalInstance = $modal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'app/risk/modifyRiskStrategy/modal-modify-risk-strategy.html',
			controller: 'RiskModalInstanceCtrl',
			resolve: {
				selectedRiskStrategy: function () {
					return $scope.selected;
				}
			}
		});
		// add selected risk strategy to $scope.selected
		modalInstance.result.then(function (selectedRiskStrategy) {
			$scope.selected = selectedRiskStrategy;
		});
	};
	
	$scope.openDeleteRiskStrategyConfirmation = function () {
		// open modal and load tpl
		var modalInstance = $modal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'app/risk/modifyRiskStrategy/modal-confirm-delete.html',
			controller: 'DeleteRiskModalInstanceCtrl',
			resolve: {
				selectedDeleteRiskStrategy: function () {
					return $scope.selectedDelete;
				}
			}
		});
		
		// add selected risk strategy to $scope.selected
		modalInstance.result.then(function (selectedDeleteRiskStrategy) {
			$scope.selectedDelete = selectedDeleteRiskStrategy;
		});
	};

	$scope.openCreateNewRiskStrategy = function () {
		// open modal and load tpl
		var modalInstance = $modal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'app/risk/modifyRiskStrategy/modal-create-new-risk-strategy.html',
			controller: 'CreateNewRiskModalInstanceCtrl',
			resolve: {
				newRiskStrategy: function () {
					return $scope.newRiskStrategy;
				}
			}
		});
		// add selected risk strategy to $scope.selected
		modalInstance.result.then(function (selectedRiskStrategy) {
			$scope.selected = selectedRiskStrategy;
		});
	};
	
	
	$scope.openAddToRiskStrategy = function (d) {
		$rootScope.selectedBubbleIndustry = d.name;
		$rootScope.selectedNodeStrategyName = d.strategyName;
		console.log(' parameters passsseed d - ' + JSON.stringify(d));
		// open modal and load tpl
		$scope.addNewModalInstance = $modal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'app/risk/modifyRiskStrategy/modal-add-to-risk-strategy.html',
			controller: 'CreateNewRiskModalInstanceCtrl',
			windowClass: 'center-popup',
			resolve: {
				newRiskStrategy: function () {
					return $scope.newRiskStrategy;
				}
			}
		});
		// add selected risk strategy to $scope.selected
		modalInstance.result.then(function (selectedRiskStrategy) {
			$scope.selected = selectedRiskStrategy;
		});
	};

	$scope.showModifyRiskStrategy = function(strategy) {
		$scope.selected = strategy;
	};
	
	$scope.showDeleteRiskStrategy = function(strategy) {
		$scope.selectedDelete = strategy;
	};


	/*//translation on load 
	$scope.strategyNameMsg = $translate.instant('risk.addNewStrategy.strategyNameMsg');

	//translation on language change
	$rootScope.$on('$translateChangeSuccess', function () {

		$scope.strategyNameMsg = $translate.instant('risk.addNewStrategy.strategyNameMsg');
		

	});*/
	
	$scope.showCreateNewRiskStrategy = function() {
		$scope.newRiskStrategy = {
				strategyName: $scope.strategyNameMsg ,
				ratingBand: {
					1: 0,
					2: 0,
					3: 0,
					4: 0,
					5: 0
				}
		};

	};

	/*function refresh(){
		$http.get('/api/team/me').success( function (team){
			$rootScope.team = team;
			$scope.strategies = $rootScope.team.riskStrategy; 
		});
	}*/
	
	function updateNotifications () {
		Round.currentRound(function(round){
			$rootScope.roundNumber = round.round;
			
			$rootScope.makeOfferClass = 'icheckbox_minimal-grey';
			$rootScope.manageRiskClass = 'icheckbox_minimal-grey';
			$rootScope.companyInvestmentClass = 'icheckbox_minimal-grey';
			$rootScope.pendingTasks = 3;
			
			$rootScope.getCurrentTeam = Auth.getCurrentTeam;
			Team.notificationInformation({id:0}).$promise.then(function(notificationObject){
				$rootScope.makeOfferClass = notificationObject.numberOffers == 0 ?  'icheckbox_minimal-grey' : 'icheckbox_minimal-grey checked';
				$rootScope.manageRiskClass = notificationObject.numOfRiskStrategies == 0 ? 'icheckbox_minimal-grey' : 'icheckbox_minimal-grey checked';
				$rootScope.companyInvestmentClass = notificationObject.numOfProjects == 0 ? 'icheckbox_minimal-grey' : 'icheckbox_minimal-grey checked';
				$rootScope.pendingTasks = notificationObject.numberOffers == 0 ? $rootScope.pendingTasks : $rootScope.pendingTasks - 1;
				$rootScope.pendingTasks = notificationObject.numOfRiskStrategies == 0 ? $rootScope.pendingTasks : $rootScope.pendingTasks - 1;
				$rootScope.pendingTasks = notificationObject.numOfProjects == 0 ? $rootScope.pendingTasks : $rootScope.pendingTasks - 1;
			});
		});
	}
    //$scope.chartdata = {'100': 1.14};
    
    // var myData = Countries.mapData();
    // console.log("myData ara"+myData);
    // if(myData!=null && myData!='undefined'){
    //     console.log("Values are -->"+JSON.stringify(myData));
    //     $rootScope.chartdata = myData;
    // }
     $scope.chartdata =  {};
     Countries.mapData(function(mapData){
         $scope.chartdata =  mapData;
         
    });
    
    //$scope.industryData = {};
    // console.log('Before calling');
    // Countries.industryELData({"industryName":"Agriculture","countryName":"Albania"} ,function(dataToPlot){
    //     console.log("I am here")
    //     $scope.industryData = dataToPlot;
    //     console.log("Industry data -->" + dataToPlot);
    // });
    
    // $scope.industryData=[
    //     {term:1,meanEL:34.7},
    //      {term:2,meanEL:30.7},
    //       {term:3,meanEL:70.7}
    // ]
    
    // console.log('I am herere');
    
    // Countries.industryAggrData({"countryName":"France"},function(dataToPlot){
    //     $scope.graphs = [dataToPlot];
    // });
    

    $scope.filterCountries = function (countries) {
        var countryName = $scope.mapCountries;
        console.log(countryName);
        getCountry(countryName)
        // if(industryName){
        //     Countries.mapData({"industryName":industryName},function(industryData){
        //     $scope.chartdata =  industryData;
        //     });
        // }else{
        //    Countries.mapData(function(mapData){
        //      $scope.chartdata =  mapData;
        //     }); 
        // }
    }
    
    $scope.bubbleChartFn = function(countryName){
    	console.log('Clicked nam,e is ----> ' + JSON.stringify(countryName));
    	$rootScope.selectedCountryISOCode = countryName;
    	Countries.industryAggrData({"countryName":countryName,"currentRound":$rootScope.roundNumber},function(dataToPlot){
        	 $rootScope.graphs = [dataToPlot];
        }); 
    }
     
})
.directive('globe',['$rootScope','Countries', function($rootScope,Countries) {
    return {
        restrict: 'E',
        scope: {
            data: '=?',
            bubbleCtrlFn: '&callbackFn' 
        },
        template:
        '<div class="globe-wrapper">' +
        '<div class="globe"></div>' +
        '<div class="info"></div>' +
        '</div>',
        link: link
    };
}])

.directive("networkGraph", function($rootScope) {
  return{
    restrict: "E",
    scope: {data: '=',
    	nodeCtrlFn: '&callbackFn'},
    link: nodeLink
  };
}
)


.controller('RiskModalInstanceCtrl', function ($http, $scope, $modalInstance, selectedRiskStrategy, Auth, toastr, Offer, $rootScope, Risk,$translate,$modalStack,Countries){
	$scope.selected = selectedRiskStrategy;

	$scope.selected.ratingBand = {
			1: selectedRiskStrategy.strategyRatingBand1,
			2: selectedRiskStrategy.strategyRatingBand2,
			3: selectedRiskStrategy.strategyRatingBand3,
			4: selectedRiskStrategy.strategyRatingBand4,
			5: selectedRiskStrategy.strategyRatingBand5

	};
	//get industry
	$http.get('/api/ratingBands').success(function (ratingBands) {

		console.log(ratingBands);
		$scope.ratingBands = ratingBands;
	});

	$http.get('/api/country').success(function (countries) {

		console.log(countries);
		$scope.cou = countries;
	});

	//get industry
	$http.get('/api/industry').success(function (industries) {

		console.log(industries);
		$scope.ind = industries;
	});

	$scope.closeModal = function () {
		  Countries.industryAggrData({"countryName":$rootScope.selectedCountryISOCode,"currentRound":$rootScope.roundNumber},function(dataToPlot){
	        	 $rootScope.graphs = [dataToPlot];
			});
		  $modalStack.dismissAll('close');
	      //$modalInstance.dismiss('close');
	};

	/*function refresh(){
		$http.get('/api/team/me').success( function (team){
			$rootScope.team = team;
			$rootScope.strategies = $rootScope.team.riskStrategy; 
		});
	}*/


	$scope.saveModification = function() {
		$scope.createRiskLimitTitle = $translate.instant('risk.addNewStrategy.errMsg.limit.title');
		$scope.createRiskLimit1 = $translate.instant('risk.addNewStrategy.errMsg.limit1');
		$scope.createRiskLimit2 = $translate.instant('risk.addNewStrategy.errMsg.limit2');
		
		$rootScope.$on('$translateChangeSuccess', function () {

			$scope.createRiskLimitTitle = $translate.instant('risk.addNewStrategy.errMsg.limit.title');
			$scope.createRiskLimit1 = $translate.instant('risk.addNewStrategy.errMsg.limit1');
			$scope.createRiskLimit2 = $translate.instant('risk.addNewStrategy.errMsg.limit2');

		});
		
		
		$scope.selected.strategyRatingBand1 = $scope.selected.ratingBand[1];
		$scope.selected.strategyRatingBand2 = $scope.selected.ratingBand[2];
		$scope.selected.strategyRatingBand3 = $scope.selected.ratingBand[3];
		$scope.selected.strategyRatingBand4 = $scope.selected.ratingBand[4];
		$scope.selected.strategyRatingBand5 = $scope.selected.ratingBand[5];
		
		$scope.showModifyStrategyNameRequiredError = false;
		$scope.showModifyRatingBandRequiredError = false;
		$scope.showModifyRatingBandRangeError = false;
		$scope.showModifyBuyerCountryError = false;
		$scope.showModifyBuyerIndustryError = false;
		
		if (typeof($scope.selected.strategyName)==='undefined'){
			$scope.showModifyStrategyNameRequiredError = true;
			return;
		} else if (typeof($scope.selected.strategyRatingBand1)==='undefined' 
			|| typeof($scope.selected.strategyRatingBand2)==='undefined' 
			|| typeof($scope.selected.strategyRatingBand3)==='undefined' 
			|| typeof($scope.selected.strategyRatingBand4)==='undefined' 
			|| typeof($scope.selected.strategyRatingBand5)==='undefined') {
			$scope.showModifyRatingBandRequiredError = true;
			return;
		} else if ($scope.selected.strategyRatingBand1 == 0
				&& $scope.selected.strategyRatingBand2 == 0
				&& $scope.selected.strategyRatingBand3 == 0
				&& $scope.selected.strategyRatingBand4 == 0
				&& $scope.selected.strategyRatingBand5 == 0) {
			$scope.showModifyRatingBandRangeError = true;
			return;
		} else if (typeof($scope.selected.buyerCountry) == 'undefined') {
			$scope.showModifyBuyerCountryError = true;
			return;
		} else if (typeof($scope.selected.buyerIndustry) == 'undefined' ){
			$scope.showModifyBuyerIndustryError = true;
			return;
		}
		
		
		var riskStrategy = {
				toBeDeletedId: $scope.selected._id,
				round: $scope.selected.round,
				strategyName: $scope.selected.strategyName,
				buyerCountry: $scope.selected.buyerCountry,
				buyerIndustry: $scope.selected.buyerIndustry,
				strategyRatingBand1: $scope.selected.ratingBand[1],
				strategyRatingBand2: $scope.selected.ratingBand[2],
				strategyRatingBand3: $scope.selected.ratingBand[3],
				strategyRatingBand4: $scope.selected.ratingBand[4],
				strategyRatingBand5: $scope.selected.ratingBand[5],
		};

		var duplicateBuyerCountryIndustryExists = false;
		var duplicateCountry;
		var duplicateBuyerIndustry;
		$http.get('/api/team/me').success( function (teamFromDB){
			var roundLevelInformation;
			var numOfBenefits = 0;
			var departmentSizeUnit;
			var currentRoundStrategies=[];
			for (var roundIndex = 0 ; roundIndex < teamFromDB.roundLevelInformation.length; roundIndex++) {
				if (teamFromDB.roundLevelInformation[roundIndex].round == $rootScope.currentRoundNumber) {
					roundLevelInformation = teamFromDB.roundLevelInformation[roundIndex];
					for (var departIndex = 0 ; departIndex < roundLevelInformation.department.length; departIndex++) {
						if (roundLevelInformation.department[departIndex].name == 'Risk') {
							departmentSizeUnit = roundLevelInformation.department[departIndex].sizeUnit;
							numOfBenefits = roundLevelInformation.department[departIndex].numberOfBenefits;
							break;
						}
					}
					break;
				}
			}
			
			for (var i = 0 ; i < teamFromDB.riskStrategy.length; i++) {
				if (teamFromDB.riskStrategy[i].round == $rootScope.currentRoundNumber) {
					currentRoundStrategies.push(teamFromDB.riskStrategy[i]);
				}
			}
			
			if ($rootScope.strategies.length > numOfBenefits) {
				toastr.error($scope.createRiskLimit1 + numOfBenefits + $scope.createRiskLimit2 + departmentSizeUnit,$scope.createRiskLimitTitle);
				return;
			}
			
			
			for (var i=0 ; i<$scope.selected.buyerCountry.length ; i++) {
				var country = $scope.selected.buyerCountry[i];

				if (!duplicateBuyerCountryIndustryExists) {

					for (var j=0; j<currentRoundStrategies.length ; j++) {
						var strategy = currentRoundStrategies[j];
						if (!duplicateBuyerCountryIndustryExists && strategy._id != $scope.selected._id && strategy.buyerCountry.indexOf(country) > -1) {
							for (var k=0; k<$scope.selected.buyerIndustry.length; k++) {
								var industry =$scope.selected.buyerIndustry[k];
								if (strategy.buyerIndustry.indexOf(industry) > -1) {
									duplicateBuyerCountryIndustryExists = true;
									duplicateCountry = country;
									duplicateBuyerIndustry = industry;
									break;
								}
							}
						} else if (duplicateBuyerCountryIndustryExists) {
							break;
						}
					}

				} else {
					break;
				}
			}	


			//translation on load 
			$scope.createSuccMsg1 = $translate.instant('risk.addNewStrategy.succMsg1');
			$scope.createSuccMsg2 = $translate.instant('risk.addNewStrategy.succMsg2');
			$scope.createErrMsg1 = $translate.instant('risk.addNewStrategy.errMsg1');
			$scope.createErrMsg2 = $translate.instant('risk.addNewStrategy.errMsg2');
			$scope.createErrMsg3 = $translate.instant('risk.addNewStrategy.errMsg3');
			//translation on language change
			$rootScope.$on('$translateChangeSuccess', function () {

				$scope.createSuccMsg1 = $translate.instant('risk.addNewStrategy.succMsg1');
				$scope.createSuccMsg2 = $translate.instant('risk.addNewStrategy.succMsg2');
				$scope.createErrMsg1 = $translate.instant('risk.addNewStrategy.errMsg1');
				$scope.createErrMsg2 = $translate.instant('risk.addNewStrategy.errMsg2');
				$scope.createErrMsg3 = $translate.instant('risk.addNewStrategy.errMsg3');

			});

			if (duplicateBuyerCountryIndustryExists) {
				toastr.error( $scope.createErrMsg1  + duplicateCountry +  $scope.createErrMsg2 +  duplicateBuyerIndustry + '!',  $scope.createErrMsg3);
				duplicateBuyerCountryIndustryExists = false;
//				refresh();
			} else {
				Risk.modifyRisk(riskStrategy).$promise.then(function(strategies){
					var currentRoundStrategies = [];
					for (var i = 0 ; i < strategies.length; i++) {
						if(strategies[i].round == $rootScope.currentRoundNumber) {
							currentRoundStrategies.push(strategies[i]);
						}
					}
					$rootScope.strategies = currentRoundStrategies;
					console.log('Current round strategies - ' + JSON.stringify($rootScope.strategies));
					toastr.success($scope.selected.strategyName +  $scope.createSuccMsg1,  $scope.createSuccMsg2);
					
					Countries.industryAggrData({"countryName":$rootScope.selectedCountryISOCode,"currentRound":$rootScope.roundNumber},function(dataToPlot){
	        	 	$rootScope.graphs = [dataToPlot];
					});
					
					$modalStack.dismissAll('close');
					//$modalInstance.dismiss('close');	
				});
						
			}
		})


	};
})

.controller('DeleteRiskModalInstanceCtrl', function ($http, $scope, $modalInstance, selectedDeleteRiskStrategy, Auth, toastr, Offer, $rootScope, Risk, $translate, Round, Team,$modalStack,Countries){
	$scope.selectedDelete = selectedDeleteRiskStrategy;
	
	//delete strategy
	$scope.delete = function (strategy) {
		var toBedeletedRiskStrategy = {toBeDeletedId:strategy._id};
		var strategies;
		Risk.deleteRisk(toBedeletedRiskStrategy).$promise.then(function(strategies){
			var currentRoundStrategies = [];
			for (var i = 0 ; i < strategies.length; i++) {
				if(strategies[i].round == $rootScope.currentRoundNumber) {
					currentRoundStrategies.push(strategies[i]);
				}
			}
			$rootScope.strategies = currentRoundStrategies;
			updateNotifications();
			$modalInstance.dismiss('close');
		});
		
	};
	
	$scope.closeModal = function () {
		Countries.industryAggrData({"countryName":$rootScope.selectedCountryISOCode,"currentRound":$rootScope.roundNumber},function(dataToPlot){
	        	 $rootScope.graphs = [dataToPlot];
			});
		$modalStack.dismissAll('close');
		//$modalInstance.dismiss('close');
	};
	
	function updateNotifications () {
		Round.currentRound(function(round){
			$rootScope.roundNumber = round.round;
			
			$rootScope.makeOfferClass = 'icheckbox_minimal-grey';
			$rootScope.manageRiskClass = 'icheckbox_minimal-grey';
			$rootScope.companyInvestmentClass = 'icheckbox_minimal-grey';
			$rootScope.pendingTasks = 3;
			
			$rootScope.getCurrentTeam = Auth.getCurrentTeam;
			Team.notificationInformation({id:0}).$promise.then(function(notificationObject){
				$rootScope.makeOfferClass = notificationObject.numberOffers == 0 ?  'icheckbox_minimal-grey' : 'icheckbox_minimal-grey  checked';
				$rootScope.manageRiskClass = notificationObject.numOfRiskStrategies == 0 ? 'icheckbox_minimal-grey' : 'icheckbox_minimal-grey  checked';
				$rootScope.companyInvestmentClass = notificationObject.numOfProjects == 0 ? 'icheckbox_minimal-grey' : 'icheckbox_minimal-grey checked';
				$rootScope.pendingTasks = notificationObject.numberOffers == 0 ? $rootScope.pendingTasks : $rootScope.pendingTasks - 1;
				$rootScope.pendingTasks = notificationObject.numOfRiskStrategies == 0 ? $rootScope.pendingTasks : $rootScope.pendingTasks - 1;
				$rootScope.pendingTasks = notificationObject.numOfProjects == 0 ? $rootScope.pendingTasks : $rootScope.pendingTasks - 1;
			});
		});
	}
})

.controller('CreateNewRiskModalInstanceCtrl', function ($http, $scope, newRiskStrategy, $modalInstance, Auth, toastr, Offer, $rootScope, Risk, $translate, Round, Team, Countries, $modalStack){
	
	$scope.createRiskLimitTitle = $translate.instant('risk.addNewStrategy.errMsg.limit.title');
	$scope.createRiskLimit1 = $translate.instant('risk.addNewStrategy.errMsg.limit1');
	$scope.createRiskLimit2 = $translate.instant('risk.addNewStrategy.errMsg.limit2');
	
	$rootScope.$on('$translateChangeSuccess', function () {

		$scope.createRiskLimitTitle = $translate.instant('risk.addNewStrategy.errMsg.limit.title');
		$scope.createRiskLimit1 = $translate.instant('risk.addNewStrategy.errMsg.limit1');
		$scope.createRiskLimit2 = $translate.instant('risk.addNewStrategy.errMsg.limit2');

	});
	
	$scope.addToRiskStrategy = function(param) {
		console.log(' parameters passed --> ' + JSON.stringify(param));
		/*var updateStrategyObj = {
				round:$rootScope.currentRoundNumber,
				strategyId: param._id,
				countryISOCode: $scope.selectedCountryISOCode,
				industry: industry
		}*/
//		console.log(' ?????? ' + $rootScope.selectedCountryISOCode + ' && ' + $rootScope.selectedBubbleIndustry);
		Team.addToRiskStrategy({
			round:$rootScope.currentRoundNumber,
			strategyId: param._id,
			countryISOCode: $rootScope.selectedCountryISOCode,
			industry: $rootScope.selectedBubbleIndustry
	}).$promise.then(function(result){
			Countries.industryAggrData({"countryName":$rootScope.selectedCountryISOCode,"currentRound":$rootScope.roundNumber},function(dataToPlot){
	        	 $rootScope.graphs = [dataToPlot];
	        	 $modalInstance.dismiss('close');
	        	 toastr.success(JSON.stringify("Successfully added industry to risk strategy!"));
			});
			Team.getCurrentRoundRiskStrategies({round : $rootScope.roundNumber}).$promise.then(function(teamRiskStrategies){
//				console.log('strategies from new call' + JSON.stringify(teamRiskStrategies));
				var currentRoundStrategies = [];
				for (var i = 0 ; i < teamRiskStrategies.length; i++) {
					currentRoundStrategies.push(teamRiskStrategies[i].riskStrategy);
				}
				$rootScope.strategies = currentRoundStrategies;
			});
		}, function(error){
	    	console.log('Error == ' +  JSON.stringify(error));
	    	toastr.error(JSON.stringify(error.data));
	    });
	}
	
	$scope.removeFromRiskStrategy = function(param) {
		console.log(' parameters passed --> ' + JSON.stringify(param));

//		console.log(' ?????? ' + $rootScope.selectedCountryISOCode + ' && ' + $rootScope.selectedBubbleIndustry);
		Team.removeFromRiskStrategy({
			round:$rootScope.currentRoundNumber,
			strategyId: param._id,
			countryISOCode: $rootScope.selectedCountryISOCode,
			industry: $rootScope.selectedBubbleIndustry
	}).$promise.then(function(result){
			Countries.industryAggrData({"countryName":$rootScope.selectedCountryISOCode,"currentRound":$rootScope.roundNumber},function(dataToPlot){
	        	 $rootScope.graphs = [dataToPlot];
//	        	 $modalInstance.dismiss('close');
	        	 toastr.success(JSON.stringify("Successfully removed industry from risk strategy!"));
			});
			Team.getCurrentRoundRiskStrategies({round : $rootScope.roundNumber}).$promise.then(function(teamRiskStrategies){
//				console.log('strategies from new call' + JSON.stringify(teamRiskStrategies));
				var currentRoundStrategies = [];
				for (var i = 0 ; i < teamRiskStrategies.length; i++) {
					currentRoundStrategies.push(teamRiskStrategies[i].riskStrategy);
				}
				$rootScope.strategies = currentRoundStrategies;
			});
		}, function(error){
	    	console.log('Error == ' +  JSON.stringify(error));
	    	toastr.error(JSON.stringify(error.data));
	    });
	}
	
	$scope.newRiskStrategy = newRiskStrategy;

	$http.get('/api/ratingBands').success(function (ratingBands) {

		console.log(ratingBands);
		$scope.ratingBands = ratingBands;
	});

	$http.get('/api/country').success(function (countries) {

		console.log(countries);
		$scope.cou = countries;
	});

	//get industry
	$http.get('/api/industry').success(function (industries) {

		console.log(industries);
		$scope.ind = industries;
	});

	$scope.closeModal = function () {
		  Countries.industryAggrData({"countryName":$rootScope.selectedCountryISOCode,"currentRound":$rootScope.roundNumber},function(dataToPlot){
	        	 $rootScope.graphs = [dataToPlot];
			});
	      //$modalInstance.dismiss('close');
		  $modalStack.dismissAll('close');
	};

	/*function refresh(){
		$http.get('/api/team/me').success( function (team){
			$rootScope.team = team;
			$scope.strategies = $rootScope.team.riskStrategy; 
		});
	}*/


	$scope.save = function() {
		Team.roundLevelInformation({id: ($rootScope.currentRoundNumber)}).$promise.then(function(roundLevelInformation){
			var numberOfRisks = 0;
			var departmentSize;
			for(var i = 0; i<roundLevelInformation.roundLevelInformation[0].department.length ; i++) {
				if(roundLevelInformation.roundLevelInformation[0].department[i].name == 'Risk'){
					numberOfRisks = roundLevelInformation.roundLevelInformation[0].department[i].numberOfBenefits;
					departmentSize = roundLevelInformation.roundLevelInformation[0].department[i].sizeUnit;
					break;
				}				
			}
			
			if ($rootScope.strategies.length >= numberOfRisks) {
				toastr.error($scope.createRiskLimit1 + numberOfRisks + $scope.createRiskLimit2 + departmentSize,$scope.createRiskLimitTitle);
				return;
			}
		
		$scope.newRiskStrategy.strategyRatingBand1 = $scope.newRiskStrategy.ratingBand[1];
		$scope.newRiskStrategy.strategyRatingBand2 = $scope.newRiskStrategy.ratingBand[2];
		$scope.newRiskStrategy.strategyRatingBand3 = $scope.newRiskStrategy.ratingBand[3];
		$scope.newRiskStrategy.strategyRatingBand4 = $scope.newRiskStrategy.ratingBand[4];
		$scope.newRiskStrategy.strategyRatingBand5 = $scope.newRiskStrategy.ratingBand[5];
		
		$scope.showStrategyNameRequiredError = false;
		$scope.showRatingBandRequiredError = false;
		$scope.showRatingBandRangeError = false;
		$scope.showBuyerCountryError = false;
		$scope.showBuyerIndustryError = false;
		
		if (typeof($scope.newRiskStrategy.strategyName)==='undefined'){
			$scope.showStrategyNameRequiredError = true;
			return;
		} else if (typeof($scope.newRiskStrategy.strategyRatingBand1)==='undefined' 
			|| typeof($scope.newRiskStrategy.strategyRatingBand2)==='undefined' 
			|| typeof($scope.newRiskStrategy.strategyRatingBand3)==='undefined' 
			|| typeof($scope.newRiskStrategy.strategyRatingBand4)==='undefined' 
			|| typeof($scope.newRiskStrategy.strategyRatingBand5)==='undefined') {
			$scope.showRatingBandRequiredError = true;
			return;
		} else if ($scope.newRiskStrategy.strategyRatingBand1 == 0
				&& $scope.newRiskStrategy.strategyRatingBand2 == 0
				&& $scope.newRiskStrategy.strategyRatingBand3 == 0
				&& $scope.newRiskStrategy.strategyRatingBand4 == 0
				&& $scope.newRiskStrategy.strategyRatingBand5 == 0) {
			$scope.showRatingBandRangeError = true;
			return;
		} else if (typeof($scope.newRiskStrategy.buyerCountry) == 'undefined') {
			$scope.showBuyerCountryError = true;
			return;
		} else if (typeof($scope.newRiskStrategy.buyerIndustry) == 'undefined' ){
			$scope.showBuyerIndustryError = true;
			return;
		}
		
		var riskStrategy = {
				round: $rootScope.currentRoundNumber,
				strategyName: $scope.newRiskStrategy.strategyName,
				buyerCountry: $scope.newRiskStrategy.buyerCountry,
				buyerIndustry: $scope.newRiskStrategy.buyerIndustry,
				strategyRatingBand1: $scope.newRiskStrategy.strategyRatingBand1,
				strategyRatingBand2: $scope.newRiskStrategy.strategyRatingBand2,
				strategyRatingBand3: $scope.newRiskStrategy.strategyRatingBand3,
				strategyRatingBand4: $scope.newRiskStrategy.strategyRatingBand4,
				strategyRatingBand5: $scope.newRiskStrategy.strategyRatingBand5
		};	

		var duplicateBuyerCountryIndustryExists = false;
		var duplicateCountry;
		var duplicateBuyerIndustry;
		for (var i=0 ; i<$scope.newRiskStrategy.buyerCountry.length ; i++) {
			var country = $scope.newRiskStrategy.buyerCountry[i];
			for (var j=0; j<$rootScope.strategies.length ; j++) {
				var strategy = $rootScope.strategies[j];
				if (strategy.buyerCountry.indexOf(country) > -1) {
					for (var k=0; k<$scope.newRiskStrategy.buyerIndustry.length; k++) {
						var industry = $scope.newRiskStrategy.buyerIndustry[k];
						if (strategy.buyerIndustry.indexOf(industry) > -1) {
							duplicateBuyerCountryIndustryExists = true;
							duplicateCountry = country;
							duplicateBuyerIndustry = industry;
							break;
						}
					}
				}
			}
		}

		//translation on load 
		$scope.createSuccMsg1 = $translate.instant('risk.addNewStrategy.succMsg1');
		$scope.createSuccMsg2 = $translate.instant('risk.addNewStrategy.succMsg2');
		$scope.createErrMsg1 = $translate.instant('risk.addNewStrategy.errMsg1');
		$scope.createErrMsg2 = $translate.instant('risk.addNewStrategy.errMsg2');
		$scope.createErrMsg3 = $translate.instant('risk.addNewStrategy.errMsg3');
		//translation on language change
		$rootScope.$on('$translateChangeSuccess', function () {

			$scope.createSuccMsg1 = $translate.instant('risk.addNewStrategy.succMsg1');
			$scope.createSuccMsg2 = $translate.instant('risk.addNewStrategy.succMsg2');
			$scope.createErrMsg1 = $translate.instant('risk.addNewStrategy.errMsg1');
			$scope.createErrMsg2 = $translate.instant('risk.addNewStrategy.errMsg2');
			$scope.createErrMsg3 = $translate.instant('risk.addNewStrategy.errMsg3');

		});


		if (duplicateBuyerCountryIndustryExists) {
			toastr.error( $scope.createErrMsg1 + duplicateCountry +  $scope.createErrMsg2 +  duplicateBuyerIndustry + '!',  $scope.createErrMsg3);
			duplicateBuyerCountryIndustryExists = false;
		} else {
			Risk.addRisk(riskStrategy).$promise.then(function(strategies){
				var currentRoundStrategies = [];
				for (var i = 0 ; i < strategies.length; i++) {
					if(strategies[i].round == $rootScope.currentRoundNumber) {
						currentRoundStrategies.push(strategies[i]);
					}
				}
				$rootScope.strategies = currentRoundStrategies;
				Countries.industryAggrData({"countryName":$rootScope.selectedCountryISOCode,"currentRound":$rootScope.roundNumber},function(dataToPlot){
	        	 $rootScope.graphs = [dataToPlot];
				});
				toastr.success($scope.newRiskStrategy.strategyName +  $scope.createSuccMsg1,   $scope.createSuccMsg2 );
				updateNotifications();
				//$modalInstance.dismiss('close');
				$modalStack.dismissAll('close');	
			});			
		}	
		
		});
	};
	
	function updateNotifications () {
		Round.currentRound(function(round){
			$rootScope.roundNumber = round.round;
			$rootScope.pendingTasks = 0;
			$rootScope.getCurrentTeam = Auth.getCurrentTeam;
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

//	function arrayEquality

	/*function refresh(){
		$http.get('/api/team/me').success( function (team){
			$rootScope.team = team;
			$rootScope.strategies = $rootScope.team.riskStrategy; 
		});
	}*/
})


