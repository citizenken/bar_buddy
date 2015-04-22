barBuddyApp.controller('AuthenticationCtrl', ['$scope', 'authService', function ($scope, authService) {
    $scope.register = false

    $scope.toggleRegister = function () {
      if ($scope.register) {
        $scope.register = false
      } else {
        $scope.register = true
      }
    }

    $scope.confirmPassword - function (password, confirm) {
      if (password !== confirm) {
        $scope.invalid = false
      }
    }


    $scope.isAuthenticated = function() {
      return authService.isAuthenticated()
    }

    $scope.handleAuth = function (authInfo) {
      if (authInfo.email) {
        authInfo = {
          email: authInfo.email,
          username: authInfo.identifier,
          password: authInfo.password
        }
      }

      if ($scope.register) {
        authService.register(authInfo)
      } else {
        authService.login(authInfo)
      }

      $scope.isAuthenticated()
    }
}])