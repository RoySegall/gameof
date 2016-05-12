/**
 * @id question
 * @path /api/questions
 * @allowedMethods get, post
 */
function plugin() {

  return {

    restGet: function () {
      console.log('I am a questions list');
    },

    postGet: function() {

    }
  };
}

module.exports = plugin();