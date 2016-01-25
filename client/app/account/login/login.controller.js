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
          //after scuccessfull authentication - store the miniDashboard info at rootScope level
          $http.get('/api/team/0/miniDashboardInfo').success( function (miniDashboardInfo){
            $rootScope.miniDashboardInfo=miniDashboardInfo; 
            console.log('miniDashboardInfo: '+JSON.stringify(miniDashboardInfo) );                        
          //Logged in, redirect to company screen
            $location.path('/company');
          }).error(function (error){
            console.log('Error :retriveing miniDashboard info');
          });
          });
                  
        
          
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
