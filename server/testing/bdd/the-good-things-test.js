var vows = require('vows'),
  assert = require('assert'),
  request = require('request');

// Create a Test Suite
vows.describe('Testing the api page').addBatch({
  'I should get 404 when specifing bad endpoint':  function (topic) {
    request
      .get('http://localhost:3000')
      .on('response', function(response) {
        assert.equal(response.statusCode, 404);
      });
  },
  'I should get 200 when specifing endpoint': function () {
    return request
      .get('http://localhost:3000/api')
      .on('response', function(response) {
        // assert.equal(1,2);
      })
      .then(function() {
        return 'a';
      });
  }

}).export(module);