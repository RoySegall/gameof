var yml = require('../../node_modules/yamljs');

module.exports = {
  
  setYmlPath: function(path) {
    this.ymlPath = path;
  },

  getYmlPath: function() {
    return this.ymlPath;
  },

  parse: function() {
    return yml.load(this.getYmlPath());
  }

};
