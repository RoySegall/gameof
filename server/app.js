var gameOf = require('./modules/modules');
// Db stuff here.
gameOf.yml.setYmlPath(__dirname + '/config/config.yml');

// Run over all the plugins and get the information.
gameOf.plug.getListPlugins();
