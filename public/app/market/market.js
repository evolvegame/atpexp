'use strict';

angular.module('atpexpApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('market', {
        url: '/market',
        templateUrl: 'app/market/market.html',
        controller: 'MarketCtrl',
        authenticate: true
      });
  });