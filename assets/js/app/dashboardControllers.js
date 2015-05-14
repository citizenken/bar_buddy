barBuddyApp.controller('DashboardCtrl', ['$scope', 'reportSocket', function ($scope, reportSocket) {
    socketInfo = {
      url: '/report',
      socketEvent: 'newReport'
    }

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
          $scope.dashboardReports.unshift(data)
        }
        $scope.$apply();
      }
    })
}])