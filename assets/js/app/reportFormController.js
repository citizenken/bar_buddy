barBuddyApp.controller('ReportFormCtrl', ['$scope', 'Report', 'snapRemote', 'cookieHandler', function ($scope, Report, snapRemote, cookieHandler) {
    $scope.reportLocationOptions = { types: 'establishment', country: 'us' }
    $scope.cleanReportLocationDetails = {}
    $scope.cleanReportLocation = ''
    $scope.cleanReport = {
      count: ''
    }

    $scope.cleanReportForm = function () {
      $scope.newReport = angular.copy($scope.cleanReport)
      $scope.reportForm.$setPristine()
      $scope.reportLocation = angular.copy($scope.cleanReportLocation)
      $scope.reportLocationDetails = angular.copy($scope.cleanReportLocationDetails)
    }

    $scope.createLocationObj = function () {
      var coords = []
      angular.forEach($scope.reportLocationDetails.geometry.location, function(coord) {
        coords.push(coord);
      });

      $scope.newReport.location = {
        address: $scope.reportLocationDetails.formatted_address,
        name: $scope.reportLocationDetails.name,
        lat: coords[0],
        lon: coords[1],
        placeId: $scope.reportLocationDetails.id
      }

      $scope.newReport.reporter = cookieHandler.getCookie('username')

      $scope.sendReport()
    }

    $scope.sendReport = function () {
      Report.save($scope.newReport, function () {
        snapRemote.toggle('left')
        $scope.cleanReportForm()
      })
    }
}])