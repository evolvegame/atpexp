'use strict';

angular.module('atpexpApp')
  .controller('MarketCtrl', function ($scope, $modal, $http, Customer, $rootScope, toastr,$translate, Round) {
        // load selected customer in modal
    $scope.showCustomer = function(cust) {
      $scope.selected = cust;
    };

    // modal backdrop animation
    $scope.animationsEnabled = true;

    $scope.open = function () {
      // open modal and load tpl
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/market/tpl/modal-customer-decision.html',
        controller: 'ModalInstanceCtrl',
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
    if(currentRoundRecord!=null && currentRoundRecord.round>0){
        $scope.currentRoundNumber =currentRoundRecord.round;
       }else{
        console.log("Error loading current round ");
        toastr.error("Error: Currently no details are available for current round. Request to initiate.");
      }
    });


    Customer.customers.query().$promise.then(function (customers) {
      for (var i = 0; i < customers.length ; i++) {
              var obj = customers[i];                        
                for (var j = 0; j < $rootScope.team.offer.length; j++) {
                    var offer = $rootScope.team.offer[j];                    
                    if (offer.marketBusinessName == obj.name && offer.round===$scope.currentRoundNumber) {
                      obj.offerFound = true;
                      console.log('offer found:'+obj.name );
                      break;                
                    }
                }                                  
              
            }
  
      $rootScope.customers = customers;
    });

    //on load 
    $scope.msg = $translate.instant('market.msg');
    //on language change
    $rootScope.$on('$translateChangeSuccess', function () {
	  
		  $scope.msg = $translate.instant('market.msg');
	    
	  });    
    
   
  })

