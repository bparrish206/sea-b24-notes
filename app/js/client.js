require('angular/angular');
require('angular-route');

var notesApp = angular.module('notesApp', ['ngRoute']);

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
  .otherwise({
    redirectTo: '/notes'
  });
}]);
