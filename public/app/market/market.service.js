'use strict';

angular.module('atpexpApp')
  .service('Market', function ($resource) {
    this.customers = $resource('/api/customer');
    this.offers = $resource('/api/offers');
  })
  .factory('Offer', function ($resource) {
    return $resource('/api/offers', {}, {
        save: { method: 'POST' }
      });
  });
