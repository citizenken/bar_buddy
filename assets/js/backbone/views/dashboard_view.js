(function(){
    app.DashboardView = Backbone.View.extend({
        el: $('#dashboard'),

        template: _.template($('#dashboard-template').html()),

        initialize: function (){
            app.reports.fetch()
            console.log(this.model)
        },

        render: function (){
            this.$el.html(this.template())
            return this
        }
    })

})();