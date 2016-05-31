'use strict';

describe('Controller: MarketCtrl', function () {

  // load the controller's module
  beforeEach(module('atpexpApp'));

  var MarketCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MarketCtrl = $controller('MarketCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
