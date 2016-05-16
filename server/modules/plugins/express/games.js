/**
 * @id games
 * @path /api/games
 * @allowedMethods get, post, patch
 *
 * @get restGet
 * @post postGet
 */
function plugin() {

  return {

    restGet: function(req, res) {
      res.send('Get a random games');
    },

    postGet: function(req, res) {
      res.send('posting a games')
    }
  };
}

module.exports = plugin();
