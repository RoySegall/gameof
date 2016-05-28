module.exports = {

  setModulesPath: function(path) {
    this.modulePath = path;
  },

  getModulesPath: function() {
    return this.modulePath;
  },

  // Core modules.
  yml: require('./modules/yml'),
  db: require('./modules/db'),
  plug: require('./modules/plug'),
  token: require('./modules/token'),
  formatter: require('./modules/formatter'),

  // Data related modules.
  games: {},
  users: require('./modules/users'),
  question: {},
  stats: {},
  rtm: {}
};
