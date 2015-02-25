/**
* Report.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    reporter    : { model: 'reporter', required: true },
    location    : { model: 'location', required: true },
    line        : { type: 'boolean', required: true, defaultsTo: true },
    count       : { type: 'integer', required: true, defaultsTo: 0},
    composition : { type: 'integer', required: true, defaultsTo: 3}
  },

  // beforeValidation: function(values, next) {
  //   console.log(values)
  //   next();
  // },
};

