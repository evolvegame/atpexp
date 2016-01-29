'use strict';

angular.module('atpexpApp')
.controller('MarketCtrl', function ($scope, $modal, $http, Customer, $rootScope, toastr,$translate, Round ,Offer ,OfferCount) {
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
        templateUrl: 'app/market/tpl/modal-make-offer.html',
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
      if(currentRoundRecord!=null && currentRoundRecord.round>0){
        $rootScope.currentRoundNumber =currentRoundRecord.round;
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



    

    Customer.customers.query().$promise.then(function (customers) {
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
    });

    //on load 
    $scope.msg = $translate.instant('market.msg');    
    //on language change
    $rootScope.$on('$translateChangeSuccess', function () {

      $scope.msg = $translate.instant('market.msg');      
    }); 

    
  


})

.controller('DeleteOfferModalInstanceCtrl', function ($scope, $modalInstance, selectedCustomer, toastr, Offer, $rootScope,$translate,Customer, Round,OfferCount){
  
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
      Customer.customers.query().$promise.then(function (customers) {
         for (var i = 0; i < customers.length ; i++) {
          var obj = customers[i]; 
          //console.log(JSON.stringify(customers[i]));                       
          for (var j = 0; j < $rootScope.team.offer.length; j++) {
            
            var offer = $rootScope.team.offer[j];                    
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
    }


//delete Offer
$scope.deleteOffer = function (offerId) {

  console.log('DELETE OFFER CALLED :'+offerId);

  var offerId = {offerId:offerId};  

  Offer.deleteOffer(offerId).$promise.then(function(team){      
    $rootScope.team=team;  

    refreshMarketGlobal();
    toastr.success($scope.deleteOfferSuccessMsg1);
  });
  
  $modalInstance.dismiss('close');

};

  
  
  $scope.closeModal = function () {
    $modalInstance.dismiss('close');
  };
})

.controller('ModalInstanceCtrl', function ($scope, $modalInstance, selectedCustomer, toastr, Offer, $rootScope,$translate,Customer, Round,OfferCount, $http){

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
        //console.log('riskAcceptance >'+country+ '-'+industry +' '+$scope.riskAcceptance);
        
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
    $scope.riskAcceptanceStatus = $scope.getRiskAcceptanceRate(country,industry,rating);
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
          riskAcceptance = $scope.getRiskAcceptanceRate(buyerCountry,buyerIndustry,buyerRating);
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

      experienceScoreEnough = $rootScope.team.experienceScore >=selectedCustomer.experienceScoreNeeded ? true:false;
      console.log('--'+$rootScope.team.experienceScore);
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

    var buyer1Country=selectedCustomer.buyerPortfolio[0].country;
    var buyer1Industry=selectedCustomer.buyerPortfolio[0].industry;;
    var buyer1Rating=selectedCustomer.buyerPortfolio[0].rating;
    var buyer1Cla=selectedCustomer.buyerPortfolio[0].cla;
    var buyer1RiskAcceptance=$scope.getRiskAcceptanceRate(buyer1Country,buyer1Industry,buyer1Rating);        

    var buyer2Country=selectedCustomer.buyerPortfolio[1].country;;
    var buyer2Industry=selectedCustomer.buyerPortfolio[1].industry;
    var buyer2Rating=selectedCustomer.buyerPortfolio[1].rating;
    var buyer2Cla=selectedCustomer.buyerPortfolio[1].cla;
    var buyer2RiskAcceptance=$scope.getRiskAcceptanceRate(buyer2Country,buyer2Industry,buyer2Rating);        

    var buyer3Country=selectedCustomer.buyerPortfolio[2].country;;
    var buyer3Industry=selectedCustomer.buyerPortfolio[2].industry;
    var buyer3Rating=selectedCustomer.buyerPortfolio[2].rating;
    var buyer3Cla=selectedCustomer.buyerPortfolio[2].cla;
    var buyer3RiskAcceptance=$scope.getRiskAcceptanceRate(buyer3Country,buyer3Industry,buyer3Rating);                 

    var offerObj = {
      round: $rootScope.currentRoundNumber,
      marketBusinessName: selectedCustomer.name,
      price: $scope.selected.price,
      cld :$scope.calculatedCld,
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
    
    Offer.makeOffer(offerObj).$promise.then(function(team){
      $rootScope.team=team;
      OfferCount.updateOfferCount(offerCountIncrementObj).$promise.then(function(customer){
      Customer.customers.query().$promise.then(function (customers) {
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
          $modalInstance.dismiss('close');
          toastr.success($scope.successMsg1 + selectedCustomer.name + '.', $scope.successMsg2);

        });

  

           }); 

     

    });    



    
  }    

};

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
    var buyer1RiskAcceptance=$scope.getRiskAcceptanceRate(buyer1Country,buyer1Industry,buyer1Rating);        

    var buyer2Country=selectedCustomer.buyerPortfolio[1].country;;
    var buyer2Industry=selectedCustomer.buyerPortfolio[1].industry;
    var buyer2Rating=selectedCustomer.buyerPortfolio[1].rating;
    var buyer2Cla=selectedCustomer.buyerPortfolio[1].cla;
    var buyer2RiskAcceptance=$scope.getRiskAcceptanceRate(buyer2Country,buyer2Industry,buyer2Rating);        

    var buyer3Country=selectedCustomer.buyerPortfolio[2].country;;
    var buyer3Industry=selectedCustomer.buyerPortfolio[2].industry;
    var buyer3Rating=selectedCustomer.buyerPortfolio[2].rating;
    var buyer3Cla=selectedCustomer.buyerPortfolio[2].cla;
    var buyer3RiskAcceptance=$scope.getRiskAcceptanceRate(buyer3Country,buyer3Industry,buyer3Rating);   

//    console.log('$scope.selected.offerType -- ' + JSON.stringify($scope.selected));
    
    var offerObj = {
      offerId: $scope.selected.offerId,
      round: $rootScope.currentRoundNumber,
      marketBusinessName: $scope.selected.name,
      price: $scope.selected.price,
      cld:$scope.calculatedCld,
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
      toastr.success($scope.successMsg1 + selectedCustomer.name + '.', $scope.successMsg3);          
    });    

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



