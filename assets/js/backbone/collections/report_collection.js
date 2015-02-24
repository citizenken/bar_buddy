(function(){

    var Reports = Backbone.Collection.extend({
        url: '/report',
        model: app.Report
    })

    app.reports = new Reports()

})();