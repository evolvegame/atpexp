'use strict';

angular.module('atpexpApp')
  .factory('Team', function ($resource) {
    return $resource('/api/team/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
     teamSettings: {
        method: 'PUT',
        params: {
          controller:'team'
        }
      },
      teamDepartment: {
            method: 'PUT',
            params: {
              controller:'department'
           }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });
  })

.factory('Project', function($resource){
	return $resource('/api/team/:id/:switchStatus/:controller',{
		id: '@_id',
		switchStatus:'@switchStatus'
	},{
		teamCompany: {
	          method: 'PUT',
	          params: {
	        	  controller:'project'
	          }
	        },
	});
})

//Risk Page related Restful services factory

.factory('Risk', function($resource){
	return $resource('/api/team/:round/:strategyName/:buyerCountry/:buyerIndustry/:strategyRatingBand1/:strategyRatingBand2/:strategyRatingBand3/:strategyRatingBand4/:strategyRatingBand5/:controller',{
		strategyName:'@strategyName',
		round: '@round',
		buyerCountry: '@buyerCountry',
		buyerIndustry: '@buyerIndustry',
		strategyRatingBand1: '@strategyRatingBand1',
		strategyRatingBand2: '@strategyRatingBand2',
		strategyRatingBand3: '@strategyRatingBand3',
		strategyRatingBand4: '@strategyRatingBand4',
		strategyRatingBand5: '@strategyRatingBand5'
		
	},{
		addRisk: {
	          method: 'PUT',
	          params: {
	        	  controller:'risk'
	          }
	        },
	});
})
