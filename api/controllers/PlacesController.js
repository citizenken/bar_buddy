/**
 * Places Controller
 *
 * This is merely meant as an example of how your Authentication controller
 * should look. It currently includes the minimum amount of functionality for
 * the basics of Passport.js to work.
 */

var geolib = require('geolib'),
    g = require('googlePlaces'),
    placeSearch = g('AIzaSyAYXSIvkFkhm8PoPxiMc-W37fh0f2ZsRds', 'json').placeSearch;

var PlacesController = {
  updateUserPosition: function (req, res) {
    var self = this;
    // check new location vs. old location, if no change, return
    var userPosition = req.body.location;
    var placesParameters = {
        location: [userPosition.latitude, userPosition.longitude],
        sensor: false,
        rankby: 'distance',
        types: 'bar|night_club',
        // nearbySearchKeys: '*',
        // openNow: true
    };

    // get places using the above params
    placeSearch(placesParameters, function(error, response) {
      var filteredPlaces = [];
          placeRooms = [];

      // iterate over places, capturing their coords with a key of place_id, making a new object where keys are
      // place_id and value is the place object, and adding to the place_id to the place rooms
      for (var i = response.results.length - 1; i >= 0; i--) {
        var place = response.results[i],
            coords = {latitude: place.geometry.location.lat, longitude: place.geometry.location.lng};

        if (geolib.getDistance(userPosition, coords) > 8046.72) {
          continue;
        }

        placeRoom = 'bargazer_bar_' + place.place_id;
        filteredPlaces.unshift(place);
        placeRooms.push(placeRoom);
        sails.sockets.join(req.socket, placeRoom);
      }

      // unsubscribe from old rooms
      _.forEach(sails.sockets.socketRooms(req.socket), function(roomName) {
        if (roomName.match(/bargazer_bar_/) && !_.contains(placeRooms, roomName)) {
          sails.sockets.leave(req.socket, roomName);
        }
      });

      res.json(filteredPlaces);
    });
  }


};

module.exports = PlacesController;
