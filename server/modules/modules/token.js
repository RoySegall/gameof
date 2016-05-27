var yml = require('./yml');
var r = require('../../node_modules/rethinkdb');
var crypto = require('crypto');

module.exports = {

  /**
   * Generate access token for users.
   *
   * @param user
   *   The user object.
   */
  tokenGenerate: function(user) {
    return {
      'access_token': module.exports.accessTokenGenerate(user),
      'refresh_token': module.exports.refreshTokenGenerate(user),
      'expired_in': Math.round((new Date().getTime() / 1000) + yml.parse().token_length),
      'uid': user.id
    };
  },

  /**
   * Generating access token string.
   *
   * @param user
   *   The user object.
   */
  accessTokenGenerate: function(user) {
    var base_string = user.name + user.pass + (new Date().getTime() / 1000);

    for (var i = 0; i <= yml.parse().salt_round; i++) {
      base_string = crypto.createHmac('sha256', base_string).digest('hex');
    }

    return base_string;
  },

  /**
   * Generating refresh token string.
   *
   * @param user
   *   The user object.
   */
  refreshTokenGenerate: function(user) {
    var base_string = user.name + (new Date().getTime() / 1000) + user.pass;

    for (var i = 0; i <= yml.parse().salt_round; i++) {
      base_string = crypto.createHmac('sha256', base_string).digest('hex');
    }

    return base_string;
  },

  deleteExpiredTokens: function() {

  },

  getUserByToken: function(access_token, callback) {
    var gameOf = require('../modules');

    return r.connect(gameOf.db.connection(), function(err, connection) {
      var db = gameOf.db.r();

      db.table('access_token').filter({access_token: access_token}).eqJoin('uid', db.table('users')).run(connection, function(err, cursor) {
        if (err) {
          throw err;
        }

        cursor.toArray(callback);
      });
    });
  },

  deferAccessToken: function(req, res, next) {
    if (req.headers.access_token != null) {
      module.exports.getUserByToken(req.headers.access_token, function(err, result) {
        req.loggedInUser = result[0].right;
        next();
      });
    }
    else {
      next();
    }
  }
  
};
