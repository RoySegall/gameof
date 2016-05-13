/**
 * @id dummy
 * @path /api/games
 * @allowedMethods get, post, patch
 */
function plugin() {

  return {

    restGet: function () {
      return 'I am a dummy text';
    }

  };
}

module.exports = plugin();
