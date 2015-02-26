define([
  'handlebars',
  'jquery',
  'underscore',
  'backbone'
], function (Handlebars, $, _, Backbone){

// $(function () {

// Model
    var Report = Backbone.Model.extend({
        urlroot: '/report',
        parse: function (response) {
            if (response) {
                this.flattenAttr(response, response.reporter, 'reporter')
                this.flattenAttr(response, response.location, 'location')

                delete response.reporter
                delete response.location

                return response
            }
        },

        flattenAttr: function (response, data, attr) {
            _.each(data, function (value,key){
                response[ attr + '_' + key] = value;
                return response
            })
        }
    })

    var ReportLocation = Backbone.Model.extend({
        urlroot: '/location',
    })

    var Reporter = Backbone.Model.extend({
        urlroot: '/reporter',
    })

// Collection
    var LocationList = Backbone.Collection.extend({
        url: '/location',
        model: ReportLocation,
    })

    var ReporterList = Backbone.Collection.extend({
        url: '/reporter',
        model: Reporter,
    })

    var ReportList = Backbone.Collection.extend({
        url: '/report',
        model: Report,
        defaultSortProp: 'createdAt',
        defaultSortDir: 'desc',

        initialize: function () {
          this.comparator = this.getSortStrategy(this.defaultSortProp, this.defaultSortDir);
        },

        getSortStrategy: function (property, direction) {
          var dirMod = ((direction === 'asc') ? 1 : -1);

          var sortStrategy = function (report1, report2) {
              if (report1.get(property) > report2.get(property)) return (1 * dirMod);
              if (report1.get(property) < report2.get(property)) return (-1 * dirMod);
              return 0;
          }
          return sortStrategy;
        },

        changeSort: function (property, direction) {
          this.comparator = this.getSortStrategy(property, direction)
        },

        filterBy: function (attr, value) {
          filtered = this.filter(function (report) {
            return report.get(attr) === value;
            });
          return new ReportList(filtered);
        },
    })

// Views
    var ReportView = Backbone.View.extend({
        tagName: 'li',

        template: _.template($('#report_template').html()),

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    })

    var ReportEntryView = Backbone.View.extend({
        el: '#report_entry_anchor',
        events: {
          'click #submit_report'   : 'submitReport',
        },

        template: _.template($('#report_entry_template').html()),

        initialize: function () {
            _.bindAll(this, 'render', 'submitReport');
            this.locations = new LocationList()
            this.reporters = new ReporterList()
            $.when(this.locations.fetch({reset: true}),
                   this.reporters.fetch({reset: true}))
            .then(this.render);


        },

        render: function () {
            this.$el.append(this.template({locations: this.locations.toJSON(), reporters: this.reporters.toJSON()}));
            return this;
        },

      remove: function() {
         this.$el.children('#report_entry_container').remove()
      },
      
        submitReport: function (event) {
          event.stopPropagation();
          var self = this;
              form = $('#report_entry'),
              url = document.domain + ':' + location.port,
              formData = {};

          formData.reporter = parseInt(form.children('#reporter').val());
          formData.location = parseInt(form.children('#location').val());
          formData.count = parseInt(form.children('#count').val());
          formData.line = ((form.children('#line').prop('checked')) ? true : false);


          $.post('/report', formData, function(response) {
            window.location = '/#';
            self.remove();
          });

          return false;

        }
    })

    var ReportListView = Backbone.View.extend({
        el: '#report_list_container',

        orderBy: 'createdAt',
        orderDir: 'desc',

        initialize:function () {
            _.bindAll(this, 'render');
            this.reportListElement = this.$el.children('#report_list');
            this.collection.on('reset', this.render, this);
            this.collection.on('sort', function () {
              this.reportListElement.empty();
              this.render();
            }, this);
        },

        events: {
          'change #sort_prop'   : 'changeOrder',
          'change #sort_dir'   : 'changeOrder',
        },

        render: function () {
            var self = this,
                reports = this.collection;

            _.each(reports.models, function (report) {
                var reportModel = new ReportView({model: report})
                self.reportListElement.append(reportModel.render().el)
            })

            return this
        },

        changeOrder: function (event) {
          var property = $('#sort_prop').val(),
              direction = $('#sort_dir').val(),
              reports = this.collection;

          reports.comparator = reports.getSortStrategy(property, direction);
          reports.sort();
          }
    });

    var AppRouter = Backbone.Router.extend({

        routes: {
          '':'dashboard',
          '#':'dashboard',
          'reporter/:id':'reporterReports',
          'location/:id':'locationReports',
          'report_entry':'createReport'
        },

        dashboard: function () {
            if (this.reportEntryView) {
              this.reportEntryView.remove();
            }
          
            if (this.reportListView) {
              this.reportListView.reportListElement.empty()              
            }
          
            this.reportList = new ReportList();
            this.reportListView = new ReportListView({collection:this.reportList});
            this.reportList.fetch({reset: true})

            $('#dashboard_link').hide();
            $('#create_report').show();
        },

        reporterReports:function (id) {
            this.reportListView.reportListElement.empty()
            var filtered = this.reportList.filterBy('reporter_id', parseInt(id));

            this.reportListView = new ReportListView({collection: filtered});
            this.reportListView.render();
            $('#dashboard_link').show();
            $('#create_report').show();
        },

        locationReports:function (id) {
            this.reportListView.reportListElement.empty()
            var filtered = this.reportList.filterBy('location_id', parseInt(id));

            this.reportListView = new ReportListView({collection: filtered});
            this.reportListView.render();
            $('#dashboard_link').show();
            $('#create_report').show();
        },

        createReport: function() {
            this.reportEntryView = new ReportEntryView();
            $('#dashboard_link').show();
            $('#create_report').hide();

//             $('#dashboard').append(this.reportEntryView.render().el);
        }
    });

    var app = new AppRouter();
    Backbone.history.start();


    // var App = new ReportListView
});