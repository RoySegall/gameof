module.exports = {
  
  setYmlPath: function(path) {
    this.ymlPath = path;
  },

  getYmlPath: function() {
    return this.ymlPath;
  },

  parse: function() {
    var yml = require(module.parent.exports.getModulesPath() + 'yamljs');
    return yml.load(this.getYmlPath());
  }

};
