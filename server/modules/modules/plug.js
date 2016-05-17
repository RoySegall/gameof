var
  path = require('../../node_modules/path'),
  fs = require('fs'),
  annotations = require('../../node_modules/annotations'),
  _ = require('../../node_modules/underscore'),
  Joi = require('../../node_modules/joi');

module.exports = {

  /**
   * Set the path of the plugins path. Should be invoked when bootstrapping.
   *
   * @param path
   *   The path of the base folder for the plugins in which plugins type will
   *   be set in sub-directories.
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
   *   The information of the plugins.
   */
  setPluginsInfo: function(info) {
    if (this.pluginsInfo != undefined) {
      this.pluginsInfo = _.extend(this.pluginsInfo, info);
    }
    else {
      this.pluginsInfo = info;
    }
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
   * Return all the plugins info.
   *
   * @returns {*}
   */
  getPlugins: function() {
    return this.pluginsInfo;
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

    var instance = require(this.getPluginInfo(plugin).plugin_path);

    if (plugin.indexOf('_validation') != -1) {
      instance.validate = function(schema) {
        var template = instance.template();

        return Joi.validate(schema, template, {'abortEarly': false}, function (err, value) {

          if (err == null) {
            return null;
          }

          return _.object(_.map(err.details, function(message) {
            return [message.path, message.message];
          }));
        });
      };
    }

    return instance;
  },

  /**
   * Set up plugins information.
   *
   * @param type
   *   The type of the plugins. Will be the name of the folder in which the
   *   plugins is located.
   */
  setPlugins: function(type) {

    // Construct the plugins path.
    var plugins_path = path.resolve(this.getPluginsPath(), type);

    var plugins = _.object(_.map(fs.readdirSync(plugins_path), function(item) {

      // Get the annotation of the plugin.
      var annotations_info = annotations.getSync(plugins_path + '/' + item).plugin;

      // Save the plugin path. Used when instantiate a plugin.
      annotations_info.plugin_path = plugins_path + '/' + item;

      // Set the group of the plugin.
      annotations_info.group = type;

      return [annotations_info.id, annotations_info];
    }));

    // Sort of a low level cache.
    this.setPluginsInfo(plugins);

    return plugins;
  },

  /**
   * Jsoning a value to the page.
   *
   * @param res
   *   Express response object.
   * @param value
   *   The value to jsoninze.
   */
  jsonizer: function(res, value) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(value));
  }

};
