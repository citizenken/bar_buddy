barBuddyApp.controller('ReporterDetailCtrl', ['$scope', '$stateParams', 'reportSocket', function ($scope, $stateParams, reportSocket) {
    reporterId = $stateParams.reporterId
    socketInfo = {
      url: '/reporter/' + reporterId + '/reports',
      socketEvent: 'newReporterReport'
    }

    reportSocket.getReports(socketInfo, $scope)

    $scope.reporterReports = []
    $scope.$on(socketInfo.socketEvent, function (event, data) {
      if (data.length) {
        $scope.reporterReports = $scope.reporterReports.concat(data);
      } else {
        $scope.reporterReports.push(data)
      }
      $scope.$apply();
    })

}])
