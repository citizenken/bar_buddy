/**
 * ReportController
 *
 * @description :: Server-side logic for managing reports
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    nearby: function (req, res) {

      this.subscribeToNearbyReports(req, res);

      // Report.find().exec(function found(err, matchingRecords) {
      //   if (err) return res.serverError(err);

      //   // Only `.watch()` for new instances of the model if
      //   // `autoWatch` is enabled.
      //   if (req._sails.hooks.pubsub && req.isSocket) {
      //     Report.subscribe(req, matchingRecords);
      //     if (req.options.autoWatch) { Report.watch(req); }
      //     // Also subscribe to instances of all associated models
      //     _.each(matchingRecords, function (record) {
      //       actionUtil.subscribeDeep(req, record);
      //     });
      //   }

      //   res.ok(matchingRecords);
      // });
    },

    subscribeToNearbyReports: function (req, res) {
      var geoSettings = sails.config.geocoder,
        geocoder = require('node-geocoder').getGeocoder(geoSettings.geocoderProvider,
        geoSettings.httpAdapter, geoSettings.extra);

      // geocoder.geocode(req.ip, function(err, res) {
      //   var city = res.city,
      //       zip = res.zipcode,
      //       countryCode = res.countrycode,
      //       prefix = 'sails_model_report_near:',
      //       room = prefix + ':' + zip + ':' + countrycode;

      //   sails.log.silly('Subscribed ' + req.socket + ' to room: ' + room)
      //   sails.sockets.join(req.socket, room);
      //   console.log(res);
      // });
    },

    create: function (req, res) {

        var body = req.body;

        if (!body.reporter) {
          return res.json(409, {error: 'Reporter parameter is required'});
        }

        if (!body.location) {
          return res.json(409, {error: 'Location parameter is required'});
        }

        if (!body.count) {
          return res.json(409, {error: 'Count parameter is required'});
        }

        if (!body.composition) {
          return res.json(409, {error: 'Composition parameter is required'});
        }

        var locationData = body.location,
            countData = body.count,
            compositionData = body.composition,
            associations = {};

        Reporter.findOrCreate({name: body.reporter}, {name: body.reporter})
        .exec(function(err, reporter) {
          if (err) return res.json(500, {error: err})
          body.reporter = reporter.id;
          associations.reporter = reporter;

          Location.findOrCreate({name: locationData.name}, locationData)
          .exec(function(err, location) {
            // if (err) return next(err)
            if (err) return res.json(500, {error: err})
            body.location = location.id;
            associations.location = location;

            Count.findOrCreate({label: countData.label}, countData)
            .exec(function(err, count) {
              if (err) return res.json(500, {error: err})
              body.count = count.id;
              associations.count = count;

              Composition.findOrCreate({label: compositionData.label}, compositionData)
              .exec(function(err, composition) {
                if (err) return res.json(500, {error: err})
                body.composition = composition.id;
                associations.composition = composition;

                Report.create(body)
                .exec(function (err, report) {
                  if (err) return res.json(500, {error: err})
                    var reportWithAssociations = report;
                    reportWithAssociations.reporter = associations.reporter;
                    reportWithAssociations.location = associations.location;
                    reportWithAssociations.count = associations.count;
                    reportWithAssociations.composition = associations.composition;

                    Report.publishCreate(req, reportWithAssociations)
                    // Report.publishCreate(report)
                    res.json(reportWithAssociations)
                });
              });
            });
          });
        });
    }

};

