'use strict';

angular.module('atpexpApp')
.controller('SidebarCtrl', function ($scope,$rootScope, $location, Team,Auth, settings, Upload,toastr,$window,$http,$translate) {



	//on language change 
	$rootScope.$on('$translateChangeSuccess', function () {
		$scope.errWrongFile = $translate.instant('sidebar.imageUpload.errWrongFile');
		$scope.errHeavyImage = $translate.instant('sidebar.imageUpload.errHeavyImage');
		$scope.errBigImage = $translate.instant('sidebar.imageUpload.errBigImage');
		$scope.successMsg = $translate.instant('sidebar.imageUpload.successMsg');
		$scope.successMsgErr = $translate.instant('sidebar.imageUpload.successMsg-error');
		$scope.dashboardName=$translate.instant('sidebar.Dashboard');
		$scope.market=$translate.instant('sidebar.Market');
		$scope.risk=$translate.instant('sidebar.Risk');
		$scope.company=$translate.instant('sidebar.Company');
		$scope.customerportfolio=$translate.instant('sidebar.Customer-Portfolio');
		$scope.menu = [{
			'title': $scope.dashboardName,
			'link': '/main',
			'icon': 'dashboard'
		},{
			'title':  $scope.market,
			'link': '/market',
			'icon': 'globe'
		},{
			'title':  $scope.risk,
			'link': '/risk',
			'icon': 'umbrella'
		},{
			'title':  $scope.company,
			'link': '/company',
			'icon': 'building-o'
		},{
			'title':   $scope.customerportfolio,
			'link': '/customer-portfolio',
			'icon': 'search-plus'
		}];
		console.log("Error--"+$scope.errWrongFile);
		console.log("Dashboard--"+$scope.dashboardName);
	});
	$scope.dash=$scope.dashboardName;

//	on load change language as per flag    
	$scope.errWrongFile = $translate.instant('sidebar.imageUpload.errWrongFile');
	$scope.errHeavyImage = $translate.instant('sidebar.imageUpload.errHeavyImage');
	$scope.errBigImage = $translate.instant('sidebar.imageUpload.errBigImage');
	$scope.successMsg = $translate.instant('sidebar.imageUpload.successMsg');
	$scope.successMsgErr = $translate.instant('sidebar.imageUpload.successMsg-error');
	$scope.dashboardName=$translate.instant('sidebar.Dashboard');
	$scope.market=$translate.instant('sidebar.Market');
	$scope.risk=$translate.instant('sidebar.Risk');
	$scope.company=$translate.instant('sidebar.Company');
	$scope.customerportfolio=$translate.instant('sidebar.Customer-Portfolio');

	$scope.menu = [{
		'title': $scope.dashboardName,
		'link': '/main',
		'icon': 'dashboard'
	},{
		'title':  $scope.market,
		'link': '/market',
		'icon': 'globe'
	},{
		'title':  $scope.risk,
		'link': '/risk',
		'icon': 'umbrella'
	},{
		'title':  $scope.company,
		'link': '/company',
		'icon': 'building-o'
	},{
		'title':   $scope.customerportfolio,
		'link': '/customer-portfolio',
		'icon': 'search-plus'
	}];
	$scope.menu = [{
		'title':  $scope.dashboardName,
		'link': '/main',
		'icon': 'dashboard'
	},{
		'title':  $scope.market,
		'link': '/market',
		'icon': 'globe'
	},{
		'title': $scope.risk,
		'link': '/risk',
		'icon': 'umbrella'
	},{
		'title': $scope.company,
		'link': '/company',
		'icon': 'building-o'
	},{
		'title': $scope.customerportfolio,
		'link': '/customer-portfolio',
		'icon': 'search-plus'
	}];

	$scope.isCollapsed = true;
	$scope.isLoggedIn = Auth.isLoggedIn;
	$scope.isAdmin = Auth.isAdmin;
	$scope.getCurrentTeam = Auth.getCurrentTeam;

	$http.get('/api/team/me').success( function (team){
		$rootScope.team = team;
	});

	function refreshAvatar(){
		$http.get('/api/team/me').success( function (team){
			$rootScope.team = team;
		});
	}



	$scope.isActive = function(route) {
		// if route === '/admin'
		return route === $location.path();
	};
	$scope.slogan = settings.slogan;

	$scope.$watch('slogan.length', function (newValue, oldValue) {
		if (newValue !== oldValue)
			$scope.slogan = settings.slogan
	}, true);



	//temporary Solution to refresh model object
	function reloadPage(){ $window.location.reload(); }


	// upload avatar function start
	$scope.uploadAvatar = function (file) {
		var error =false;

		if (file){
			//File extension validation
			if (! /\.(jpe?g|png)$/i.test(file.name) ) {

				console.log("errorValue - "+$scope.errWrongFile)
				toastr.error ($scope.errWrongFile);
				error =true;
			}

			//File Size validation
			console.log('File Size'+file.size);
			if ((file.size/1024 )>500) {
				toastr.error ($scope.errHeavyImage);
				error =true;
			}

			//File dimention validation
			Upload.imageDimensions(file).then(function(dimensions){
				console.log('--->',dimensions.width, dimensions.height);
				if (!(dimensions.width <500 && dimensions.height < 500) ) {
					toastr.error ($scope.errBigImage);
					error =true;
				}
				
				if (!error){
				Upload.upload({
					url: '/api/team/avatar',
					data: {file: file}
				}).then(function (resp) {
					toastr.success ($scope.successMsg);
					console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
					refreshAvatar();
				}, function (resp) {
					toastr.error ($scope.successMsgErr+resp.status);
					console.log('Error status: ' + resp.status);
				}, function (evt) {
					var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
					//console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
				});

			}
			});

			

		}
	};

//	upload avatar function end

}) //SidebarCtrl End
