'use strict';

angular.module('atpexpApp')
  .controller('SettingsCtrl', function ($scope, Team, Auth, toastr,$http,$window,$rootScope,$translate) {
	  $scope.successMsg = $translate.instant('settings.change-password.success');
	  $rootScope.$on('$translateChangeSuccess', function () {
	      $scope.successMsg = $translate.instant('settings.change-password.success');
	    
	  });
    $scope.errors = {};

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
          toastr.success ($scope.successMsg);          
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
		};

    $scope.isCollapsedTeam = false;
    $scope.isCollapsedPassword = false;

    $scope.getCurrentTeam = Auth.getCurrentTeam;
    $scope.members = Auth.getCurrentTeam().members;
    $scope.teamName = Auth.getCurrentTeam().name; 

    $scope.saveTeam = function (form) {
      console.log ($scope.team.slogan);
      Auth.teamSettings($scope.team.slogan)
      .then(function() {
        toastr.success('Save team settings to the database.', 'Saved!');
        refresh();
      })
      .catch(function() {
        $scope.errors.other = 'Incorrect team settings'
      })
    };
 
    //temporary Solution to refresh model object later this will be replaced using server push
    function reloadPage(){ $window.location.reload(); }

    function refresh(){
        $http.get('/api/team/me').success( function (team){
        $rootScope.team = team;
        });
    }
    
  })
