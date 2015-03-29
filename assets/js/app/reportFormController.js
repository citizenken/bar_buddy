barBuddyApp.controller('ReportFormCtrl', ['$scope', 'Report', function ($scope, Report) {
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
        snapRemote.toggle('left')
        delete $scope.newReport
        delete $scope.reportLocationDetails
      })
    }
}])