var bcrypt = require('../../node_modules/bcrypt');
var db = require('../modules/db');

module.exports = {

  /**
   * Get all the users in the system.
   */
  getUsers: function() {
  },

  /**
   * Get a specific users.
   */
  getUser: function() {

  },

  /**
   * Clear user cache.
   */
  clearUsers: function() {
    this.users = [];
  },

  /**
   * Create user in the DB.
   *
   * @param user
   *   The user object.
   */
  createUser: function(user) {
    return db.invokeCallback(db.insert.bind(null, 'users', user));
  },

  /**
   * Encrypting a password for the user.
   *
   * @param password
   *   The password
   *
   * @return string
   *   The encrypted password.
   */
  encryptPassword: function(password) {
    const saltRounds = 10;

    var salt = bcrypt.genSaltSync(saltRounds);

    return bcrypt.hashSync(password, salt);

  }

};
