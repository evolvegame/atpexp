'use strict';

angular.module('atpexpApp')
//Customer Page related Restful services factory
.factory('OfferCount', function($resource){
 this.customers = $resource('/api/customer');
	return $resource('/api/customer/:customerId/:count/:controller',{
		customerId:'@customerId',
		count:'@count'
		
	},{
		
		updateOfferCount: {
			method: 'PUT',
			params: {
				controller:'updateOfferCount'
			}
		},
	});
})
 .service('Customer', function ($resource) {
    this.customers = $resource('/api/customer');    
  });
