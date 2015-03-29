barBuddyApp.service('reportSocket', function () {
  this.getReports = function (socketInfo, scope) {
    var self = this,
        url = socketInfo.url,
        socketEvent = socketInfo.socketEvent;

    io.socket.get(url, function (response, extraData) {
      self.updateReports(socketInfo, scope, response)
    });

    io.socket.on(socketEvent, function (response) {
      self.updateReports(socketInfo, scope, response.data)
    });
  };

  this.updateReports = function (socketInfo, scope, response) {
    scope.$emit(socketInfo.socketEvent, response)
  };
});