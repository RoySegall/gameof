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
    return fs.readdir(plugins_path, function(err, files) {

      files.every(function(file) {

        annotation(plugins_path + '/' + file, function(AnnotationReader) {
          // todo build an array from the annotation info.
          var annotations = AnnotationReader.getClassAnnotations();
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
