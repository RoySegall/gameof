var yml = require('./yml'),
  r = require('../../node_modules/rethinkdb');

module.exports = {

  /**
   * Establish connection for the DB.
   */
  invokeCallback: function(callback) {
    r.connect( {host: yml.parse().host, port: yml.parse().port}, callback);
  },

  /**
   * Create a table.
   */
  tableCreate: function(table, err, connection) {
    r.db(yml.parse().db).tableCreate(table).run(connection, function(err, result) {

      if (err) {
        throw err;
      }

      console.log(JSON.stringify(result, null, 2));
    });
  }

};
