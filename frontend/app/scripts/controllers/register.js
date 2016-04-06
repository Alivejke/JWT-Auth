'use strict';

var RegisterCtrl = function ($scope, alert, auth) {
  $scope.submit = function() {
    auth.register($scope.email, $scope.password).then(function(res){
      alert('success', 'Account created.', 'Wellcome, ' + res.data.user.email + '.');
    }, function () {
      alert('warning', 'Error!', 'Something went wrong. Could not register.');
    });
  };
};

RegisterCtrl.$inject = ['$scope', 'alert', 'auth'];

angular.module('psJwtApp')
  .controller('RegisterCtrl', RegisterCtrl);
