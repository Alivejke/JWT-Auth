'use strict';

var auth = function ($http, API_URL, authToken, $state) {
  function successful(res) {
    authToken.setToken(res.token);
    $state.go('home');
  }
  this.login = function (email, password) {
    return $http
      .post(API_URL + 'login', {
        email:email,
        password:password
      }).success(successful);
  };
  this.register = function (email, password) {
    return $http
      .post(API_URL + 'register', {
        email:email,
        password:password
      }).success(successful);
  };
};

auth.$inject = ['$http', 'API_URL', 'authToken', '$state'];

angular.module('psJwtApp')
  .service('auth', auth);
