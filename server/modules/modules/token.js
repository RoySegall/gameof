var yml = require('./yml');
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
      base_string = crypto.createHmac('sha256', base_string).digest('hex')
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
      base_string = crypto.createHmac('sha256', base_string).digest('hex')
    }

    return base_string;
  }

};