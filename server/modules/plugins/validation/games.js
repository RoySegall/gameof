/**
 * @id games_validation
 */

var Joi = require('../../../node_modules/joi');

function plugin() {

  return {

    template: function () {
      return Joi.object().keys({
        title: Joi.string().required()
      });
    }

  };
}

module.exports = plugin();
