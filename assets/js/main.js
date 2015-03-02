// Require.js allows us to configure shortcut alias
// There usage will become more apparent further along in the tutorial.
require.config({
  baseUrl: '/js',

  paths: {
    handlebars: '//cdnjs.cloudflare.com/ajax/libs/handlebars.js/3.0.0/handlebars.min',
    jquery: '//code.jquery.com/jquery-1.11.2.min',
    jqueryui: '//code.jquery.com/ui/1.11.3/jquery-ui.min',
    underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.2/underscore-min',
    backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min',
    bbmodal: 'backbone.bootstrap-modal',
    bootstrap: '//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min'
  },

  'shim': {
    'bootstrap' : { 'deps' :['jquery'] },

    'socket.io': {
      'exports': 'io'
    },
    'sails.io': {
      'deps': ['socket.io'],
      'exports': 'io'
    }
  }

});

require([
  'app',
], function(App){
  // The 'app' dependency is passed in as 'App'
  App;
});