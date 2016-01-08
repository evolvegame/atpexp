'use strict';

angular.module('atpexpApp')
  .factory('Round', function ($resource) {
      return $resource('/api/rounds/:roundId/:controller', {}, {
          save: { method: 'POST' },
          update: { method: 'PUT', params: {entryId: '@roundId'} },
          currRound: {method:'GET', params: {controller:'currentRound'}}
        }
      );
    });

// angular.module('atpexpApp')
//   .factory('Round', function ($resource) {
//     return $resource('/api/rounds/:id/:controller', {
//       id: '@_id'
//     },
//     {
//       get: {
//         method: 'GET',
//         params: {
//           controller:'currentRound'
//         }
//       }
// 	  });
//   });
