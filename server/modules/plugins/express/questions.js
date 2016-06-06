/**
 * @id question
 * @path /api/questions
 *
 * @get getQuestions
 * @post postQuestions
 */
module.exports = {

  getQuestions: function(req, res) {
    res.send('Get a random question');
  },

  postQuestions: function() {

  }
};
