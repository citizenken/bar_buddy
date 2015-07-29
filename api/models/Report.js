/**
* Report.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/


var fs = require('fs'),
    md5 = require('md5');
module.exports = {

  attributes: {
    reporter    : { model: 'user', required: true },
    location    : { model: 'location', required: true },
    content     : { type: 'text', required: true},
    image       : { type: 'json'}, // Not actually JSON, but JSON uses LONGTEXT column property
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
  },

  // saveImage: function (imageData ,report) {
  //   var imageDir = sails.config.appPath + '/.tmp/public/report_images/',
  //       timestamp = new Date().getTime(),
  //       hash = md5(report.reporter + report.location.name + timestamp),
  //       url = imageDir + hash + '.jpeg';

  //   fs.writeFile(url, imageData, 'base64', function(err) {
  //     console.log('this is an error', err);
  //     report.image = url;
  //     report.save(function(err, report) {
  //       console.log(url);
  //       if (err) return err;
  //       return report;
  //     });
  //   });
  // }

};

