'use strict';

angular.module('atpexpApp')
  .factory('Countries', function ($resource) {
      return $resource('/api/country/:countryName/:industryName/:currentRound/:controller', {}, {
          mapData: {method:'GET', params: {controller:'mapData'}},
          industryData:{method:'POST',params:{industryName:'@industryName',controller:'mapData'}},
          industryELData:{method:'POST',params:{industryName:'@industryName',countryName:'@countryName',controller:'industryELData'},isArray: 'true'},
          industryAggrData:{method:'POST',params:{countryName:'@countryName',currentRound:'@currentRound',controller:'industryAggrData'},isArray: 'true'},
          getWeatherSymbol:{method:'GET',params:{countryName:'@countryName',industryName:'@industryName',controller:'getWeatherSymbol'},isArray: true}
        }
      );
    });
    
    
    
