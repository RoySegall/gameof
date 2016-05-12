var
  path = require('../../node_modules/path'),
  fs = require('fs'),
  annotation = require('../../node_modules/annotation');

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
    var plugins_info = [];
    return fs.readdir(plugins_path, function(err, files) {

      return files.every(function(file) {

        annotation(plugins_path + '/' + file, function(AnnotationReader) {
          var plugin_annotations = AnnotationReader.getClassAnnotations();
          var plugin_info = {};
          var id;

          plugin_annotations.every(function(plugin_annotation) {
            if (plugin_annotation.key == 'id') {
              id = plugin_annotation.value;
            }

            plugin_info[plugin_annotation.key] = plugin_annotation.value;

            return true;
          });

        });

        return true;
      });

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
