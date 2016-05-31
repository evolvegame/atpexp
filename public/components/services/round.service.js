'use strict';

angular.module('atpexpApp')
  .factory('Round', function ($resource) {
      return $resource('/api/rounds/:roundId/:controller', {}, {
          save: { method: 'POST' },
          update: { method: 'PUT', params: {entryId: '@roundId'} },
          currentRound: {method:'GET', params: {controller:'currentRound'}},
          calculateRound:{method:'POST',params: {roundId:'@roundId',controller:'calculateRound'}}
        }
      );
    });
