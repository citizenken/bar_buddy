(function(){

    app.ReportListView = Backbone.View.extend({
        tagName: 'ul',

        template: _.template('<li>{{ report.reporter }} says {{ report.location }} has {{ report.count }} people in line</li>'),

        render: function () {
            this.$el.html(this.template(this.model));
            return this;
        }
    })

})();