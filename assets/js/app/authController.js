barBuddyApp.controller('AuthenticationCtrl', ['$scope', 'authService', function ($scope, authService) {
    $scope.register = false,

    $scope.cleanAuthForm = {
        identifier : '',
        email : '',
        password: '',
        confirm_password: ''
    },

    $scope.cleanForm = function () {
      $scope.auth = angular.copy($scope.cleanForm)
      $scope.authForm.$setPristine()
    }

    $scope.toggleRegister = function () {
      if ($scope.register) {
        $scope.register = false
      } else {
        $scope.register = true
      }
    }

    $scope.confirmPassword = function (password, confirm) {
      if (password !== confirm) {
        $scope.invalid = false
      }
    }


    $scope.isAuthenticated = function() {
      if (authService.getAuthToken()) {
        return true
      } else {
        return false
      }
    }

    $scope.handleAuth = function () {
      if ($scope.auth.email) {
        $scope.auth = {
          email: $scope.auth.email,
          username: $scope.auth.identifier,
          password: $scope.auth.password
        }
      }

      if ($scope.register) {
        authService.register($scope.auth)
      } else {
        authService.login($scope.auth)
      }

      $scope.isAuthenticated()
    }
}])