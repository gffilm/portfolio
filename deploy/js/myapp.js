'use strict';

var FIREBASE_URL = 'https://gfsocialhub.firebaseio.com/';



// Module and Controller Creation
var myApp = angular.module('myApp',
  ['appControllers', 'firebase', 'ngRoute']);

var appControllers = angular.module('appControllers',
  ['firebase']);


myApp.constant('AUTH_EVENTS', {
  login: 'login',
  logout: 'logout'
});

// Configure the routes
myApp.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
          when('/login', {
            templateUrl: 'views/pages/login.html',
            controller: 'RegistrationController'
          }).
          when('/usermanager', {
            templateUrl: 'views/pages/usermanager.html',
            controller: 'RegistrationController'
          }).
          when('/usermanager/edit/:id', {
            templateUrl: 'views/pages/edituser.html',
            controller: 'EditController'
          }).
          when('/register', {
            templateUrl: 'views/pages/register.html',
            controller: 'RegistrationController'
          }).
          when('/hub', {
            templateUrl: 'views/pages/hub.html',
            controller: 'HubController'
          }).
          when('/template', {
            templateUrl: 'views/pages/template.html',
            controller: 'HubController'
          }).
          when('/logout', {
            templateUrl: 'views/pages/login.html',
            controller: 'RegistrationController'
          }).
          when('/#', {
            redirectTo: '/login'
          }).
          otherwise({
            redirectTo: '/login'
      });
}]);

/*angular.module('myApp', ['$rootScope']).run(function($rootScope) {
    $rootScope.views = {
        'carousel': 'views/partials/carousel.html',
        'nav': 'views/partials/nav.html',
        'mobileApp': 'views/partials/mobileApp.html',
        'aboutUs': 'views/partials/aboutUs.html',
        'staff': 'views/partials/staff.html',
        'services': 'views/partials/services.html',
        'footer': 'views/partials/footer.html'
    };
});*/