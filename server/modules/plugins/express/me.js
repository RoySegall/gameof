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

      module.exports.gameOf.token.getUserByToken(req.headers.access_token, function(err, result) {
        if (err) {
          throw err;
        }

        res.send(result[0].right);
      });

    }
  };
}

module.exports = plugin();
