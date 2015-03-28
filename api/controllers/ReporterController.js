/**
 * ReporterController
 *
 * @description :: Server-side logic for managing reporters
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  /**
   * `ReporterController.reports()`
   */
  reports: function (req, res) {
    reporterId = req.params.id
    this.subscribeToReporterReports(req, reporterId)

    Report.find({reporter: reporterId}).populateAll().exec(function (error, reports) {
      // if (err) return next('Composition parameter is required')
      res.json(reports)
    });

  },


  /**
   * `ReporterController.subscribeToReporterReports()`
   */
  subscribeToReporterReports: function (req, reporterId) {
    var room = Reporter.room(reporterId, 'newReporterReport');
    sails.log.silly('Subscribed ' + req.socket + ' to room: ' + room)
    sails.sockets.join(req.socket, room);
  },


  /**
   * `ReporterController.location()`
   */
  location: function (req, res) {
    return res.json({
      todo: 'location() is not implemented yet!'
    });
  }
};

