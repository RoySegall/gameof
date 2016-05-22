var gameOf = require('../../modules');
var bcrypt = require('../../../node_modules/bcrypt');

/**
 * @id access_token
 * @path /api/access_token
 *
 * @post authenticateUser
 */
function plugin() {

  return {

    authenticateUser: function(req, res) {
      if (req.body.username == null || req.body.password == undefined) {
        res.send('You need to pass the username and password.');
        new Error();
      }

      gameOf.db.invokeCallback(gameOf.db.filter.bind(null, 'users', {'name': req.body.username}, function(err, cursor) {
        if (err) {
          throw err;
        }

        cursor.toArray(function(err, result) {
          if (err) {
            throw err;
          }

          var object = JSON.stringify(result, null, 2);

          res.send(object);

        });
      }));

      // Search for the user.

      // valid the username and password.

      // Generate and access token and bind it to the user.
    }

  };
}

module.exports = plugin();
