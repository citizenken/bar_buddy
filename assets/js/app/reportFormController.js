barBuddyApp.controller('ReportFormCtrl', ['$scope', 'Report', 'snapRemote', function ($scope, Report, snapRemote) {
    $scope.newReport = {}

    $scope.createLocationObj = function (newReport, reportLocationDetails) {
      $scope.newReport.location = {}
      $scope.newReport.location.address = reportLocationDetails.formatted_address
      $scope.newReport.location.name = reportLocationDetails.name
      $scope.newReport.location.lat = reportLocationDetails.geometry.location.k
      $scope.newReport.location.lon = reportLocationDetails.geometry.location.D

      $scope.sendReport()
    }

    $scope.sendReport = function () {
      Report.save($scope.newReport, function () {
        snapRemote.toggle('left')
        $scope.newReport = null
        reportLocation = null
        reportLocationDetails = null
      })
    }
}])