'use strict';

describe('Controller: CustomerPoolCtrl', function () {

  // load the controller's module
  beforeEach(module('atpexpApp'));

  var CustomerPoolCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CustomerPoolCtrl = $controller('CustomerPoolCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
