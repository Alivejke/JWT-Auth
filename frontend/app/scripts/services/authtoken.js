'use strict';

var authToken = function ($window) {
  var storage = $window.localStorage,
      userToken = 'userToken',
      cachedToken;
  var authToken = {
    setToken: function (token) {
      cachedToken = token;
      storage.setItem(userToken, token);
    },
    getToken: function () {
      if(!cachedToken) {
        cachedToken = storage.getItem(userToken);
      }
      return cachedToken;
    },
    isAuthenticated : function () {
      return !!authToken.getToken();
    },
    removeToken: function () {
      cachedToken = null;
      storage.removeItem(userToken);
    }
  };
  return authToken;
};

authToken.$inject = ['$window'];

angular.module('psJwtApp')
  .factory('authToken', authToken);
