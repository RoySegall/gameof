/**
 * @id games
 * @path /api/games
 *
 * @subRoute /:id, /:id/:name
 *
 * @get restGet
 * @post postGet
 */
function plugin() {

  return {

    restGet: function(req, res) {
      var db = module.exports.gameOf.db;
      var plug = module.exports.gameOf.plug;

      var filter = {};

      if (req.params.id != undefined) {
        filter.id = req.params.id;
      }

      db.invokeCallback(db.filter.bind(null, 'games', filter, function(err, cursor) {
        if (err) {
          throw err;
        }

        cursor.toArray(function(err, result) {
          plug.jsonizer(res, result)
        });
      }));
    },

    postGet: function(req, res) {
      res.send('posting a games')
    }
  };
}

module.exports = plugin();
