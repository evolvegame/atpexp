'use strict';

angular.module('atpexpApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'highcharts-ng',
  'ui.bootstrap',
  'toastr',
  'ngAnimate',
  'datatables',
  'ngResource',
  'nvd3ChartDirectives',
  'ngTagsInput',
  'pascalprecht.translate',
  'ngFileUpload'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider,$translateProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
    //set preferredLanguage
    $translateProvider.preferredLanguage('en');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  })

  

  