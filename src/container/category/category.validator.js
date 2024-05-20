const Joi = require("joi");

module.exports = {
  validateToCreate: function (category) {
    const schema = {
      name: Joi.string().required(),
      description: Joi.string().required(),
    };
    return Joi.validate(category, schema);
  },
  validateToUpdate: function (category) {
    const schema = {
      name: Joi.string().required(),
      description: Joi.string().required(),
    };
    return Joi.validate(category, schema);
  },
};
