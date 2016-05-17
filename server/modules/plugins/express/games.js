var plug = require('../../modules/plug');

/**
 * @id games
 * @path /api/games
 *
 * @get restGet
 * @post postGet
 */
function plugin() {

  return {

    restGet: function(req, res) {
      plug.jsonizer(res, {'foo': 'bar', 'bar': 'foo'});
    },

    postGet: function(req, res) {
      res.send('posting a games')
    }
  };
}

module.exports = plugin();
