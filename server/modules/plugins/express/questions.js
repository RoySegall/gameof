/**
 * @id question
 * @path /api/questions
 * @allowedMethods get, post
 * @validate true
 */
function plugin() {

  return {

    restGet: function(req, res) {
      res.send('Get a random question');
    },

    postGet: function() {

    }
  };
}

module.exports = plugin();
