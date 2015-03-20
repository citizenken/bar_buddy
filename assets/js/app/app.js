var barBuddyApp = angular.module('barBuddyApp', [
	'ngRoute',
  	]);

barBuddyApp.service('reportSocket', function () {
  this.reports = [];

  this.updateReports = function (scope, response) {
    if (response.length) {
      this.reports = this.reports.concat(response);
    } else {
      this.reports.push(response)
    }
    scope.$emit('allReports', this.reports)
  };

  this.getAllReports = function (scope) {
    var self = this;
    io.socket.get('/report', function (response, extraData) {
      self.updateReports(scope, response)
    });

    io.socket.on('report', function (response) {
      console.log('heard publish')
      self.updateReports(scope, response.data)
    });
  };
});


barBuddyApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/dashboard_template.html',
        controller: 'DashboardCtrl'
      }).
      when('/location/:locationId', {
        templateUrl: 'partials/location_template.html',
        controller: 'LocationDetailCtrl'
      }).
      when('/reporter/:reporterId', {
        templateUrl: 'partials/reporter_template.html',
        controller: 'ReporterDetailCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });

  }
]);