'use strict';

angular.module('atpexpApp')
  .controller('MiniDashCtrl', function ($scope,$http,$rootScope) {
    
    $scope.exampleData = [
       {
           "key": "Capital",
           "values": [['Round 1',1],['Round 2',2],['Round 3',3],['Round 4',4],['Round 5',5],['Round 6',6],['Round 7',7],['Round 8',8]]
       }
    ];

    $scope.xAxisTickFormatFunction = function(){
        return function(d){
            return d3.time.format('%b')(new Date(d));
        }
    }

    $scope.chartColor = ['#5cb85c','#5cb85c','#5cb85c','#5cb85c','#5cb85c','#5cb85c','#5cb85c','#5cb85c']
    $scope.colorFunction = function() {
      return function(d, i) {
          return $scope.chartColor[i];
      };

    }

  });