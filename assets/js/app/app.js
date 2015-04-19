var barBuddyApp = angular.module('barBuddyApp', [
    // 'ui.router',
    'ngRoute',
    'ngResource',
    'ngAutocomplete',
    'snap',
    'infinite-scroll'
  	]);


// barBuddyApp.config(['$routeProvider',
//   function($routeProvider) {
//     $routeProvider.
//       when('/', {
//         templateUrl: 'partials/dashboard_template.html',
//         controller: 'DashboardCtrl'
//       }).
//       when('/location/:locationId', {
//         templateUrl: 'partials/location_template.html',
//         controller: 'LocationDetailCtrl'
//       }).
//       when('/reporter/:reporterId', {
//         templateUrl: 'partials/reporter_template.html',
//         controller: 'ReporterDetailCtrl'
//       }).
//       otherwise({
//         redirectTo: '/'
//       });

//   }
// ]);