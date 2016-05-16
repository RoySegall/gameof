var assert = require('chai').assert,
    gameOf = require('../../modules/modules'),
    _ = require('../../node_modules/underscore'),
    plug = gameOf.plug;

plug.setPluginsPath(__dirname + '/mocks');

describe('Testing the plugin frameworks', function () {

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

describe('Testing the validation plugins', function() {
  plug.setPlugins('validation');

  it('Testing object validation', function() {
    var user = {};
    var plugin = plug.getPlugin('users_validation');

    var validations = plugin.validate(user);

    assert.equal(validations.username, '"username" is required');
    assert.equal(validations.email, '"email" is required');

    user.username = 'a';
    user.email = 'foo@bar';

    validations = plugin.validate(user);
    assert.equal(validations.email, undefined);
    assert.equal(validations.username, '"username" length must be at least 3 characters long');

    user.username = 'foobar';
    validations = plugin.validate(user);
    assert.equal(validations, null);
  });

});
