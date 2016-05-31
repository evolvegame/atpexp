'use strict';

angular.module('atpexpApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('risk', {
        url: '/risk',
        templateUrl: 'app/risk/risk.html',
        controller: 'riskCtrl',
        authenticate: true
      });
  });