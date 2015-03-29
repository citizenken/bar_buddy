barBuddyApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

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