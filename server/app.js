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

  _.map(['get', 'post', 'patch', 'put', 'delete'], function(type) {
    if (item.hasOwnProperty(type)) {
      pluginsExpress[type](item.path, plugin[item.get]);
    }
  });

});

app
  .use(pluginsExpress)
  .listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
