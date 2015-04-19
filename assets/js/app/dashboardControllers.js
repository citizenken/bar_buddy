barBuddyApp.controller('DashboardCtrl', ['$scope', 'reportSocket', function ($scope, reportSocket) {
    $scope.$on('$viewContentLoaded', function(event) {window.alert('loaded')})


    socketInfo = {
      url: '/report',
      socketEvent: 'newReport'
    }

    $scope.reportLocationOptions = { types: 'establishment', country: 'us' }
    $scope.dashboardReports = []
    $scope.page = 0

    $scope.nextPage = function() {
      $scope.page += 1
      reportSocket.getReports(socketInfo, $scope.page, $scope)
    }

    reportSocket.getReports(socketInfo, $scope.page, $scope)

    $scope.$on(socketInfo.socketEvent, function (event, data) {
      if (angular.isArray(data) && data.length > 0 || data.id) {
        if (data.length) {
          $scope.dashboardReports = $scope.dashboardReports.concat(data);
        } else {
          $scope.dashboardReports.push(data)
        }
        $scope.$apply();
      }
    })
}])