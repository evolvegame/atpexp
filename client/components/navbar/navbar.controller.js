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

    $scope.toggleLanguage = function(){
      if ($scope.languageActive === '')
        $scope.languageActive = 'active'
      else
        $scope.languageActive = ''
    };
	
	
	
	$scope.changeLang = function(value) {
	
	var lan = value;
	$scope.language = lan;
	};
	
  });
