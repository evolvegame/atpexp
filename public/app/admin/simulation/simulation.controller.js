'use strict';
angular.module('atpexpApp')
  .controller('SimulationCtrl', function ($scope, $http, toastr) {
    $scope.tabs = [
      { title:'Dynamic Title 1', content:'Dynamic content 1' },
      { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: false }
    ];

    $scope.region = 'West-Europe';
    $scope.chartData = [];
    $scope.drag = 'drag';
    $scope.drop = 'drop';
    
    $http.get('/api/economy').success(function (economies) {
      $scope.chartData = economies;
      console.log('economies: ', economies)
    });

    $scope.$watch('chartData', function (data) {
      data = $scope.chartData
      console.log('data: ', data)
      $scope.chartConfig.series = []
      for (var i in data) {
        $scope.chartConfig.series.push({
          name: data[i].name,
          data: data[i].data,
          color: data[i].color,
          draggableY: data[i].draggableY,
          type: data[i].type,
          marker: {
            symbol: 'circle',
            enabled: data[i].marker,
            radius: 6,
            states: {
              hover: {
                enabled: data[i].hover
              }
            }
          },
          lineWidth: '3px',
          states: {
            hover: {
              enabled: data[i].hover,
              lineWidth: '3px'
            }
          },
          stickyTracking: false
        });
      }
    }, true);

    $scope.$watch('drag', function (round) {
      $scope.drag = round;
    });

    $scope.$watch('drop', function (newValue) {
      $http.get('/api/economy').success(function (economies) {
        var round = $scope.drag;
        var serie = economies[0].data;
        var oldValue = serie[round];
        var index = serie.indexOf(oldValue);
        if (index !== -1) {
            serie[index] = Number(newValue);
        };
        var updated = economies[0];
        $http.put('/api/economy/' + updated._id, updated);
        $scope.updateEconomy(round, newValue);
      })
    });

    $scope.updateEconomy = function (round, newValue) {
      console.log('chartData: ', $scope.chartData)
      $http.get('/api/economy/').success(function (economies) {
        for (var i in economies) {
          if (economies[i].code != 'control') {
            for (var j in economies[i].data) {
              if (j == round) {
                console.log('round: ', round)
                console.log('j: ', j)
                // var random = Math.random() + 1 ;
                // random *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
                // console.log(random)
                // var multiplier = newValue * random
                var min = (Number(newValue) - 0.5)
                var max = (Number(newValue) + 0.5)
                var multiplier = Math.random() * (max - min) + min;
                economies[i].data[j] = multiplier;
              }
            }
            console.log('formule: ', $scope.chartData)
          } else {
            for (var m in economies[i].data) {
              if (m == round) {
                economies[i].data[m] = Number(newValue)
              }
            }
          }
          $scope.chartData = economies;
          var updated = economies
          $http.put('/api/economy/' + updated[i]._id, updated[i]);
        }
      });
    };

    $scope.chartConfig = {
      options: {
        chart: {
          type: 'line'
        },
        xAxis: {
            categories: ['Round 1', 'Round 2', 'Round 3', 'Round 4', 'Round 5', 'Round 6', 'Round 7', 'Round 8']
        },
        colors: ['#7cb5ec', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'],
        plotOptions: {
          series: {
              cursor: 'ns-resize',
              point: {
                  events: {
                      drag: function (e) {
                          if (this.series.name == 'Control') {
                            // $scope.drag = this.category;
                            console.log('1: ', this.series.data.indexOf(this.point))
                            console.log('2: ', this.series.data)
                            console.log('3: ', this)
                            $scope.drag = this.series.data.indexOf(this)
                            $scope.$apply();
                          }
                      },
                      drop: function () {
                          if (this.series.name == 'Control') {
                            $scope.drop = Highcharts.numberFormat(this.y, 2);
                            $scope.serieName = this.series.name
                            toastr.success('New data point is saved in the database.', 'Saved!');
                            $scope.$apply();
                          }
                      }
                  }
              },
              stickyTracking: false
          },
          column: {
              stacking: 'normal'
          }
        }
      },
      series: [], 
      title: {
        text: $scope.region
      },
      credits: {
        enabled: false
      },
      loading: false,
      size: {}
    }

    $scope.reflow = function () {
      $scope.$broadcast('highchartsng.reflow');
      setTimeout(function () { 
        // $(element).highcharts().reflow(); 
        $scope.$broadcast('highchartsng.reflow');
      }, 0);
    }
});






