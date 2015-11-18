'use strict';

angular.module('atpexpApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.tweet = '';
    $scope.twCounter = 140;

    $scope.$watch('tweet', function (tweet) {
      $scope.twCounter = (140 - tweet.length)
    });

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };
    
  });
