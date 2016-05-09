var yml = require('./yml'),
  r = require('../../node_modules/rethinkdb');

module.exports = {

  /**
   * Establish connection for the DB.
   */
  invokeCallback: function(callback) {
    return r.connect( {host: yml.parse().host, port: yml.parse().port}, callback);
  },

  /**
   * Create a table.
   */
  tableCreate: function(table, done, err, connection) {
    var db = r.db(yml.parse().db);

    db.tableCreate(table).run(connection, function(err, result, next) {

      if (err) {
        throw err;
      }

      console.log(JSON.stringify(result, null, 2));

      // how to do the next task?
    });
  }

};
