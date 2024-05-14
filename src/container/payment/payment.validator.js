const Joi = require('joi')

module.exports = {
    validateToCreate: function (user) {
        const schema = {
            cartToken: Joi.string().required(),
        };
        return Joi.validate(user, schema);
    },
    validateFindOptions: function (entry) {
        const schema = {
            sort: Joi.string().valid('name'),
            page: Joi.number().min(1),
            limit: Joi.number().min(1).max(100),
            type: Joi.string(),
            search: Joi.string(),
        };
        return Joi.validate(entry, schema);
    },
    validateToUpdate: function (user) {
        const schema = {
            packageType: Joi.string(),
            price: Joi.number(),
            addOnItemIds: Joi.array().items(Joi.string()),
            quantity: Joi.number().min(1),
        };
        return Joi.validate(user, schema);
    },

};
