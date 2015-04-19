barBuddyApp.factory('Report', ['$resource', function($resource) {
  return $resource('/report/:id')
}]);

barBuddyApp.factory('appConfig', [function() {
  config = {
    getReqQueryParms: {
        sort: 'createdAt DESC',
        limit: '5',
        skip: '5',
    }
  }

  return config
}]);