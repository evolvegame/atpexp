'use strict';

angular.module('atpexpApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
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
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      },
      teamInfo: {
        method: 'GET',
        params: {
          id:'teamInfo'
        }
      }
	  });
  });
