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
  tableCreate: function(table, err, connection) {
    var db = r.db(yml.parse().db);

    return db.tableCreate(table).run(connection, function(err, result) {

      if (err) {
        throw err;
      }

      // Close the connection.
      connection.close();
    });
  },

  /**
   * Inserting data into a table.
   */
  insert: function(table, data, err, connection) {
    var db = r.db(yml.parse().db);

    return db.table(table).insert(data).run(connection, function() {
      connection.close();
    });
  }

};
