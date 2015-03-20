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
    count       : { model: 'count', required: true},
    composition : { model: 'composition', required: true}
  },

  publishCreate: function (values, req) {
    var watchers = this.watchers();

    sails.sockets.emit(watchers[0].id, 'report', {
        verb: 'created',
        data: values,
        id: values[this.primaryKey]
    });

    // Subscribe all watchers to the new instance, if you're into that
    this.introduce(values[this.primaryKey]);
  }

};

