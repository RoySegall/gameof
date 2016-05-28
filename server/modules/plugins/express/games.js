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
      var formatter = module.exports.gameOf.formatter;

      var filter = {};

      if (req.params.id != undefined) {
        filter.id = req.params.id;
      }

      db.invokeCallback(db.filter.bind(null, 'games', filter, function(err, cursor) {
        if (err) {
          throw err;
        }

        cursor.toArray(function(err, result) {
          formatter.jsonizer(res, result)
        });
      }));
    },

    postGet: function(req, res) {
      var db = module.exports.gameOf.db;
      var formatter = module.exports.gameOf.formatter;
      var plug = module.exports.gameOf.plug;

      if (req.loggedInUser == undefined) {
        formatter.httpResponse(res, 401, 'The user object was not found.');
        return;
      }

      var account = req.loggedInUser;

      if (!account.admin) {
        formatter.httpResponse(res, 401, 'You are not authorized to create a game.');
        return;
      }
      
      var validate_results = plug.getPlugin('games_validation').validate(req.body);

      console.log(validate_results);

      if (validate_results != null) {
        formatter.httpResponse(res, 401, 'The request body is un-valid', validate_results);
        return;
      }

      db.invokeCallback(db.insertAsync.bind(null, 'games', req.body, function(err, result) {
        if (err) {
          throw err;
        }

        req.body.id = result.generated_keys[0];
        formatter.jsonizer(res, req.body);
      }));
    }
  };
}

module.exports = plugin();
