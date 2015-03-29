barBuddyApp.controller('DashboardCtrl', ['$scope', 'reportSocket', 'Report', function ($scope, reportSocket, Report) {
    socketInfo = {
      url: '/report/nearby',
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

    $scope.createLocationObj = function (newReport, reportLocationDetails) {
      newReport.location = {}
      newReport.location.address = reportLocationDetails.formatted_address
      newReport.location.name = reportLocationDetails.name
      newReport.location.lat = reportLocationDetails.geometry.location.k
      newReport.location.lon = reportLocationDetails.geometry.location.D

      $scope.sendReport(newReport)
    }

    $scope.sendReport = function (newReport) {
      Report.save(newReport, function () {
        delete $scope.newReport
        delete $scope.reportLocationDetails
      })
    }


}])