barBuddyApp.controller('MapCtrl', ['$scope', 'reportSocket', 'geolocation', 'uiGmapIsReady', function ($scope, reportSocket, geolocation, uiGmapIsReady) {
    socketInfo = {
      url: '/report',
      socketEvent: 'newReport'
    }

    $scope.hiddenMap = {"opacity":"0"};
    $scope.mapMarkers = []

    $scope.map = {
      center: {
        latitude: null,
        longitude: null
      },
      zoom: 15
    }

    // $scope.loadMarkers = function () {
    //   reportSocket
    // }

    geolocation.getLocation().then(function(data){
      $scope.map.center = {
        latitude:data.coords.latitude,
        longitude:data.coords.longitude
      };
      uiGmapIsReady.promise(1).then(function(instances) {
        $scope.hiddenMap = {"opacity":"1"};
      });
    });

    reportSocket.getReports(socketInfo, $scope.page, $scope)

    $scope.$on(socketInfo.socketEvent, function (event, data) {
      if (angular.isArray(data) && data.length > 0 || data.id) {
        console.log(data)
        for (var i = data.length - 1; i >= 0; i--) {
          var report = data[i]
          // console.log(report)
          markerInfo = {
            id: report.id,
            location: report.location.name,
            latitude: report.location.lat,
            longitude: report.location.lon
          }
          $scope.mapMarkers.unshift(markerInfo)
        };
        console.log($scope.mapMarkers)
      }
    })
}])