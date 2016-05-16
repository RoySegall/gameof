var gameOf = require('./modules/modules'),
    express = require('express'),
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
  if (item.id.indexOf('_validation') != -1) {
    // todo move to method.
    return;
  }

  var plugin = gameOf.plug.getPlugin(item.id);

  if (item.allowedMethods.indexOf('get') != -1) {
    pluginsExpress.get(item.path, plugin.restGet);
  }

});

app
  .use(pluginsExpress)
  .listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
