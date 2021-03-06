/**
 * @id access_token
 * @path /api/access_token
 *
 * @post authenticateUser
 */
module.exports = {

  authenticateUser: function(req, res) {

    var gameOf = module.exports.gameOf;

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
          gameOf.formatter.jsonizer(res, {
            'message': 'There is no user with the provided credentials.',
            'statusCode': 401
          });
        }
        else {
          var user = result[0];
          // Generate and access token and bind it to the user.
          gameOf.db.invokeCallback(gameOf.db.filter.bind(null, 'access_token', {'uid': user.id}, function(err, cursor) {
            if (err) {
              throw err;
            }

            cursor.toArray(function(err, result) {

              if (err) {
                throw err;
              }

              if (result.length == 0) {
                var access_token = gameOf.token.tokenGenerate(user);
                gameOf.db.invokeCallback(gameOf.db.insertAsync.bind(null, 'access_token', access_token, function(err, info, bar) {
                  res.send(access_token);
                }));
              }
              else {
                res.send(result[0]);
              }
            })
          }));
        }
      });
    }));
  }
};
