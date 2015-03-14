barBuddyApp.controller('DashboardCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.baseUrl = '';

    $scope.getAllchat = function(){
      io.socket.get('/report', function (data) {
        $scope.reports = data;
        $scope.$apply();
      })
    };

    $scope.getAllchat();

    io.socket.on('report', function(obj){
      $scope.reports.push(obj.data);
      $scope.$apply();
    })

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