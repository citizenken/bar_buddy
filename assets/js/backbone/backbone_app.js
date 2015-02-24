$(function() {

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

        flattenAttr: function(response, data, attr) {
            _.each(data, function(value,key){
                response[ attr + '_' + key] = value;
                return response
            })
        }
    })

// Collection
    var Reports = Backbone.Collection.extend({
        url: '/report',
        model: Report
    })

    var reports = new Reports;

// Views
    var ReportView = Backbone.View.extend({
        tagName: 'li',

        template: _.template($('#report-template').html()),

        render: function () {
            console.log(this.model.toJSON())
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    })

    var ReportListView = Backbone.View.extend({
        el: '#report_list',

        initialize: function () {
            _.bindAll(this, "render");
            reports.on('sync', this.render);
            reports.fetch();
        },

        render: function () {
            var self = this;
            console.log(this)

            _.each(reports.models, function(report) {
                var reportModel = new ReportView({model: report})
                self.$el.append(reportModel.render().el)
            })
            // this.el.html(this.template())
            return this
        }
    })



    var App = new ReportListView




});