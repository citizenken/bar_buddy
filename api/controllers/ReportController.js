/**
 * ReportController
 *
 * @description :: Server-side logic for managing reports
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    create: function (req, res) {

        var body = req.body;

        if (!body.reporter) {
            if (err) return next('Reporter parameter is required')
        }

        if (!body.location) {
            if (err) return next('Location parameter is required')
        }

        if (!body.count) {
            if (err) return next('Count parameter is required')
        }

        if (!body.composition) {
            if (err) return next('Composition parameter is required')
        }

        var locationData = {name: body.location.name, address: body.location.address};
        var countData = {value: body.count.value, label: body.count.label};
        var compositionData = {value: body.count.value, label: body.count.label};
        var associations = {};

        Reporter.findOrCreate({name: body.reporter}, {name: body.reporter})
        .exec(function(err, reporter) {
          if (err) return next(err)
          body.reporter = reporter.id;
          associations.reporter = reporter;

          Location.findOrCreate({name: locationData.name}, locationData)
          .exec(function(err, location) {
            if (err) return next(err)
            body.location = location.id;
            associations.location = location;

            Count.findOrCreate({label: countData.label}, countData)
            .exec(function(err, count) {
              if (err) return next(err)
              body.count = count.id;
              associations.count = count;

              Composition.findOrCreate({label: compositionData.label}, compositionData)
              .exec(function(err, composition) {
                if (err) return next(err)
                body.composition = composition.id;
                associations.composition = composition;

                Report.create(body)
                .exec(function (err, report) {
                  if (err) return next(err)
                    var reportWithAssociations = report;
                    reportWithAssociations.reporter = associations.reporter;
                    reportWithAssociations.location = associations.location;
                    reportWithAssociations.count = associations.count;
                    reportWithAssociations.composition = associations.composition;

                    Report.publishCreate(reportWithAssociations, req)
                    // Report.publishCreate(report)
                    res.json(reportWithAssociations)
                });
              });
            });
          });
        });
    }

};

