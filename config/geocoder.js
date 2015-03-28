/**
* geocoder.js
*
* @description :: Settings used for node-geocoder package
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports.geocoder = {
  geocoderProvider: 'freegeoip',
  httpAdapter: 'http',
  extra: {
    apiKey: '', // for Mapquest, OpenCage, Google Premier
    formatter: null
	}
};