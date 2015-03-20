barBuddyApp.controller('DashboardCtrl', ['$scope', 'reportSocket', function ($scope, reportSocket) {
    $scope.baseUrl = '';

    // $scope.getAllchat = function(){
    //   io.socket.get('/report', function (data) {
    //     $scope.reports = data;
    //     $scope.$apply();
    //   })
    // };

    // $scope.getAllchat();

    reportSocket.getAllReports($scope)

    $scope.$on('allReports', function (event, data) {
      $scope.reports = data
      $scope.$apply();
    })
    // console.log($scope.reports)
    // $scope.$apply();
    // io.socket.on('report', function(obj){
    //   $scope.reports.push(obj.data);
    //   $scope.$apply();
    // })

}])

barBuddyApp.controller('ReporterDetailCtrl', ['$scope', '$routeParams', function ($scope, $routeParams) {
    io.socket.get('/reporter/' + $routeParams.reporterId, function (data) {

        $scope.reports = expandedreports;
        $scope.$apply();
    })

    io.socket.on('reporter/' + $routeParams.reporterId, function(obj){
      $scope.reports.push(obj.data);
      $scope.$apply();
    })

}])

barBuddyApp.controller('LocationDetailCtrl', ['$scope', '$routeParams', function ($scope, $routeParams) {


}])