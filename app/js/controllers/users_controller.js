'use strict';

module.exports = function(app) {
  app.controller('UsersCtrl', ['status', '$scope', '$base64', '$cookies', function(status, $scope, $base64, $cookies){


    $scope.userName = $cookies.name;

    $scope.signOut = function() {
        status.signOut();
      };

    $scope.newB = function(){
      status.newB();
    };

    $scope.reruns = function() {
      status.reruns();
    };

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

        var txt = $scope.newUser.email;
        var vald = txt.indexOf('@');
        var vald2 = txt.indexOf('.');
        if(vald < 2 || vald2 < 2) {
          alert("This is not a valid email, try again.");
      }

      if ($scope.errors.length) return;
      var newName = $scope.newUser.name;
      //$scope.newUser.email = $base64.encode($scope.newUser.email);
      //$scope.newUser.password = $base64.encode($scope.newUser.password);
      status.signUp($scope.newUser)
      .error(function(data) {
        $scope.errors.push(data);
      });
    };
    console.log($cookies.name);
  }]);
};
