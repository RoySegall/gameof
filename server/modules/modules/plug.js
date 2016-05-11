var path = require('../../node_modules/path'), plugger = require('../../node_modules/plug').create();

module.exports = {

  setPluginsPath: function(path) {
    this.plguinsPath = path;
  },

  getPluginsPath: function() {
    return this.plguinsPath;
  },

  getPlugins: function() {
    plugger.find(path.resolve(this.getPluginsPath()));
  }
  
};
