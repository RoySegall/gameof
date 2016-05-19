/**
 * @id access_token
 * @path /api/access_token
 *
 * @post describeEndPoints
 */
function plugin() {

  return {

    describeEndPoints: function(req, res) {
      if (req.body.username == null || req.body.password == undefined) {
        res.send('You need to pass the username and password.');
        new Error();
      }

      // Search for the user.

      // valid the username and password.

      // Generate and access token and bind it to the user.
    }

  };
}

module.exports = plugin();
