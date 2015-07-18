'use strict';

module.exports = function(app) {
  app.controller('UsersCtrl', ['status', '$scope', '$base64', function(status, $scope, $base64){

    $scope.signIn = function() {
      $scope.errors = [];
      status.signIn($scope.user.email, $scope.user.password)
      .error(function(data) {
        $scope.errors.push(data);
      });
    };

    $scope.signUp = function() {
      $scope.errors = [];
      if ($scope.newUser.password !== $scope.newUser.passwordConfirmation) $scope.errors.push({msg: 'password and confirmation did not match'});
      if (!$scope.newUser.email) $scope.errors.push({msg: 'did note specify a email'});

      if ($scope.errors.length) return;

      $scope.newUser.email = $base64.encode($scope.newUser.email);
      $scope.newUser.password = $base64.encode($scope.newUser.password);

      status.signUp($scope.newUser)
      .error(function(data) {
        $scope.errors.push(data);
      });
    };
  }]);
};
