'use strict';
angular.module('atpexpApp')
.controller('NavbarCtrl', function ($scope,$rootScope, $location, Auth, $translate, $window,$cookieStore,localeservice) {
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
			localeservice.setLocaleByDisplayName(lan);
			$cookieStore.put('flag',value);
			$cookieStore.put('lan',lan);
			console.log("Values is -- "+$rootScope.errWrongFile);
};

});
