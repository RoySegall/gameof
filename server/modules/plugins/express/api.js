var plug = require('../../modules/plug'),
    yml = require('../../modules/yml'),
    _ = require('../../../node_modules/underscore');

/**
 * @id describe
 * @path /api
 *
 * @get describeEndPoints
 */
function plugin() {

  return {

    describeEndPoints: function(req, res) {

      var plugins = _.object(_.map(plug.getPlugins(), function(plugin) {

        if (plugin.group != 'express') {
          return [];
        }

        return [plugin.id, {
          'path': 'http://' + req.get('host') + plugin.path
        }];
      }));

      plug.jsonizer(res, plugins);
    }

  };
}

module.exports = plugin();
