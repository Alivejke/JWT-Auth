'use strict';

describe('Controller: LogoutctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('psJwtApp'));

  var LogoutctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LogoutctrlCtrl = $controller('LogoutctrlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(LogoutctrlCtrl.awesomeThings.length).toBe(3);
  });
});
