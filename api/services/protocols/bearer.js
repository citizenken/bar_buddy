/*
 * Bearer Authentication Protocol
 *
 * Bearer Authentication is for authorizing API requests. Once
 * a user is created, a token is also generated for that user
 * in its passport. This token can be used to authenticate
 * API requests.
 *
 */

exports.authorize = function(token, done) {




  // var query = 'SELECT protocol, password, accessToken, provider, identifier, tokens, user, id, createdAt, updatedAt ' +
  //             'FROM (SELECT *, common_schema.get_option(tokens, \'accessToken\') AS jsonAccessToken FROM passport) AS tblJson ' +
  //             'WHERE tblJson.jsonAccessToken = \'' + token + '\'';

  // console.log(query);

  Passport.findOne({ accessToken: token }, function(err, passport) {
    if (err) { return done(err); }
    if (!passport) { return done(null, false); }
    User.findById(passport.user, function(err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user, { scope: 'all' });
    });
  });


  // Passport.query(query, function(err, passport) {
  //   if (err) { return done(err); }
  //   if (!passport) {
  //     Passport.findOne({ accessToken: token }, function(err, passport) {
  //       if (err) { return done(err); }
  //       if (!passport) { return done(null, false); }
  //       findUser(passport, done);
  //     });
  //   }
  //   findUser(passport, done);
  // });

  // findUser = function (passport, done) {
  //   User.findById(passport.user, function(err, user) {
  //     if (err) { return done(err); }
  //     if (!user) { return done(null, false); }
  //     return done(null, user, { scope: 'all' });
  //   });
  // };
};


