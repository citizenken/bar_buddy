// Require.js allows us to configure shortcut alias
// There usage will become more apparent further along in the tutorial.
require.config({
  baseUrl: '/js',

  paths: {
    handlebars: '//cdnjs.cloudflare.com/ajax/libs/handlebars.js/3.0.0/handlebars.min',
    jquery: '//code.jquery.com/jquery-1.11.2.min',
    underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.2/underscore-min',
    backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min'
  },

  'shim': {
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
  // The "app" dependency is passed in as "App"
  App;
});