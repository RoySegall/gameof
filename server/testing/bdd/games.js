/**
 * Testing access token and user authentication.
 */
var vows = require('vows'),
  assert = require('assert'),
  request = require('request'),
  accessToken = require('../modules/access_token');

vows.describe('Getting the games')
  .addBatch({

    'Testing user validation': {
      topic: function() {
        request ({
          uri: 'http://localhost:3000/api/games',
          method: 'get'
        }, this.callback );
      },
      'The server return the games we migrated': function (topic) {
        assert.notEqual(topic.toJSON().body.indexOf('Hasadna'), -1);
      }
    },
    'Testing creation access': {
      topic: function() {
        request ({
          uri: 'http://localhost:3000/api/games',
          method: 'post'
        }, this.callback );
      },
      'The server return 401 when we dod not pass access token': function (topic) {
        var body = JSON.parse(topic.toJSON().body);

        assert.equal(topic.statusCode, 401);
        assert.equal(body.title, 'The user object was not found.');
      }
    },
    'Acquiring access token': {
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
    'Send empty payload': {
      topic: function() {
        request ({
          uri: 'http://localhost:3000/api/games',
          method: 'post',
          headers: {
            access_token: accessToken.getAccessToken()
          }
        }, this.callback );
      },
      'Missing payload retrieved the correct text': function(topic) {
        var body = JSON.parse(topic.toJSON().body);
        assert.equal(topic.statusCode, 400);
        console.log('a',body);
        assert.equal(body.title, 'The request body is un-valid');
        assert.equal(body.error.title, '"title" is required');
      }
    },
    'Send bad payload': {
      topic: function() {
        request ({
          uri: 'http://localhost:3000/api/games',
          method: 'post',
          headers: {
            access_token: accessToken.getAccessToken()
          },
          form: {
            'foo': 'bar'
          }
        }, this.callback );
      },
      'Bad payloads retrieved the correct values': function(topic) {
        var body = JSON.parse(topic.toJSON().body);
        assert.equal(body.error.title, '"title" is required');
        assert.equal(body.error.foo, '"foo" is not allowed');
      }
    },
    'Testing creation': {
      topic: function() {
        request ({
          uri: 'http://localhost:3000/api/games',
          method: 'post',
          headers: {
            access_token: accessToken.getAccessToken()
          },
          form: {
            'title': 'dummy text'
          }
        }, this.callback );
      },
      'The new game was created': function(topic) {
        var body = JSON.parse(topic.toJSON().body);
        assert.equal(body.title, 'dummy text');
        assert.isNotEmpty(body.uid);
      }
    }
  })
  .export(module);
