define([
  'handlebars',
  'jquery',
  'jqueryui',
  'underscore',
  'backbone',
  // 'bbmodal',
  'bmodal',
  'bootstrap'
], function (Handlebars, $, ui, _, Backbone){

function setCookie(c_name,value,exdays) {
  var exdate=new Date();
  exdate.setDate(exdate.getDate() + exdays);
  var c_value=escape(value) + ((exdays==null) ? '' : '; expires='+exdate.toUTCString());
  document.cookie = c_name+'='+c_value+'; path=/';
}

function getCookie(cname) {
    var name = cname + '=';
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return '';
}

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

    var ReportEntryView = Backbone.Modal.extend({
        // el: '#report_entry_anchor',
        events: {
          'click #submit_report'   : 'submitReport',
        },

        submitEl: '#submit_report',
        cancelEl: '#cancel_entry',

        onDestroy: function () {window.location = '/#'},

        sliders: ['count', 'comp'],

        defaultSliderVal: 3,

        defaultSliderOptions: {
          value:3,
          min: 1,
          max: 5,
          step: 1
        },

        sliderLabels: {
          count: {
            1: 'Don\'t bother',
            2: 'Not great',
            3: 'Average',
            4: 'Looking good',
            5: 'Get here NOW'
          },
          comp: {
            1: 'Sausage fest',
            2: 'More guys',
            3: 'A good mix',
            4: 'More girls',
            5: 'Clambake'
          },
        },

        template: _.template($('#report_entry_template').html()),

        renderSliders: function (sliders) {
          var self = this;

          _.each(sliders, function(slider){
            var sliderEl = $('#' + slider + '-slider'),
                sliderValueEl = $('#' + slider),
                sliderLabelEl = $('#' + slider + '-label'),
                opts = self.defaultSliderOptions

            opts.slide = function(event, ui) {
              sliderValueEl.val(ui.value);
              sliderLabelEl.text(self.sliderLabels[slider][ui.value]);
            }

            sliderEl.slider(opts);
            sliderValueEl.val(self.defaultSliderVal)
            sliderLabelEl.text(self.sliderLabels[slider][sliderValueEl.val()])
          })

          return

        },

        remove: function() {
           this.$el.children('#report_entry_container').remove()
        },

        submit: function () {
          var self = this;
              form = $('#report_entry'),
              url = document.domain + ':' + location.port,
              formData = {count:{}, location:{}, composition:{}};

          formData.reporter = form.children('#reporter').val();
          formData.location.name = form.children('#location').val();
          formData.location.address = form.children('#address').val();

          formData.count.value = parseInt(form.children('#count-slider-container').children('#count').val());
          formData.count.label = form.children('#count-slider-container').children('#count-label').text();

          formData.composition.value = parseInt(form.children('#count-slider-container').children('#comp').val());
          formData.composition.label = form.children('#count-slider-container').children('#comp-label').text();

          formData.line = ((form.children('#line').prop('checked')) ? true : false);

          setCookie('bb_reporter', formData.reporter, 30)

          console.log(formData)

          $.post('/report', formData, function(response) {
            window.location = '/#';
          });

          return false;

        }
    })

    var ReportListView = Backbone.View.extend({
        el: '#report_list_container',

        orderBy: 'createdAt',
        orderDir: 'desc',

        events: {
          'change #sort_prop'   : 'changeOrder',
          'change #sort_dir'   : 'changeOrder',
        },

        initialize:function () {
            _.bindAll(this, 'render');
            this.reportListElement = this.$el.children('#report_list');
            this.collection.on('reset', this.render, this);
            this.collection.on('sort', function () {
              this.reportListElement.empty();
              this.render();
            }, this);
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

            $('#dashboard').append(this.reportEntryView.render().el)
            this.reportEntryView.renderSliders(this.reportEntryView.sliders)
            $('#dashboard_link').show();
            $('#create_report').hide();

        }
    });

    var app = new AppRouter();
    Backbone.history.start();


    // var App = new ReportListView
});