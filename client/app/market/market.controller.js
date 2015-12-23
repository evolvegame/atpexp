'use strict';

angular.module('atpexpApp')
  .controller('MarketCtrl', function ($scope, $modal, $http, Market,Auth) {
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

    Market.customers.query().$promise.then(function (customers) {
      $scope.customers = customers;
    });

    /*Market.offers.query().$promise.then(function (offers) {
      $scope.offers = offers;
    });*/

    $scope.team = Auth.getCurrentTeam;

  


  })

.controller('ModalInstanceCtrl', function ($scope, $modalInstance, selectedCustomer, Auth, toastr, Offer, $rootScope){
    // re-add selectedCustomer to $scope.selected
    $scope.selected = selectedCustomer;

    $scope.team = Auth.getCurrentTeam;

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

