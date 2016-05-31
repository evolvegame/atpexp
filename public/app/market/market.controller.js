'use strict';
angular.module('atpexpApp')
.controller('MarketCtrl', function ($scope, $modal, $http, Customer, $rootScope, toastr,$translate, Round ,Offer ,OfferCount, Countries, LocalCustomer, Team, $location, GlobalCustomer, DTOptionsBuilder) {
    // load selected customer in modal
    $scope.showCustomer = function(cust) {
      $scope.selected = cust;
    };

    /*$http.get('/api/team/me').success(function (team) {     
		Round.currentRound(function(round){
			$rootScope.currentRoundNumber = round.round;
			$rootScope.team = team;
			var departments = [];
			var localDepartmentSizeUnit;
			var numOfBenefits = 0;
			
			var roundLevelInfos = team.
			
		});
		
    };*/
		$http.get('/api/team/getTeamMembers').success(function(members){   
         $rootScope.members = members;
    });
    
    console.log(' location from path -- ' + JSON.stringify($location.search()));
    
    offerCounts();
    
    function offerCounts() {
    	$scope.showCountryLocalMarket = false;
    	$scope.localMarketMapLoading = true;
    	Round.currentRound(function(round){
        	$rootScope.currentRoundNumber = round.round;
        	var urlParameter = $location.search();
        	var customer = urlParameter.customer;
//        	$rootScope.selectedCountry = '';
        	if (typeof(customer) != 'undefined') {
        		console.log('Originated from customer portfoilo!!');
        		$scope.showCountryLocalMarket = true;
        		getLocalCustomers(customer.businessCountry);
        	}
        	Team.roundLevelInformation({id:round.round}).$promise.then(function(roundLevelInfo){
        		var departments = roundLevelInfo.roundLevelInformation[0].department;
        		$rootScope.experienceScore = roundLevelInfo.roundLevelInformation[0].experienceScore;
        		var localDepartmentSales = 0;
        		var globalDepartmentSales = 0;
        		for (var i = 0 ; i < departments.length; i++) {
        			if (departments[i].name == 'Local Sales'){
        				localDepartmentSales = departments[i].numberOfBenefits;	
        			} else if (departments[i].name == 'Global Sales') {
        				globalDepartmentSales = departments[i].numberOfBenefits;	
        			}
        		}
        		$rootScope.localDepartmentSales = localDepartmentSales;
        		$rootScope.globalDepartmentSales = globalDepartmentSales;
        	});
        	
        	Team.getAllOffersMade({id:round.round}).$promise.then(function(offers){
        		var globalOfferCount = 0;
        		var numberOfResources = 0;
        		for (var offerCount = 0; offerCount < offers.length; offerCount ++ ) {
        			if (offers[offerCount].marketType != 'Local Market Portfolio') {
        				if(offers[offerCount].offerType == 'New'){
        					globalOfferCount = globalOfferCount + 1;        					
        				}
        			} else {
        				if (typeof(offers[offerCount].numberOfResources) != 'undefined') {
        					numberOfResources = numberOfResources + offers[offerCount].numberOfResources;    					
        				} else if(typeof(offers[offerCount].numberOfResources) != 'undefined' && offers[offerCount].offerType == 'Renewal') {
        					numberOfResources = numberOfResources + offers[offerCount].diffNumberOfResources;    
        				}
        			}
        		}
        		$rootScope.localNumberOfResources = numberOfResources;
        		$rootScope.globalOfferCount = globalOfferCount;
        		console.log('$rootScope.globalOfferCount == ' + $rootScope.globalOfferCount);
        	});
        	
        	$rootScope.localActiveCustomers = 0;
        	$rootScope.globalActiveCustomers = 0;
        	
        	Team.getAllWonCustomers({id:1}).$promise.then(function(customers){
        		var localActiveCustomers = 0;
        		var globalActiveCustomers = 0;
        		for (var i = 0; i < customers.length; i++) {
//        			console.log('Printing customer details -- ' + JSON.stringify(customers[i]));
        			if (customers[i].marketType == 'Local Market Portfolio') {
        				localActiveCustomers = localActiveCustomers + customers[i].agreement.allocatedNumOfCustomers;			
        			} else {
        				globalActiveCustomers = globalActiveCustomers + 1;
        			}
        		}
        		$rootScope.localActiveCustomers = localActiveCustomers;
        		$rootScope.globalActiveCustomers = globalActiveCustomers; 
        	});
        	
        });
    }
    
    $rootScope.localTab = true;
    $rootScope.globalTab = false;
    $rootScope.percentageValueError = false;
    
    $scope.setFromRevenue = function(fromRevenue){
    	$rootScope.fromRevenue = fromRevenue;
    	filterRevenueFrom();
    };
    $scope.setToRevenue = function(toRevenue) {
    	$rootScope.toRevenue = toRevenue;
    	filterRevenueFrom();
    }
    
    $scope.localSelected = function(){
    	$rootScope.localTab = true;
    	$rootScope.globalTab = false;
    }
    
    $scope.globalSelected = function(){
    	$rootScope.localTab = false;
    	$rootScope.globalTab = true;
    }
    
    $scope.offersSelected = function(){
    	$rootScope.localTab = false;
    	$rootScope.globalTab = false;
    }
    
    $scope.chartdata =  {};
    $rootScope.localCustomers = [];
    
    // modal backdrop animation
    $scope.animationsEnabled = true;

    $scope.open = function () {
      // open modal and load tpl
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/market/tpl/modal-make-offer.html',
        controller: 'ModalInstanceCtrl',
        windowClass: 'center-modal',
        resolve: {
          selectedCustomer: function () {
            return $scope.selected;
          }
        }
      });
      // add selected customer to $scope.selected
      modalInstance.result.then(function (selectedCustomer) {
        $scope.selected = selectedCustomer;
      });
    };

    $rootScope.dtOptions = DTOptionsBuilder.newOptions().withOption('stateSave', true);
    
    $scope.modify = function () {
      // open modal and load tpl
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/market/tpl/modal-modify-offer.html',
        controller: 'ModalInstanceCtrl',
        windowClass: 'center-modal',
        resolve: {
          selectedCustomer: function () {
            return $scope.selected;
          }
        }
      });
      // add selected customer to $scope.selected
      modalInstance.result.then(function (selectedCustomer) {
        $scope.selected = selectedCustomer;
      });
    };

    
    $scope.deleteConfirmation = function () {
      // open modal and load tpl
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/market/tpl/modal-delete-offer-confirmation.html',
        controller: 'DeleteOfferModalInstanceCtrl',
        resolve: {
          selectedCustomer: function () {
            return $scope.selected;
          }
        }
      });
      // add selected customer to $scope.selected
      modalInstance.result.then(function (selectedCustomer) {
        $scope.selected = selectedCustomer;
      });
    };

    //code to get Current Round
    Round.currentRound(function (currentRound) {
      var currentRoundRecord = currentRound;
      if(currentRoundRecord != null && currentRoundRecord.round > 0){
        $rootScope.currentRoundNumber = currentRoundRecord.round;
        GlobalCustomer.getGlobalCustomers().$promise.then(function(customers){
        	Team.getAllOffersMade({id:currentRoundRecord.round}).$promise.then(function(offers){
    	    	for (var i = 0; i < customers.length ; i++) {
    	            var obj = customers[i];          
    	            obj.riskClass = 'p0';
    	            for (var j = 0; j < offers.length; j++) {
    	              var offer = offers[j];                    
    	              if (offer.marketBusinessName == obj.name  && offer.round == $rootScope.currentRoundNumber) {
    	                obj.offerFound = true;
    	                obj.offerId=offer._id;
    	                obj.price=offer.price;
    	                obj.offerType  = offer.offerType;
    	//                console.log('offer found:'+obj.name );
    	                break;                
    	              }
    	            }                                  
    	          }
    	//          console.log('All Global customers -- ' + JSON.stringify(customers));
    	          $rootScope.customers = customers;    	
        	});
        });
      }else{
        console.log("Error loading current round ");
        toastr.error("Error: Currently no details are available for current round. Request to initiate.");
      }
    });

    //function to refresh Customers
    $scope.refreshMarketGlobal =function(){
      //console.log('refresh team:'+JSON.stringify($rootScope.team.offer.length));
      Customer.customers.query().$promise.then(function (customers) {        
        for (var i = 0; i < customers.length ; i++) {
          var obj = customers[i]; 
//          console.log(JSON.stringify(customers[i]));                       
          for (var j = 0; j < $rootScope.team.offer.length; j++) {
//            console.log("I am here 1");
            var offer = $rootScope.team.offer[j];                    
            if (offer.marketBusinessName == obj.name && offer.round == $rootScope.currentRoundNumber) {
              obj.offerFound = true;
              obj.offerId=offer._id;
              obj.offerType  = offer.offerType;
//              console.log('offer found:'+obj.name );
              break;                
            }
          }                                  

        }
//         console.log("I am here 4" + JSON.stringify(customers));
        $rootScope.customers = customers;
      });
    }



    

