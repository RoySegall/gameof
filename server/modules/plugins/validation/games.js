/**
 * @id games_validation
 */

module.exports = {

  template: function () {
    var Joi = require('../../../node_modules/joi');
    
    return Joi.object().keys({
      title: Joi.string().required()
    });
  }

};
