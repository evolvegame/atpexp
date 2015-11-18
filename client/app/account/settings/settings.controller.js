'use strict';

angular.module('atpexpApp')
  .controller('SettingsCtrl', function ($scope, User, Auth, toastr) {
    $scope.errors = {};

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
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

    $scope.team = Auth.getCurrentUser;
    $scope.members = Auth.getCurrentUser().members

    // $scope.$watch('team.slogan',function () {
    //     console.log('$scope.team changed: ', $scope.team)
    // })

    $scope.saveTeam = function (form) {
      Auth.teamSettings($scope.team().slogan, $scope.members)
      .then(function() {
        toastr.success('Save team settings to the database.', 'Saved!');
      })
      .catch(function() {
        $scope.errors.other = 'Incorrect team settings'
      })
    }
    
  })
