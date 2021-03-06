'use strict';

module.exports = function(app) {
  app.controller('notesCtrl', ['$scope', '$http', 'ResourceBackend', '$cookies', '$location', function($scope, $http, ResourceBackend, $cookies, $location) {
    var notesBackend = new ResourceBackend('notes');
    if(!$cookies.jwt || $cookies.length > 0) return $location.path('/users');

    $http.defaults.headers.common.jwt = $cookies.jwt;
    $scope.newName = $cookies.name;

    $scope.index = function() {
      notesBackend.index()
      .success(function(data) {
        $scope.notes = data;
      });
    };

   $scope.saveNewNote = function(newNote) {
    var time;
    time = new Date();
        newNote.time = time.toLocaleTimeString();
        newNote.month = time.getMonth();
        newNote.date =time.getDate();
        console.log(newNote);
        newNote.name = $cookies.name;
    notesBackend.saveNew(newNote)
      .success(function(data) {
        $scope.notes.push(data);
        $scope.newNote = null;
      });
    };


  $scope.saveNote = function(note) {
      notesBackend.save(note)
      .success(function() {
        note.editing = false;
      });
    };

    $scope.deleteNote = function(note) {
      notesBackend.delete(note)
      .success(function() {
        $scope.notes.splice($scope.notes.indexOf(note), 1);
      });
    };
  }]);
};
