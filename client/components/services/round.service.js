'use strict';

angular.module('atpexpApp')
  .service('Round', function ($resource) {
    this.round = $resource('/api/rounds');    
  });
  