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
      },
      roundLevelInformation: {
        method: 'GET',
        params: {
          controller:'roundLevelInformation'
        }
      },
      miniDashboardInfo: {
        method: 'GET',
        params: {
          controller:'miniDashboardInfo'
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
	return $resource('/api/team/:toBeDeletedId/:round/:strategyName/:buyerCountry/:buyerIndustry/:strategyRatingBand1/:strategyRatingBand2/:strategyRatingBand3/:strategyRatingBand4/:strategyRatingBand5/:controller',{
		toBeDeletedId:'@toBeDeletedId',
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
		deleteRisk: {
	          method: 'PUT',
	          params: {
	        	  controller:'deleteRisk'
	          },
	          isArray: true
	 },
		addRisk: {
	          method: 'PUT',
	          params: {
	        	  controller:'risk'
	          },
	          isArray: true
	 },
	   modifyRisk: {
		   method: 'PUT',
		   params: {
		        	 controller:'modifyRisk'
		          },
		          isArray: true
		        },
	});
})

//Offer Page related Restful services factory
.factory('Offer', function($resource){
	return $resource('/api/team/:offerId/:round/:marketBusinessName/:price/:cld/:controller',{
		offerId:'@offerId',
		marketBusinessName:'@marketBusinessName',
		round: '@round',
		price: '@price',
		cld:'@cld'
	},{
		deleteOffer: {
	          method: 'PUT',
	          params: {
	        	  controller:'deleteOffer'
	          }
	 },
		addOffer: {
	          method: 'PUT',
	          params: {
	        	  controller:'offer'
	          }
	 },
	   modifyOffer: {
		   method: 'PUT',
		   params: {
		        	 controller:'modifyOffer'
		          }
		        },
	});
});



