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
    var ReportList = Backbone.Collection.extend({
        url: '/report',
        model: Report
    })

// Views
    var ReportView = Backbone.View.extend({
        tagName: 'li',

        template: Handlebars.template($('#report-template').html()),

        render: function () {
            console.log(this.model.toJSON())
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    })

    var ReportListView = Backbone.View.extend({
        el: '#report_list',

        initialize:function () {
            _.bindAll(this, 'render');
            this.model.on('reset', this.render, this);
        },

        render: function () {
            var self = this,
                reports = this.model;

            _.each(reports.models, function(report) {
                var reportModel = new ReportView({model: report})
                self.$el.append(reportModel.render().el)
            })
            // this.el.html(this.template())
            return this
        }
    })

    var AppRouter = Backbone.Router.extend({

        routes:{
            '':'dashboard'
            // 'wines/:id':'wineDetails'
        },

        dashboard: function () {
            this.reportList = new ReportList();
            this.reportListView = new ReportListView({model:this.reportList});
            this.reportList.fetch({reset: true});
            $('#report_list_container').html(this.reportListView.render().el);
        },

        // wineDetails:function (id) {
        //     this.wine = this.wineList.get(id);
        //     this.wineView = new WineView({model:this.wine});
        //     $('#content').html(this.wineView.render().el);
        // }
    });

    var app = new AppRouter();
    Backbone.history.start();


    // var App = new ReportListView




});