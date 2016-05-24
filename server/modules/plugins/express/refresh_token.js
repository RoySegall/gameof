var gameOf = require('../../modules');
var _ = require('../../../node_modules/underscore')

/**
 * @id refresh_token
 * @path /api/refresh_token
 *
 * @post refreshAccessToken
 */
function plugin() {

  return {

    refreshAccessToken: function(req, res) {
    }
  };
}

module.exports = plugin();
