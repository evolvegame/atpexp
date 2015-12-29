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
.controller('riskCtrl', function ($scope, $http, Auth, Team , $translate, Risk, $rootScope) {

	$http.get('/api/team/me').success(function (team) {     
		$rootScope.team = team;       
		$scope.strategies = $rootScope.team.riskStrategy; 
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
	
	function refresh(){
        $http.get('/api/team/me').success( function (team){
        $rootScope.team = team;
        $scope.strategies = $rootScope.team.riskStrategy; 
        });
    }

});


