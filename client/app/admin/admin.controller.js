'use strict';

angular.module('atpexpApp')
  .controller('AdminCtrl', function ($scope, Admin, Round, $http, toastr) {
    Admin.rounds.query().$promise.then(function (rounds) {
      var currentRound = rounds.length - 1;
      $scope.engine = rounds[currentRound];
      if (rounds[currentRound].calculated) {
        $scope.colorCalculated = 'success'
      } else {
        $scope.colorCalculated = 'danger'
      }
      $scope.disabled = true;
    });

    $scope.nextRound = function (rounds) {
      var roundObj = {
        currentRound: rounds.currentRound + 1,
        calculated: false
      };
      var newRound = new Round(roundObj);
      newRound.$save(function (newRoundObj) {
        $scope.engine = newRoundObj;
      });
      $scope.colorCalculated = 'danger'
      toastr.info('New round, new chances.', 'Round ' + roundObj.currentRound + '!');
      $scope.disabled = true;
    }

    $scope.calculateRound = function (roundId) {
      Admin.rounds.query().$promise.then(function (rounds) {
        for (var round=0;round<rounds.length;round++) {
          if (rounds[round]._id == roundId) {
            var newRound = new Round;
            newRound.$update({ roundId: roundId });
            $scope.colorCalculated = 'success'
            if (rounds[round].calculated === false) {
              toastr.success('Another year has past...', 'Engine running!');
            } else {
              toastr.info('Round ' + rounds[round].currentRound + ' has been recalculated.', 'Updated!');
            }
          }
        }
      });
      $scope.disabled = false;
    };
  });