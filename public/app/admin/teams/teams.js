'use strict';

angular.module('atpexpApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('teams', {
        url: '/admin/teams',
        templateUrl: 'app/admin/teams/teams.html',
        controller: 'TeamsCtrl',
        authenticate: true
      });
  });
