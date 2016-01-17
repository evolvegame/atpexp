'use strict';

angular.module('atpexpApp')
.controller('CustomerPortfolioCtrl', function ($scope, $rootScope, $modal, $http, toastr, $translate, Round) {

    // load selected customer in modal
    $scope.showCustomer = function(cust) {
      console.log('showCustomer--'+JSON.stringify(cust));
      $scope.selected = cust;
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

    $http.get('/api/team/me').success( function (team){
      $rootScope.team = team;     
      $rootScope.customerPortfolio = typeof($rootScope.team.customer) ==="undefined"?[]:$rootScope.team.customer;

    });


    $scope.refresh =function(){
     $http.get('/api/team/me').success( function (team){
      $rootScope.team = team;     
      $rootScope.customerPortfolio = typeof($rootScope.team.customer) ==="undefined"?[]:$rootScope.team.customer;

    });
   }

  // modal backdrop animation
    $scope.animationsEnabled = true;

   $scope.deleteConfirmation = function () {
      // open modal and load tpl
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/customer-portfolio/tpl/modal-manage-out-confirmation.html',
        controller: 'MangeOutModalInstanceCtrl',
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


  })
.controller('MangeOutModalInstanceCtrl', function ($scope, $modalInstance, selectedCustomer, toastr, $rootScope,$translate){

    //on load    
    $scope.mangeOutSuccessMsg1 = $translate.instant('market.global.mangeOutSuccessMsg1');
    //on language change
    $rootScope.$on('$translateChangeSuccess', function () {      
      $scope.mangeOutSuccessMsg1 = $translate.instant('market.mangeOutSuccessMsg1');

    }); 


    $scope.selected = selectedCustomer;
    

//manage out customer
$scope.manageOut = function (customer) {


//Logic to be developed
  //$modalInstance.dismiss('close');

};



$scope.closeModal = function () {
  $modalInstance.dismiss('close');
};
})