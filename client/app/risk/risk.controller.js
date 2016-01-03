'use strict';

angular.module('atpexpApp')
.config(function ($translateProvider) {
	//translate
	$translateProvider.translations('en', {
		Strategy_Name: ' Strategy Name',
		Country: 'Country',
		Industry: 'Industry',
		RiskAcceptance :'RiskAcceptance (IER)',
		Modify:'Modify',
		Delete: 'Delete',
		Add_New_Strategy:'Add New Strategy'
	})
	.translations('de', {
		Strategy_Name: 'Strategie -Name',
		Country: 'Land',
		Industry: 'Industrie',
		RiskAcceptance:'Risikoakzeptanz',
		Modify:'Ändern',
		Delete: 'Löschen',
		Add_New_Strategy:'Fügen Sie neue Strategie'
	})
	.translations('fr', {
		Strategy_Name: 'Nom Stratégie',
		Country: 'Pays',
		Industry: 'Industrie',
		RiskAcceptance:'Acceptation des risques',
		Modify:'Modifier',
		Delete: 'Effacer',
		Add_New_Strategy:'Ajouter une nouvelle stratégie'
	}
	);



	$translateProvider.preferredLanguage('en');



})

.controller('riskCtrl', function ($scope, $http, Auth, Team , $translate, Risk, $rootScope, $modal) {

	$http.get('/api/team/me').success(function (team) {     
		$rootScope.team = team;       
		$rootScope.strategies = $rootScope.team.riskStrategy; 
	});

	//delete strategy
	$scope.delete = function (strategy) {
		console.log('strategy--> ' + JSON.stringify(strategy));
		var toBedeletedRiskStrategy = {toBeDeletedId:strategy._id};
		Risk.deleteRisk(toBedeletedRiskStrategy);
		refresh();		
	};

	//get industry
	$http.get('/api/industry').success(function (industries) {

		console.log(industries);
		$scope.ind = industries;
	});

	//get country
	$http.get('/api/country').success(function (countries) {

		console.log(countries);
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
		Risk.addRisk(riskStrategy);
		refresh();
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
	
	$scope.showCreateNewRiskStrategy = function() {
		$scope.newRiskStrategy = {
				strategyName: "Enter New Strategy Name",
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

})

.controller('RiskModalInstanceCtrl', function ($http, $scope, $modalInstance, selectedRiskStrategy, Auth, toastr, Offer, $rootScope, Risk){
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
	
	function closeModal () {
		$scope.selected = selectedRiskStrategy;
	    $modalInstance.dismiss('close');
	    refresh();
	}
	
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
			
			if (duplicateBuyerCountryIndustryExists) {
				toastr.error('There already exists a combination of ' + duplicateCountry + ' and ' +  duplicateBuyerIndustry + '!', 'Duplicate Error');
				duplicateBuyerCountryIndustryExists = false;
				refresh();
			} else {
				Risk.modifyRisk(riskStrategy);
				refresh();
				toastr.success($scope.selected.strategyName + ' has been saved successfully', 'Strategy Saved! ');
				closeModal();
			}
		})
		
		
	};
})

.controller('CreateNewRiskModalInstanceCtrl', function ($http, $scope, newRiskStrategy, $modalInstance, Auth, toastr, Offer, $rootScope, Risk){
	
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
	
	function closeModal () {
		$modalInstance.dismiss('close');
	    refresh();
	}
	
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
		
		var riskStrategy = {
			    round: 1,
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
		
		if (duplicateBuyerCountryIndustryExists) {
			toastr.error('There already exists a combination of ' + duplicateCountry + ' and ' +  duplicateBuyerIndustry + '!', 'Duplicate Error');
			duplicateBuyerCountryIndustryExists = false;
		} else {
			Risk.addRisk(riskStrategy);
			refresh();
			toastr.success($scope.newRiskStrategy.strategyName + ' has been saved successfully', 'Strategy Saved! ');
			closeModal();
		}		
	};
	
//	function arrayEquality
	
	function refresh(){
        $http.get('/api/team/me').success( function (team){
	        $rootScope.team = team;
	        $rootScope.strategies = $rootScope.team.riskStrategy; 
        });
    }
})


