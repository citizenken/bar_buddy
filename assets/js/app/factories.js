barBuddyApp.factory('Report', ['$resource', function($resource) {
  return $resource('/report/:id')
}]);