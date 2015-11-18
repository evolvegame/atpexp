'use strict';

describe('Service: Market', function () {

  // load the service's module
  beforeEach(module('atpexpApp'));

  // instantiate service
  var Market;
  beforeEach(inject(function (_Market_) {
    Market = _Market_;
  }));

  it('should do something', function () {
    expect(!!Market).toBe(true);
  });

});
