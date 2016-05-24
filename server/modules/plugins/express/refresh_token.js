var gameOf = require('../../modules');

/**
 * @id refresh_token
 * @path /api/refresh_token
 *
 * @post refreshAccessToken
 */
function plugin() {

  return {

    refreshAccessToken: function(req, res) {
      // r.db('gameof').table('access_token').filter({access_token: 'string'}).eqJoin('uid', r.db('gameof').table('users'))
    }
  };
}

module.exports = plugin();
