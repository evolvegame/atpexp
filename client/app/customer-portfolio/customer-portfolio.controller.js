'use strict';

angular.module('atpexpApp')
.controller('CustomerPortfolioCtrl', function ($scope, $rootScope, $modal, $http, toastr, $translate, Round, Customer) {

    // load selected customer in modal
    $scope.showCustomer = function(cust) {
      
      Customer.customers.query().$promise.then(function (customers) {
    	  for (var i = 0; i < customers.length; i ++){
    		  if (customers[i].name == cust.businessName) {
    			  customers[i].price = cust.price;
    			  customers[i].offerType = cust.offerType;
    			  customers[i].offerId = cust.offerId;
    			  $scope.selected = customers[i];
    			  break;
    		  }
    	  }
    	  
    	  $scope.modify();
      });
      
      
      
    };
    
    $scope.selectCustomerForManageOut = function(cust) {
    	$scope.selected = cust;
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

    $http.get('/api/team/me').success( function (team){
        $http.get('/api/team/me').success( function (team){
            $rootScope.team = team;  
            var customers = typeof($rootScope.team.customer) ==="undefined"? [] : $rootScope.team.customer;
            var offers = typeof($rootScope.team.offer) ==="undefined"? [] :$rootScope.team.offer;
            
            for (var i = 0; i < customers.length ; i++) {
          	  var customer = customers[i];
          	  for (var j=0; j < offers.length; j++) {
          		  var offer = offers[j];
          		  if (offer.marketBusinessName == customer.businessName && customer.agreement.status == 'Active' && offer.offerType == 'Renew') {
          			  customer.showRenewalAndManageOut = true;
          		  } else {
          			  customer.showRenewalAndManageOut = false;
          		  }
          		  
          		  if(offer.marketBusinessName == customer.businessName  && offer.round == $scope.currentRoundNumber){
          			  customer.price = offer.price;
          			  customer.offerType = offer.offerType;
          			  customer.offerId = offer._id;
          			  console.log('Offer price -- ' + customer.price + 'for customer == ' + customer.businessName);
          		  }
          		  
          	  }
            }
            
            $rootScope.customerPortfolio = customers;

          });
    });


    $scope.refresh =function(){
     $http.get('/api/team/me').success( function (team){
      $rootScope.team = team;  
      var customers = typeof($rootScope.team.customer) ==="undefined"? [] : $rootScope.team.customer;
      var offers = typeof($rootScope.team.offer) ==="undefined"? [] :$rootScope.team.offer;
      
      for (var i = 0; i < customers.length ; i++) {
    	  var customer = customers[i];
    	  for (var j=0; j < offers.length; j++) {
    		  var offer = offers[j];
    		  if (offer.marketBusinessName == customer.businessName && customer.agreement.status == 'Active' && offer.offerType == 'Renew') {
    			  customer.showRenewalAndManageOut = true;
    		  } else {
    			  customer.showRenewalAndManageOut = false;
    		  }
    		  
    		  if(offer.marketBusinessName == customer.businessName  && offer.round == $scope.currentRoundNumber){
      			  customer.price = offer.price;
      			  customer.offerType = offer.offerType;
      			  customer.offerId = offer._id;
      			  console.log('Offer price -- ' + customer.price + 'for customer == ' + customer.businessName);
      		  }
    	  }
      }
      
      $rootScope.customerPortfolio = customers;

    });
   }

  // modal backdrop animation
    $scope.animationsEnabled = true;

    $scope.modify = function () {
        // open modal and load tpl
        var modalInstance = $modal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'app/market/tpl/modal-modify-offer.html',
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
.controller('MangeOutModalInstanceCtrl', function ($scope, $modalInstance, selectedCustomer, toastr, $rootScope,$translate, Offer){

    //on load    
    $scope.mangeOutSuccessMsg1 = $translate.instant('market.global.mangeOutSuccessMsg1');
    //on language change
    $rootScope.$on('$translateChangeSuccess', function () {      
      $scope.mangeOutSuccessMsg1 = $translate.instant('market.mangeOutSuccessMsg1');

    }); 


    $scope.selected = selectedCustomer;
    

//manage out customer
$scope.manageOut = function (customer) {

	console.log('Details of customer for whom offer will be deleted -- ' + JSON.stringify(customer));
	
	Offer.deleteOffer({offerId:customer.offerId}).$promise.then(function(team){
		$modalInstance.dismiss('close');
		$rootScope.team = team;  
        var customers = typeof($rootScope.team.customer) ==="undefined"? [] : $rootScope.team.customer;
        var offers = typeof($rootScope.team.offer) ==="undefined"? [] :$rootScope.team.offer;
        
        for (var i = 0; i < customers.length ; i++) {
      	  var customer = customers[i];
      	  for (var j=0; j < offers.length; j++) {
      		  var offer = offers[j];
      		  if (offer.marketBusinessName == customer.businessName && customer.agreement.status == 'Active' && offer.offerType == 'Renew') {
      			  customer.showRenewalAndManageOut = true;
      		  } else {
      			  customer.showRenewalAndManageOut = false;
      		  }
      		  
      		  if(offer.marketBusinessName == customer.businessName  && offer.round == $scope.currentRoundNumber){
      			  customer.price = offer.price;
      			  customer.offerType = offer.offerType;
      			  customer.offerId = offer._id;
      			  console.log('Offer price -- ' + customer.price + 'for customer == ' + customer.businessName);
      		  }
      		  
      	  }
        }
        
        $rootScope.customerPortfolio = customers;
	});
	

//Logic to be developed
  //$modalInstance.dismiss('close');

};



$scope.closeModal = function () {
  $modalInstance.dismiss('close');
};
})