barBuddyApp.controller('MapCtrl', ['$scope', 'reportSocket', 'geolocation', 'uiGmapIsReady', function ($scope, reportSocket, geolocation, uiGmapIsReady) {
    socketInfo = {
      url: '/report',
      socketEvent: 'newReport'
    }

    $scope.hiddenMap = {"opacity":"0"};
    $scope.mapMarkers = []
    $scope.mapWindows = []

    $scope.map = {
      center: {
        latitude: null,
        longitude: null
      },
      zoom: 15
    }

    $scope.mapAllowed = true;

    geolocation.getLocation().then(function(data){
      $scope.map.center = {
        latitude:data.coords.latitude,
        longitude:data.coords.longitude
      };
      uiGmapIsReady.promise(1).then(function(instances) {
        $scope.hideMapMsg = true;
        $scope.hiddenMap = {"opacity":"1"};
      });

    }, function (data) {
      $scope.mapAllowed = false;
      console.log('fail')
      console.log($scope.mapAllowed)
    });

    reportSocket.getReports(socketInfo, $scope.page, $scope)

    $scope.$on(socketInfo.socketEvent, function (event, data) {
      if (angular.isArray(data) && data.length > 0 || data.id) {
        if (!angular.isArray(data)) {
          data = [data];
        }
        console.log(data)
        angular.forEach(data, function(report) {
          markerInfo = {
            id: report.id,
            location: report.location.name,
            latitude: report.location.lat,
            longitude: report.location.lon,
            options:{
              place: {
                location: {
                  lat: report.location.lat,
                  lng: report.location.lon
                },
                placeId: report.location.placeId
              }
            }
          }
          $scope.mapMarkers.unshift(markerInfo)
        }, this);
        $scope.map.center = {
          latitude: $scope.mapMarkers[0].latitude,
          longitude: $scope.mapMarkers[0].longitude
        }
      }
    })
}])