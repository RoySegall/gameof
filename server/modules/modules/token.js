var yml = require('./yml');

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
      'expired_in': 120
    };
  },

  /**
   * Generating access token string.
   *
   * @param user
   *   The user object.
   */
  accessTokenGenerate: function(user) {
    return 'a';
  },

  /**
   * Generating refresh token string.
   *
   * @param user
   *   The user object.
   */
  refreshTokenGenerate: function(user) {
    return 'b';
  }

};
