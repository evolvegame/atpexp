'use strict';

describe('Controller: CustomerPortfolioCtrl', function () {

  // load the controller's module
  beforeEach(module('atpexpApp'));

  var CustomerPortfolioCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CustomerPortfolioCtrl = $controller('CustomerPortfolioCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
