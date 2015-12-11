'use strict';

angular.module('atpexpApp')
	.directive('fileModel', ['$parse', function ($parse) {
            return {
               restrict: 'A',
               link: function(scope, element, attrs) {
                  var model = $parse(attrs.fileModel);
                  var modelSetter = model.assign;
                  
                  element.bind('change', function(){
                     scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                     });
                  });
               }
            };
         }]);
 
 angular.module('atpexpApp')
  	.service('fileUpload', ['$http', function ($http) {
            this.uploadFileToUrl = function(file, uploadUrl){
               var fd = new FormData();
               fd.append('file', file);
            
               $http.post(uploadUrl, fd, {
                  transformRequest: angular.identity,
                  headers: {'Content-Type': undefined}
               })
            
               .success(function(){
               })
            
               .error(function(){
               });
            }
         }]);
angular.module('atpexpApp')
	.directive('modal', function () {
    return {
      template: '<div class="modal fade">' + 
          '<div class="modal-dialog">' + 
            '<div class="modal-content">' + 
              '<div class="modal-header">' + 
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
                '<h4 class="modal-title">{{ title }}</h4>' + 
              '</div>' + 
              '<div class="modal-body" ng-transclude></div>' + 
            '</div>' + 
          '</div>' + 
        '</div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope:true,
      link: function postLink(scope, element, attrs) {
        scope.title = attrs.title;

        scope.$watch(attrs.visible, function(value){
          if(value == true)
            $(element).modal('show');
          else
            $(element).modal('hide');
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
  }); 
angular.module('atpexpApp')
  .controller('SidebarCtrl', function ($scope, $location, Auth, settings, fileUpload) {
   $scope.showModal = false;
    $scope.toggleModal = function(){
        $scope.showModal = !$scope.showModal;
    };
    $scope.menu = [{
      'title': 'Dashboard',
      'link': '/',
      'icon': 'dashboard'
    },{
      'title': 'Market',
      'link': '/market',
      'icon': 'globe'
    },{
      'title': 'Risk',
      'link': '/risk',
      'icon': 'umbrella'
    },{
      'title': 'Company',
      'link': '/company',
      'icon': 'building-o'
    },{
      'title': 'Customer Portfolio',
      'link': '/customer-portfolio',
      'icon': 'search-plus'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    // $scope.slogan = Auth.getCurrentUser().slogan

    $scope.isActive = function(route) {
      // if route === '/admin'
      return route === $location.path();
    };
    $scope.slogan = settings.slogan;

    $scope.$watch('slogan.length', function (newValue, oldValue) {
      if (newValue !== oldValue)
        $scope.slogan = settings.slogan
    }, true);
	
	$scope.uploadFile = function(){
            
               var file = $scope.myFile;
              
               console.log('file is ' );
               console.dir(file);
               
               //var uploadUrl = "/fileUpload";
               var uploadUrl = "";
               fileUpload.uploadFileToUrl(file, uploadUrl);
       
     };
  })
