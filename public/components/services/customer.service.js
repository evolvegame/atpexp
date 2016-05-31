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
		
		getOfferAnalysis : {
			method: 'GET',
			params: {
				customerId:1,
				controller:'getOfferAnalysis'
			},
			isArray: true
		},
		
		
	});
})

.factory('LocalCustomer', function($resource){
 this.customers = $resource('/api/customer');
	return $resource('/api/customer/:id/:revenueStr/:weatherStr/:country/:round/:controller',{
		round:'@round',
		revenueStr:'@revenueStr',
		weatherStr: '@weatherStr',
		country:'@country'
	},{
		
		getLocalCustomerForFilter : {
			method: 'GET',
			params: {
				controller:'getLocalCustomerForFilter'
			}
		},
		
		getLocalCustomers : {
			method: 'GET',
			params: {
				id:1,
				controller:'getLocalCustomers'
			},
			isArray: true
		},
		
		updateLocalOffers : {
			method: 'PUT',
			params: {
				id:1,
				name:'@name',
				industry: '@industry',
				countryName: '@country',
				country: null,
				premiumPercentage: '@premiumPercentage',
				expectedPremium: '@expectedPremium',
				buyerRatingFrom:'@buyerRatingFrom',
				buyerRatingTo:'@buyerRatingTo',
				currentRoundOfferSelection: '@currentRoundOfferSelection',
				offerEdited: '@offerEdited',
				numResources: '@numResources',
				mdNumOfResources:'@mdNumOfResources',
				controller:'updateLocalOffers'
			},
			isArray: true
		},
		
		totalNumOfResources : {
			method: 'GET',
			params: {
				id:1,
				controller:'totalNumOfResources'
			},
			isArray: true
		},
		
	});
})


.factory('GlobalCustomer', function($resource){
 this.customers = $resource('/api/customer');
 return $resource('/api/customer/:customerId/:controller',{
		
	},{
		getGlobalCustomers : {
			method: 'GET',
			params: {
				customerId:1,
				controller:'getGlobalCustomers'
			},
			isArray: true
		},
		
	});
})
 .service('Customer', function ($resource) {
    this.customers = $resource('/api/customer');   
  });
