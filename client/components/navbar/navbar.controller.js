'use strict';
angular.module('atpexpApp')
.controller('NavbarCtrl', function ($scope,$rootScope, $location, Auth, $translate, $window,$cookieStore,localeservice, Round, Team) {
	$scope.menu = [{
		'title': 'Home',
		'link': '/'
	}];
	
	Round.currentRound(function(round){
		$rootScope.roundNumber = round.round;
		
		$rootScope.makeOfferClass = 'icheckbox_minimal-grey checked';
		$rootScope.manageRiskClass = 'icheckbox_minimal-grey checked';
		$rootScope.companyInvestmentClass = 'icheckbox_minimal-grey checked';
		$rootScope.pendingTasks = 3;
		
		$rootScope.getCurrentTeam = Auth.getCurrentTeam;
		Team.notificationInformation({id:0}).$promise.then(function(notificationObject){
			console.log('Notification received from db -- ' + JSON.stringify(notificationObject));
			$rootScope.makeOfferClass = notificationObject.numberOffers == 0 ?  'icheckbox_minimal-grey checked' : 'icheckbox_minimal-grey';
			$rootScope.manageRiskClass = notificationObject.numOfRiskStrategies == 0 ? 'icheckbox_minimal-grey checked' : 'icheckbox_minimal-grey';
			$rootScope.companyInvestmentClass = notificationObject.numOfProjects == 0 ? 'icheckbox_minimal-grey checked' : 'icheckbox_minimal-grey';
			$rootScope.pendingTasks = notificationObject.numberOffers == 0 ? $rootScope.pendingTasks : $rootScope.pendingTasks - 1;
			$rootScope.pendingTasks = notificationObject.numOfRiskStrategies == 0 ? $rootScope.pendingTasks : $rootScope.pendingTasks - 1;
			$rootScope.pendingTasks = notificationObject.numOfProjects == 0 ? $rootScope.pendingTasks : $rootScope.pendingTasks - 1;
		});
	});

	$scope.isCollapsed = true;
	$scope.isLoggedIn = Auth.isLoggedIn;
	$scope.isAdmin = Auth.isAdmin;
	$scope.getCurrentUser = Auth.getCurrentUser;

	$scope.logout = function() {
		Auth.logout();
		$location.path('/login');
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
