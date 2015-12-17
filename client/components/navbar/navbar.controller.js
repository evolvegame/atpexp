'use strict';

angular.module('atpexpApp')
.config(function ($translateProvider) {
	
	  $translateProvider.translations('en', {
		    HEADLINE: 'Hello there, This is my awesome app!',
		    INTRO_TEXT: 'And it has i18n support!',
		    ENG: 'English',
		    SPAN:'SPANIH',
		    DEU:'German',
		    ITA: 'Italy',
		    FRE:'FRANCE'
		  })
		  .translations('de', {
		    HEADLINE: 'Hey, das ist meine großartige App!',
		    INTRO_TEXT: 'Und sie untersützt mehrere Sprachen!',
		    ENG: 'fdf',
		    SPAN:'SPdefddANIH',
		    DEU:'Gerdedeman',
		    ITA: 'Itadedly',
		    FRE:'FRANdedCE'
		  })
		  .translations('fr', {
			    HEADLINE: 'Hey, das ist meine großartige App!',
			    INTRO_TEXT: 'Und sie untersützt mehrere Sprachen!',
			    ENG: 'Anglais',
			    SPAN:'Espagnol',
			    DEU:'allemand',
			    ITA: 'italien',
			    FRE:'FRANdedCE'
			  }
		  );

	
	/*$translateProvider.useStaticFilesLoader({
	    prefix: 'locale-',
	    suffix: '.json'
	});
	$translateProvider.preferredLanguage('fr');*/
		  $translateProvider.preferredLanguage('en');
		  
  
    //set preferredLanguage
   // $translateProvider.preferredLanguage('en');
  })
.controller('NavbarCtrl', function ($scope, $location, Auth, $translate, $window,$cookieStore) {
	$scope.menu = [{
		'title': 'Home',
		'link': '/'
	}];

	$scope.isCollapsed = true;
	$scope.isLoggedIn = Auth.isLoggedIn;
	$scope.isAdmin = Auth.isAdmin;
	$scope.getCurrentUser = Auth.getCurrentUser;

	$scope.logout = function() {
		Auth.logout();
		$location.path('/login');
	};

	$scope.isActive = function(route) {
		return route === $location.path();
	};

	$scope.logoutActive = ''
		$scope.actionsActive = ''
			$scope.languageActive = ''

				$scope.toggleLogout = function(){
		if ($scope.logoutActive === '')
			$scope.logoutActive = 'active'
				else
					$scope.logoutActive = ''
	};

	$scope.toggleActions = function(){
		if ($scope.actionsActive === '')
			$scope.actionsActive = 'active'
				else
					$scope.actionsActive = ''
	};

	var flag = $cookieStore.get('flag');
	$scope.language=flag;
	
	var variable = $cookieStore.get('lan');
	 $translate.use(variable);
	 
	$scope.logOutMsg = "Are you sure you want to log out? test";
	$scope.btnYes = "Yes";
	$scope.btnNo = "No";

	
	
	$scope.toggleLanguage = function(){
		if ($scope.languageActive === '')
			$scope.languageActive = 'active'
				else
					$scope.languageActive = ''
	};

	

	$scope.changeLang = function(value,lan) {

	
			$scope.language = value;
			 $translate.use(lan);
			 
			 $cookieStore.put('flag',value);
			 $cookieStore.put('lan',lan);
			

			 $window.location.reload();
		
	};

});


