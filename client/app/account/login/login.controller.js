angular.module('atpexpApp')
  .controller('LoginCtrl', function ($scope,$location,Auth,$rootScope,$http) {
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
          //after scuccessfull authentication - store the team object at rootScope level
          $http.get('/api/team/me').success( function (team){
          $rootScope.team = team;
          });          
          // Logged in, redirect to home
          $location.path('/');
          
        })
        .catch( function(err) {
          $scope.showErrorMessage=true;     
          $scope.errors = err.message;
        });
      }
      else{
        $scope.showErrorMessage=true;     
          $scope.errors = 'Please provide valid email and password.';
      }
    };
   
  });
