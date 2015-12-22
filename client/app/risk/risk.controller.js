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
.controller('riskCtrl', function ($scope, $http, Auth,Team, $translate) {

	$http.get('/api/team').success(function (teams) {     
		$scope.getCurrentTeam = Auth.getCurrentTeam;       
		$scope.strategies = Auth.getCurrentTeam().riskStrategy; 
	});

	//delete strategy
	$scope.delete = function (strategy) {
		console.log(strategy);
		alert(strategy);
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
	$scope.saveStrategy = function()
	{
		var test = $scope.strategyName;
		console.log(test);
		alert(test);
	};

});


