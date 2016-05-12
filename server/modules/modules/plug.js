var
  path = require('../../node_modules/path'),
  fs = require('fs'),
  annotations = require('../../node_modules/annotations');
  _ = require('../../node_modules/underscore');

module.exports = {

  setPluginsPath: function(path) {
    this.plguinsPath = path;
  },

  getPluginsPath: function() {
    return this.plguinsPath;
  },

  /**
   * Get all the plugins.
   *
   * @param type
   */
  getPlugins: function(type) {

    var plugins_path = path.resolve(this.getPluginsPath(), type);

    return _.map(fs.readdirSync(plugins_path), function(file, item) {
      // var content = fs.readFileSync(plugins_path + '/' + file, 'utf8');

      console.log( annotations.getSync(plugins_path + '/' + file));


      return file;
    });
  },

  /**
   * Get a specific plugin.
   *
   * @param type
   * @param id
   */
  getPlugin: function(type, id) {

  }
  
};
