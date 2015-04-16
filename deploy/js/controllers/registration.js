'use strict';

// Registation controller
myApp.controller('RegistrationController',
    ['$scope', 'UserAccess', '$location', '$firebaseObject', '$firebaseArray', '$firebaseAuth', '$rootScope', '$routeParams', 'AUTH_EVENTS',
    function($scope, UserAccess, $location, $firebaseObject, $firebaseArray, $firebaseAuth, $rootScope, $routeParams, AUTH_EVENTS) {
    
    // Dom Loaded
    $scope.$on('$viewContentLoaded', function(event) {
        console.log('Content Loaded');
    });

    $scope.userId = $rootScope.userId;

    // Get the Firebase API
    var fbRef = new Firebase(FIREBASE_URL + 'users'),
        fbUsersArray = $firebaseArray(fbRef),
        fbUsersObj = $firebaseObject(fbRef);


    // Event when users are loaded
    fbUsersArray.$loaded().then(function() {
        if (fbUsersArray.length) {
            $scope.hasRecords = true;
            $scope.users = fbUsersArray;    
        } else {
            $scope.users = [{
                'firstName': 'No Records',
                'lastName': 'No Records',
                'email': 'No Records',
                'date': 'No Records'
            }];
            $scope.hasRecords = false;
        }
    }).catch(function(error) {
        $scope.users = [{
            firstName: 'No Results',
            lastName: 'No Results',
            date: 'No Results',
            email: 'No Results'
        }];
    });

    // Login as the user
    $scope.login = function() {
        var userData = {
            email: $scope.user.email,
            password: $scope.user.password
        }, callback = function() {
            $location.path('/hub');
        }

        UserAccess.login(userData, callback);
    } // Login


    // Logout the user
    $scope.logout = function() {
        UserAccess.logout();
        $location.path('/login');
    } // Logout

    // Get the user info
    $scope.getUser = function(key) {
      return fbUsersArray.$getRecord(key);
    } // Get
    

    // Updates the user info
    $scope.updateUser = function(key) {
        alert(key);
    } // Update


    // Takes the user somewhere
    $scope.goTo = function(location) {
        $location.path('/' + location);
    } // Redirect


    // Deletes the user info
    $scope.deleteUser = function(user) {
        fbRef.removeUser({
          'email': user.email,
          'password': user.password
        }, function(error) {
            if (error) {
                console.log("Error removing user:", error);
                alert('Failed to delete user');
                return;
            }
            fbUsersArray.$remove(user).then(function(ref) {
                console.log('Deleted user');
                // Deleted
            }).catch(function(event) {
                console.log(event);
                alert('Failed to delete user');
            }); // remove user
        }); // removeUser callback function
    }; // Delete user

    // Creates a new user
    $scope.newUser = function() {
        var newUser = {
                'email': $scope.user.email,
                'password': $scope.user.password
            },
            userData = {
                'firstName': $scope.user.firstName,
                'lastName': $scope.user.lastName,
                'email': $scope.user.email,
                'password': $scope.user.password,
                'date': Firebase.ServerValue.TIMESTAMP
            };
        // create the fb authenticated user
        fbRef.createUser(newUser, function(error, user) {
            if (error) {
                switch (error.code) {
                    case 'EMAIL_TAKEN':
                        alert('The new user account cannot be created because the email is already in use.');
                        break;
                    case 'INVALID_EMAIL':
                        alert('The specified email is not a valid email.');
                        break;
                    default:
                        console.log('Error creating user:', error);
                        alert('Failed to create a new user');
                } // switch
                return;
            } // end error
            console.log('Successfully created user account');
            $scope.addUser(userData);
        }); // fbRef.createUser
    } // $scope.newUser

    $scope.addUser = function(userData) {
        // Get the uid from the authenticated user
        // Add custom user data into it's own object
        fbUsersArray.$add(userData).then(function() {
            $('#myModal').modal('show');
            // Callback once the modal is hidden
            $('#myModal').on('hidden.bs.modal', angular.bind(self, function() {
                $scope.goTo('login');
                $scope.$apply();
            }));
        }).catch(function(event) {
                console.log(event);
                alert('Failed to create a new user');
        }); // catch fn
    }

}]); // RegistrationController




// Edit controllers
myApp.controller('EditController',
    ['$scope', '$location', '$firebaseObject', '$firebaseArray', '$firebaseAuth', '$rootScope', '$routeParams', // These are used for compilation purposes
    function($scope, $location, $firebaseObject, $firebaseArray, $firebaseAuth, $rootScope, $routeParams) {
    
    // Dom Loaded
    $scope.$on('$viewContentLoaded', function(event) {
        console.log('Content Loaded');
    });
    // Edit the user info
    var userId = $routeParams.id,
        fbRef = new Firebase(FIREBASE_URL + 'users/' + userId),
        fbUserArray = $firebaseArray(fbRef),
        fbUserObj = $firebaseObject(fbRef);

    // Event when user is loaded
    fbUserObj.$loaded().then(function() {
        console.log(fbUserObj);
        if (fbUserObj.firstName) {
            $scope.user = fbUserObj;    
        } else {
            $scope.user = {
                'firstName': 'No Record for this id',
                'lastName': 'No Record for this id',
                'email': 'No Record for this id',
                'date': 'No Record for this id'
            };
            $scope.hasRecords = false;
        }
    }).catch(function(error) {
        $scope.users = [{
            firstName: 'No Results',
            lastName: 'No Results',
            date: 'No Results',
            email: 'No Results'
        }];
    });


    // Takes the user somewhere
    $scope.goTo = function(location) {
        $location.path('/' + location);
    } // Redirect


    $scope.editUser = function(user) {
        var userData = {
            'email': user.email,
            'password': user.password,
            'firstName': user.firstName,
            'lastName': user.lastName,
            'date': Firebase.ServerValue.TIMESTAMP
        }, onComplete = function(error) {
          if (error) {
            console.log('Synchronization failed');
            alert('Failed to update user');
          } else {
            $('#myModal').modal('show');
            // Callback once the modal is hidden
            $('#myModal').on('hidden.bs.modal', angular.bind(self, function() {
                $scope.goTo('usermanager');
                $scope.$apply();
            }));
          }
        };
        fbRef.update(userData, onComplete);
    }

}]); // EditController
