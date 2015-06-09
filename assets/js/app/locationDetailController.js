barBuddyApp.controller('LocationDetailCtrl', ['$scope', '$routeParams', 'reportSocket', function ($scope, $routeParams, reportSocket) {
    locationId = $routeParams.locationId
    socketInfo = {
      url: '/location/' + locationId + '/reports',
      socketEvent: 'newLocationReport'
    }

    $scope.locationReports = []
    $scope.page = 0

    $scope.nextPage = function() {
      $scope.page += 1
      reportSocket.getReports(socketInfo, $scope.page, $scope)
    }

    reportSocket.getReports(socketInfo, $scope.page, $scope)

    $scope.$on(socketInfo.socketEvent, function (event, data) {
      if (angular.isArray(data) && data.length > 0 || data.id) {
        if (data.length) {
          $scope.locationReports = $scope.locationReports.concat(data);
        } else {
          $scope.locationReports.unshift(data)
        }
        $scope.$apply();
      }
    })

}])