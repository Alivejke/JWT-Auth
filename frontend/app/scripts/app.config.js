'use strict';

var configFunction = function ($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
    .state('home', {
      url : '/',
      templateUrl: '/views/main.html'
    })
    .state('jobs', {
      url : '/jobs',
      templateUrl: '/views/jobs.html',
      controller: 'JobsCtrl'
    })
    .state('register', {
      url : '/register',
      templateUrl: '/views/register.html',
      controller: 'RegisterCtrl'
    })
    .state('login', {
      url : '/login',
      templateUrl: '/views/login.html',
      controller: 'LoginCtrl'
    })
    .state('logout', {
      url : '/logout',
      controller: 'LogoutCtrl'
    });

  $urlRouterProvider.otherwise('/');

  $httpProvider.interceptors.push('authInterceptor');

};

configFunction.$inject=['$stateProvider', '$urlRouterProvider', '$httpProvider'];

angular.module('psJwtApp')
  .config(configFunction)
  .constant('API_URL', 'http://jwt.ace.lan:3000/');
