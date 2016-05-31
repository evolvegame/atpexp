'use strict';

angular.module('atpexpApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('customer-portfolio', {
        url: '/customer-portfolio',
        templateUrl: 'app/customer-portfolio/customer-portfolio.html',
        controller: 'CustomerPortfolioCtrl',
        authenticate: true
      });
  });