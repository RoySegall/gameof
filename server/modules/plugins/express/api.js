/**
 * @id describe
 * @path /api
 *
 * @get describeEndPoints
 *
 * @modules underscore
 */
module.exports = {

  describeEndPoints: function(req, res) {

    var plug = module.exports.gameOf.plug;
    var formatter = module.exports.gameOf.formatter;
    var _ = module.exports.underscore;

    var plugins = _.object(_.map(plug.getPlugins(), function(plugin) {

      if (plugin.group != 'express') {
        return [];
      }

      return [plugin.id, {
        'path': 'http://' + req.get('host') + plugin.path
      }];
    }));

    formatter.jsonizer(res, plugins);
  }

};
