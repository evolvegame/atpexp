'use strict';

angular.module('atpexpApp')
  .factory('Team', function ($resource) {
    return $resource('/api/team/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      teamSettings: {
        method: 'PUT',
        params: {
          controller:'team'
        }
      },
      teamCompany: {
          method: 'PUT',
          params: {
            controller:'company'
          }
        },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });
  });
