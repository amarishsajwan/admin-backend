const Joi = require("joi");

module.exports = {
  validateToCreate: function (degree) {
    const schema = {
      name: Joi.string().required(),
      description: Joi.string().required(),
    };
    return Joi.validate(degree, schema);
  },
  validateToUpdate: function (degree) {
    const schema = {
      name: Joi.string().required(),
      description: Joi.string().required(),
    };
    return Joi.validate(degree, schema);
  },
};
