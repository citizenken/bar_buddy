/**
 * reissueBearer Policy
 *
 * Policy for reissuing bearer tokens
 *
 * @param {Object}   req
 * @param {Object}   res
 * @param {Function} next
 */

module.exports = function (req, res, next) {
    token = tokenHandler.getTokenHeader(req)
    console.log(token)
    tokenHandler.getNewToken(token, function (err, newToken) {
        if (err) res.send(err)
        res.set('Authentication', newToken)
        next();
    })

};
