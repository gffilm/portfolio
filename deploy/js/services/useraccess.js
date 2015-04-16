'use strict';

// Authentication service
myApp.service('UserAccess',
    ['$firebaseObject', '$firebaseArray', '$firebaseAuth', '$rootScope', '$routeParams', '$location', 'AUTH_EVENTS',
    function($firebaseObject, $firebaseArray, $firebaseAuth, $rootScope, $routeParams, $location, AUTH_EVENTS) {

    // Get the Firebase API
    var fbRef = new Firebase(FIREBASE_URL + 'users'),
        fbUsersAuth = $firebaseAuth(fbRef),
        authData = fbRef.getAuth(),
        userId = null,
        authDataCallback = angular.bind(this, function(authData) {
            if (authData) {
                $rootScope.loggedIn = true;
            } else {
                console.log('logged off');
                $rootScope.loggedIn = false;
                $location.path('/login');
            }
        });
        
    // Event handler for login success
    $rootScope.$on(AUTH_EVENTS.login, angular.bind(this, function(event) {
        console.log('User was just logged in');
        $rootScope.loggedIn = true;
    }));

    if (authData) {
        $rootScope.loggedIn = true;
    }

    fbRef.onAuth(authDataCallback);

    // Logs in
    this.login = function(userData, callback) {
        fbUsersAuth.$authWithPassword(userData).then(function() {
            if (callback) {
                callback();
            }
        }).catch(function(error) {
          alert(error);
        });
    }; // login

    this.logout = function() {
        fbRef.unauth();
        $rootScope.$broadcast(AUTH_EVENTS.logout);
        $location.path('/login');
    }; // logout

}]); // UserAccess