/*    Customer.customers.query().$promise.then(function (customers) {
      for (var i = 0; i < customers.length ; i++) {
        var obj = customers[i];                        
        for (var j = 0; j < $rootScope.team.offer.length; j++) {
          var offer = $rootScope.team.offer[j];                    
          if (offer.marketBusinessName == obj.name  && offer.round == $rootScope.currentRoundNumber) {
            obj.offerFound = true;
            obj.offerId=offer._id;
            obj.price=offer.price;
            obj.offerType  = offer.offerType;
//            console.log('offer found:'+obj.name );
            break;                
          }
        }                                  

      }

      $rootScope.customers = customers;
    });*/
    

    //on load 
    $scope.msg = $translate.instant('market.msg');    
    //on language change
    $rootScope.$on('$translateChangeSuccess', function () {

      $scope.msg = $translate.instant('market.msg');      
    }); 

    
  //-------------local Markets related ----- 
    Round.currentRound(function (currentRound) {
    	$rootScope.currentRoundNumber = currentRound.round;
	    mapLoad();
    });
    
    function mapLoad() {
    	$scope.localMarketMapLoading = true;
    	$scope.filterForm={};
    	
   	    var filterParams = {
   	    		round:$rootScope.currentRoundNumber,
   	    		revenueStr: "-1,-1",
   				weatherStr: "NoSelection"
   		}
    	LocalCustomer.getLocalCustomerForFilter(filterParams).$promise.then(function(distinctCollection){
	    	var distinctWeathers = distinctCollection.distinctWeatherArray;
	    	var distinctCountries = distinctCollection.distinctCountries;
//	    	var distinctIndustries = distinctCollection.distinctIndustries;
	    	var maxMinRevenues = distinctCollection.maxMinRevenues;
	    	$rootScope.maxRevenue = Math.round(distinctCollection.maxRevenue/1000000);
	    	$rootScope.minRevenue = Math.round(distinctCollection.minRevenue/1000000);
	    	
	    	var weatherMap = [];
	    	
	    	for(var i = 0 ; i < distinctWeathers.length; i++) {
	    		
	    		if (distinctWeathers[i].rating == 1) {
	    			
	    			var weather = {
	        				riskRating: distinctWeathers[i].rating,
	    					weatherClass: 'wi wi-day-sunny',
	    					weatherSelectionStatus: distinctWeathers[i].ratingPresent
	        		};
	    			
	    			weatherMap.push(weather);
	    		} else if (distinctWeathers[i].rating == 2) {
	    			var weather = {
	        				riskRating: distinctWeathers[i].rating,
	    					weatherClass: 'wi wi-day-cloudy',
	    					weatherSelectionStatus: distinctWeathers[i].ratingPresent
	        		};
	    			
	    			weatherMap.push(weather);
	    		} else if (distinctWeathers[i].rating == 3) {
	    			var weather = {
	        				riskRating: distinctWeathers[i].rating,
	    					weatherClass: 'wi wi-cloud',
	    					weatherSelectionStatus: distinctWeathers[i].ratingPresent
	        		};
	    			
	    			weatherMap.push(weather);
	    		} else if (distinctWeathers[i].rating == 4) {
	    			var weather = {
	        				riskRating: distinctWeathers[i].rating,
	    					weatherClass: 'wi wi-cloudy',
	    					weatherSelectionStatus: distinctWeathers[i].ratingPresent
	        		};
	    			
	    			weatherMap.push(weather);
	    		} else if (distinctWeathers[i].rating == 5) {
	    			var weather = {
	        				riskRating: distinctWeathers[i].rating,
	    					weatherClass: 'wi wi-storm-showers',
	    					weatherSelectionStatus: distinctWeathers[i].ratingPresent
	        		};
	    			
	    			weatherMap.push(weather);
	    		} 
	    		
	    	}
	    	
	//    	console.log('weatherMap '  + JSON.stringify(weatherMap));
	    	$rootScope.weatherMap = weatherMap;
//	    	$rootScope.distinctIndustries = distinctIndustries;
	    	$rootScope.distinctCountries = distinctCountries;
	    	console.log('Countries --> ' + JSON.stringify(distinctCountries.length));
	    //	console.log('Countries --> ' + JSON.stringify(distinctCountries));
	    	var mapData ={};
	        for(var i=0;i<distinctCountries.length;i++){
	            var id = distinctCountries[i].isoCountryCode;
	            var value = {}; 
	            value['revenue']= distinctCountries[i].revenue;
	            value['offerExists']= distinctCountries[i].offerExists;
	            mapData[id]=value;
	        }
	//        console.log('map data == ' + JSON.stringify(mapData));
	        $scope.chartdata = mapData;
	        $scope.localMarketMapLoading = false;
	    });
    }
    
    
    //get industry
	/*$http.get('/api/industry').success(function (industries) {
		$rootScope.industries = [];
		if(industries!= null && industries!= 'undefined'){
            for(var i=0; i< industries.length;i++){
                var id = industries[i].sno;
                var value = industries[i].industry;
                var coll={};
                coll['id']=id;
                coll['label']=value;
                $rootScope.industries.push(coll);
            }
        }
	});*/

	$scope.CallFilters = function(whichFilter) {
		filterRevenueFrom(whichFilter);
	}
	
	var filterRevenueFrom = function(whichFilter) {
		console.log('From revenue = ' + $scope.fromRevenue);
		console.log('To revenue = ' + $scope.toRevenue);
		/*console.log('Filters set -- ' + filter['industry']);*/	
		
		var revenueStr="";
		if (typeof($rootScope.fromRevenue)==='undefined' || $rootScope.fromRevenue == null) {
			revenueStr = revenueStr + "-1";
		} else {
			revenueStr = revenueStr + $rootScope.fromRevenue;
		}
		
		if (typeof($rootScope.toRevenue)==='undefined' || $rootScope.toRevenue == null) {
			revenueStr = revenueStr + "," + "-1";
		} else {
			revenueStr = revenueStr + "," + $rootScope.toRevenue;
		}
		
		
		var weatherStr = "";
		if (whichFilter == 'weather') {
			for (var i = 0 ; i < $rootScope.weatherMap.length; i++) {
				console.log('Weather ===== ' + $rootScope.weatherMap[i].weatherSelectionStatus);
				if (typeof($rootScope.weatherMap[i]) != 'undefined' && 
						typeof($rootScope.weatherMap[i].weatherSelectionStatus) !='undefined' &&
						$rootScope.weatherMap[i].weatherSelectionStatus) {
					if(weatherStr == "") {
						weatherStr = weatherStr + $rootScope.weatherMap[i].riskRating;
					} else {
						weatherStr = weatherStr + "," + $rootScope.weatherMap[i].riskRating;
					}
				}
			}	
		}
		
		
		if (weatherStr == "") {
			weatherStr = "NoSelection";
		}
		
		
		/*var industryStr = "";
		if (whichFilter == 'industry') {
			for (var i = 0 ; i < $rootScope.distinctIndustries.length; i++) {
				if (typeof($rootScope.distinctIndustries[i]) != 'undefined' &&
							typeof($rootScope.distinctIndustries[i].isIndustryPresent) != 'undefined' &&
							$rootScope.distinctIndustries[i].isIndustryPresent) {
					if(industryStr == "") {
						industryStr = industryStr + $rootScope.distinctIndustries[i].industry;
					} else {
						industryStr = industryStr + "," + $rootScope.distinctIndustries[i].industry;
					}
				}
			}
		}*/
		
		
		/*if (industryStr == "") {
			industryStr = "NoSelection";
		}*/
		
		console.log('$rootScope.currentRoundNumber --- ' + $rootScope.currentRoundNumber)
		var filterParams = {
				revenueStr: revenueStr,
				weatherStr: weatherStr,
				round: $rootScope.currentRoundNumber
		}
		
		LocalCustomer.getLocalCustomerForFilter(filterParams).$promise.then(function(distinctCollection){
//	    	console.log('customersJSON== ' + JSON.stringify(distinctCollection));
	    	var distinctWeathers = distinctCollection.distinctWeatherArray;
	    	var distinctCountries = distinctCollection.distinctCountries;
//	    	var distinctIndustries = distinctCollection.distinctIndustries;
//	    	var maxMinRevenues = distinctCollection.maxMinRevenues;
	    	$rootScope.maxRevenue = Math.round(distinctCollection.maxRevenue / 1000000);
	    	$rootScope.minRevenue = Math.round(distinctCollection.minRevenue / 1000000);
	    	
/*	    	console.log('distinctWeathers.length >>> ' + distinctWeathers.length);
	    	console.log('distinctCountries.length >>> ' + distinctCountries.length);*/
//	    	console.log('distinctIndustries.length >>> ' + distinctIndustries.length);
	    	
	    	var weatherMap = [];
	    	
	    	for(var i = 0 ; i < distinctWeathers.length; i++) {
	    		
	    		if (distinctWeathers[i].rating == 1) {
	    			
	    			var weather = {
	        				riskRating: distinctWeathers[i].rating,
	    					weatherClass: 'wi wi-day-sunny',
	    					weatherSelectionStatus: distinctWeathers[i].ratingPresent
	        		};
	    			
	    			weatherMap.push(weather);
	    		} else if (distinctWeathers[i].rating == 2) {
	    			var weather = {
	        				riskRating: distinctWeathers[i].rating,
	    					weatherClass: 'wi wi-day-cloudy',
	    					weatherSelectionStatus: distinctWeathers[i].ratingPresent
	        		};
	    			
	    			weatherMap.push(weather);
	    		} else if (distinctWeathers[i].rating == 3) {
	    			var weather = {
	        				riskRating: distinctWeathers[i].rating,
	    					weatherClass: 'wi wi-cloud',
	    					weatherSelectionStatus: distinctWeathers[i].ratingPresent
	        		};
	    			
	    			weatherMap.push(weather);
	    		} else if (distinctWeathers[i].rating == 4) {
	    			var weather = {
	        				riskRating: distinctWeathers[i].rating,
	    					weatherClass: 'wi wi-cloudy',
	    					weatherSelectionStatus: distinctWeathers[i].ratingPresent
	        		};
	    			
	    			weatherMap.push(weather);
	    		} else if (distinctWeathers[i].rating == 5) {
	    			var weather = {
	        				riskRating: distinctWeathers[i].rating,
	    					weatherClass: 'wi wi-storm-showers',
	    					weatherSelectionStatus: distinctWeathers[i].ratingPresent
	        		};
	    			
	    			weatherMap.push(weather);
	    		} 
	    		
	    	}
	    	
	    	if (distinctWeathers.length == 1 && distinctWeathers[0] == -1) {
	    		
	    	}
	    	
	    	$rootScope.weatherMap = weatherMap;
//	    	$rootScope.distinctIndustries = distinctIndustries;
	    	$rootScope.distinctCountries = distinctCountries;
	    	console.log('Countries ---->>> ' + JSON.stringify(distinctCountries));
	    	var mapData ={};
	        for(var i=0;i<distinctCountries.length;i++){
	            var id = distinctCountries[i].isoCountryCode;
	            var value = {}; 
	            value['revenue']= distinctCountries[i].revenue;
	            value['offerExists']= distinctCountries[i].offerExists;
	            mapData[id]=value;
	        }
	        $scope.chartdata = mapData;
	    	
	    });
	};
	
	$scope.showPastOffers = function(customer){
		if (customer.showPastOffer){
			customer.showPastOffer = false;
		} else {
			customer.showPastOffer = true;
		}
	};
	
	$scope.countrySelectEvent = function(country) {
		console.log('Country selected -- ' + country);
		getLocalCustomers(country);
	};
	
	function getLocalCustomers(country){
		$scope.noLocalMarketError = false;
		$scope.localMarketLoading = true;
		$rootScope.selectedCountry = "";
		$rootScope.localCustomers = [];
		console.log('Selected country -- ' + country);
		LocalCustomer.getLocalCustomers({country:country}).$promise.then(function(customers){
			
			for (var i = 0; i < customers.length; i++) {
				var localCustomer = customers[i];
				localCustomer.riskAcceptance = 0;
				
				var strategies = localCustomer.riskstrategy[0];
				var totalBands = 0;
				var numOfBands = 0;
				
				if (typeof(strategies) != 'undefined' && localCustomer.buyerRatingTo >=1 && localCustomer.buyerRatingFrom <= 30){
					 totalBands = totalBands + strategies.strategyRatingBand1;
					 numOfBands = numOfBands + 1; 
				 } 
				 
				 if (typeof(strategies) != 'undefined' && localCustomer.buyerRatingTo >=31 && localCustomer.buyerRatingFrom <= 40){
					 totalBands = totalBands + strategies.strategyRatingBand2;
					 numOfBands = numOfBands + 1; 
				 } 
				 
				 if (typeof(strategies) != 'undefined' && localCustomer.buyerRatingTo >=41 && localCustomer.buyerRatingFrom <= 50){
					 totalBands = totalBands + strategies.strategyRatingBand3;
					 numOfBands = numOfBands + 1; 
				 }
				 
				 if (typeof(strategies) != 'undefined' && localCustomer.buyerRatingTo >=51 && localCustomer.buyerRatingFrom <= 60){
					 totalBands = totalBands + strategies.strategyRatingBand4;
					 numOfBands = numOfBands + 1; 
				 } 
				 
				 if (typeof(strategies) != 'undefined' && localCustomer.buyerRatingTo >= 61 && localCustomer.buyerRatingFrom <= 100) {
					 totalBands = totalBands + strategies.strategyRatingBand5;
					 numOfBands = numOfBands + 1; 
				 }        
				 
				 if (numOfBands > 0) {
					 localCustomer.riskAcceptance = Math.round(totalBands / numOfBands);
				 }
			}
			
			$rootScope.localCustomers = customers;
			$rootScope.selectedCountry = country;
			$scope.localMarketLoading = false;
//			console.log('Customers -->> ' + JSON.stringify(customers));
			
		}, function(err){
			$rootScope.localCustomers = [];
			$scope.noLocalMarketError = true;
			$scope.localMarketLoading = false;
			console.log('failure!!!!!');
		});
	}
	
	$scope.mapChartFn = function(countryISOCode) {
		$scope.noLocalMarketError = false;
		var countryList = $rootScope.distinctCountries;
		var country;
		for (var i = 0; i < countryList.length ; i ++) {
			if (countryList[i].isoCountryCode === countryISOCode) {
				country = countryList[i].country;
				console.log('Country for isocode - ' + countryISOCode + ' is - ' + country)
				break;
			}
		}
		if (typeof(country) != 'undefined') {
			$scope.showCountryLocalMarket = true;
			$scope.countrySelectEvent = getLocalCustomers(country);
//			console.log(' not a undefined country ' + country);
		} else {
			$scope.showCountryLocalMarket = false;
//			console.log(' undefined country ');
		}
	}
	
	$scope.goBackToMaps = function() {
		$scope.showCountryLocalMarket = false;
//		mapLoad();
	}
	
	$scope.updateLocalOffers = function() {
		var localCustomers = $rootScope.localCustomers;
		Team.roundLevelInformation({id:$rootScope.currentRoundNumber}).$promise.then(function(roundLevelInfo){
    		var departments = roundLevelInfo.roundLevelInformation[0].department;
    		var localDepartmentSales = 0;
    		var numOfResources = 0;
    		for (var i = 0 ; i < departments.length; i++) {
    			if (departments[i].name == 'Local Sales'){
    				localDepartmentSales = departments[i].numberOfBenefits;
    				numOfResources = departments[i].numOfResources;
    			}
    		}
    		$rootScope.localDepartmentSales = localDepartmentSales;
    		$rootScope.numOfResources = numOfResources;
    		var validationError = validateLocalOffers(localCustomers);
    		if (validationError == '') {
    			updateALocalOffer(localCustomers, 0);	
    		} else {
    			toastr.error(validationError);
    		}
    		
    	});
		
	};
	
	function validateLocalOffers (localCustomers) {
		var numOfResources = 0;
		var validationError = '';
		for (var i = 0 ; i < localCustomers.length; i++) {
			if(localCustomers[i].offerType == 'New') {
				var localOfferNumResources = localCustomers[i].mdNumOfResources;
				if (typeof(localOfferNumResources) != 'undefined' ) {
					numOfResources = localOfferNumResources + numOfResources;	
				}	
			} else {
				var localOfferNumResources = localCustomers[i].diffNumberOfResources;
				if (typeof(localOfferNumResources) != 'undefined' ) {
					numOfResources = localOfferNumResources + numOfResources;	
				}	
			}
			
		}
		console.log('Total numOfResources == ' + numOfResources);
		if (numOfResources > $rootScope.localDepartmentSales) {
			validationError = "Total Number of Resources - " + numOfResources + " is more than local sales department size - " + $rootScope.localDepartmentSales; 
			return validationError;
		} 
		
		return validationError;
	}
	
	var updateALocalOffer = function(localCustomers, i) {
		var localCustomer = localCustomers[i];
		console.log('localCustomer - ' + JSON.stringify(localCustomer.name) + ' I = ' + i);
		console.log('localCustomer.offerEdited ' + localCustomer.offerEdited);
		if (localCustomer.offerEdited) {
			LocalCustomer.updateLocalOffers(localCustomer).$promise.then(function(data){
				toastr.success("Successfully updated modifications offer for - " + localCustomer.name);
				if(i < localCustomers.length - 1) {
					updateALocalOffer(localCustomers, i + 1);	
				}else {
					LocalCustomer.getLocalCustomers({country:$rootScope.selectedCountry}).$promise.then(function(customers){
	    				$rootScope.localCustomers = customers;
	    				var distinctCountries = $rootScope.distinctCountries;
	    				for (var countryIndex = 0; countryIndex < distinctCountries.length;  countryIndex++) {
	    					if (distinctCountries[countryIndex].country == $rootScope.selectedCountry) {
	    						distinctCountries[countryIndex].offerExists = true;
	    					}
	    				}
	    				$rootScope.distinctCountries = distinctCountries;
	    				
	    				var mapData ={};
	    		        for(var i=0;i<distinctCountries.length;i++){
	    		            var id = distinctCountries[i].isoCountryCode;
	    		            var value = {}; 
	    		            value['revenue']= distinctCountries[i].revenue;
	    		            value['offerExists']= distinctCountries[i].offerExists;
	    		            mapData[id]=value;
	    		        }
	    		//        console.log('map data == ' + JSON.stringify(mapData));
	    		        $scope.chartdata = mapData;
	    		        $scope.showCountryLocalMarket = false;
	    				console.log('1 refreshing with local customer for country - ' + $rootScope.selectedCountry + '=  ' + JSON.stringify(customers));
	    			});
				}
				offerCounts();
				$scope.localMarketMapLoading = false;
			}, function(err) {
				console.log('Error updating modifications offer for -' + JSON.stringify(err));
				toastr.error("Error! " + localCustomer.name + ' - ' + err.data);
				if(i < localCustomers.length - 1) {
					updateALocalOffer(localCustomers, i + 1);	
				} else {
					LocalCustomer.getLocalCustomers({country:$rootScope.selectedCountry}).$promise.then(function(customers){
	    				$rootScope.localCustomers = customers;
	    				var distinctCountries = $rootScope.distinctCountries;
	    				for (var countryIndex = 0; countryIndex < distinctCountries.length;  countryIndex++) {
	    					if (distinctCountries[countryIndex].country == $rootScope.selectedCountry) {
	    						distinctCountries[countryIndex].offerExists = true;
	    					}
	    				}
	    				$rootScope.distinctCountries = distinctCountries;
	    				
	    				var mapData ={};
	    		        for(var i=0;i<distinctCountries.length;i++){
	    		            var id = distinctCountries[i].isoCountryCode;
	    		            var value = {}; 
	    		            value['revenue']= distinctCountries[i].revenue;
	    		            value['offerExists']= distinctCountries[i].offerExists;
	    		            mapData[id]=value;
	    		        }
	    		//        console.log('map data == ' + JSON.stringify(mapData));
	    		        $scope.chartdata = mapData;
	    				console.log('2 refreshing with local customer for country - ' + $rootScope.selectedCountry + '=  ' + JSON.stringify(customers));
	    			});
				}
				offerCounts();
				$scope.localMarketMapLoading = false;
				$scope.showCountryLocalMarket = true;
			});
		} else {
			if(i < localCustomers.length - 1) {
				updateALocalOffer(localCustomers, i + 1);	
			}else {
				LocalCustomer.getLocalCustomers({country:$rootScope.selectedCountry}).$promise.then(function(customers){
    				$rootScope.localCustomers = customers;
    				
    				var distinctCountries = $rootScope.distinctCountries;
    				for (var countryIndex = 0; countryIndex < distinctCountries.length;  countryIndex++) {
    					if (distinctCountries[countryIndex].country == $rootScope.selectedCountry) {
    						distinctCountries[countryIndex].offerExists = true;
    					}
    				}
    				$rootScope.distinctCountries = distinctCountries;
    				
    				var mapData ={};
    		        for(var i=0;i<distinctCountries.length;i++){
    		            var id = distinctCountries[i].isoCountryCode;
    		            var value = {}; 
    		            value['revenue']= distinctCountries[i].revenue;
    		            value['offerExists']= distinctCountries[i].offerExists;
    		            mapData[id]=value;
    		        }
    		//        console.log('map data == ' + JSON.stringify(mapData));
    		        $scope.chartdata = mapData;
    				console.log('3 refreshing with local customer for country - ' + $rootScope.selectedCountry + '=  ' + JSON.stringify(customers));
    			});
			}	
			offerCounts();
			$scope.localMarketMapLoading = false;
		}
	}
	
	$scope.premiumPercentageValueListener = function(localCustomer) {
		if (validatePercentage(localCustomer.premiumPercentage)) {
			localCustomer.currentRoundOfferSelection = true; 
			localCustomer.offerEdited = true;
		//	console.log('localCustomer.numberOfOrganisation -- ' + localCustomer.numberOfOrganisation);
			
			$rootScope.percentageValueError = false;
			localCustomer.showErrorPremiumPercentage = false;
		} else {
			$rootScope.percentageValueError = true;
			localCustomer.showErrorPremiumPercentage = true;
		}
	};
	
	$scope.calculateExpextedPremium = function (localCustomer) {
		console.log('type of -- ' + localCustomer.mdNumOfResources);
		if (typeof(localCustomer.mdNumOfResources) == 'undefined' || localCustomer.mdNumOfResources < 0 || isNaN(localCustomer.mdNumOfResources)) {
			$scope.resourcesError = true;
			localCustomer.resourcesError = true;
		} else {
			$scope.resourcesError = false;
			localCustomer.resourcesError = false;
		}
		localCustomer.expectedPremium = (100 * localCustomer.mdNumOfResources) / localCustomer.numberOfOrganisation; //
		var diffNumOfResources = 0;
		if (typeof(localCustomer.numResources) != 'undefined') {
			diffNumOfResources = localCustomer.mdNumOfResources - localCustomer.numResources;	
		} else {
			diffNumOfResources = localCustomer.mdNumOfResources;
		}	
		localCustomer.numResources = localCustomer.mdNumOfResources;
		console.log('diffNumOfResources ' + localCustomer.numResources + ' - ' +  localCustomer.mdNumOfResources + ' ===  ' + $rootScope.localNumberOfResources + ' diff ' + diffNumOfResources);
		$rootScope.localNumberOfResources = $rootScope.localNumberOfResources + Number(diffNumOfResources);
	};
	
	$scope.validatePercentageValue = function(localCustomer, fromTo) {
		console.log('fromTo - ' + JSON.stringify(localCustomer));
		localCustomer.riskAcceptance = 0;
		if (fromTo == 'from') {
			if (validatePercentage(localCustomer.buyerRatingFrom)) {
				localCustomer.showFromError = false;
				$rootScope.percentageValueError = false;
				localCustomer.currentRoundOfferSelection = true; 
				localCustomer.offerEdited = true; 
			} else {
				localCustomer.showFromError = true;
				$rootScope.percentageValueError = true;
			}
		} else {
			if (validatePercentage(localCustomer.buyerRatingTo)) {
				localCustomer.showToError = false;
				$rootScope.percentageValueError = false;
				localCustomer.currentRoundOfferSelection = true; 
				localCustomer.offerEdited = true; 
			} else {
				localCustomer.showToError = true;
				$rootScope.percentageValueError = true;
			}
		}
		
		var strategies = localCustomer.riskstrategy[0];
		if (typeof(strategies) == 'undefined' || strategies.length == 0) {
			toastr.error("No risk strategy defined for " + localCustomer.country + ' - ' + localCustomer.industry);
		}
		var totalBands = 0;
		var numOfBands = 0;
		
		if (localCustomer.buyerRatingTo >=1 && localCustomer.buyerRatingFrom <= 30){
			 totalBands = totalBands + strategies.strategyRatingBand1;
			 numOfBands = numOfBands + 1; 
		 } 
		 
		 if (localCustomer.buyerRatingTo >=31 && localCustomer.buyerRatingFrom <= 40){
			 totalBands = totalBands + strategies.strategyRatingBand2;
			 numOfBands = numOfBands + 1; 
		 } 
		 
		 if (localCustomer.buyerRatingTo >=41 && localCustomer.buyerRatingFrom <= 50){
			 totalBands = totalBands + strategies.strategyRatingBand3;
			 numOfBands = numOfBands + 1; 
		 }
		 
		 if (localCustomer.buyerRatingTo >=51 && localCustomer.buyerRatingFrom <= 60){
			 totalBands = totalBands + strategies.strategyRatingBand4;
			 numOfBands = numOfBands + 1; 
		 } 
		 
		 if (localCustomer.buyerRatingTo >= 61 && localCustomer.buyerRatingFrom <= 100) {
			 totalBands = totalBands + strategies.strategyRatingBand5;
			 numOfBands = numOfBands + 1; 
		 }        
		 console.log('totalBands / numOfBands' + totalBands + ' ** '+ numOfBands);
		 if (numOfBands > 0) {
			 localCustomer.riskAcceptance = Math.round(totalBands / numOfBands);
		 }
	};
	
	function validatePercentage(percentageValue) {
		var valid = false;
		if (typeof(percentageValue) != 'undefined' && percentageValue > 0 && percentageValue <= 100) {
			valid = true;
		}
		
		return valid;
	}
	
})

