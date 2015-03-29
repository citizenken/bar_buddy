barBuddyApp.controller('LocationDetailCtrl', ['$scope', '$stateParams', 'reportSocket', function ($scope, $stateParams, reportSocket) {
    locationId = $stateParams.locationId
    socketInfo = {
      url: '/location/' + locationId + '/reports',
      socketEvent: 'newLocationReport'
    }

    reportSocket.getReports(socketInfo, $scope)

    $scope.locationReports = []
    $scope.$on(socketInfo.socketEvent, function (event, data) {
      if (data.length) {
        $scope.locationReports = $scope.locationReports.concat(data);
      } else {
        $scope.locationReports.push(data)
      }
      $scope.$apply();
    })

}])