'use strict';

angular.module('atpexpApp')
.config(function ($translateProvider) {
	
	  $translateProvider.translations('en', {		   
		  Modify:'FRANCE'
		  })
		  .translations('de', {		  
		    Modify:'FRDE'
		  })
		  .translations('fr', {			   
			    Modify:'FRANdedCE'
			  }
		  );

	
	
  })
  .controller('riskCtrl', function ($scope, $http, $translate) {

	
		 
	    $http.get('/api/strategy').success(function (strategies) {
	    
	      console.log(strategies);
	      $scope.objects = strategies;
	      
	      $scope.deleteStrategy = function(sno) {
	          $http.delete('/api/strategy/' + sno);
	          alert("hi");
	        };
  })
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

