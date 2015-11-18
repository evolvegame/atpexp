'use strict';

angular.module('atpexpApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('simulation', {
        url: '/admin/simulation',
        templateUrl: 'app/admin/simulation/simulation.html',
        controller: 'SimulationCtrl',
        authenticate: true
      });
  });