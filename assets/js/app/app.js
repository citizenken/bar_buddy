var barBuddyApp = angular.module('barBuddyApp', [
	'ui.router',
  'ngResource',
  'ngAutocomplete'
  	]);


barBuddyApp.service('reportSocket', function () {
  this.getReports = function (socketInfo, scope) {
    var self = this,
        url = socketInfo.url,
        socketEvent = socketInfo.socketEvent;

    io.socket.get(url, function (response, extraData) {
      self.updateReports(socketInfo, scope, response)
    });

    io.socket.on(socketEvent, function (response) {
      self.updateReports(socketInfo, scope, response.data)
    });
  };

  this.updateReports = function (socketInfo, scope, response) {
    scope.$emit(socketInfo.socketEvent, response)
  };
});


barBuddyApp.factory('Report', ['$resource', function($resource) {
  return $resource('/report/:id')
}]);



barBuddyApp.directive('reportForm', function() {
  return {
    template: '/partial/report_form.html'
  }

});


barBuddyApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    // $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('dashboard', {
            url:'/',
            templateUrl: 'partials/dashboard.html',
            controller: 'DashboardCtrl'
        })
        .state('reporter', {
            url:'/reporter/:reporterId',
            templateUrl: 'partials/reporter.html',
            controller: 'ReporterDetailCtrl'
        })
        .state('location', {
            url:'/location/:locationId',
            templateUrl: 'partials/location.html',
            controller: 'LocationDetailCtrl'
        })

}]);



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