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


barBuddyApp.service('cookieHandler', ['$cookieStore', function ($cookieStore) {
  this.cookieOptions = {'domain': document.domain.replace(/.+?\./, ""), 'expires': null},

  this.setExpiration = function () {
    var d = new Date();
    d.setDate(d.getDate() + 30);
    this.cookieOptions.expires = d.toUTCString();
  },

  this.getCookie = function (cookie) {
    return $cookieStore.get(cookie);
  },

  this.setCookie = function (key, value) {
    this.setExpiration();
    $cookieStore.put(key, value, this.cookieOptions);
  }

}])


barBuddyApp.service('authService', ['cookieHandler', '$http', '$q', function (cookieHandler, $http, $q) {
  // this.authToken = null,

  this.getAuthToken = function () {
    return cookieHandler.getCookie('Authentication')
  },

  this.login = function (credentials) {
    this.auth('/auth/local', credentials)
  },

  this.register = function (credentials) {
    this.auth('/auth/local/register', credentials);
  },

  this.auth = function (url, credentials) {
    $http.post(url, credentials).
      success(function (data, status, headers, config) {
        console.log(data)
        cookieHandler.setCookie('username', data.username)
        cookieHandler.setCookie('Authentication', headers().authentication)
      }).
      error(function (data, status, headers, config) {
        console.log(data)
      });
  }


}])