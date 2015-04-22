module.exports = function (req, res, next) {
  	if (!req.user.isAdmin) return res.send('Permission denied', 403);
  	next();

};