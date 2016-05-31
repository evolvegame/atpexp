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
      },
      notificationInformation: {
          method: 'GET',
          params: {
            controller:'notificationInformation'
          }
      },
      getAllOffersMade: {
         method: 'GET',
         params: {
           controller:'getAllOffersMade'
         },
      	isArray: true
      },
      getAllWonCustomers: {
          method: 'GET',
          params: {
            controller:'getAllWonCustomers'
          },
       	isArray: true
       },
       getCurrentRoundStrategyBand: {
           method: 'PUT',
           params: {
        	 id:1,
             controller:'getCurrentRoundStrategyBand'
           },
        	isArray: true
        },
        getCurrentRoundGlobalSalesDepartmentInfo: {
            method: 'PUT',
            params: {
         	 id:1,
              controller:'getCurrentRoundGlobalSalesDepartmentInfo'
            },
         	isArray: true
         },
         getCurrentRoundNewGlobalOffers: {
             method: 'PUT',
             params: {
          	 id:1,
               controller:'getCurrentRoundNewGlobalOffers'
             },
          	isArray: true
          },
          getCurrentRoundRiskStrategies: {
              method: 'PUT',
              params: {
           	 id:1,
                controller:'getCurrentRoundRiskStrategies'
              },
           	isArray: true
           },
           allRoundLevelInformation: {
               method: 'PUT',
               params: {
            	 id:1,
                 controller:'allRoundLevelInformation'
               },
            	isArray: true
            },
            addToRiskStrategy: {
                method: 'PUT',
                params: {
             	 id:1,
                  controller:'addToRiskStrategy'
                }
            },
            removeFromRiskStrategy: {
                method: 'PUT',
                params: {
             	 id:1,
                  controller:'removeFromRiskStrategy'
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
	          },
	          isArray: true
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
	return $resource('/api/team/:offerId/:round/:marketBusinessName/:price/:cld/:offerType/:buyer1Country/:buyer1Industry/:buyer1Rating/:buyer1Cla/:buyer1RiskAcceptance/:buyer2Country/:buyer2Industry/:buyer2Rating/:buyer2Cla/:buyer2RiskAcceptance/:buyer3Country/:buyer3Industry/:buyer3Rating/:buyer3Cla/:buyer3RiskAcceptance/:controller',{
		offerId:'@offerId',
		marketBusinessName:'@marketBusinessName',
		round: '@round',
		price: '@price',
		cld:'@cld',	
		offerType: '@offerType',
		buyer1Country:'@buyer1Country',
        buyer1Industry:'@buyer1Industry',
        buyer1Rating:'@buyer1Rating',
        buyer1Cla:'@buyer1Cla',
        buyer1RiskAcceptance:'@buyer1RiskAcceptance',        
        buyer2Country:'@buyer2Country',
        buyer2Industry:'@buyer2Industry',
        buyer2Rating:'@buyer2Rating',
        buyer2Cla:'@buyer2Cla',
        buyer2RiskAcceptance:'@buyer2RiskAcceptance',        
        buyer3Country:'@buyer3Country',
        buyer3Industry:'@buyer3Industry',
        buyer3Rating:'@buyer3Rating',
        buyer3Cla:'@buyer3Cla',
        buyer3RiskAcceptance:'@buyer3RiskAcceptance'
	},{
		deleteOffer: {
	          method: 'PUT',
	          params: {
	        	  controller:'deleteOffer'
	          }
	 },
		makeOffer: {
	          method: 'PUT',
	          params: {
	        	  controller:'makeOffer'
	          },
	 	isArray: true
	 },
	   modifyOffer: {
		   method: 'PUT',
		   params: {
		        	 controller:'modifyOffer'
		          }
		        },
		        
       globalOfferHistory: {
		   method: 'PUT',
		   params: {
		        	 controller:'globalOfferHistory'
		          },
		   isArray: true
		},
	});
})


//ranking related services
.factory('Ranking', function($resource){
	return $resource('/api/team/:previousRoundNumber/:controller',{
		previousRoundNumber: '@previousRoundNumber'
	},{
		getAllTeamRankings: {
	          method: 'GET',
	          params: {
	        	  controller:'getAllTeamRankings'
	          },
	          isArray: true
	 },
	});
})

//Password Reset services
.factory('ResetPassword', function($resource){
	return $resource('/api/team/:teamId/:memberId/:password/:controller',{
		teamId: '@teamId',
		memberId: '@memberId',
		password:'@password'
	},{
		resetPassword: {
	          method: 'PUT',
	          params: {
	        	  controller:'resetPassword'
	          }
	         
	 },
	});
})

//Country related services
.factory('Country', function($resource){
	return $resource('/api/country/:country/:industry/:controller',{
		country: '@country',
		industry: '@industry'
	},{
		getWeatherSymbolRating: {
	          method: 'GET',
	          params: {
	        	  controller:'getWeatherSymbolRating'
	          },
	          isArray: true
	 },
	});
})


