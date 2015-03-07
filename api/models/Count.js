/**
* Count.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    value   : { type: 'integer', required: true, minLength: 1, maxLength: 5},
    label   : { type: 'string', required: true, unique: true},
    reports : { collection: 'report', via: 'count' }
  }
};

