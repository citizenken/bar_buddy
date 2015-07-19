/**
* Report.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    reporter    : { model: 'user', required: true },
    location    : { model: 'location', required: true },
    content     : { type: 'text', required: true},
    image       : { type: 'string'},
    rating      : { type: 'boolean', required: true, defaultsTo: true},
    relevence   : { type: 'integer', defaultsTo: 0 },
    voted       : { collection: 'user', via: 'votedReviews' }
  },

  publishCreate: function (req, report) {
    var watchers = this.watchers();

    // All users are auto subscribed to this room when they make the first get socket request to /report
    sails.sockets.broadcast('sails_model_create_report', 'newReport', {
        verb: 'created',
        data: report,
        id: report[this.primaryKey]
    });

    var reportId = report.reporter.id;
    room = Reporter.room(reportId, 'newReporterReport');
    sails.sockets.broadcast(room, 'newReporterReport', {
        verb: 'created',
        data: report,
        id: report[this.primaryKey]
    });

    reportId = report.location.id;
    room = Reporter.room(reportId, 'newLocationReport');
    sails.sockets.broadcast(room, 'newLocationReport', {
        verb: 'created',
        data: report,
        id: report[this.primaryKey]
    });

    // Subscribe all watchers to the new instance, if you're into that
    this.introduce(report[this.primaryKey]);
  }

};

