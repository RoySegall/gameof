/**
 * @id users_validation
 */
module.exports = {

  template: function () {
    var Joi = require('../../../../node_modules/joi');

    return Joi.object().keys({
      username: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string().email().required()
    });
  }

};
