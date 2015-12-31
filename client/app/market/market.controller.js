'use strict';

angular.module('atpexpApp')
  .controller('MarketCtrl', function ($scope, $modal, $http, Customer, $rootScope, toastr) {
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

    Customer.customers.query().$promise.then(function (customers) {
      $scope.customers = customers;
    });

    $scope.refreshCustomer = function (){
    Customer.customers.query().$promise.then(function (customers) {
      $scope.customers = customers;
    });
    toastr.info('Customer info refreshed');
}  


  })

.controller('ModalInstanceCtrl', function ($scope, $modalInstance, selectedCustomer, toastr, Offer, $rootScope){
    // re-add selectedCustomer to $scope.selected
    $scope.selected = selectedCustomer;

    //$scope.team = Auth.getCurrentTeam;

    // $scope.ok = function () {
    //   $modalInstance.close($scope.selected.item);
    // };

    $scope.price = 0;

    $scope.closeModal = function () {
      $modalInstance.dismiss('close');
    };

    $rootScope.$on('spinnerChange', function (event, getSpinner) {
      $scope.spinner = getSpinner.value;
    });

    $scope.submitOffer = function() {
      // create new offer
      console.log('scope spinner value: ', $scope.spinner);
      var avgAr = $scope.selected.buyerTpe1 + $scope.selected.buyerTpe2 + $scope.selected.buyerTpe1;
      var offerObj = {
        customerId: selectedCustomer._id,
        round: 0,
        ar1: $scope.selected.buyerTpe1,
        ar2: $scope.selected.buyerTpe2,
        ar3: $scope.selected.buyerTpe3,
        avgAr: avgAr,
        price: $scope.price,
        serviceScore: 110
      };
      var newOffer = new Offer(offerObj);
      newOffer.$save(function (newOfferObj) {
        console.log(newOfferObj);
      });

      // update customer with new offerId
      toastr.success('Your offer has been submitted to ' + selectedCustomer.name + '.', 'Offer sent!');
    };

    //function to check a number between two numbers
    Number.prototype.between = function(first,last){
    return (first < last ? this >= first && this <= last : this >= last && this <= first);
    }

    //code added to get risk acceptance rate from team risk strtagy
    $scope.getRiskAcceptanceRate = function (country,insdustry,rating){
    var strategies = $rootScope.team.riskStrategy;     
    for (var i = strategies.length - 1; i >= 0; i--) {
     // console.log('rating '+rating);
      if (strategies[i].buyerCountry===country && strategies[i].buyerIndustry.indexOf(insdustry)>-1 ){
        if (rating.between(1,30)){
          $scope.riskAcceptance =strategies[i].strategyRatingBand1;
          //console.log('match:1to30'+i);
        } else if (rating.between(31,40)){
          $scope.riskAcceptance =strategies[i].strategyRatingBand2;
          console.log('match:31to40'+i);
        } else if (rating.between(41,50)){
          $scope.riskAcceptance =strategies[i].strategyRatingBand3;
        } else if (rating.between(51,60)){
          $scope.riskAcceptance =strategies[i].strategyRatingBand4;
        } else {
          $scope.riskAcceptance =strategies[i].strategyRatingBand5;
        }        
        console.log('riskAcceptance >'+country+ '-'+insdustry +' '+$scope.riskAcceptance);
        return $scope.riskAcceptance;
      }
    };    
  }

  //code added to get weather icon based on buyer rating
    $scope.getRatingWeatherIcon=function(buyerRating){
      $scope.ratingWeatherIcon ='';
      $scope.ratingText='no data';
    if ( buyerRating!=null && typeof buyerRating != "undefined" ){
      if (buyerRating.between(1,30)){
          $scope.ratingWeatherIcon ='wi wi-storm-showers';
          $scope.ratingText ='Very Bad';
          //console.log('match:1to30'+i);
        } else if (buyerRating.between(31,40)){
          $scope.ratingWeatherIcon ='wi wi-cloudy';
          $scope.ratingText ='Bad';
        } else if (buyerRating.between(41,50)){
          $scope.ratingWeatherIcon ='wi wi-cloud';
          $scope.ratingText ='Moderate';
        } else if (buyerRating.between(51,60)){
          $scope.ratingWeatherIcon ='wi wi-day-cloudy';
          $scope.ratingText ='Good';
        } else {
          $scope.ratingWeatherIcon ='wi wi-day-sunny';
          $scope.ratingText ='Excellent';
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
          $scope.riskText ='Very Bad';
          //console.log('match:1to30'+i);
        } else if (customerRisk.between(31,40)){
          $scope.riskWeatherIcon ='wi wi-cloudy';
          $scope.riskText ='Bad';
        } else if (customerRisk.between(41,50)){
          $scope.riskWeatherIcon ='wi wi-cloud';
          $scope.riskText ='Moderate';
        } else if (customerRisk.between(51,60)){
          $scope.riskWeatherIcon ='wi wi-day-cloudy';
          $scope.riskText ='Good';
        } else {
          $scope.riskWeatherIcon ='wi wi-day-sunny';
          $scope.riskText ='Excellent';
        }  

        return $scope.riskWeatherIcon; 
    }
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

  

