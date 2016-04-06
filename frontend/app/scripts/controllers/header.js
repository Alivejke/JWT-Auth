'use strict';

var HeaderCtrl = function ($scope, authToken) {
  $scope.isAuthenticated = authToken.isAuthenticated;
};

HeaderCtrl.$inject = ['$scope', 'authToken'];

angular.module('psJwtApp')
  .controller('HeaderCtrl', HeaderCtrl);
