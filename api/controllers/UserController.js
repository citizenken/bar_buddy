/**
 * UserController
 *
 * @description :: Server-side logic for managing reporters
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    addRelevence: function (req, res) {
      var userId = req.params.id,
          votes = req.body.votes;

      User.update({id: userId}, {votedReviews: votes}).exec(function (err, user) {
        if (err) return res.json(500, {error: err});
        res.json(user);
      });

    },
};