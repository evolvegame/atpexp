'use strict';

angular.module('atpexpApp')

  .controller('CustomerPoolCtrl', function ($scope, $http) {

    $http.get('/api/customer').success(function (customers) {
      console.log(customers)
      $scope.objects = customers
      $scope.totalItems = $scope.objects.length;
      $scope.currentPage = 1;
      $scope.numPerPage = 5;

      $scope.paginate = function( value) {
        var begin, end, index;
        begin = ($scope.currentPage - 1) * $scope.numPerPage;
        end = begin + $scope.numPerPage;
        index = $scope.objects.indexOf(value);
        return (begin <= index && index < end);
      };
    })

    // function setRange(min,max)
    // {
    //     $scope.risk = Math.floor(Math.random()*(max-min+1)+min);
    // }

  })
