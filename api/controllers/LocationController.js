/**
 * LocationController
 *
 * @description :: Server-side logic for managing locations
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	/**
   * `ReporterController.reports()`
   */
  reports: function (req, res) {
    locationId = req.params.id
    this.subscribeToLocationReports(req, locationId)

    Report.find({location: locationId}).populateAll().exec(function (error, reports) {
      // if (err) return next('Composition parameter is required')
      res.json(reports)
    });

  },


  /**
   * `ReporterController.subscribeToLocationReports()`
   */
  subscribeToLocationReports: function (req, locationId) {
    sails.sockets.join(req.socket, User.room(locationId, 'newLocationReport'));
  },
};

