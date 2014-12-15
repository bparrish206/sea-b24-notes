require('angular/angular');
require('angular-route');
require('angular-cookies');
require('angular-base64');

var notesApp = angular.module('notesApp', ['ngRoute', 'ngCookies', 'base64']);

//users
require('./users/users')(notesApp);
//directives
require('./directives/dummy_direc')(notesApp);
require('./directives/new_note_form_direc')(notesApp);

//services
require('./services/resource_backend_service')(notesApp);

//controller
require('./controllers/notes_controller')(notesApp);

notesApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/notes', {
    templateUrl: 'templates/notes/notes_template.html',
    controller: 'notesCtrl'
  })
  .when('/users', {
    templateUrl: 'templates/users/users_view.html',
    controllers: 'UsersCtrl'
  })
  .otherwise({
    redirectTo: '/users'
  });
}]);
