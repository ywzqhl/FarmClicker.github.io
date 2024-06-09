// Create an AngularJS module named 'FarmClickerApp' with 'ngRoute' as a dependency
var FarmClickerApp = angular.module('FarmClickerApp', ['ngRoute']);

// Configure routes
FarmClickerApp.config(function($routeProvider){
  $routeProvider
  // When the URL is '/', use 'ApplicationController' and load 'app.html' template
  .when('/', {
    controller: 'ApplicationController',
    templateUrl: 'modules/application/app.html'
  })
  // When the URL is '/about', load 'about.html' template
  .when('/about', {
    templateUrl: 'modules/about/about.html'
  })
  // For any other URL, redirect to '/'
  .otherwise({
    redirectTo: '/'
  });
});
