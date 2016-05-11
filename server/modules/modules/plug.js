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
          //get annotations related to the class
          console.log(AnnotationReader.getClassAnnotations());

          ////get annotations related to the method test
          //console.log(AnnotationReader.getMethodAnnotations('test'));
          //
          ////get annotations related to the property test
          //console.log(AnnotationReader.getPropertyAnnotations('test'));
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
