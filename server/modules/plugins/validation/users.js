/**
 * @id users_validation
 */

var Joi = require('../../../node_modules/joi');

function plugin() {

  return {

    template: function () {
      return Joi.object().keys({
        username: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email().required()
      });
    }

  };
}

module.exports = plugin();
