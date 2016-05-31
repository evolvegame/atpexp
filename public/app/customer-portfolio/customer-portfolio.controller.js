'use strict';

angular.module('atpexpApp')
.controller('CustomerPortfolioCtrl', function ($scope, $rootScope, $modal, $http, toastr, $translate, Round, Customer, OfferCount, $location, DTOptionsBuilder) {

    // load selected customer in modal
    $scope.showCustomer = function(cust) {
      console.log(' Cust ' + JSON.stringify(cust));
      if (cust.marketType == 'Local Market Portfolio') {
    	  $location.path('/market').search({customer:cust});
      } else {
    	  Customer.customers.query().$promise.then(function (customers) {
        	  for (var i = 0; i < customers.length; i ++){
        		  if (customers[i].name == cust.businessName) {
        			  customers[i].price = cust.price;
        			  customers[i].offerType = cust.offerType;
        			  customers[i].offerId = cust.offerId;
                for(var j = 0;j < customers[i].buyerPortfolio.length;j++){
                  customers[i].buyerPortfolio[j].riskFlag = cust.buyerPortfolio[j].riskFlag;
                  customers[i].buyerPortfolio[j].riskAcceptance = cust.buyerPortfolio[j].riskAcceptance;
                }
        			  $scope.selected = customers[i];
        			  break;
        		  }
        	  }
        	  
        	  $scope.modify();
          });  
      }
      
      
      
      
    };
    
    $scope.selectCustomerForManageOut = function(cust) {
    	$scope.selected = cust;
    }

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

    
    Round.currentRound(function (currentRound) {
        var currentRoundRecord = currentRound;
        if(currentRoundRecord!=null && currentRoundRecord.round>0){
          $rootScope.currentRoundNumber =currentRoundRecord.round;
          Customer.customers.query().$promise.then(function (customers) {
          	OfferCount.getOfferAnalysis().$promise.then(function(offers){
  	        	for (var i = 0; i < customers.length ; i++) {
  	              var obj = customers[i];                        
  	              for (var j = 0; j < offers.length; j++) {
  	                var offer = offers[j];                    
  	                if (offer.marketBusinessName == obj.name  && offer.round == ($rootScope.currentRoundNumber - 1)) {
  	                  obj.offerFound = true;
  	                  obj.offerId=offer._id;
  	                  obj.price=offer.price;
  	                  obj.offerType  = offer.offerType;
  	                  obj.teamName = offer.wonTeam;
  	                  obj.agreementPremium = offer.agreementPremium;
  	                  obj.experienceScore = offer.experienceScore;
  	                  obj.cld = offer.cld;
  	                  obj.offerCld = offer.offerCld;
                        if (offer.elligibleForMoreDetails== true) {
                            obj['elligibleForMoreDetails']=true;
                        }else{
                            obj['elligibleForMoreDetails']=false;
                        }
  	                  break;                
  	                }
  	              }                                  
  	
  	            }
  	
  	            $rootScope.offerAnalysis = customers;
          	});
            });

          
        }else{
          console.log("Error loading current round ");
          toastr.error("Error: Currently no details are available for current round. Request to initiate.");
        }
      });
    
    //$http.get('/api/team/me').success( function (team){
        $http.get('/api/team/me').success( function (team){
            $rootScope.team = team;  
            var customers = typeof($rootScope.team.customer) ==="undefined"? [] : $rootScope.team.customer;
            var offers = typeof($rootScope.team.offer) ==="undefined"? [] :$rootScope.team.offer;
            //console.log('offers ---->>>>  ' + JSON.stringify(offers));
            //console.log('customers-- ' + JSON.stringify(customers));
            for (var i = 0; i < customers.length ; i++) {
          	  var customer = customers[i];
          	  customer.showRenewalAndManageOut = false;
                for(var a = 0; a < customer.buyerPortfolio.length ; a++){
                    for(var b=0;b<team.riskStrategy.length;b++){
                      if(team.riskStrategy[b].buyerCountry.indexOf(customer.buyerPortfolio[a].country) > -1 && team.riskStrategy[b].buyerIndustry.indexOf(customer.buyerPortfolio[a].industry) > -1){
                        //console.log('::::::customer.buyerPortfolio[a].buyerRating'+customer.buyerPortfolio[a].buyerRating);
                        var riskFlag = true;
                        customer.buyerPortfolio[a].riskFlag = true;
                        if(customer.buyerPortfolio[a].buyerRating> 60){
                          //console.log('customer.buyerPortfolio[a].buyerRating'+customer.buyerPortfolio[a].buyerRating);
                          customer.buyerPortfolio[a].riskAcceptance = team.riskStrategy[b].strategyRatingBand1;
                          customer.buyerPortfolio[a].riskFlag = true;
                        }else if(customer.buyerPortfolio[a].buyerRating>= 51){
                          customer.buyerPortfolio[a].riskAcceptance = team.riskStrategy[b].strategyRatingBand2;
                          customer.buyerPortfolio[a].riskFlag = true;
                        }else if(customer.buyerPortfolio[a].buyerRating>= 41){
                          customer.buyerPortfolio[a].riskAcceptance = team.riskStrategy[b].strategyRatingBand3;
                          customer.buyerPortfolio[a].riskFlag = true;
                        }else if(customer.buyerPortfolio[a].buyerRating>= 31){
                          customer.buyerPortfolio[a].riskAcceptance = team.riskStrategy[b].strategyRatingBand4;
                          customer.buyerPortfolio[a].riskFlag = true;
                        }else {
                          customer.buyerPortfolio[a].riskAcceptance = team.riskStrategy[b].strategyRatingBand5;
                          customer.buyerPortfolio[a].riskFlag = true;
                        }
                      }
                    }
                  }
                  
          	  for (var j=0; j < offers.length; j++) {
          		  var offer = offers[j];
          		  if (offer.marketBusinessName == customer.businessName && customer.agreement.status == 'Active' && offer.offerType == 'Renewal' && offer.round == $scope.currentRoundNumber) {
          			  customer.showRenewalAndManageOut = true;
          			  console.log('setting true -- ' + offer.offerType + ' for ' + offer.marketBusinessName );
          		  }
          		  
          		  if(offer.marketBusinessName == customer.businessName  && offer.round == $scope.currentRoundNumber){
          			  customer.price = offer.price;
          			  customer.offerType = offer.offerType;
          			  customer.offerId = offer._id;
          			  console.log('Offer price -- ' + customer.price + 'for customer == ' + customer.businessName);
          		  }
          		  
          	  }
            }
            //console.log('$scope.currentRoundNumber-- ' + JSON.stringify($scope.currentRoundNumber));
            console.log('customers--2 ' + JSON.stringify(customers));
            //console.log('offers-- ' + JSON.stringify(offers));
            $rootScope.customers = customers;

          });
   //});


    $scope.refresh =function(){
     $http.get('/api/team/me').success( function (team){
         $rootScope.team = team;  
         var customers = typeof($rootScope.team.customer) ==="undefined"? [] : $rootScope.team.customer;
         var offers = typeof($rootScope.team.offer) ==="undefined"? [] :$rootScope.team.offer;
         console.log('offers ---->>>>  ' + JSON.stringify(offers));
         for (var i = 0; i < customers.length ; i++) {
       	  var customer = customers[i];
       	  customer.showRenewalAndManageOut = false;
           
           for(var a = 0; a < customer.buyerPortfolio.length ; a++){
                    for(var b=0;b<team.riskStrategy.length;b++){
                      if(team.riskStrategy[b].buyerCountry.indexOf(customer.buyerPortfolio[a].country) > -1 && team.riskStrategy[b].buyerIndustry.indexOf(customer.buyerPortfolio[a].industry) > -1){
                        //console.log('::::::customer.buyerPortfolio[a].buyerRating'+customer.buyerPortfolio[a].buyerRating);
                        var riskFlag = true;
                        customer.buyerPortfolio[a].riskFlag = true;
                        if(customer.buyerPortfolio[a].buyerRating> 60){
                          //console.log('customer.buyerPortfolio[a].buyerRating'+customer.buyerPortfolio[a].buyerRating);
                          customer.buyerPortfolio[a].riskAcceptance = team.riskStrategy[b].strategyRatingBand1;
                          customer.buyerPortfolio[a].riskFlag = true;
                        }else if(customer.buyerPortfolio[a].buyerRating>= 51){
                          customer.buyerPortfolio[a].riskAcceptance = team.riskStrategy[b].strategyRatingBand2;
                          customer.buyerPortfolio[a].riskFlag = true;
                        }else if(customer.buyerPortfolio[a].buyerRating>= 41){
                          customer.buyerPortfolio[a].riskAcceptance = team.riskStrategy[b].strategyRatingBand3;
                          customer.buyerPortfolio[a].riskFlag = true;
                        }else if(customer.buyerPortfolio[a].buyerRating>= 31){
                          customer.buyerPortfolio[a].riskAcceptance = team.riskStrategy[b].strategyRatingBand4;
                          customer.buyerPortfolio[a].riskFlag = true;
                        }else {
                          customer.buyerPortfolio[a].riskAcceptance = team.riskStrategy[b].strategyRatingBand5;
                          customer.buyerPortfolio[a].riskFlag = true;
                        }
                      }
                    }
                  }
                  
       	  for (var j=0; j < offers.length; j++) {
       		  var offer = offers[j];
       		  if (offer.marketBusinessName == customer.businessName && customer.agreement.status == 'Active' && offer.offerType == 'Renewal' && offer.round == $scope.currentRoundNumber) {
       			  customer.showRenewalAndManageOut = true;
       			  console.log('setting true -- ' + offer.offerType + ' for ' + offer.marketBusinessName );
       		  }
       		  
       		  if(offer.marketBusinessName == customer.businessName  && offer.round == $scope.currentRoundNumber){
       			  customer.price = offer.price;
       			  customer.offerType = offer.offerType;
       			  customer.offerId = offer._id;
       			  console.log('Offer price -- ' + customer.price + 'for customer == ' + customer.businessName);
       		  }
       		  
       	  }
         }
         console.log('$scope.currentRoundNumber-- ' + JSON.stringify($scope.currentRoundNumber));
         console.log('customers-- ' + JSON.stringify(customers));
         console.log('offers-- ' + JSON.stringify(offers));
         $rootScope.customers = customers;

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

    $rootScope.dtOptions = DTOptionsBuilder.newOptions().withOption('stateSave', true);
    
    $http.get('/api/team/getTeamMembers').success(function(members){   
         $rootScope.members = members;
    });

  })
.controller('MangeOutModalInstanceCtrl', function ($scope, $modalInstance, selectedCustomer, toastr, $rootScope,$translate, Offer, DTOptionsBuilder,$http){

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
        var customers = typeof(team.customer) ==="undefined"? [] : team.customer;
        var offers = typeof(team.offer) ==="undefined"? [] : team.offer;
        
        for (var i = 0; i < customers.length ; i++) {
      	  var customer = customers[i];
      	  customer.showRenewalAndManageOut = false;
      	  console.log(' ----offers--->>> ' + JSON.stringify(customer.businessName));
      	  for (var j=0; j < offers.length; j++) {
      		  var offer = offers[j];
      		  if (offer.marketBusinessName == customer.businessName && customer.agreement.status == 'Active' && offer.offerType == 'Renewal' && offer.round == $scope.currentRoundNumber) {
      			  customer.showRenewalAndManageOut = true;
      		  }
      		  
      		  if(offer.marketBusinessName == customer.businessName  && offer.round == $scope.currentRoundNumber){
      			  customer.price = offer.price;
      			  customer.offerType = offer.offerType;
      			  customer.offerId = offer._id;
      			  console.log('offer.offerType -- ' + offer.offerType + 'for customer == ' + customer.businessName);
      		  }
      		  
      	  }
        }
        
        $rootScope.customers = customers;
        refresh();
	});
	
  
//Logic to be developed
  //$modalInstance.dismiss('close');

};



$scope.closeModal = function () {
  $modalInstance.dismiss('close');
};

function refresh(){
     $http.get('/api/team/me').success( function (team){
         $rootScope.team = team;  
         var customers = typeof($rootScope.team.customer) ==="undefined"? [] : $rootScope.team.customer;
         var offers = typeof($rootScope.team.offer) ==="undefined"? [] :$rootScope.team.offer;
         console.log('offers ---->>>>  ' + JSON.stringify(offers));
         for (var i = 0; i < customers.length ; i++) {
       	  var customer = customers[i];
       	  customer.showRenewalAndManageOut = false;
           
          for(var a = 0; a < customer.buyerPortfolio.length ; a++){
                    for(var b=0;b<team.riskStrategy.length;b++){
                      if(team.riskStrategy[b].buyerCountry.indexOf(customer.buyerPortfolio[a].country) > -1 && team.riskStrategy[b].buyerIndustry.indexOf(customer.buyerPortfolio[a].industry) > -1){
                        //console.log('::::::customer.buyerPortfolio[a].buyerRating'+customer.buyerPortfolio[a].buyerRating);
                        var riskFlag = true;
                        customer.buyerPortfolio[a].riskFlag = true;
                        if(customer.buyerPortfolio[a].buyerRating> 60){
                          //console.log('customer.buyerPortfolio[a].buyerRating'+customer.buyerPortfolio[a].buyerRating);
                          customer.buyerPortfolio[a].riskAcceptance = team.riskStrategy[b].strategyRatingBand1;
                          customer.buyerPortfolio[a].riskFlag = true;
                        }else if(customer.buyerPortfolio[a].buyerRating>= 51){
                          customer.buyerPortfolio[a].riskAcceptance = team.riskStrategy[b].strategyRatingBand2;
                          customer.buyerPortfolio[a].riskFlag = true;
                        }else if(customer.buyerPortfolio[a].buyerRating>= 41){
                          customer.buyerPortfolio[a].riskAcceptance = team.riskStrategy[b].strategyRatingBand3;
                          customer.buyerPortfolio[a].riskFlag = true;
                        }else if(customer.buyerPortfolio[a].buyerRating>= 31){
                          customer.buyerPortfolio[a].riskAcceptance = team.riskStrategy[b].strategyRatingBand4;
                          customer.buyerPortfolio[a].riskFlag = true;
                        }else {
                          customer.buyerPortfolio[a].riskAcceptance = team.riskStrategy[b].strategyRatingBand5;
                          customer.buyerPortfolio[a].riskFlag = true;
                        }
                      }
                    }
                  }
           
       	  for (var j=0; j < offers.length; j++) {
       		  var offer = offers[j];
       		  if (offer.marketBusinessName == customer.businessName && customer.agreement.status == 'Active' && offer.offerType == 'Renewal' && offer.round == $scope.currentRoundNumber) {
       			  customer.showRenewalAndManageOut = true;
       			  console.log('setting true -- ' + offer.offerType + ' for ' + offer.marketBusinessName );
       		  }
       		  
       		  if(offer.marketBusinessName == customer.businessName  && offer.round == $scope.currentRoundNumber){
       			  customer.price = offer.price;
       			  customer.offerType = offer.offerType;
       			  customer.offerId = offer._id;
       			  console.log('Offer price -- ' + customer.price + 'for customer == ' + customer.businessName);
       		  }
       		  
       	  }
         }
         console.log('$scope.currentRoundNumber-- ' + JSON.stringify($scope.currentRoundNumber));
         console.log('customers-- ' + JSON.stringify(customers));
         console.log('offers-- ' + JSON.stringify(offers));
         $rootScope.customers = customers;

       });
   }

$rootScope.dtOptions = DTOptionsBuilder.newOptions().withOption('stateSave', true);

		$http.get('/api/team/getTeamMembers').success(function(members){   
         $rootScope.members = members;
    });
})