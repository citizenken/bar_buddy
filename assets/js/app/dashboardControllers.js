barBuddyApp.controller('DashboardCtrl', ['$scope', 'reportSocket', function ($scope, reportSocket) {
    socketInfo = {
      url: '/report',
      socketEvent: 'newReport'
    }

    maxReports = 25;
    allDashboardReports = []
    $scope.reportLocationOptions = { types: 'establishment', country: 'us' }

    $scope.dashboardReports = []

    reportSocket.getReports(socketInfo, $scope)

    $scope.$on(socketInfo.socketEvent, function (event, data) {
      if (data.length) {
        allDashboardReports = allDashboardReports.concat(data);
      } else {
        allDashboardReports.push(data)
      }

      $scope.dashboardReports = allDashboardReports.slice(0, maxReports)

      $scope.$apply();
    })
}])