'use strict';

angular.module('atpexpApp')

  .controller('riskCtrl', function ($scope, $http) {

   
	    $http.get('/api/strategy').success(function (strategies) {
	    
	      console.log(strategies);
	      $scope.objects = strategies;
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

