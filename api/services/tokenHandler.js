var crypto = require('crypto'),
    tokenHandler = {};

tokenHandler.getNewToken = function (oldToken, callback) {
    var newToken
    Passport.findOne({accessToken: oldToken}).exec(function (error, passport) {
        if (error) callback('Passport not found', null)
        newToken = crypto.randomBytes(48).toString('base64');
        passport.accessToken = newToken
        passport.save(function (error, passport) {
            if (error) callback('Something went wrong updating the accessToken', null)
            callback(null, newToken)
        })
    })
},

tokenHandler.getTokenHeader = function (req) {
  var token;
  if (req.headers && req.headers.authorization) {
    var parts = req.headers.authorization.split(' ');
    if (parts.length == 2) {
      var scheme = parts[0]
        , credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      }
    } else {
      return this.fail(400);
    }
  }

  if (req.body && req.body.access_token) {
    if (token) { return this.fail(400); }
    token = req.body.access_token;
  }

  if (req.query && req.query.access_token) {
    if (token) { return this.fail(400); }
    token = req.query.access_token;
  }
  return token
}

module.exports = tokenHandler;