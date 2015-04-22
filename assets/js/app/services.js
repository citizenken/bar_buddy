barBuddyApp.service('reportSocket', ['appConfig', function (appConfig) {
  this.getReports = function (socketInfo, page, scope) {

    if (!socketInfo.queryParms) {
      var queryParms = {
          sort: 'createdAt DESC',
          limit: '25',
      }
    }

    queryParms.skip = queryParms.limit * page

    var self = this,
        url = socketInfo.url,
        socketEvent = socketInfo.socketEvent;

    io.socket.get(url, queryParms, function (response, extraData) {
      self.updateReports(socketInfo, scope, response)
    });

    io.socket.on(socketEvent, function (response) {
      self.updateReports(socketInfo, scope, response.data)
    });
  };

  this.updateReports = function (socketInfo, scope, response) {
    scope.$emit(socketInfo.socketEvent, response)
  };
}]);


barBuddyApp.service('authService', ['$cookies', '$http', '$q', function ($cookies, $http, $q) {
  this.isAuthenticated = function () {
    return $cookies.authenticated
  }

  this.login = function (credentials) {
    var deferred = $q.defer();

    $http.post('/auth/local', credentials)
    .then(function (result) {
      $cookies.authenticated = true
    }, function (error) {
      deferred.reject(error);
    });

    return deferred.promise
  },

  this.register = function (credentials) {
    var deferred = $q.defer();

    $http.post('/auth/local/register', credentials)
    .then(function (result) {
      $cookies.authenticated = true
    }, function (error) {
      deferred.reject(error);
    });

    return deferred.promise
  }


}])