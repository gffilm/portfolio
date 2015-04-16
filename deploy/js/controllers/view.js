'use strict';

// Registation controllers
myApp.controller('HeaderController',
    ['$scope', 'UserAccess', '$location', '$firebaseObject', '$firebaseArray', '$firebaseAuth', '$rootScope', '$routeParams', 'AUTH_EVENTS',
    function($scope, UserAccess, $location, $firebaseObject, $firebaseArray, $firebaseAuth, $rootScope, $routeParams, AUTH_EVENTS) {
    
    // Dom Loaded
    $scope.$on('$viewContentLoaded', function(event) {
        console.log('Content Loaded');
    });

    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

    $scope.getBrandRef = function () {
        return $rootScope.loggedIn ? $location.path('/hub') : $location.path('/login');
    };

}]); // Header controller