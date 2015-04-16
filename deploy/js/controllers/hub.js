'use strict';

// Registation controllers
myApp.controller('HubController', ['$scope', '$location', function($scope, $location) {
    $scope.$on('$viewContentLoaded', function(event) {
    console.log('Content Loaded');
  });
}]);