.directive('worldmap',['$rootScope','Countries', function($rootScope,Countries) {
	    return {
	        restrict: 'E',
	        scope: {
	            data: '=?',
	            mapCtrlFn: '&callbackFn' 
	        },
	        template:
	        '<div class="globe-wrapper">' +
	        '<div class="globe"></div>' +
	        '<div class="mapinfo"></div>' +
	        '</div>',
	        link: maplink
	    };
}])

.controller('DeleteOfferModalInstanceCtrl', function ($scope, $modalInstance, selectedCustomer, toastr, Offer, $rootScope,$translate,Customer, Round,OfferCount, GlobalCustomer, Team){
  
    //on load    
    $scope.deleteOfferSuccessMsg1 = $translate.instant('market.global.deleteOfferSuccessMsg1');
    //on language change
    $rootScope.$on('$translateChangeSuccess', function () {      
      $scope.deleteOfferSuccessMsg1 = $translate.instant('market.deleteOfferSuccessMsg1');

    }); 


  $scope.selected = selectedCustomer;
  console.log('Delete Offer model ' + JSON.stringify($scope.selected));
  
//function to refresh Customers
    function refreshMarketGlobal(){

      console.log('refresh team:'+JSON.stringify($rootScope.team.offer.length));
      GlobalCustomer.getGlobalCustomers().$promise.then(function(customers){
    	  Team.getAllOffersMade({id:$rootScope.currentRoundNumber}).$promise.then(function(offers){
	    	  for (var i = 0; i < customers.length ; i++) {
		          var obj = customers[i]; 
		          //console.log(JSON.stringify(customers[i]));                       
		          for (var j = 0; j < offers.length; j++) {
		            
		            var offer = offers[j];                    
		            if (offer.marketBusinessName == obj.name && offer.round == $rootScope.currentRoundNumber) {
		              
		              obj.offerFound = true;
		              obj.offerId=offer._id;
		              obj.offerType  = offer.offerType;
		             // console.log('offer found:'+obj.name );
		              break;                
		            }
		          }                                  
	         }
	        $rootScope.customers = customers;
    	  });
      });
    }


//delete Offer
$scope.deleteOffer = function (offerId) {

  console.log('DELETE OFFER CALLED :'+offerId);

  var offerId = {offerId:offerId};  

  Offer.deleteOffer(offerId).$promise.then(function(currentRoundNewGlobalOfferCount){      
    refreshMarketGlobal();
    $modalInstance.dismiss('close');
    toastr.success($scope.deleteOfferSuccessMsg1);
    $rootScope.globalOfferCount = currentRoundNewGlobalOfferCount.currentRoundNewGlobalOfferCount; 
  });
  
  

};

  
  
  $scope.closeModal = function () {
    $modalInstance.dismiss('close');
  };
})

