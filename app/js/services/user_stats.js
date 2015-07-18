'use strict';
module.exports = function(app) {
  app.factory('status', ['$location', '$cookies', '$http', '$base64', function($location, $cookies, $http, $base64) {
    return {
      signOut : function() {
        this.status = 'Out';
        delete $cookies.jwt;
        $location.path('/users');
      },

      signIn : function(email, password) {
        $http.defaults.headers.common.Authorization = 'Basic ' + $base64.encode(email + ':' + password);
        this.status = 'In';
        return $http({
          method: 'GET',
          url: '/api/users'
        })
        .success(function(data) {
          $cookies.jwt = data.jwt;
          $location.path('/notes');
        });
      },

      signUp : function(newUser) {
        this.status = 'In';
        return $http({
          method: 'POST',
          url: 'api/users',
          data: newUser,
        })
        .success(function(data) {
          $cookies.jwt = data.jwt;
          $location.path('/notes');
        });
      },

      status : 'Out'
    };
  }]);
};