.controller('ModalInstanceCtrl', function ($scope, $modalInstance, selectedCustomer, toastr, Offer, $rootScope,$translate,Customer, Round){
   
    // re-add selectedCustomer to $scope.selected
    $scope.selected = selectedCustomer;

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
    $scope.getRiskAcceptanceRate = function (country,industry,rating){
    var strategies = $rootScope.team.riskStrategy;
    $scope.riskAcceptance ='';  
    
      
    for (var i =0; i<strategies.length; i++) {

     /*console.log('rating: '+rating+ ' industry: '+industry+' country: '+country);
     console.log('buyerCountry: '+strategies[i].buyerCountry);
     console.log('buyerIndustry: '+strategies[i].buyerIndustry);
     console.log('Condition1 :'+strategies[i].buyerCountry===country);
     console.log('Condition2 :'+strategies[i].buyerIndustry.indexOf(industry)>-1);*/

      if (strategies[i].buyerCountry.indexOf(country)>-1 && strategies[i].buyerIndustry.indexOf(industry)>-1 ){
        if (rating.between(1,30)){
          $scope.riskAcceptance =strategies[i].strategyRatingBand1;
          //console.log('match:1to30'+i);
        } else if (rating.between(31,40)){
          $scope.riskAcceptance =strategies[i].strategyRatingBand2;
          //console.log('match:31to40'+i);
        } else if (rating.between(41,50)){
          $scope.riskAcceptance =strategies[i].strategyRatingBand3;
        } else if (rating.between(51,60)){
          $scope.riskAcceptance =strategies[i].strategyRatingBand4;
        } else {
          $scope.riskAcceptance =strategies[i].strategyRatingBand5;
        }        
        console.log('riskAcceptance >'+country+ '-'+industry +' '+$scope.riskAcceptance);
        
      }    
  } 
    
    return $scope.riskAcceptance; 
  }

    
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
    
    //on language change
    $rootScope.$on('$translateChangeSuccess', function () {
	  
    	 $scope.priceValidationmsg= $translate.instant('market.tpl.priceValidation');
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
	  });
    
  //code added to get weather icon based on buyer rating
    $scope.getRatingWeatherIcon=function(buyerRating){
      $scope.ratingWeatherIcon ='';
      $scope.ratingText='no data';
    if ( buyerRating!=null && typeof buyerRating != "undefined" ){
      if (buyerRating.between(1,30)){
          $scope.ratingWeatherIcon ='wi wi-storm-showers';
          $scope.ratingText = $scope.veryBad;
          //console.log('match:1to30'+i);
        } else if (buyerRating.between(31,40)){
          $scope.ratingWeatherIcon ='wi wi-cloudy';
          $scope.ratingText =$scope.bad;
        } else if (buyerRating.between(41,50)){
          $scope.ratingWeatherIcon ='wi wi-cloud';
          $scope.ratingText = $scope.moderate;
        } else if (buyerRating.between(51,60)){
          $scope.ratingWeatherIcon ='wi wi-day-cloudy';
          $scope.ratingText = $scope.good;
        } else {
          $scope.ratingWeatherIcon ='wi wi-day-sunny';
          $scope.ratingText = $scope.excellent;
        }  

        return $scope.ratingWeatherIcon; 
    }
  }
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
  }

  //function to validate risk acceptance
  function isValidRiskAcceptance(country,industry,rating){
    var riskAcceptance = $scope.getRiskAcceptanceRate(country,industry,rating);
    if (riskAcceptance) {
      return true;
    }  else{
      return false;
    }
    
  } 

  //code to get Current Round
    Round.currentRound(function (currentRound) {
      var currentRoundRecord = currentRound;
    if(currentRoundRecord!=null && currentRoundRecord.round>0){
        $scope.currentRoundNumber =currentRoundRecord.round;
       }else{
        console.log("Error loading current round ");
        toastr.error("Error: Currently no details are available for current round. Request to initiate.");
      }
    });

  
  $scope.submitOffer = function(price) {    
      
      var riskAcceptanceValidForBuyerSegment1=false;
      var riskAcceptanceValidForBuyerSegment2=false;
      var riskAcceptanceValidForBuyerSegment3=false;
      var buyerCountry, buyerIndustry,buyerRating;
      $scope.showPriceValidation=false;
      $scope.showAvgPriceValidation=false;
      $scope.errorTextPriceValiation={};     

      //Price validation
      if (typeof(price)==='undefined'){
        $scope.showPriceValidation=true;
        $scope.errorTextPriceValiation=$scope.priceValidationmsg;
        
      }else if(price <selectedCustomer.turnover*0.2){
         $scope.showAvgPriceValidation=true;        
      }      
      
      //Risk acceptance validation for Buyer Segment 1
      buyerCountry=selectedCustomer.buyerPortfolio[0].country;
      buyerIndustry=selectedCustomer.buyerPortfolio[0].industry;
      buyerRating =selectedCustomer.buyerPortfolio[0].rating;      
      riskAcceptanceValidForBuyerSegment1=isValidRiskAcceptance(buyerCountry,buyerIndustry,buyerRating);
      if (!riskAcceptanceValidForBuyerSegment1){
        toastr.error($scope.riskError1);
      }

      //Risk acceptance validation for Buyer Segment 2
      buyerCountry=selectedCustomer.buyerPortfolio[1].country;
      buyerIndustry=selectedCustomer.buyerPortfolio[1].industry;
      buyerRating =selectedCustomer.buyerPortfolio[1].rating;      
      riskAcceptanceValidForBuyerSegment2=isValidRiskAcceptance(buyerCountry,buyerIndustry,buyerRating);
      if (!riskAcceptanceValidForBuyerSegment2){
        toastr.error($scope.riskError2);
      }

      //Risk acceptance validation for Buyer Segment 3
      buyerCountry=selectedCustomer.buyerPortfolio[2].country;
      buyerIndustry=selectedCustomer.buyerPortfolio[2].industry;
      buyerRating =selectedCustomer.buyerPortfolio[2].rating;      
      riskAcceptanceValidForBuyerSegment3=isValidRiskAcceptance(buyerCountry,buyerIndustry,buyerRating);
     
    if (!riskAcceptanceValidForBuyerSegment3){
        toastr.error($scope.riskError3);
      }
      
    if ( !$scope.showPriceValidation && 
         !$scope.showAvgPriceValidation &&
         riskAcceptanceValidForBuyerSegment1 &&
         riskAcceptanceValidForBuyerSegment2 &&
         riskAcceptanceValidForBuyerSegment3 ){

      // create new offer
        console.log("MarketBusinessName --> " + selectedCustomer.name);
        console.log("Price --> " + price);
        var offerObj = {
              round: $scope.currentRoundNumber,
              marketBusinessName: selectedCustomer.name,
              price: price        
            };
        Offer.addOffer(offerObj).$promise.then(function(team){
          $rootScope.team=team;
          Customer.customers.query().$promise.then(function (customers) {
            for (var i = 0; i < customers.length ; i++) {
              var obj = customers[i];                        
              for (var j = 0; j < $rootScope.team.offer.length; j++) {
                var offer = $rootScope.team.offer[j];                    
                if (offer.marketBusinessName == obj.name && offer.round===$scope.currentRoundNumber) {
                  obj.offerFound = true;
                  console.log('offer found:'+obj.name );
                  break;                
                }
              }                                  

            }

            $rootScope.customers = customers;
          });

            });
        
     


    $modalInstance.dismiss('close');
    toastr.success($scope.successMsg1 + selectedCustomer.name + '.', $scope.successMsg2);
    }    
      
      
    };

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

  

