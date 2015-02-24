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
    count       : { type: 'int', required: true, defaultsTo: 0},
    composition : { type: 'int', required: true, defaultsTo: 3}
  },

  beforeValidation: function(values, next) {
    console.log(values)
    if (typeof values.reporter !== 'number') {
        Reporter.findOrCreate({name: values.reporter}).exec(function(data){
            console.log(data)
            values.reporter = data.id;
        })
    };
    next();
  },
};

