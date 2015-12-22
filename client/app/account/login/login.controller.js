angular.module('atpexpApp')
  .controller('LoginCtrl', function ($scope, Auth, $location,$window) {
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
          reloadPage();
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

    //temporary Solution to refresh model object later this will be replaced using server push
    function reloadPage(){ $window.location.reload(); }

  });
