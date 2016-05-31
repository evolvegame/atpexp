'use strict';
angular.module('atpexpApp')
.controller('NavbarCtrl', function ($scope,$rootScope, $location, Auth, $translate, $window,$cookieStore,localeservice, Round, Team, $http) {
	$scope.menu = [{
		'title': 'Home',
		'link': '/'
	}];
	
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
	
	Round.currentRound(function(round){
		$rootScope.roundNumber = round.round;
		$rootScope.pendingTasks = 0;
		Team.notificationInformation({id:0}).$promise.then(function(notificationObject){
			$rootScope.notifications = notificationObject.contents;
			if(typeof(notificationObject) != 'undefined' && typeof(notificationObject.contents) == 'undefined'){
				for (var i = 0 ; i < notificationObject.contents.length; i++) {
					if(notificationObject.contents[i].status == 'false') {
						$rootScope.pendingTasks = $rootScope.pendingTasks + 1;
					}
				}
			}
		});
	});

	$scope.isCollapsed = true;
	$scope.isLoggedIn = Auth.isLoggedIn;
	$scope.isAdmin = Auth.isAdmin;
	$scope.getCurrentUser = Auth.getCurrentUser;

	$scope.logout = function() {
		$http.get('/api/team/N/isLoggedInFlag').success(function(err){
            if (err) console.log('Error in updating is LoggedIn Flag'+err);
			Auth.logout();
			$location.path('/login');
			$rootScope.collapseSideBarActive = 'fa fa-dedent';
			$rootScope.sideBar = false;
			$rootScope.pageContainerClass = 'page-container-login';
			$rootScope.pageContentClass = 'page-content-login';
			console.log('Successfully update Login Flag');
       });
	};

	$scope.isActive = function(route) {
		return route === $location.path();
	};

	$scope.logoutActive = ''
		$scope.actionsActive = ''
			$scope.languageActive = ''

				$scope.toggleLogout = function(){
		if ($scope.logoutActive === '')
			$scope.logoutActive = 'active'
				else
					$scope.logoutActive = ''
	};

	$scope.toggleActions = function(){
		if ($scope.actionsActive === '')
			$scope.actionsActive = 'active'
				else
					$scope.actionsActive = ''
	};
	
	$rootScope.toggleCollapseSideBar = function() {
		if ($rootScope.collapseSideBarActive == 'fa fa-dedent') {
			$rootScope.collapseSideBarActive = 'fa fa-indent';
			$rootScope.sideBar = true;
			$rootScope.pageContainerClass = 'page-container';
			$rootScope.pageContentClass = 'page-content';
			console.log('Reset the classes');
		} else {
			$rootScope.collapseSideBarActive = 'fa fa-dedent';
			$rootScope.sideBar = false;
			$rootScope.pageContainerClass = 'page-container-wide';
			$rootScope.pageContentClass = 'page-content-header';
			console.log('Reset the classes in else');
		}
	}

	var flag = $cookieStore.get('flag');
	var variable = $cookieStore.get('lan');
	if(flag===undefined || variable ===undefined){
		flag='flag flag-gb';
		variable='English';
		$cookieStore.put('lan',variable);
		$cookieStore.put('flag',flag);

	}
	$scope.language=flag;
	localeservice.setLocaleByDisplayName(variable);


	console.log("Language is "+variable);
	console.log("flag is "+flag);



	$scope.toggleLanguage = function(){
		if ($scope.languageActive === '')
			$scope.languageActive = 'active'
				else
					$scope.languageActive = ''
	};



	$scope.changeLang = function(value,lan) {
		  console.log(value);
			console.log(lan);
			$scope.language = value;
			localeservice.setLocaleByDisplayName(lan);
			$cookieStore.put('flag',value);
			$cookieStore.put('lan',lan);
			console.log("Values is -- "+$rootScope.errWrongFile);
};

});
