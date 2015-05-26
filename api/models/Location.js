/**
* Location.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var geocoder = require('node-geocoder').getGeocoder('openstreetmap', 'http');

module.exports = {

  attributes: {
    name      : { type: 'string', required: true, unique: true },
    address   : { type: 'string', required: true },
    lat       : { type: 'float' },
    lon       : { type: 'float' },
    placeId   : { type: 'string', required: true},
    inReports : { collection: 'report', via: 'location' }
  },

  beforeCreate: function(values, next) {
    // If values come in without lat/long, geo encode them
    if (!values.lat || !values.lon) {
      geocoder.geocode(values.address, function ( err, data ) {
        if (err || data.length === 0) return next('There was an error geocoding. Please verify your address.');
        var geometry = data[0]
        values.lat = geometry.latitude
        values.lon = geometry.longitude
        next()
      })
    } else {
      next()
    }
  },
};

