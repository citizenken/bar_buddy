barBuddyApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/dashboard.html',
        controller: 'DashboardCtrl'
      }).
      when('/location/:locationId', {
        templateUrl: 'partials/location.html',
        controller: 'LocationDetailCtrl'
      }).
      when('/reporter/:reporterId', {
        templateUrl: 'partials/reporter.html',
        controller: 'ReporterDetailCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });

  }
]);