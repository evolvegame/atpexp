'use strict';

angular.module('atpexpApp')

.controller('riskCtrl', function ($scope, $http, Auth, Team , $translate, Risk, $rootScope, $modal, Round) {

	$http.get('/api/team/me').success(function (team) {     
		$rootScope.team = team;       
		$rootScope.strategies = $rootScope.team.riskStrategy; 
	});

	Round.currentRound(function(round){
		$rootScope.currentRoundNumber = round.round;
	});
	

	//get industry
	$http.get('/api/industry').success(function (industries) {

		console.log(industries);
		$scope.ind = industries;
	});

	//get country
	$http.get('/api/country').success(function (countries) {
		
		console.log('Countries ---->>> ' + JSON.stringify(countries));
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
		console.log("Strategy name --> " + strategyName);
		console.log("Country name --> " + country);
		console.log("Industries name ???--> " + industries);
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
		console.log('OPenind delete modal ---- ');
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

	$scope.showModifyRiskStrategy = function(strategy) {
		$scope.selected = strategy;
	};
	
	$scope.showDeleteRiskStrategy = function(strategy) {
		$scope.selectedDelete = strategy;
		console.log('SDelectywed foe delete --- ' + JSON.stringify($scope.selectedDelete));
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

		console.log('Showing create new strategy --> ' + JSON.stringify($scope.newRiskStrategy));
	};

	function refresh(){
		$http.get('/api/team/me').success( function (team){
			$rootScope.team = team;
			$scope.strategies = $rootScope.team.riskStrategy; 
		});
	}
	
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

})

.controller('RiskModalInstanceCtrl', function ($http, $scope, $modalInstance, selectedRiskStrategy, Auth, toastr, Offer, $rootScope, Risk,$translate){
	$scope.selected = selectedRiskStrategy;

	$scope.selected.ratingBand = {
			1: selectedRiskStrategy.strategyRatingBand1,
			2: selectedRiskStrategy.strategyRatingBand2,
			3: selectedRiskStrategy.strategyRatingBand3,
			4: selectedRiskStrategy.strategyRatingBand4,
			5: selectedRiskStrategy.strategyRatingBand5

	};
	console.log('Ssshhh... ' + JSON.stringify($scope.selected));
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
	      $modalInstance.dismiss('close');
	};

	function refresh(){
		$http.get('/api/team/me').success( function (team){
			$rootScope.team = team;
			$rootScope.strategies = $rootScope.team.riskStrategy; 
		});
		console.log('refresshing....');
	}


	$scope.saveModification = function() {
//		console.log('ya ya will modify.......---->>>> ' + JSON.stringify($scope.selected));

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
		
		console.log('selected round number --- ' + $scope.selected.round);
		
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
			console.log('strategy loop --->>>> ' + JSON.stringify(teamFromDB.riskStrategy));
			console.log('strategy Buyer country from form --->>>> ' + JSON.stringify($scope.selected.buyerCountry));		
			console.log('strategy Buyer Industry from form --->>>> ' + JSON.stringify($scope.selected.buyerIndustry));		
			for (var i=0 ; i<$scope.selected.buyerCountry.length ; i++) {
				var country = $scope.selected.buyerCountry[i];
				console.log('Entering loop i -- ' + i);

				if (!duplicateBuyerCountryIndustryExists) {

					for (var j=0; j<teamFromDB.riskStrategy.length ; j++) {
						var strategy = teamFromDB.riskStrategy[j];
						console.log('Entering loop j -- ' + j);
						if (!duplicateBuyerCountryIndustryExists && strategy._id != $scope.selected._id && strategy.buyerCountry.indexOf(country) > -1) {
							for (var k=0; k<$scope.selected.buyerIndustry.length; k++) {
								console.log('Entering loop k -- ' + k);
								var industry =$scope.selected.buyerIndustry[k];
								console.log(' Industry from database --> ' + strategy.buyerIndustry);
								console.log(' Industry from form--> ' + industry);
								if (strategy.buyerIndustry.indexOf(industry) > -1) {
									duplicateBuyerCountryIndustryExists = true;
									duplicateCountry = country;
									duplicateBuyerIndustry = industry;
									console.log('Breaking free -- > ' + duplicateCountry + ' & ' + duplicateBuyerIndustry);
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

			console.log('duplicateBuyerCountryIndustryExists value -- ' + duplicateBuyerCountryIndustryExists);

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
				refresh();
			} else {
				Risk.modifyRisk(riskStrategy).$promise.then(function(strategies){
					$rootScope.strategies = strategies;
				});
//				refresh();
				toastr.success($scope.selected.strategyName +  $scope.createSuccMsg1,  $scope.createSuccMsg2);
				$modalInstance.dismiss('close');			}
		})


	};
})

.controller('DeleteRiskModalInstanceCtrl', function ($http, $scope, $modalInstance, selectedDeleteRiskStrategy, Auth, toastr, Offer, $rootScope, Risk, $translate, Round, Team){
	$scope.selectedDelete = selectedDeleteRiskStrategy;
	
	//delete strategy
	$scope.delete = function (strategy) {
		var toBedeletedRiskStrategy = {toBeDeletedId:strategy._id};
		var strategies;
		Risk.deleteRisk(toBedeletedRiskStrategy).$promise.then(function(strategies){
			console.log('Strategies back from server -- ' + JSON.stringify(strategies));
			$rootScope.strategies = strategies;
			updateNotifications();
		});
		$modalInstance.dismiss('close');
	};
	
	$scope.closeModal = function () {
		$modalInstance.dismiss('close');
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

.controller('CreateNewRiskModalInstanceCtrl', function ($http, $scope, newRiskStrategy, $modalInstance, Auth, toastr, Offer, $rootScope, Risk, $translate, Round, Team){

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
	      $modalInstance.dismiss('close');
	};

	function refresh(){
		$http.get('/api/team/me').success( function (team){
			$rootScope.team = team;
			$scope.strategies = $rootScope.team.riskStrategy; 
		});
		console.log('refresshing....');
	}


	$scope.save = function() {
		console.log('ya ya will modify.......---->>>> ' + JSON.stringify($scope.newRiskStrategy));
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
			Risk.addRisk(riskStrategy);
			refresh();
			toastr.success($scope.newRiskStrategy.strategyName +  $scope.createSuccMsg1,   $scope.createSuccMsg2 );
			updateNotifications();
			$modalInstance.dismiss('close');
		}		
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
				$rootScope.makeOfferClass = notificationObject.numberOffers == 0 ?  'icheckbox_minimal-grey' : 'icheckbox_minimal-grey  checked';
				$rootScope.manageRiskClass = notificationObject.numOfRiskStrategies == 0 ? 'icheckbox_minimal-grey' : 'icheckbox_minimal-grey  checked';
				$rootScope.companyInvestmentClass = notificationObject.numOfProjects == 0 ? 'icheckbox_minimal-grey' : 'icheckbox_minimal-grey  checked';
				$rootScope.pendingTasks = notificationObject.numberOffers == 0 ? $rootScope.pendingTasks : $rootScope.pendingTasks - 1;
				$rootScope.pendingTasks = notificationObject.numOfRiskStrategies == 0 ? $rootScope.pendingTasks : $rootScope.pendingTasks - 1;
				$rootScope.pendingTasks = notificationObject.numOfProjects == 0 ? $rootScope.pendingTasks : $rootScope.pendingTasks - 1;
			});
		});
	}

//	function arrayEquality

	function refresh(){
		$http.get('/api/team/me').success( function (team){
			$rootScope.team = team;
			$rootScope.strategies = $rootScope.team.riskStrategy; 
		});
	}
})


