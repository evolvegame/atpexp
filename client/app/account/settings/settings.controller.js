'use strict';

angular.module('atpexpApp')
  .controller('SettingsCtrl', function ($scope, Team, Auth, toastr,$http) {
    $scope.errors = {};

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
          toastr.success ('Password successfully changed');
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
    //$scope.members = Auth.getCurrentUser().members;
    $scope.teamName = Auth.getCurrentTeam().name; 

    $scope.saveTeam = function (form) {
      console.log ($scope.slogan);

      Auth.teamSettings($scope.slogan, $scope.members)
      .then(function() {
        toastr.success('Save team settings to the database.', 'Saved!');
      })
      .catch(function() {
        $scope.errors.other = 'Incorrect team settings'
      })
    };

    
$http.get('/api/team').success(function (teams) {
      $scope.teamList = teams
    })

 

    
  })
