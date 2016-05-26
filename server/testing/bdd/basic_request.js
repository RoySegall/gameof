var vows = require('vows'),
  assert = require('assert'),
  request = require('request');

vows.describe('Testing the api page').addBatch({
  'I should get 404 when accessing to the / endpoint': {
    topic: function () {
      request ({
        uri: 'http://localhost:3000/',
        method: 'get'
      }, this.callback );
    },

    'we got 404': function (topic) {
      assert.equal(topic.statusCode, 404);
    }
  },

  'I should get 200 when accessing to the /api endpoint.': {
    topic: function () {
      request ({
        uri: 'http://localhost:3000/api',
        method: 'get'
      }, this.callback );
    },

    'we got 200': function (topic) {
      assert.equal(topic.statusCode, 200);
    },
    'Check the ednpoints exists in the /api path': function(topic) {
      var body = topic.toJSON().body;
      assert.notEqual(body.indexOf('access_token'), -1);
    }
  }

}).export(module);
