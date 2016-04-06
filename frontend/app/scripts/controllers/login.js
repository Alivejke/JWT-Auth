'use strict';

var LoginCtrl = function ($scope, alert, auth) {
  $scope.submit = function() {
    auth.login($scope.email, $scope.password).then(function(res){
      alert('success', 'You are loged in.', 'Wellcome, ' + res.data.user.email + '.');
    }, function (err) {
      alert('warning', 'Error!', err.data.message);
    });
  };
};

LoginCtrl.$inject = ['$scope', 'alert', 'auth'];

angular.module('psJwtApp')
  .controller('LoginCtrl', LoginCtrl);
