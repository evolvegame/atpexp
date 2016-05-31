angular.module('atpexpApp')
  .controller('LoginCtrl', function ($scope,$location,Auth,$rootScope,$http, Round, Team) {
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
          console.log('before Calling isLoggedInFlag service');
          $http.get('/api/team/Y/isLoggedInFlag').success(function(err){
            if (err) console.log('Error in updating is LoggedIn Flag'+err);
            console.log('Successfully update Login Flag');
          });
          console.log('After Calling isLoggedInFlag service');
          
          $http.get('/api/team/me').success( function (team){
            $rootScope.team = team;
          });     
          //after scuccessfull authentication - store the miniDashboard info at rootScope level
          $http.get('/api/team/0/miniDashboardInfo').success( function (miniDashboardInfo){
        	  Round.currentRound(function(round){
        			$rootScope.roundNumber = round.round;
        			$rootScope.pendingTasks = 0;
        			Team.notificationInformation({id:0}).$promise.then(function(notificationObject){
        				$rootScope.notifications = notificationObject.contents;
        				if(typeof(notificationObject) != 'undefined' && typeof(notificationObject.contents) != 'undefined'){
        					for (var i = 0 ; i < notificationObject.contents.length; i++) {
            					if(notificationObject.contents[i].status == 'false') {
            						$rootScope.pendingTasks = $rootScope.pendingTasks + 1;
            					}
            				}	
        				}
        				
        				$rootScope.miniDashboardInfo=miniDashboardInfo; 
        	        	  //Logged in, redirect to company screen
        	        	$location.path('/company');
        	        	if ('/login' === $location.path()) {
        	        		$rootScope.collapseSideBarActive = 'fa fa-dedent';
        	        		$rootScope.sideBar = false;
        	        		$rootScope.pageContainerClass = 'page-container-login';
        	        		$rootScope.pageContentClass = 'page-content-login';
        	        		console.log('setting nav bar classss in if login true');
        	            } else{
        	        		$rootScope.collapseSideBarActive = 'fa fa-indent';
        	        		$rootScope.sideBar = true;
        	        		$rootScope.pageContainerClass = 'page-container';
        	        		$rootScope.pageContentClass = 'page-content';
        	        		console.log('setting nav bar classss in if login false');
        	            }
        			});
        		});
        	  
          }).error(function (error){
            console.log('Error :retriveing miniDashboard info');
          });
//          });
                  
        
          
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
