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
  'ngFileUpload',
  'toggle-switch',
  'tmh.dynamicLocale',//angular-dynamic-locale
  'ngFileUpload'
])
  .constant('DEBUG_MODE', /*DEBUG_MODE*/false/*DEBUG_MODE*/)
  .constant('LOCALES',{
     'locales':{
       'es_ES':'Spanish',
       'en_US':'English',
       'de_DE':'Deutsh',
       'it_IT':'Italian'
      
     },
     'preferredLocale':'en_US'
  })
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');
    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })
  // Angular Translate
  .config(function ($translateProvider,DEBUG_MODE,LOCALES) {
    if(DEBUG_MODE){
//      $translateProvider.useMissingTranslationHandlerLog();// warns about missing translates
    }

    $translateProvider.useStaticFilesLoader({
      prefix: '/resources/locale-',
      suffix: '.json'
    });


    $translateProvider.useLocalStorage();
    $translateProvider.preferredLanguage('en-US');
  })
  // Angular Dynamic Locale
  .config(function (tmhDynamicLocaleProvider) {
    tmhDynamicLocaleProvider.localeLocationPattern('bower_components/angular-i18n/angular-locale_{{locale}}.js');
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
