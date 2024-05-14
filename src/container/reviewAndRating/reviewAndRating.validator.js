const Joi = require('joi')

module.exports = {
    validateToCreate: function (user) {
        const schema = {
            comment:Joi.string(),
            rating: Joi.number().required().min(1).max(5),
            kitchenId: Joi.string().required(),
            orderId:Joi.string().required(),

        };
        return Joi.validate(user, schema);
    },
    validateFindOptions: function (entry) {
        const schema = {
            sort: Joi.string().valid('name'),
            kitchenId: Joi.string().required(),
            page: Joi.number().min(1),
            limit: Joi.number().min(1).max(100),
            type: Joi.string(),
            status: Joi.string(),
            search: Joi.string(),
        };
        return Joi.validate(entry, schema);
    }
};
