'use strict';

angular.module('atpexpApp')
  .service('Customer', function ($resource) {
    this.customers = $resource('/api/customer');    
  });
  