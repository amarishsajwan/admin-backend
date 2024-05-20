const Joi = require("joi");

module.exports = {
  validateToCreate: function (benefit) {
    const schema = {
      name: Joi.string().required(),
      description: Joi.string().required(),
    };
    return Joi.validate(benefit, schema);
  },
  validateToUpdate: function (benefit) {
    const schema = {
      name: Joi.string().required(),
      description: Joi.string().required(),
    };
    return Joi.validate(benefit, schema);
  },
};
