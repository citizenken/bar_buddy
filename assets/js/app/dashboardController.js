barBuddyApp.controller('DashboardCtrl', ['$scope', 'reportSocket', function ($scope, reportSocket) {
    socketInfo = {
      url: '/report',
      socketEvent: 'newReport'
    }

    $scope.dashboardReports = []
    $scope.page = 0

    $scope.nextPage = function() {
      $scope.page += 1
      reportSocket.getReports(socketInfo, $scope.page, $scope)
    }

    reportSocket.getReports(socketInfo, $scope.page, $scope)

    $scope.$on(socketInfo.socketEvent, function (event, data) {
      if (angular.isArray(data) && data.length > 0 || data.id) {
        if (data.length) {
          $scope.dashboardReports = $scope.dashboardReports.concat(data);
        } else {
          $scope.dashboardReports.unshift(data)
        }
        $scope.$apply();
      }
    })

    $scope.$on('reportRelevence', function (event, data) {
      var badReport = data.data
      angular.forEach($scope.dashboardReports, function(report, key) {
        if (report.id === badReport.id) {
          $scope.dashboardReports[key].relevence = badReport.relevence
          $scope.$apply()
        }
      })
    })

    $scope.showReport = function (reportId) {
      var report = angular.element( document.querySelector( '#report_' + reportId ) );
      report.toggleClass('hidden');
    }
}])