.controller('ModalInstanceCtrl', function ($scope, $modalInstance, selectedCustomer, toastr, Offer, $rootScope,$translate,Customer, Round,OfferCount, $http, Auth, Team, Countries, $location, GlobalCustomer){

    // re-add selectedCustomer to $scope.selected
    $scope.selected = selectedCustomer;
    $scope.selected.pricePercentage = ($scope.selected.price / $scope.selected.revenue) * 100; 
    $scope.ratingWeatherIconList = [];
    selectedCustomer.buyerPortfolio.forEach(function(buyerPortfolio){
    	Countries.getWeatherSymbol({"countryName": buyerPortfolio.country, "industryName": buyerPortfolio.industry}).$promise.then(function(weatherSymbol){
        	var weatherSymbolMap = {country: buyerPortfolio.country, industry: buyerPortfolio.industry, weatherSymbolIcon:''};
        	if (weatherSymbol[0].termData.weatherSymbolRating === 1) {
        		weatherSymbolMap.weatherSymbolIcon = 'wi wi-day-sunny';
        	} else if (weatherSymbol[0].termData.weatherSymbolRating === 2) {
        		weatherSymbolMap.weatherSymbolIcon = 'wi wi-day-cloudy';
        		console.log('got 2 ');
        	} else if (weatherSymbol[0].termData.weatherSymbolRating === 3) {
        		weatherSymbolMap.weatherSymbolIcon = 'wi wi-cloud';
        	}else if (weatherSymbol[0].termData.weatherSymbolRating === 4) {
        		weatherSymbolMap.weatherSymbolIcon = 'wi wi-cloudy';
        	}else if (weatherSymbol[0].termData.weatherSymbolRating === 5) {
        		weatherSymbolMap.weatherSymbolIcon = 'wi wi-storm-showers';
        	}
        	$scope.ratingWeatherIconList.push(weatherSymbolMap);
        	console.log(' weather symbol map -- ' + JSON.stringify(buyerPortfolio));
        });
    	
    	
    });
    
    
    $scope.calculatePercentage = function() {
    	$scope.selected.pricePercentage = ($scope.selected.price / $scope.selected.revenue ) * 100;
    };
    
    $scope.calculatePrice = function() {
    	$scope.selected.price = ($scope.selected.pricePercentage * $scope.selected.revenue ) / 100;
    };
    
    //START: Get Global departments
    Round.currentRound(function(round){
    	$rootScope.currentRoundNumber = round.round;
			console.log('Round fff'+round.round);
    	Team.getCurrentRoundGlobalSalesDepartmentInfo({round: round.round}).$promise.then(function(departments){
//    		console.log(' Departments JSON --> ' + JSON.stringify(departments));
    		$rootScope.cannotMakeOffer = false;
    		var numOfBenefits = departments[0].roundLevelInformation.department.numberOfBenefits;
    		var globalDepartmentSizeUnit = departments[0].roundLevelInformation.department.sizeUnit;
    		
    		$rootScope.globalDepartmentSizeUnit = globalDepartmentSizeUnit;
			$rootScope.numOfBenefits = numOfBenefits;
    		Team.getCurrentRoundNewGlobalOffers({round: round.round}).$promise.then(function(offerCount){
    			var currentRoundNewGlobalOfferCount = 0;
					if(offerCount.length>0){
						currentRoundNewGlobalOfferCount=offerCount[0].count;
					}
    			console.log('Offer counts for new global market ' + JSON.stringify(currentRoundNewGlobalOfferCount) + ' & & ' + numOfBenefits);
    			if (currentRoundNewGlobalOfferCount >= numOfBenefits) {
    				$rootScope.cannotMakeOffer = true;
    			}
    			Offer.globalOfferHistory({round:$rootScope.currentRoundNumber, marketBusinessName: selectedCustomer.name}).$promise.then(function(data) {
    				console.log(" Global History data ==>> " + JSON.stringify(data));
    				$rootScope.globalOffersHistory = data;
    			});
    		});
    		
    		Team.getCurrentRoundStrategyBand({round:$rootScope.currentRoundNumber}).$promise.then(function(strategyBands){
    			console.log('Strategy bands --- ' + JSON.stringify(strategyBands));
    			$scope.strategies = strategyBands;
    		});
    	});
    });
    //END: Get Global departments
    
    
    //Commenting below code snippet as we dont want to litter scope with heavy weight team object
   /* $http.get('/api/team/me').success(function (team) {     
		Round.currentRound(function(round){
			$rootScope.currentRoundNumber = round.round;
			$rootScope.team = team;
			var currentRoundStrategies = [];
			var departments = [];
			var globalDepartmentSizeUnit;
			var numOfBenefits = 0;
			$rootScope.cannotMakeOffer = false;
			
			for (var i = 0 ; i < team.riskStrategy.length; i++) {
				if(team.riskStrategy[i].round == $rootScope.currentRoundNumber) {
					currentRoundStrategies.push(team.riskStrategy[i]);
				}
			}
			$scope.strategies = currentRoundStrategies;
			
			for (var i = 0 ; i < team.roundLevelInformation.length; i++) {
				var roundInfo = team.roundLevelInformation[i];
				if (roundInfo.round == $rootScope.currentRoundNumber) {
					departments = roundInfo.department;
					break;
				}
			}
			
			for (var i = 0; i < departments.length; i++) {
				var department = departments[i];
				if (department.name == 'Global Sales') {
					globalDepartmentSizeUnit = department.sizeUnit;
					numOfBenefits = department.numberOfBenefits;
					break;
				}
			}
			
			var currentRoundOffers = [];
			for (var i = 0; i < team.offer.length; i++) {
				var offer = team.offer[i];
				if (offer.round == $rootScope.currentRoundNumber && offer.marketType != 'Local Market Portfolio' && offer.offerType == 'New') {
					currentRoundOffers.push(offer);
				}
			}
			
			console.log('Number of offers -- ' + currentRoundOffers + ' && numOfBenefits -- ' + numOfBenefits);
			if (currentRoundOffers.length >= numOfBenefits) {
				$rootScope.cannotMakeOffer = true;
				$rootScope.globalDepartmentSizeUnit = globalDepartmentSizeUnit;
				$rootScope.numOfBenefits = numOfBenefits;
			}
			
			Offer.globalOfferHistory({round:$rootScope.currentRoundNumber, marketBusinessName: selectedCustomer.name}).$promise.then(function(data) {
				console.log(" Global History data ==>> " + JSON.stringify(data));
				$rootScope.globalOffersHistory = data;
			});
			
		});
	});*/
   
    

    $scope.closeModal = function () {
      $modalInstance.dismiss('close');
    };

    $rootScope.$on('spinnerChange', function (event, getSpinner) {
      $scope.spinner = getSpinner.value;
    });    

    
    //Function to check empty object
    function isEmpty(obj) {
      return Object.keys(obj).length === 0;
    }

    //function to check a number between two numbers
    Number.prototype.between = function(first,last){
      return (first < last ? this >= first && this <= last : this >= last && this <= first);
    }

    //code added to get risk acceptance rate from team risk strtagy
    function getRiskAcceptanceRate (country,industry,rating){
    	
      var strategies = $scope.strategies;
      console.log(' Strategies ????  ' + JSON.stringify(strategies));
      $scope.riskAcceptance ='';  

      if ((strategies != 'undefined') && (strategies != null )) {
	      for (var i =0; i<strategies.length; i++) {
	
		     /*console.log('rating: '+rating+ ' industry: '+industry+' country: '+country);
		     console.log('buyerCountry: '+strategies[i].buyerCountry);
		     console.log('buyerIndustry: '+strategies[i].buyerIndustry);
		     console.log('Condition1 :'+strategies[i].buyerCountry===country);
		     console.log('Condition2 :'+strategies[i].buyerIndustry.indexOf(industry)>-1);*/
		
		     if (strategies[i].riskStrategy.buyerCountry.indexOf(country)>-1 && strategies[i].riskStrategy.buyerIndustry.indexOf(industry)>-1 ){
		      if (rating.between(1,30)){
		        $scope.riskAcceptance =strategies[i].riskStrategy.strategyRatingBand1;
		          //console.log('match:1to30'+i);
		        } else if (rating.between(31,40)){
		          $scope.riskAcceptance =strategies[i].riskStrategy.strategyRatingBand2;
		          //console.log('match:31to40'+i);
		        } else if (rating.between(41,50)){
		          $scope.riskAcceptance =strategies[i].riskStrategy.strategyRatingBand3;
		        } else if (rating.between(51,60)){
		          $scope.riskAcceptance =strategies[i].riskStrategy.strategyRatingBand4;
		        } else {
		          $scope.riskAcceptance =strategies[i].riskStrategy.strategyRatingBand5;
		        }        
		        
		      }    
	      } 
      }
    
    return $scope.riskAcceptance; 
  };


    //on load 
    $scope.priceValidationmsg = $translate.instant('market.tpl.priceValidation');
    $scope.veryBad = $translate.instant('market.tpl.veryBad');
    $scope.bad = $translate.instant('market.tpl.bad');
    $scope.moderate = $translate.instant('market.tpl.moderate');
    $scope.good = $translate.instant('market.tpl.good');
    $scope.excellent = $translate.instant('market.tpl.excellent');
    $scope.riskError1 = $translate.instant('market.tpl.risk1');
    $scope.riskError2 = $translate.instant('market.tpl.risk2');
    $scope.riskError3 = $translate.instant('market.tpl.risk3');
    $scope.successMsg1=$translate.instant('market.tpl.offer.success1');
    $scope.successMsg2=$translate.instant('market.tpl.offer.success2');
    $scope.successMsg3=$translate.instant('market.tpl.offer.success3');
    $scope.experieneScoreMsgEnough= $translate.instant('market.tpl.xpScore.msgEnough');
    $scope.experieneScoreMsgNotEnough= $translate.instant('market.tpl.xpScore.msgNotEnough');
    
    //on language change
    $rootScope.$on('$translateChangeSuccess', function () {

      $scope.priceValidationmsg= $translate.instant('market.tpl.priceValidation');
      $scope.experieneScoreMsgEnough= $translate.instant('market.tpl.xpScore.msgEnough');
      $scope.experieneScoreMsgNotEnough= $translate.instant('market.tpl.xpScore.msgNotEnough');
      $scope.veryBad = $translate.instant('market.tpl.veryBad');
      $scope.bad = $translate.instant('market.tpl.bad');
      $scope.moderate = $translate.instant('market.tpl.moderate');
      $scope.good = $translate.instant('market.tpl.good');
      $scope.excellent = $translate.instant('market.tpl.excellent');
      $scope.riskError1 = $translate.instant('market.tpl.risk1');
      $scope.riskError2 = $translate.instant('market.tpl.risk2');
      $scope.riskError3 = $translate.instant('market.tpl.risk3');
      $scope.successMsg1=$translate.instant('market.tpl.offer.success1');
      $scope.successMsg2=$translate.instant('market.tpl.offer.success2');
      $scope.successMsg3=$translate.instant('market.tpl.offer.success3');
    });
    
  //code added to get weather icon based on buyer rating weatherSymbolIcon
  $scope.getRatingWeatherIcon=function(country, industry){
    var weatherMap = $scope.ratingWeatherIconList;
    for (var i= 0 ; i < weatherMap.length; i++) {
    	if (weatherMap[i].country == country && weatherMap[i].industry == industry) {
    		return weatherMap[i].weatherSymbolIcon;
    	}
    }
  };
    
    
    //code added to get weather icon based on customer risk
    $scope.getRiskWeatherIcon=function(customerRisk){
      $scope.riskWeatherIcon ='';
      $scope.riskText='no data';
      if ( customerRisk!=null && typeof customerRisk != "undefined" ){
        if (customerRisk.between(1,30)){
          $scope.riskWeatherIcon ='wi wi-storm-showers';
          $scope.riskText = $scope.veryBad;
          //console.log('match:1to30'+i);
        } else if (customerRisk.between(31,40)){
          $scope.riskWeatherIcon ='wi wi-cloudy';
          $scope.riskText = $scope.bad;
        } else if (customerRisk.between(41,50)){
          $scope.riskWeatherIcon ='wi wi-cloud';
          $scope.riskText = $scope.moderate;
        } else if (customerRisk.between(51,60)){
          $scope.riskWeatherIcon ='wi wi-day-cloudy';
          $scope.riskText = $scope.good;
        } else {
          $scope.riskWeatherIcon ='wi wi-day-sunny';
          $scope.riskText = $scope.excellent;
        }  

        return $scope.riskWeatherIcon; 
      }
    };

    //$scope.riskAcceptance ='';

  //function to validate risk acceptance
  $scope.isValidRiskAcceptance=function(country,industry,rating){
    console.log(' retrieving risk strategies ---- ' + country + ' $$ ' + industry + ' && ' + rating);
	  $scope.riskAcceptanceStatus = getRiskAcceptanceRate(country,industry,rating);
    if ($scope.riskAcceptanceStatus) {
      $scope.riskAcceptanceStatus=true;
      return $scope.riskAcceptanceStatus;
    }  else{
      $scope.riskAcceptanceStatus =false;
      return $scope.riskAcceptanceStatus;
    }
    
  }; 

  //code to get Current Round
  Round.currentRound(function (currentRound) {
    var currentRoundRecord = currentRound;
    if(currentRoundRecord!=null && currentRoundRecord.round>0){
      $rootScope.currentRoundNumber =currentRoundRecord.round;
    }else{
      console.log("Error loading current round ");
      toastr.error("Error: Currently no details are available for current round. Request to initiate.");
    }
  });


    //Offer Validation
    var riskAcceptanceValidForBuyerSegment1=false;
    var riskAcceptanceValidForBuyerSegment2=false;
    var riskAcceptanceValidForBuyerSegment3=false;
    var calculatedCldIsValid=false;
    var experienceScoreEnough =false;      
    var buyerCountry, buyerIndustry,buyerRating;
    $scope.showPriceValidation=false;
    $scope.showAvgPriceValidation=false;
    $scope.errorTextPriceValiation={};

    function getCalculatedCld(){
      var cld=0;
      var error=false;
      var calculatedCld ='';
      var riskAcceptance,buyerCountry, buyerIndustry,buyerRating,cla;
      try{
        //console.log('Method getCld selectedCustomer'+JSON.stringify(selectedCustomer));
        //console.log('Inside try: length'+selectedCustomer.buyerPortfolio.length);
        for (var i=0;i<selectedCustomer.buyerPortfolio.length;i++){
          buyerCountry=selectedCustomer.buyerPortfolio[i].country;
          buyerIndustry=selectedCustomer.buyerPortfolio[i].industry;
          buyerRating =selectedCustomer.buyerPortfolio[i].rating;
          cla =selectedCustomer.buyerPortfolio[i].cla; 
          riskAcceptance = getRiskAcceptanceRate(buyerCountry,buyerIndustry,buyerRating);
          selectedCustomer.buyerPortfolio[i].cld = cla *(riskAcceptance/100);
          /*console.log('Method getCld buyerCountry'+buyerCountry);
          console.log('Method getCld buyerIndustry'+buyerIndustry);
          console.log('Method getCld buyerRating'+buyerRating);
          console.log('Method getCld cla'+cla);
          console.log('Method getCld riskAcceptance'+riskAcceptance);    */      
          cld=cld+selectedCustomer.buyerPortfolio[i].cld;      

        }
      }
      catch(err){
        console.log('ERROR FOUND');
       error=true;
       cld=0;
     }

     if(!error){
      calculatedCld =cld;
    }else{
      calculatedCld ='';
    }
    return calculatedCld;
  }   

   //function to validate cld
   function isValidCld(){
    var cld = getCalculatedCld();
    if (cld) {
      $scope.calculatedCld =cld;
      return true;
    }  else{
      return false;
    }
    
  }        

  function validate(){                 

      //Price validation
      if (typeof($scope.selected.price)==='undefined'){
        $scope.showPriceValidation=true;
        $scope.errorTextPriceValiation=$scope.priceValidationmsg;
        
      }/*else if($scope.selected.price <selectedCustomer.turnover*0.1){
       $scope.showAvgPriceValidation=true;        
     }     */ 

      //Risk acceptance validation for Buyer Segment 1
      buyerCountry=selectedCustomer.buyerPortfolio[0].country;
      buyerIndustry=selectedCustomer.buyerPortfolio[0].industry;
      buyerRating =selectedCustomer.buyerPortfolio[0].rating;      
      riskAcceptanceValidForBuyerSegment1=$scope.isValidRiskAcceptance(buyerCountry,buyerIndustry,buyerRating);
      if (!riskAcceptanceValidForBuyerSegment1){
        toastr.error($scope.riskError1);
      }

      //Risk acceptance validation for Buyer Segment 2
      buyerCountry=selectedCustomer.buyerPortfolio[1].country;
      buyerIndustry=selectedCustomer.buyerPortfolio[1].industry;
      buyerRating =selectedCustomer.buyerPortfolio[1].rating;      
      riskAcceptanceValidForBuyerSegment2=$scope.isValidRiskAcceptance(buyerCountry,buyerIndustry,buyerRating);
      if (!riskAcceptanceValidForBuyerSegment2){
        toastr.error($scope.riskError2);
      }

      //Risk acceptance validation for Buyer Segment 3
      buyerCountry=selectedCustomer.buyerPortfolio[2].country;
      buyerIndustry=selectedCustomer.buyerPortfolio[2].industry;
      buyerRating =selectedCustomer.buyerPortfolio[2].rating;      
      riskAcceptanceValidForBuyerSegment3=$scope.isValidRiskAcceptance(buyerCountry,buyerIndustry,buyerRating);

      if (!riskAcceptanceValidForBuyerSegment3){
        toastr.error($scope.riskError3);
      }

      //Validation for cld calculation
      calculatedCldIsValid = isValidCld();
      if (!calculatedCldIsValid ){
        toastr.error('Error In CLD calculation');
      }

      experienceScoreEnough = $rootScope.miniDashboardInfo.experienceScore >=selectedCustomer.experienceScoreNeeded ? true:false;
      console.log('--'+$rootScope.miniDashboardInfo.experienceScore);
      console.log('--'+selectedCustomer.experienceScoreNeeded);
      //Validation for experience score
      if(!experienceScoreEnough){
       toastr.error($scope.experieneScoreMsgNotEnough);

      }

    }

    


    $scope.submitOffer = function() { 

      validate();  
      
      if ( !$scope.showPriceValidation && 
       !$scope.showAvgPriceValidation &&
       riskAcceptanceValidForBuyerSegment1 &&
       riskAcceptanceValidForBuyerSegment2 &&
       riskAcceptanceValidForBuyerSegment3 &&
       calculatedCldIsValid &&
       experienceScoreEnough ){

      // create new offer
//    console.log("MarketBusinessName --> " + selectedCustomer.name);
//    console.log("Price --> " + $scope.selected.price);
    console.log(' -- Modifying offer --' + JSON.stringify(selectedCustomer));

    var buyer1Country=selectedCustomer.buyerPortfolio[0].country;
    var buyer1Industry=selectedCustomer.buyerPortfolio[0].industry;;
    var buyer1Rating=selectedCustomer.buyerPortfolio[0].rating;
    var buyer1Cla=selectedCustomer.buyerPortfolio[0].cla;
    var buyer1RiskAcceptance=getRiskAcceptanceRate(buyer1Country,buyer1Industry,buyer1Rating);        

    var buyer2Country=selectedCustomer.buyerPortfolio[1].country;;
    var buyer2Industry=selectedCustomer.buyerPortfolio[1].industry;
    var buyer2Rating=selectedCustomer.buyerPortfolio[1].rating;
    var buyer2Cla=selectedCustomer.buyerPortfolio[1].cla;
    var buyer2RiskAcceptance=getRiskAcceptanceRate(buyer2Country,buyer2Industry,buyer2Rating);        

    var buyer3Country=selectedCustomer.buyerPortfolio[2].country;;
    var buyer3Industry=selectedCustomer.buyerPortfolio[2].industry;
    var buyer3Rating=selectedCustomer.buyerPortfolio[2].rating;
    var buyer3Cla=selectedCustomer.buyerPortfolio[2].cla;
    var buyer3RiskAcceptance=getRiskAcceptanceRate(buyer3Country,buyer3Industry,buyer3Rating);                 

    var offerObj = {
      round: $rootScope.currentRoundNumber,
      marketBusinessName: selectedCustomer.name,
      price: $scope.selected.price,
      cld :0,
      offerType:'New',

      buyer1Country:selectedCustomer.buyerPortfolio[0].country,
      buyer1Industry:selectedCustomer.buyerPortfolio[0].industry,
      buyer1Rating:selectedCustomer.buyerPortfolio[0].rating,
      buyer1Cla:selectedCustomer.buyerPortfolio[0].cla,
      buyer1RiskAcceptance:buyer1RiskAcceptance,        
      
      buyer2Country:selectedCustomer.buyerPortfolio[1].country,
      buyer2Industry:selectedCustomer.buyerPortfolio[1].industry,
      buyer2Rating:selectedCustomer.buyerPortfolio[1].rating,
      buyer2Cla:selectedCustomer.buyerPortfolio[1].cla,
      buyer2RiskAcceptance:buyer2RiskAcceptance,        
      
      buyer3Country:selectedCustomer.buyerPortfolio[2].country,
      buyer3Industry:selectedCustomer.buyerPortfolio[2].industry,
      buyer3Rating:selectedCustomer.buyerPortfolio[2].rating,
      buyer3Cla:selectedCustomer.buyerPortfolio[2].cla,
      buyer3RiskAcceptance:buyer3RiskAcceptance
    };

    var offerCountIncrementObj={
      customerId:selectedCustomer._id,
      count : 1
    };
    
//    console.log('offerObj >>>> ' + JSON.stringify(offerObj));
    
    Offer.makeOffer(offerObj).$promise.then(function(offers){
//      $rootScope.team=team;
      OfferCount.updateOfferCount(offerCountIncrementObj).$promise.then(function(customer){
    	  /*Customer.customers.query().$promise.then(function (customers) {
	          for (var i = 0; i < customers.length ; i++) {
	            var obj = customers[i];                        
	            for (var j = 0; j < $rootScope.team.offer.length; j++) {
	              var offer = $rootScope.team.offer[j];                    
	              if (offer.marketBusinessName == obj.name && offer.round == $rootScope.currentRoundNumber) {
	                obj.offerFound = true;
	                obj.offerId=offer._id;
	                obj.price=offer.price;
	                obj.offerType  = offer.offerType;
	//                console.log('Offer type for ' + obj.name + ' is ---> ' + offer.offerType);
	                break;                
	              }
	            }                                  
	
	          }
	
	          $rootScope.customers = customers;
	          console.log('Modified offer-----???? ');
	          $modalInstance.dismiss('close');
	          toastr.success($scope.successMsg1 + selectedCustomer.name + '.', $scope.successMsg2);
	          updateNotifications();

        });*/
    	  GlobalCustomer.getGlobalCustomers().$promise.then(function(customers){
    	        for (var i = 0; i < customers.length ; i++) {
    	            var obj = customers[i];                        
    	            for (var j = 0; j < offers.length; j++) {
    	              var offer = offers[j];                    
    	              if (offer.marketBusinessName == obj.name  && offer.round == $rootScope.currentRoundNumber) {
    	                obj.offerFound = true;
    	                obj.offerId=offer._id;
    	                obj.price=offer.price;
    	                obj.offerType  = offer.offerType;
//    	                console.log('offer found:'+obj.name );
    	                break;                
    	              }
    	            }                                  

    	          }
//    	          console.log('All Global customers -- ' + JSON.stringify(customers));
    	          $rootScope.customers = customers; 
    	          $modalInstance.dismiss('close');
    	          toastr.success($scope.successMsg1 + selectedCustomer.name + '.', $scope.successMsg2);
    	          updateNotifications();
    	    });
    	  
//    	  var offers = team.offer;
    	  var globalOfferCount = 0;
    	  for (var i = 0 ; i < offers.length ; i++) {
    		  if (offers[i].marketType != 'Local Market Portfolio' && offers[i].offerType == 'New' && offers[i].round == $rootScope.currentRoundNumber) {
    			  globalOfferCount = globalOfferCount + 1;  
    		  }
    		 
    	  }
    	  
    	  $rootScope.globalOfferCount = globalOfferCount; 

       }); 

     

    }, function(error){
    	console.log('Error == ' +  JSON.stringify(error));
    	if (error.data == 'Duplicate error') {
    		toastr.error("Error: There is already an offer made to this customer in this round. Please refresh the screen!");
    	}
    });    



    
  }    

};


function updateNotifications () {
	Round.currentRound(function(round){
		$rootScope.roundNumber = round.round;
		$rootScope.pendingTasks = 0;
		$rootScope.getCurrentTeam = Auth.getCurrentTeam;
			Team.notificationInformation({id:0}).$promise.then(function(notificationObject){$rootScope.notifications = notificationObject.contents;
			if(typeof(notificationObject) != 'undefined' && typeof(notificationObject.contents) != 'undefined'){
				for (var i = 0 ; i < notificationObject.contents.length; i++) {
					if(notificationObject.contents[i].status == 'false') {
						$rootScope.pendingTasks = $rootScope.pendingTasks + 1;
					}
				}
			}
		});
			
	});
}

/*$scope.saveOfferUsingPostMethod = function() { 

      validate();  
      
      if ( !$scope.showPriceValidation && 
       !$scope.showAvgPriceValidation &&
       riskAcceptanceValidForBuyerSegment1 &&
       riskAcceptanceValidForBuyerSegment2 &&
       riskAcceptanceValidForBuyerSegment3 &&
       calculatedCldIsValid &&
       experienceScoreEnough ){

      // create new offer
    console.log("MarketBusinessName --> " + selectedCustomer.name);
    console.log("Price --> " + $scope.selected.price);
    //var teamId={id:$rootScope.team._id};
    var offerObj = {
      _id:$rootScope.team._id,
      round: $scope.currentRoundNumber,
      marketBusinessName: selectedCustomer.name,
      price: $scope.selected.price,
      cld :$scope.calculatedCld        
    };

    var offerCountIncrementObj={
      customerId:selectedCustomer._id,
      count : 1
    };


    var res = $http.post('/api/team/saveOffer', offerObj);
    res.success(function(data, status, headers, config) {
      $scope.message = data;
      $rootScope.team=data;
      OfferCount.updateOfferCount(offerCountIncrementObj).$promise.then(function(customer){
      Customer.customers.query().$promise.then(function (customers) {
          for (var i = 0; i < customers.length ; i++) {
            var obj = customers[i];                        
            for (var j = 0; j < $rootScope.team.offer.length; j++) {
              var offer = $rootScope.team.offer[j];                    
              if (offer.marketBusinessName == obj.name ) {
                obj.offerFound = true;
                obj.offerId=offer._id;
                obj.price=offer.price;
                break;                
              }
            }                                  

          }

          $rootScope.customers = customers;
        }); 

           }); 
    });
    res.error(function(data, status, headers, config) {
      alert( "failure message: " + JSON.stringify({data: data}));
    });   
  

    $modalInstance.dismiss('close');
    toastr.success($scope.successMsg1 + selectedCustomer.name + '.', $scope.successMsg2);
  }    

};*/





$scope.modifyOffer = function() { 

  validate();  

  if ( !$scope.showPriceValidation && 
   !$scope.showAvgPriceValidation &&
   riskAcceptanceValidForBuyerSegment1 &&
   riskAcceptanceValidForBuyerSegment2 &&
   riskAcceptanceValidForBuyerSegment3 &&
   calculatedCldIsValid){

      // modify offer
    var buyer1Country=selectedCustomer.buyerPortfolio[0].country;
    var buyer1Industry=selectedCustomer.buyerPortfolio[0].industry;;
    var buyer1Rating=selectedCustomer.buyerPortfolio[0].rating;
    var buyer1Cla=selectedCustomer.buyerPortfolio[0].cla;
    var buyer1RiskAcceptance=getRiskAcceptanceRate(buyer1Country,buyer1Industry,buyer1Rating);        

    var buyer2Country=selectedCustomer.buyerPortfolio[1].country;;
    var buyer2Industry=selectedCustomer.buyerPortfolio[1].industry;
    var buyer2Rating=selectedCustomer.buyerPortfolio[1].rating;
    var buyer2Cla=selectedCustomer.buyerPortfolio[1].cla;
    var buyer2RiskAcceptance=getRiskAcceptanceRate(buyer2Country,buyer2Industry,buyer2Rating);        

    var buyer3Country=selectedCustomer.buyerPortfolio[2].country;;
    var buyer3Industry=selectedCustomer.buyerPortfolio[2].industry;
    var buyer3Rating=selectedCustomer.buyerPortfolio[2].rating;
    var buyer3Cla=selectedCustomer.buyerPortfolio[2].cla;
    var buyer3RiskAcceptance=getRiskAcceptanceRate(buyer3Country,buyer3Industry,buyer3Rating);   

//    console.log('$scope.selected.offerType -- ' + JSON.stringify($scope.selected));
    
    var offerObj = {
      offerId: $scope.selected.offerId,
      round: $rootScope.currentRoundNumber,
      marketBusinessName: $scope.selected.name,
      price: $scope.selected.price,
      cld:0,
      offerType: $scope.selected.offerType,

      buyer1Country:selectedCustomer.buyerPortfolio[0].country,
      buyer1Industry:selectedCustomer.buyerPortfolio[0].industry,
      buyer1Rating:selectedCustomer.buyerPortfolio[0].rating,
      buyer1Cla:selectedCustomer.buyerPortfolio[0].cla,
      buyer1RiskAcceptance:buyer1RiskAcceptance,        
      
      buyer2Country:selectedCustomer.buyerPortfolio[1].country,
      buyer2Industry:selectedCustomer.buyerPortfolio[1].industry,
      buyer2Rating:selectedCustomer.buyerPortfolio[1].rating,
      buyer2Cla:selectedCustomer.buyerPortfolio[1].cla,
      buyer2RiskAcceptance:buyer2RiskAcceptance,        
      
      buyer3Country:selectedCustomer.buyerPortfolio[2].country,
      buyer3Industry:selectedCustomer.buyerPortfolio[2].industry,
      buyer3Rating:selectedCustomer.buyerPortfolio[2].rating,
      buyer3Cla:selectedCustomer.buyerPortfolio[2].cla,
      buyer3RiskAcceptance:buyer3RiskAcceptance        
    };
    Offer.modifyOffer(offerObj).$promise.then(function(team){
      $rootScope.team=team;
      $modalInstance.dismiss('close');
      console.log('Modifying offer -- ' + $location.path());
      toastr.success($scope.successMsg1 + selectedCustomer.name + '.', $scope.successMsg3);
      if ('/customer-portfolio' === $location.path()) {
    	  $location.path('/customer-portfolio');
    	  refreshCustomers(team);
      }
    });    

  }    

};    

function refreshCustomers (team) {
	$rootScope.team = team;  
    var customers = typeof($rootScope.team.customer) ==="undefined"? [] : $rootScope.team.customer;
    var offers = typeof($rootScope.team.offer) ==="undefined"? [] :$rootScope.team.offer;
    for (var i = 0; i < customers.length ; i++) {
  	  var customer = customers[i];
  	  customer.showRenewalAndManageOut = false;
  	  for (var j=0; j < offers.length; j++) {
  		  var offer = offers[j];
  		  if (offer.marketBusinessName == customer.businessName && customer.agreement.status == 'Active' && offer.offerType == 'Renewal' && offer.round == $scope.currentRoundNumber) {
  			  customer.showRenewalAndManageOut = true;
  		  }
  		  
  		  if(offer.marketBusinessName == customer.businessName  && offer.round == $scope.currentRoundNumber){
  			  customer.price = offer.price;
  			  customer.offerType = offer.offerType;
  			  customer.offerId = offer._id;
  		  }
  		  
  	  }
    }
    $rootScope.customers = customers;
}

})

.controller('SpinnerCtrl', SpinnerCtrl)
.directive('jqSpinner', jqSpinner);

function SpinnerCtrl() {
  var spinner = this;
  spinner.val = 0;
}


function jqSpinner($rootScope) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, element, attrs, spinner) {
      element.spinner({
        spin: function (event, ui) {
          $rootScope.$broadcast('spinnerChange', { value: ui.value})
          spinner.$setViewValue(ui.value);
        }
      });
    }
  };
}



