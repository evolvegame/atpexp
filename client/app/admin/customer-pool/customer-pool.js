'use strict';

angular.module('atpexpApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('customer-pool', {
        url: '/admin/customer-pool',
        templateUrl: 'app/admin/customer-pool/customer-pool.html',
        controller: 'CustomerPoolCtrl',
        authenticate: true
      });
  });