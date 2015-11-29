'use strict';

angular.module('atpexpApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ranking', {
        url: '/ranking',
        templateUrl: 'app/ranking/ranking.html',
        controller: '',
        authenticate: true
      });
  });