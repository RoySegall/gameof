/**
 * Testing access token and user authentication.
 */
var vows = require('vows'),
  assert = require('assert'),
  request = require('request'),
  accessToken = require('../modules/access_token');

vows.describe('Testing user authentication')
  .addBatch({

    'Testing user validation': {
      topic: function() {
        request ({
          uri: 'http://localhost:3000/api/access_token',
          method: 'post',
          form: {
            username: 'roy segall',
            password: 'roy'
          }
        }, this.callback );
      },
      'The server return 401 when passing wrong username and password': function (topic) {
        assert.equal(401, topic.statusCode);
      }
    },

    'Testing access token requiring': {
      topic: function() {
        request ({
          uri: 'http://localhost:3000/api/access_token',
          method: 'post',
          form: {
            username: 'roy segall',
            password: 'roy segall'
          }
        }, this.callback );
      },

      'The server return an access callback': function (topic) {
        var body = JSON.parse(topic.toJSON().body);
        assert.isNotEmpty(body.access_token);
        accessToken.setAccessToken(body.access_token);
      }
    }
})
.addBatch({

  'Validating the access token': {
    topic: function() {
      request ({
        uri: 'http://localhost:3000/api/me',
        method: 'get',
        headers: {
          access_token: accessToken.getAccessToken()
        }
      }, this.callback );
    },
    'The server return an access callback': function(topic) {
      var body = JSON.parse(topic.toJSON().body);

      assert.equal(body.name, 'roy segall');
      assert.equal(body.mail, 'roy.segall@gizra.com');
    }
  }
})
.export(module);
