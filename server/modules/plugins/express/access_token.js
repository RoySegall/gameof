var gameOf = require('../../modules');
var _ = require('../../../node_modules/underscore')

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

      var filter = {
        'name': req.body.username,
        'pass': gameOf.users.encryptPassword(req.body.password)
      };
      gameOf.db.invokeCallback(gameOf.db.filter.bind(null, 'users', filter, function(err, cursor) {
        if (err) {
          throw err;
        }

        cursor.toArray(function(err, result) {
          if (err) {
            throw err;
          }

          if (result.length == 0) {
            res.status(401);
            gameOf.plug.jsonizer(res, {
              'message': 'There is no user with the provided credentials.',
              'statusCode': 401
            });
          }
          else {
            var user = result[0];
            // Generate and access token and bind it to the user.
            // todo: prevent generation in case we have one.
            var access_token = gameOf.token.tokenGenerate(user);
            gameOf.db.invokeCallback(gameOf.db.insertAsync.bind(null, 'access_token', access_token, function(err, info, bar) {
              res.send(access_token);
            }));
          }
        });
      }));
    }

  };
}

module.exports = plugin();
