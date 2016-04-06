'use strict';

var LogoutCtrl = function (authToken, $state) {
  authToken.removeToken();
  $state.go('home');
};

LogoutCtrl.$inject = ['authToken', '$state'];

angular.module('psJwtApp')
  .controller('LogoutCtrl', LogoutCtrl);
