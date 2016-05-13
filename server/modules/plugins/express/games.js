/**
 * @id games
 * @path /api/games
 * @allowedMethods get, post, patch
 */
function plugin() {

  return {

    restGet: function () {
      console.log('I am a games list');
    },

    postGet: function() {

    }
  };
}

module.exports = plugin();
