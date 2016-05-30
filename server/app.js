var gameOf = require('./modules/modules'),
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    _ = require('underscore');

// Set the base path for modules.
gameOf.setModulesPath(__dirname + '/node_modules/');

// Parse settings.
gameOf.yml.setYmlPath(__dirname + '/config/config.yml');

// Set db settings.
// todo: pass settings.
gameOf.db.setThinky(require('thinky')([gameOf.yml.parse().db]));

var game = gameOf.games.create({'foo': 1});

game.saveAll().then(function(result) {
});

//
// // Set plugins information.
// gameOf.plug.setPluginsPath(__dirname + '/modules/plugins');
// gameOf.plug.setPlugins('express');
// gameOf.plug.setPlugins('validation');
//
// // Init the express plugins.
// pluginsExpress = express();
//
// _.map(gameOf.plug.getPlugins(), function(item) {
//
//   if (item.group != 'express') {
//     // Only express plugins here.
//     return;
//   }
//
//   var plugin = gameOf.plug.getPlugin(item.id);
//
//   // Set dependencies.
//   plugin.gameOf = gameOf;
//
//   if (item.modules != undefined) {
//     _.map(item.modules.split(','), function(module) {
//       try {
//         plugin[module] = require(module.trim());
//       }
//       catch (e) {
//         console.log(e);
//       }
//     });
//   }
//
//   // Go over the general allowed methods and check if the plugin implement them.
//   _.map(gameOf.yml.parse().allowed_methods, function(type) {
//     if (item.hasOwnProperty(type)) {
//       // Set the rest request type callback from the annotation.
//       pluginsExpress[type](item.path, plugin[item[type]]);
//
//       // Declaring of sub routes.
//       if (item.hasOwnProperty('subRoute')) {
//         if (item.subRoute.indexOf(',') != -1) {
//           // More than one single sub route.
//           _.map(item.subRoute.split(','), function(subRoute) {
//             pluginsExpress[type](item.path + subRoute.trim(), plugin[item[type]]);
//           });
//         }
//         else {
//           pluginsExpress[type](item.path + item.subRoute, plugin[item[type]]);
//         }
//       }
//     }
//   });
// });

app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(gameOf.token.deferAccessToken)
  // .use(pluginsExpress)
  .listen(3000);
