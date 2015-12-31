'use strict';

angular.module('atpexpApp')
  .controller('CustomerPoolCtrl', function ($scope, Customer, $rootScope, toastr) {
    Customer.customers.query().$promise.then(function (customers) {
      $scope.customers = customers;
    });
$scope.refreshCustomer = function (){
	Customer.customers.query().$promise.then(function (customers) {
      $scope.customers = customers;
    });
	toastr.info('Customer info refreshed');
}

  })
 