var barBuddyApp = angular.module('barBuddyApp', []);

barBuddyApp.controller('DashboardCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.baseUrl = '';
    // socket = io.socket;

    // $scope.reports = [];

    $scope.getAllchat = function(){
      io.socket.get('/report', function (data) {
        console.log(data)
        $scope.reports = data;
        $scope.$apply();
      })
    };

    $scope.getAllchat();

    io.socket.on('report', function(obj){
      $scope.reports += obj.data;
      $scope.$apply();
    })


}])