/**
 * @id describe
 * @path /api
 *
 * @get describeEndPoints
 *
 * @modules underscore
 */
function plugin() {

  return {

    describeEndPoints: function(req, res) {

      var plug = module.exports.gameOf.plug;
      var _ = module.exports.underscore;

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
