'use strict';

var JobsCtrl = function($scope, $http, API_URL, alert) {
  $http.get(API_URL + 'jobs').then(function(res){
    $scope.jobs = res.data;
  },function(res){
    alert('warning', 'Unable to get jobs', res.data.message);
  });
};

JobsCtrl.$inject = ['$scope', '$http', 'API_URL', 'alert'];

angular.module('psJwtApp')
  .controller('JobsCtrl', JobsCtrl);
