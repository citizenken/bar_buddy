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
      // refresh: false,
      zoom: 15
    }

    $scope.topReportCoords = null;

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
    });

    reportSocket.getReports(socketInfo, $scope.page, $scope)

    $scope.$on(socketInfo.socketEvent, function (event, data) {
      if (angular.isArray(data) && data.length > 0 || data.id) {
        if (!angular.isArray(data)) {
          data = [data];
        }
        console.log(data)
        angular.forEach(data, function(report) {
          if (report.relevence > -5) {
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
          }
        });
          if ($scope.topReportCoords == null) {
            $scope.$apply(function() {
              $scope.map.center = {
                latitude: $scope.mapMarkers[0].latitude,
                longitude: $scope.mapMarkers[0].longitude
              }
            })
          }
      }
    });

    $scope.$on('reportRelevence', function (event, data) {
      var badReport = data.data
      angular.forEach($scope.mapMarkers, function(report, key) {
        if (report.id === badReport.id) {
          console.log(key)
          $scope.mapMarkers.splice(key, 1)
          console.log($scope.mapMarkers)
          // $scope.map.center = {
          //       latitude: $scope.mapMarkers[0].latitude,
          //       longitude: $scope.mapMarkers[0].longitude
          //     }
          $scope.$apply()
        }
      })
    })

    var resetMap = function (coords) {
      $scope.topReportCoords = coords
      $scope.map.center = $scope.topReportCoords;
      $scope.$apply(function() {
        $scope.map.center = $scope.topReportCoords;
      })
    }

    var windowEl = $(window)
    windowEl.on('scroll', function() {
        $('.list-group-item').each(function() {
            var report = $(this);
            var yOffset = report.position().top - windowEl.scrollTop();
            var maxYOffset = windowEl.height() * .20;

            coords = {
              latitude: parseFloat(report.attr('lat')),
              longitude: parseFloat(report.attr('lon'))
            }

            if (yOffset <= maxYOffset && yOffset >= -10
              && JSON.stringify(coords) !== JSON.stringify($scope.topReportCoords)) {
              resetMap(coords)
            }
        });
    });


}])