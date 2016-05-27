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
    var db = module.parent.exports.db;
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
    var crypto = require('crypto');
    return crypto.createHmac('sha256', password).digest('hex');
  },

  /**
   * Authenticate user.
   *
   * @param name
   *   The username.
   * @param pass
   *   The password.
   *
   * @return object
   */
  validateUser: function(name, pass) {

  }

};
