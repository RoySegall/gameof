/**
 * @id question
 * @path /api/questions
 * @get getQuestions
 * @post postQuestions
 */
function plugin() {

  return {

    getQuestions: function(req, res) {
      res.send('Get a random question');
    },

    postQuestions: function() {

    }
  };
}

module.exports = plugin();
