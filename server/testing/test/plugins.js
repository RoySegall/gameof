var assert = require('chai').assert;
var gameOf = require('../../modules/modules');
var _ = require('../../node_modules/underscore');

describe('Testing the plugin frameworks', function () {
  var plug = gameOf.plug;

  plug.setPluginsPath(__dirname + '/mocks');

  it('Testing the plugins directory', function () {
    assert.equal(plug.getPluginsPath(), __dirname + '/mocks');
  });

  it('Testing the plugins info method', function() {
    plug.setPlugins('dummy');
    var plugins = gameOf.plug.getPlugins();

    assert.notEqual(_.indexOf(_.keys(plugins), 'dummy'), -1);
  });

  it('Check the instantiation of a plugin', function() {
    assert.equal(plug.getPlugin('dummy').restGet(), 'I am a dummy text');
  });

});
