barBuddyApp.controller('ReportFormCtrl', ['$scope', 'Report', 'snapRemote', 'cookieHandler', function ($scope, Report, snapRemote, cookieHandler) {
    $scope.reportLocationOptions = { types: 'establishment', country: 'us' }
    $scope.cleanReportLocationDetails = {}
    $scope.cleanReportLocation = ''
    $scope.cleanReport = {
      count: {
        value: '',
        label:''
      },
      composition: {
        value: '',
        label: ''
      },
      line: ''
    }

    $scope.cleanReportForm = function () {
      $scope.newReport = angular.copy($scope.cleanReport)
      $scope.reportForm.$setPristine()
      $scope.reportLocation = angular.copy($scope.cleanReportLocation)
      $scope.reportLocationDetails = angular.copy($scope.cleanReportLocationDetails)
    }

    $scope.createLocationObj = function () {
      $scope.newReport.location = {
        'address': $scope.reportLocationDetails.formatted_address,
        'name': $scope.reportLocationDetails.name,
        'lat': $scope.reportLocationDetails.geometry.location.k,
        'lon': $scope.reportLocationDetails.geometry.location.D
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