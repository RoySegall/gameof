/**
 * @id games
 * @path /api/games
 * @allowedMethods get, post, patch
 */
function plugin() {

  return {

    restGet: function(req, res) {
      res.send('Get a random games');
    },

    postGet: function() {

    }
  };
}

module.exports = plugin();
