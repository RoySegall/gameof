var gameOf = require('./modules/modules'),
    express = require('express'),
    bodyParser =require('body-parser'),
    app = express(),
    _ = require('underscore');

// Db stuff here.
gameOf.yml.setYmlPath(__dirname + '/config/config.yml');
gameOf.plug.setPluginsPath(__dirname + '/modules/plugins');

// Set up the plugins info.
gameOf.plug.setPlugins('express');
gameOf.plug.setPlugins('validation');

// Init the express plugins.
pluginsExpress = express();

_.map(gameOf.plug.getPlugins(), function(item) {

  if (item.group != 'express') {
    // Only express plugins here.
    return;
  }

  var plugin = gameOf.plug.getPlugin(item.id);

  // Go over the general allowed methods and check if the plugin implement them.
  _.map(gameOf.yml.parse().allowed_methods, function(type) {
    if (item.hasOwnProperty(type)) {
      // Set the rest request type callback from the annotation.
      pluginsExpress[type](item.path, plugin[item[type]]);
    }
  });
});

app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(pluginsExpress)
  .listen(3000);
