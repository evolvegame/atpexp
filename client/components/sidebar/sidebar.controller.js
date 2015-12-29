'use strict';

angular.module('atpexpApp')
  .controller('SidebarCtrl', function ($scope,$rootScope, $location, Team,Auth, settings, Upload,toastr,$window,$http,$translate) {

    $rootScope.$on('$translateChangeSuccess', function () {
      $scope.errWrongFile = $translate.instant('Error1');
      $scope.dashboardName=$translate.instant('Dashboard');
      $scope.menu = [{
        'title': $scope.dashboardName,
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
      console.log("Error--"+$scope.errWrongFile);
      console.log("Dashboard--"+$scope.dashboardName);
    });
    $scope.dash=$scope.dashboardName;

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

    $http.get('/api/team/me').success( function (team){
    $rootScope.team = team;
    });

    function refreshAvatar(){
        $http.get('/api/team/me').success( function (team){
        $rootScope.team = team;
        });
    }



    $scope.isActive = function(route) {
      // if route === '/admin'
      return route === $location.path();
    };
    $scope.slogan = settings.slogan;

    $scope.$watch('slogan.length', function (newValue, oldValue) {
      if (newValue !== oldValue)
        $scope.slogan = settings.slogan
    }, true);



    //temporary Solution to refresh model object
    function reloadPage(){ $window.location.reload(); }


    // upload avatar function start
    $scope.uploadAvatar = function (file) {
      var error =false;

      if (file){
    //File extension validation
    if (! /\.(jpe?g|png)$/i.test(file.name) ) {

     console.log("errorValue - "+$scope.errWrongFile)
     toastr.error ($scope.errWrongFile);
     error =true;
   }

    //File Size validation
    if ((file.size/1024 )>500) {
     toastr.error ('Error : Your image is too heavy. Please make sure the image size is below 500kb. Perhaps you can make your image smaller.');
     error =true;
   }

    //File dimention validation
    Upload.imageDimensions(file).then(function(dimensions){
      console.log('--->',dimensions.width, dimensions.height);
      if (!(dimensions.width <500 && dimensions.height < 500) ) {
       toastr.error ('Error : Your image is to big. Please make your image smaller so that we can upload the file to your profile.');
       error =true;
     }

   });

    if (!error){
      Upload.upload({
        url: '/api/team/avatar',
        data: {file: file}
      }).then(function (resp) {
       toastr.success ('You successfully uploaded your team avatar!');
       console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
       refreshAvatar();
     }, function (resp) {
      toastr.success ('Error:'+resp.status);
      console.log('Error status: ' + resp.status);
    }, function (evt) {
      var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      });

    }

  }
};

// upload avatar function end

  }) //SidebarCtrl End
