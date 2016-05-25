var gameOf = require('../../modules');
var r = require('../../../node_modules/rethinkdb');

/**
 * @id me
 * @path /api/me
 *
 * @get getUser
 */
function plugin() {

  return {

    getUser: function(req, res) {

      if (req.headers.access_token == null) {
        throw new Error('Access token was not provided.');
      }


      console.log(gameOf.token.getUserByToken(req.headers.access_token));

      r.connect(gameOf.db.connection(), function(err, connection) {
        var db = gameOf.db.r();

        db.table('access_token').filter({access_token: req.headers.access_token}).eqJoin('uid', db.table('users')).run(connection, function(err, cursor) {
          if (err) {
            throw err;
          }

          cursor.toArray(function(err, result) {
            if (err) {
              throw err;
            }

            res.send(result[0].right);
          })
        });
      });

    }
  };
}

module.exports = plugin();
