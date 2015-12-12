'use strict';

angular.module('atpexpApp')

  .controller('riskCtrl', function ($scope, $http) {

   
	    $http.get('/api/strategy').success(function (strategies) {
	    
	      console.log(strategies);
	      $scope.objects = strategies;
  })
  })
