var yml = require('./yml'),
  r = require('../../node_modules/rethinkdb');

module.exports = {

  /**
   * Creating a DB as defined in the YML file.
   */
  dbCreate: function(err, connection) {
    return r.dbCreate(yml.parse().db).run(connection, function() {
      connection.close();
    });
  },

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
  },

  /**
   * Filtering records from the DB.
   *
   * @param table
   *   The name of the table.
   * @param data
   *   A json object to filter by.
   * @param callback
   *   A callback function passed with the cursor object.
   * @param err
   *   RethinkDB error object.
   * @param connection
   *   RethinkDB connection object.
   */
  filter: function(table, data, callback, err, connection) {
    r.db(yml.parse().db).table(table).filter(data).run(connection, callback);
  }

};
