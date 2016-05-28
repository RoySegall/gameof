/**
 * @id games
 * @path /api/games
 *
 * @subRoute /:id
 *
 * @get restGet
 * @post postGet
 * @patch patchGet
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

      if (validate_results != null) {
        formatter.httpResponse(res, 400, 'The request body is un-valid', validate_results);
        return;
      }

      db.invokeCallback(db.insertAsync.bind(null, 'games', req.body, function(err, result) {
        if (err) {
          throw err;
        }

        req.body.id = result.generated_keys[0];
        req.body.uid = account.id;
        formatter.jsonizer(res, req.body);
      }));
    },

    patchGet: function(req, res) {
      var db = module.exports.gameOf.db;
      var plug = module.exports.game;
      var formatter = module.exports.gameOf.formatter;

      if (req.params.id == undefined) {
        formatter.httpResponse(res, 401, 'The id is missing.');
        return;
      }

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

      if (validate_results != null) {
        formatter.httpResponse(res, 400, 'The request body is un-valid', validate_results);
        return;
      }

      db.invokeCallback(db.update.bind(null, 'games', req.params.id, req.body, function(err, object) {
        db.invokeCallback(db.get.bind(null, 'games', req.params.id, function(err, object) {
          if (err) {
            throw err;
          }

          formatter.jsonizer(res, object);
        }));
      }));
    }
  };
}

module.exports = plugin();
