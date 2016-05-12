var
  path = require('../../node_modules/path'),
  fs = require('fs'),
  annotations = require('../../node_modules/annotations');
  _ = require('../../node_modules/underscore');

module.exports = {

  /**
   * Set the path of the plugins path. Should be invoked when bootstraping.
   * @param path
   */
  setPluginsPath: function(path) {
    this.plguinsPath = path;
  },

  /**
   * Get the plugins path.
   *
   * @returns {*}
   */
  getPluginsPath: function() {
    return this.plguinsPath;
  },

  /**
   * Set the plugins info. this will used for a small caching.
   *
   * @param info
   */
  setPluginsInfo: function(info) {
    this.pluginsInfo = info;
  },

  /**
   * Return all the plugins info.
   *
   * @returns {*}
   */
  getPluginsInfo: function() {
    return this.pluginsInfo;
  },

  /**
   * Get the plugin information.
   *
   * @param plugin
   *   The plugin ID.
   *
   * @returns {*}
   */
  getPluginInfo: function(plugin) {
    return this.pluginsInfo[plugin];
  },

  /**
   * Get the plugin instance.
   *
   * @param plugin
   *   The plugin ID.
   *
   * @returns {*}
   */
  getPlugin: function(plugin) {
    return require(this.getPluginInfo(plugin).path);
  },

  /**
   * Set up plugins information.
   *
   * @param type
   */
  setPlugins: function(type) {

    // Construct the plugins path.
    var plugins_path = path.resolve(this.getPluginsPath(), type);

    var plugins = _.object(_.map(fs.readdirSync(plugins_path), function(item) {

      // Get the annotation of the plugin.
      var annotations_info = annotations.getSync(plugins_path + '/' + item).plugin;

      // Save the plugin path. Used when instantiate a plugin.
      annotations_info.path = plugins_path + '/' + item;

      return [annotations_info.id, annotations_info];
    }));

    // Sort of a low level cache.
    this.setPluginsInfo(plugins);

    return plugins;
  }

};
