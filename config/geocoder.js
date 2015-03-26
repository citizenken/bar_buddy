/**
* passport.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports.geocoder = {
  geocoderProvider: 'freegeoip',
  httpAdapter: 'http',
  extra: {
    apiKey: 'YOUR_API_KEY', // for Mapquest, OpenCage, Google Premier
    formatter: null
	}
};