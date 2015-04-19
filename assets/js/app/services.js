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