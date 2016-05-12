var gameOf = require('./modules/modules');

// Db stuff here.
gameOf.yml.setYmlPath(__dirname + '/config/config.yml');
gameOf.plug.setPluginsPath(__dirname + '/modules/plugins');

// Run over all the plugins and get the information.
console.log(gameOf.plug.getPlugins('express'));
