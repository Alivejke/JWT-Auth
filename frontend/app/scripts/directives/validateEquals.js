'use strict';

var link = function(scope, element, attrs, ngModelCtrl) {
  function validateEqual(value) {
    var valid = (value === scope.$eval(attrs.validateEquals));
    ngModelCtrl.$setValidity('equal', valid);
    return value ? valid : undefined;
  }

  ngModelCtrl.$parsers.push(validateEqual);
  ngModelCtrl.$formatters.push(validateEqual);

  scope.$watch(attrs.validateEquals, function () {
    ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
  });
};

link.$inject = ['$scope', '$element', '$attrs', '$ngModelCtrl'];

var validateEquals = function () {
  return {
    require: '^ngModel',
    link:link
  };
};

validateEquals.$inject = [];

angular.module('psJwtApp')
  .directive('validateEquals', validateEquals);
