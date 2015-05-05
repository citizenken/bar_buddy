barBuddyApp.factory('Report', ['$resource', 'authService', function($resource, authService) {
    return $resource('/report/:id', {verb:'', access_token: authService.getAuthToken()}, {post: {method: 'POST', headers: {'foo': 'bar'}}});
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