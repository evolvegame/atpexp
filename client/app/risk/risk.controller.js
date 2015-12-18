'use strict';

angular.module('atpexpApp')
.config(function ($translateProvider) {
	
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

  })  
  .controller('indusCtrl', function ($scope, $http) {

   
	    $http.get('/api/industry').success(function (industries) {
	    
	      console.log(industries);
	      $scope.objects = industries;
  })
  })  
  .controller('countryCtrl', function ($scope, $http) {

   
	    $http.get('/api/country').success(function (countries) {
	    
	      console.log(countries);
	      $scope.objects = countries;
  })
  })
