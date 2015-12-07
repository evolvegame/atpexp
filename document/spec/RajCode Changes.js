// Login Validation code changes



//CSS entry
.loginErrorText{
  color: red;
}


//login.html 
<!-- Validation Error message code Added   -->
<div class="loginErrorText" ng-show="showErrorMessage" ng-model="errors" >{{errors}}</div>


//login controller changes

'use strict';

angular.module('atrExpApp')
  .controller('LoginCtrl', function ($scope, Auth, $location) {
    $scope.user = {};
    $scope.errors = {};
    
    $scope.login = function(form) {
      $scope.submitted = true;
      $scope.showErrorMessage=false;    
      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          $scope.showErrorMessage=true;     
          $scope.errors = err.message;
        });
      }
    };

  });
