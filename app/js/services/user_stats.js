'use strict';
module.exports = function(app) {
  app.factory('status', ['$location', '$cookies', '$http', '$base64', function($location, $cookies, $http, $base64) {
    return {
      signOut : function() {
        delete $cookies.jwt;
        $location.path('/users');
      },

      newB : function() {
        delete $cookies.name;
        document.location.reload(true);
      },

      signIn : function(email, password) {
        $http.defaults.headers.common.Authorization = 'Basic ' + $base64.encode(email + ':' + password);
        return $http({
          method: 'GET',
          url: '/api/users'
        })
        .success(function(data) {
          $cookies.jwt = data.jwt;
          $location.path('/notes');
        })
        .error(function(data) {
        console.log(data);
      });
      },

      signUp : function(newUser) {
        return $http({
          method: 'POST',
          url: 'api/users',
          data: newUser,
        })
        .success(function(data) {
          $cookies.jwt = data.jwt;
          $cookies.name = newUser.name;
          $location.path('/notes');
        });
      },
    };
  }]);
};
