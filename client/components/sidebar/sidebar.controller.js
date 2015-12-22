'use strict';

angular.module('atpexpApp')
  .controller('SidebarCtrl', function ($scope, $location, Team,Auth, settings, Upload,toastr,$window,$http) {
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
    $scope.avatar = team.picture;
    });


   
       
           
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
     toastr.error ('Error : The selected file is not a valid image. Please select an image file like JPG or PNG.');
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
       reloadPage();
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
