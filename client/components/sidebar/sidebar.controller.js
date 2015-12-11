'use strict';

angular.module('atpexpApp')
  .controller('SidebarCtrl', function ($scope, $location, Auth, settings,$http) {
    $scope.menu = [{
      'title': 'Dashboard',
      'link': '/',
      'icon': 'dashboard'
    },{
      'title': 'Market',
      'link': '/market',
      'icon': 'globe'
    },{
      'title': 'Risk',
      'link': '/risk',
      'icon': 'umbrella'
    },{
      'title': 'Company',
      'link': '/company',
      'icon': 'building-o'
    },{
      'title': 'Customer Portfolio',
      'link': '/customer-portfolio',
      'icon': 'search-plus'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentTeam = Auth.getCurrentTeam;
    
    $http.get('/api/team').success(function (teams) {
      $scope.teamList = teams
    })

 
    $scope.isActive = function(route) {
      // if route === '/admin'
      return route === $location.path();
    };
    $scope.slogan = settings.slogan;

    $scope.$watch('slogan.length', function (newValue, oldValue) {
      if (newValue !== oldValue)
        $scope.slogan = settings.slogan
    }, true);

  })
