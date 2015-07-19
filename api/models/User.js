var User = {
  // Enforce model schema in the case of schemaless databases
  schema: true,

  attributes: {
    username     : { type: 'string', unique: true },
    email        : { type: 'email',  unique: true },
    passports    : { collection: 'Passport', via: 'user' },
    votedReviews : { collection: 'Report', via: 'voted'},
    reportsCreated : { collection: 'report', via: 'reporter' },
    isActive     : { type: 'boolean', defaultsTo: true, required: true },
    isAdmin      : { type: 'boolean', defaultsTo: false, protected: true },
  }
};

module.exports = User;
