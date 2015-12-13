'use strict';

angular.module('atpexpApp')
.controller('NavbarCtrl', function ($scope, $location, Auth) {
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

	$scope.language="flag flag-gb";
	$scope.logOutMsg = "Are you sure you want to log out? test";
	$scope.btnYes = "Yes";
	$scope.btnNo = "No";

	$scope.toggleLanguage = function(){
		if ($scope.languageActive === '')
			$scope.languageActive = 'active'
				else
					$scope.languageActive = ''
	};



	$scope.changeLang = function(value) {

		var eng = {lan:"Are you sure you want to log out?", y:"Yes", n:"No"}; 
		var spa = {lan:"¿Seguro que quieres salir?", y:"sí", n:"Sin"}; 

		var lan = value;
		if(value === 'flag flag-gb')
		{

			$scope.language = lan;
			var test = eng;
			$scope.logOutMsg = test.lan;
			$scope.btnYes = test.y;
			$scope.btnNo = test.n;
			$location.reload(forceGet);
		}
		if(value === 'flag flag-es')
		{
			$scope.language = lan;
			var test = spa;
			$scope.logOutMsg = test.lan;
			$scope.btnYes = test.y;
			$scope.btnNo = test.n;
			$location.reload(forceGet);
		}
		else 
		{
			$scope.language = lan;
		}
	};

});


