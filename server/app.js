var gameOf = require('./modules/modules');

// Db stuff here.
gameOf.yml.setYmlPath(__dirname + '/config/config.yml');
gameOf.plug.setPluginsPath(__dirname + '/modules/plugins');

// Set up the plugins info.
gameOf.plug.setPlugins('express');
gameOf.plug.setPlugins('validation');
